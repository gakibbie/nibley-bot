---
applyTo: "**"
---
# Repository Automation Instructions

## Objective

Deliver small, safe, and reversible changes with clear verification.

## Execution Standards

- Prefer minimal diffs over broad refactors.
- Keep behavior unchanged unless explicitly requested.
- Add tests when changing behavior or fixing a bug.
- Document assumptions when requirements are ambiguous.

## Validation Standards

- Run formatting, linting, and tests when available.
- Report commands run and summarize outcomes.
- If a check cannot run, state why and provide a manual fallback.

## Safety Standards

- Do not run destructive commands without explicit approval.
- Never expose secrets or credentials in logs or outputs.
- Escalate when a change has production-impacting risk.
