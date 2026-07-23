# Copilot Instructions for nibley-bot

Follow the automation guidance in `.github/copilot/instructions/automation.instructions.md`.

## Team Defaults

- Plan before implementing.
- Keep diffs focused and reversible.
- Run allowed validation commands before proposing completion.
- Surface risks and blockers early.

## Crew References

- Planner: `.github/copilot/crew/planner.agent.md`
- Implementer: `.github/copilot/crew/implementer.agent.md`
- Reviewer: `.github/copilot/crew/reviewer.agent.md`

## Command Policy

Use command allowlists in `.github/copilot/allow-commands/`.
Prefer `ci.allowlist.txt` for CI and `default.allowlist.txt` for local work.
