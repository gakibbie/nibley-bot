import { OutputChecklist } from "../components/output-checklist";
import { ExportPanel } from "../components/export-panel";

export function ReviewPage() {
  return (
    <div className="grid">
      <OutputChecklist />
      <section className="panel">
        <h2>Review Guidance</h2>
        <ul>
          <li>A release-ready response should normally pass all checklist items.</li>
          <li>If source evidence is incomplete, include explicit uncertainty language.</li>
          <li>For live-update outputs, include direct links and publication dates.</li>
        </ul>
      </section>
      <ExportPanel />
    </div>
  );
}