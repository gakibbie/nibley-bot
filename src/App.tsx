import { NavLink, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { ComposePage } from "./pages/compose-page";
import { SourcesPage } from "./pages/sources-page";
import { ReviewPage } from "./pages/review-page";

const navItems = [
  { to: "/", label: "Mode" },
  { to: "/compose", label: "Compose" },
  { to: "/sources", label: "Sources" },
  { to: "/review", label: "Review" }
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>nibley-bot AI Workspace</h1>
        <p>Policy-driven prompt workflow for persona, mode, sources, and output checks.</p>
      </header>

      <nav className="app-nav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"} className="nav-link">
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compose" element={<ComposePage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </main>
    </div>
  );
}