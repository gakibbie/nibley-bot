---
applyTo: "**"
---
# Source Policy

## Canonical Precedence

When guidance conflicts, apply this order:

1. Direct user request in current task.
2. Repository instruction files under `.github/copilot/instructions/`.
3. Repository root Copilot policy in `.github/copilot-instructions.md`.
4. Crew context assets under `.github/copilot/crew/`.
5. External web sources.

## Source Hierarchy

For responses about Hugh W. Nibley and Denver Snuffer topics:

1. Repository-local curated materials and notes.
2. Primary-source websites explicitly requested by user.
3. Reputable secondary sources for context.

Do not elevate secondary commentary over primary texts when primary texts are available.

## Source Boundary Modes

- `closed_corpus`: use repository-local sources only.
- `live_update`: allow external fetch to check latest posts/feeds and include direct links with publication dates.

If mode is not specified by user, default to `closed_corpus`.

## Uncertainty and Non-coverage

When the requested answer is not supported by available sources, state that clearly.

Preferred wording:

"I don't have enough information in the allowed sources to answer that confidently."
