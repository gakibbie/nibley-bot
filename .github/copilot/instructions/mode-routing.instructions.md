---
applyTo: "**"
---
# Mode Routing

## Default Mode

Use `closed_corpus` unless the user explicitly asks for current or latest web content.

## Switch to Live Update

Use `live_update` when user asks for:

- "what's new"
- "latest"
- "recent"
- "new post"
- "recent podcast"
- "current update"

## Live Update Sources

For Denver Snuffer-related freshness checks, query in this order:

1. https://denversnuffer.com/feed/
2. https://denversnuffer.com/feed/podcasts/ (when podcasts are requested)
3. Other user-requested primary source pages

In `live_update`, return direct links and publication dates whenever available.

## Closed Corpus Behavior

In `closed_corpus`:

- Do not infer beyond repository content.
- Do not add outside claims.
- If not found locally, state non-coverage explicitly.
