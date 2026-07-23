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
