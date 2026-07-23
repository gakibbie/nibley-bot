import { ModeSelector } from "../components/mode-selector";
import { PersonaSelector } from "../components/persona-selector";
import { SourcePolicyPanel } from "../components/source-policy-panel";

export function HomePage() {
  return (
    <div className="grid two-up">
      <ModeSelector />
      <PersonaSelector />
      <SourcePolicyPanel />
      <section className="panel">
        <h2>How to Use</h2>
        <ol>
          <li>Select persona and response mode on this page.</li>
          <li>Go to Compose to generate prompt payload and JSON export.</li>
          <li>Go to Sources to run feed preflight checks when using live updates.</li>
          <li>Go to Review to complete output quality checklist.</li>
        </ol>
      </section>
    </div>
  );
}