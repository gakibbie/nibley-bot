import { useMemo } from "react";
import { useAppState } from "../state/app-state";

export function OutputChecklist() {
  const { checklist, setChecklist } = useAppState();

  const score = useMemo(() => {
    const values = Object.values(checklist);
    const complete = values.filter(Boolean).length;
    return `${complete}/${values.length}`;
  }, [checklist]);

  return (
    <section className="panel">
      <h2>Output Checklist</h2>
      <p className="hint">Confirm output quality gates before publishing a final response.</p>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={checklist.citationCompleteness}
          onChange={(e) =>
            setChecklist((prev) => ({
              ...prev,
              citationCompleteness: e.target.checked
            }))
          }
        />
        Citation completeness confirmed
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={checklist.confidenceLabelPresent}
          onChange={(e) =>
            setChecklist((prev) => ({
              ...prev,
              confidenceLabelPresent: e.target.checked
            }))
          }
        />
        Confidence label present
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={checklist.uncertaintyStatementPresentWhenNeeded}
          onChange={(e) =>
            setChecklist((prev) => ({
              ...prev,
              uncertaintyStatementPresentWhenNeeded: e.target.checked
            }))
          }
        />
        Uncertainty statement present when evidence is partial
      </label>

      <p className="score">Checklist completion: {score}</p>
    </section>
  );
}