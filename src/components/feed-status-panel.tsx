import { useState } from "react";
import { useAppState } from "../state/app-state";
import { FEED_TARGETS, type FeedCheckResult } from "../types";

async function checkFeed(sourceName: string, url: string): Promise<FeedCheckResult> {
  const started = new Date().toISOString();
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const titleMatch = text.match(/<title>(.*?)<\/title>/i);
    const pubDateMatch = text.match(/<pubDate>(.*?)<\/pubDate>/i);

    return {
      sourceName,
      url,
      status: "ok",
      fetchedAt: started,
      latestItemTitle: titleMatch?.[1]?.trim() || "(title not parsed)",
      latestItemDate: pubDateMatch?.[1]?.trim() || "(date not parsed)"
    };
  } catch (error) {
    return {
      sourceName,
      url,
      status: "error",
      fetchedAt: started,
      error: error instanceof Error ? error.message : "unknown error"
    };
  }
}

export function FeedStatusPanel() {
  const { feedResults, setFeedResults } = useAppState();
  const [checking, setChecking] = useState(false);

  return (
    <section className="panel">
      <h2>Feed Status Panel</h2>
      <p className="hint">Checks Denver Snuffer feed endpoints and captures latest parsed metadata when available.</p>
      <button
        type="button"
        disabled={checking}
        onClick={async () => {
          setChecking(true);
          const results = await Promise.all(
            FEED_TARGETS.map((target) => checkFeed(target.sourceName, target.url))
          );
          setFeedResults(results);
          setChecking(false);
        }}
      >
        {checking ? "Checking..." : "Run Source Preflight"}
      </button>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Status</th>
              <th>Fetched At</th>
              <th>Latest Title</th>
              <th>Latest Date</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {feedResults.length === 0 ? (
              <tr>
                <td colSpan={6}>No checks run yet.</td>
              </tr>
            ) : (
              feedResults.map((row) => (
                <tr key={row.url}>
                  <td>
                    <a href={row.url} target="_blank" rel="noreferrer">
                      {row.sourceName}
                    </a>
                  </td>
                  <td>{row.status}</td>
                  <td>{row.fetchedAt ?? "-"}</td>
                  <td>{row.latestItemTitle ?? "-"}</td>
                  <td>{row.latestItemDate ?? "-"}</td>
                  <td>{row.error ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}