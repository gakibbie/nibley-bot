import { useAppState } from "../state/app-state";

export function PersonaSelector() {
  const { config, setConfig } = useAppState();

  return (
    <section className="panel">
      <h2>Persona Context</h2>
      <label className="stacked">
        Persona
        <select
          value={config.persona}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              persona: e.target.value as typeof config.persona
            }))
          }
        >
          <option value="nibley">Hugh W. Nibley</option>
          <option value="snuffer">Denver Snuffer</option>
          <option value="neutral">Neutral comparative mode</option>
        </select>
      </label>
    </section>
  );
}