# nibley-bot

## Copilot Automation

Repository automation assets are located in `.github/copilot/`.

- Crew definitions: `.github/copilot/crew/`
- Shared instructions: `.github/copilot/instructions/`
- Command policies: `.github/copilot/allow-commands/`

## Web SPA

The repository includes a React + TypeScript + Vite SPA in `src/` for prompt-mode, source-check, and review workflows.

### Run locally

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

### Build

- `npm run build`

### Routes

- `/` Mode and policy selection
- `/compose` Prompt payload generation/export
- `/sources` Source preflight checks
- `/review` Output checklist and handoff export

### Source preflight notes

`/sources` uses a local Vite dev endpoint (`/api/feed-check`) to fetch external feeds and avoid browser CORS failures during development. The endpoint also applies short-lived in-memory caching for repeated checks.

### Handoff notes

`/review` includes an export panel that produces a structured handoff summary with:

- Active prompt configuration
- Latest source preflight results
- Checklist completion state