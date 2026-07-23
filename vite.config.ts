import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

type CachedFeed = {
  updatedAt: number;
  payload: {
    sourceName: string;
    url: string;
    status: "ok" | "error";
    fetchedAt: string;
    latestItemTitle?: string;
    latestItemDate?: string;
    error?: string;
    detail?: string;
    cached?: boolean;
  };
};

const cache = new Map<string, CachedFeed>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function extractFirstValue(xml: string, tag: string): string | undefined {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  if (!match?.[1]) {
    return undefined;
  }

  return match[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function parseFeedMeta(xml: string): { latestItemTitle?: string; latestItemDate?: string } {
  const itemOrEntry = xml.match(/<(item|entry)[\s\S]*?<\/(item|entry)>/i)?.[0] ?? xml;

  const latestItemTitle = extractFirstValue(itemOrEntry, "title") ?? extractFirstValue(xml, "title");
  const latestItemDate =
    extractFirstValue(itemOrEntry, "pubDate") ??
    extractFirstValue(itemOrEntry, "updated") ??
    extractFirstValue(itemOrEntry, "published");

  return { latestItemTitle, latestItemDate };
}

const feedProxyPlugin = {
  name: "feed-check-proxy",
  configureServer(server: { middlewares: { use: (arg0: (req: any, res: any, next: any) => void) => void } }) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith("/api/feed-check")) {
        next();
        return;
      }

      const started = new Date().toISOString();
      const parsed = new URL(req.url, "http://localhost:5173");
      const sourceName = parsed.searchParams.get("sourceName") ?? "Feed";
      const url = parsed.searchParams.get("url");

      if (!url) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            sourceName,
            status: "error",
            fetchedAt: started,
            error: "Missing url query parameter"
          })
        );
        return;
      }

      const existing = cache.get(url);
      if (existing && Date.now() - existing.updatedAt < CACHE_TTL_MS) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ...existing.payload, cached: true, detail: "Served from local proxy cache" }));
        return;
      }

      try {
        const upstream = await fetch(url, {
          method: "GET",
          headers: {
            "User-Agent": "nibley-bot-dev-proxy/1.0"
          }
        });

        if (!upstream.ok) {
          throw new Error(`HTTP ${upstream.status}`);
        }

        const xml = await upstream.text();
        const { latestItemTitle, latestItemDate } = parseFeedMeta(xml);

        const payload = {
          sourceName,
          url,
          status: "ok" as const,
          fetchedAt: started,
          latestItemTitle: latestItemTitle ?? "(title not parsed)",
          latestItemDate: latestItemDate ?? "(date not parsed)",
          detail: "Fetched via local Vite proxy"
        };

        cache.set(url, { updatedAt: Date.now(), payload });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(payload));
      } catch (error) {
        const payload = {
          sourceName,
          url,
          status: "error" as const,
          fetchedAt: started,
          error: error instanceof Error ? error.message : "Unknown proxy error",
          detail: "Proxy request failed"
        };

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(payload));
      }
    });
  }
};

export default defineConfig({
  plugins: [react(), feedProxyPlugin]
});