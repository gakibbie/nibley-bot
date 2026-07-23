# Copilot Automation

This folder is the home for repository-level AI automation assets.

## Structure

- `crew/`: Role definitions for your AI crew (planner, implementer, reviewer).
- `instructions/`: Shared operating instructions for tasks and pull request work.
- `allow-commands/`: Command allowlists for automation runs.

## Suggested Workflow

1. Define a task in your issue or PR.
2. Use the planner role to break work into steps.
3. Use the implementer role to make code changes.
4. Use the reviewer role for risk checks and test coverage.
5. Only run commands that are present in an allowlist file.

## Notes

- Keep command policies conservative.
- Treat all automation output as a draft until reviewed by a human.
- Update these files as your team standards evolve.

## Mode Quickstart

Use one of two response modes:

- `closed_corpus`: repository-local sources only (default).
- `live_update`: fetch current web/feed updates when user asks for latest/recent/new content.

Mode routing rules are defined in:

- `.github/copilot/instructions/mode-routing.instructions.md`

## Source Order Quick Reference

1. Repository-local curated material
2. User-requested primary sources
3. Secondary commentary (clearly attributed)

Detailed source policy:

- `.github/copilot/instructions/source-policy.instructions.md`

## Output Expectations

- Use clear attribution for disputed claims.
- Avoid unstable PDF page-number citations where pagination differs.
- Include confidence and gaps for high-stakes responses.

See:

- `.github/copilot/instructions/citation-output.instructions.md`
- `.github/copilot/instructions/topic-interpretation.instructions.md`

## Example Prompt Envelopes

Closed corpus request:

"Summarize Denver Snuffer's position on topic X using only repository sources. If not present, say you do not have enough information."

Live update request:

"Check the latest Denver Snuffer posts and podcasts, include direct links and publication dates, then summarize what is new."
