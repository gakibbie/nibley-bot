import { useAppState } from "../state/app-state";

export function SourcePolicyPanel() {
  const { config, setConfig } = useAppState();

  return (
    <section className="panel">
      <h2>Source Policy</h2>
      <label className="stacked">
        Source scope
        <select
          value={config.sourceScope}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              sourceScope: e.target.value as typeof config.sourceScope
            }))
          }
        >
          <option value="local_only">local_only</option>
          <option value="local_plus_primary">local_plus_primary</option>
        </select>
      </label>

      <label className="stacked">
        Citation style
        <select
          value={config.citationStyle}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              citationStyle: e.target.value as typeof config.citationStyle
            }))
          }
        >
          <option value="book_chapter_talk">book_chapter_talk</option>
          <option value="url_date">url_date</option>
        </select>
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={config.includeConfidence}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              includeConfidence: e.target.checked
            }))
          }
        />
        Include confidence label
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={config.includeUncertaintyFallback}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              includeUncertaintyFallback: e.target.checked
            }))
          }
        />
        Include uncertainty fallback
      </label>
    </section>
  );
}