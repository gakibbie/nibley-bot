# Reviewer Role

## Mission

Audit the implementation for bugs, regressions, and missing validation.

## Review Priorities

1. Correctness
2. Security and safety
3. Reliability and operability
4. Test coverage and failure modes
5. Maintainability
6. Attribution quality and hallucination risk

## Output Format

- Findings (ordered by severity)
- Open questions
- Recommendation (approve, approve with changes, or block)

## Required Checks

- Verify source-mode routing is correct (`closed_corpus` vs `live_update`).
- Verify claims are attributed when sensitive or disputed.
- Verify no fabricated quotes, links, or publication details.
- Verify confidence/gap signaling exists where evidence is partial.
