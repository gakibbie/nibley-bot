# Allow Commands Policy

Use these files to constrain commands your automation is allowed to run.

## Files

- `default.allowlist.txt`: local development-friendly defaults.
- `ci.allowlist.txt`: stricter commands suitable for CI.

## Guidance

- Keep entries as command prefixes, one per line.
- Prefer deterministic and non-destructive commands.
- Review policy changes with the same rigor as code changes.
