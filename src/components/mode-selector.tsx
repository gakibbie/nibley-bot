import { useAppState } from "../state/app-state";

export function ModeSelector() {
  const { config, setConfig } = useAppState();

  return (
    <section className="panel">
      <h2>Response Mode</h2>
      <div className="field-group">
        <label>
          <input
            type="radio"
            checked={config.mode === "closed_corpus"}
            onChange={() =>
              setConfig((prev) => ({
                ...prev,
                mode: "closed_corpus",
                sourceScope: "local_only"
              }))
            }
          />
          Closed corpus
        </label>
        <p className="hint">Use repository-local sources only. Default for most requests.</p>
      </div>
      <div className="field-group">
        <label>
          <input
            type="radio"
            checked={config.mode === "live_update"}
            onChange={() =>
              setConfig((prev) => ({
                ...prev,
                mode: "live_update",
                sourceScope: "local_plus_primary",
                citationStyle: "url_date"
              }))
            }
          />
          Live update
        </label>
        <p className="hint">Check current feeds/web pages and return links with publication dates.</p>
      </div>
    </section>
  );
}