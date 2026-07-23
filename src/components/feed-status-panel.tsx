import { useState } from "react";
import { useAppState } from "../state/app-state";
import { FEED_TARGETS, type FeedCheckResult } from "../types";

async function checkFeed(sourceName: string, url: string): Promise<FeedCheckResult> {
  try {
    const params = new URLSearchParams({ sourceName, url });
    const response = await fetch(`/api/feed-check?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as FeedCheckResult;
  } catch (error) {
    return {
      sourceName,
      url,
      status: "error",
      fetchedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : "unknown error",
      detail: "Client request failed before proxy response"
    };
  }
}

export function FeedStatusPanel() {
  const { feedResults, setFeedResults } = useAppState();
  const [checking, setChecking] = useState(false);

  return (
    <section className="panel">
      <h2>Feed Status Panel</h2>
      <p className="hint">
        Checks Denver Snuffer feed endpoints through a local dev proxy to avoid browser CORS blocks.
      </p>
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
                  <td>{row.error ?? row.detail ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}