import { useMemo, useState } from "react";
import { useAppState } from "../state/app-state";

function nowIso() {
  return new Date().toISOString();
}

export function ExportPanel() {
  const { config, feedResults, checklist } = useAppState();
  const [copied, setCopied] = useState(false);

  const completion = useMemo(() => {
    const checks = Object.values(checklist);
    return {
      passed: checks.filter(Boolean).length,
      total: checks.length
    };
  }, [checklist]);

  const handoff = useMemo(() => {
    const sourceRows =
      feedResults.length === 0
        ? "- No source preflight checks have been run."
        : feedResults
            .map(
              (row) =>
                `- ${row.sourceName}: status=${row.status}, fetchedAt=${row.fetchedAt ?? "-"}, latestTitle=${
                  row.latestItemTitle ?? "-"
                }, latestDate=${row.latestItemDate ?? "-"}, detail=${row.error ?? row.detail ?? "-"}`
            )
            .join("\n");

    return [
      `# AI Handoff Notes`,
      `Generated: ${nowIso()}`,
      "",
      "## Prompt Configuration",
      `- persona: ${config.persona}`,
      `- mode: ${config.mode}`,
      `- sourceScope: ${config.sourceScope}`,
      `- citationStyle: ${config.citationStyle}`,
      `- includeConfidence: ${config.includeConfidence}`,
      `- includeUncertaintyFallback: ${config.includeUncertaintyFallback}`,
      "",
      "## Source Preflight",
      sourceRows,
      "",
      "## Review Checklist",
      `- citationCompleteness: ${checklist.citationCompleteness}`,
      `- confidenceLabelPresent: ${checklist.confidenceLabelPresent}`,
      `- uncertaintyStatementPresentWhenNeeded: ${checklist.uncertaintyStatementPresentWhenNeeded}`,
      `- completion: ${completion.passed}/${completion.total}`
    ].join("\n");
  }, [config, feedResults, checklist, completion]);

  return (
    <section className="panel">
      <h2>Export Handoff Notes</h2>
      <p className="hint">Copy a structured summary of settings, source checks, and checklist status for reviews.</p>
      <textarea readOnly rows={14} value={handoff} />
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(handoff);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied" : "Copy Handoff"}
      </button>
    </section>
  );
}