import { useMemo, useState } from "react";
import { useAppState } from "../state/app-state";

function buildPrompt(config: ReturnType<typeof useAppState>["config"], userIntent: string) {
  const lines = [
    `persona=${config.persona}`,
    `mode=${config.mode}`,
    `sourceScope=${config.sourceScope}`,
    `citationStyle=${config.citationStyle}`,
    `includeConfidence=${config.includeConfidence}`,
    `includeUncertaintyFallback=${config.includeUncertaintyFallback}`,
    "",
    "userIntent:",
    userIntent || "(add request details here)",
    "",
    "outputRequirements:",
    "- Distinguish fact vs claim vs commentary vs interpretation.",
    "- Avoid fabricated quotes or citations.",
    config.includeConfidence ? "- Include confidence label." : "- Confidence label omitted by config.",
    config.includeUncertaintyFallback
      ? "- If evidence is insufficient, state uncertainty explicitly."
      : "- Uncertainty fallback omitted by config."
  ];

  return lines.join("\n");
}

export function PromptAssembler() {
  const { config } = useAppState();
  const [userIntent, setUserIntent] = useState("");
  const [copied, setCopied] = useState(false);

  const payload = useMemo(
    () => ({
      config,
      userIntent,
      generatedPrompt: buildPrompt(config, userIntent)
    }),
    [config, userIntent]
  );

  const jsonText = JSON.stringify(payload, null, 2);

  return (
    <section className="panel">
      <h2>Prompt Assembler</h2>
      <label className="stacked">
        Intent
        <textarea
          value={userIntent}
          onChange={(e) => setUserIntent(e.target.value)}
          rows={6}
          placeholder="Describe the query you want the assistant to answer."
        />
      </label>

      <label className="stacked">
        Generated prompt
        <textarea readOnly rows={14} value={payload.generatedPrompt} />
      </label>

      <label className="stacked">
        JSON payload
        <textarea readOnly rows={14} value={jsonText} />
      </label>

      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(jsonText);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied" : "Copy JSON"}
      </button>
    </section>
  );
}