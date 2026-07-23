# Resources Folder

This folder is the canonical location for research resources related to Hugh Nibley.

## Purpose

- Store open source or public-domain content produced by Hugh Nibley.
- Maintain a bibliography of sources Hugh Nibley used, cited, or discussed in his writings.
- Preserve enough metadata for transparent sourcing and reproducible research.

## Scope

Include:

- Publicly accessible texts, articles, talks, or excerpts authored by Hugh Nibley.
- Structured bibliography entries for primary and secondary sources connected to Nibley's work.
- Notes that document provenance, access dates, and publication context.

Do not include:

- Copyrighted material without clear redistribution rights.
- Paywalled files copied without permission.
- Unverified quotes without a traceable source.

## Recommended Structure

Use this structure as content is added:

```text
resources/
	README.md
	nibley-authored/
		books/
		essays/
		talks/
		interviews/
	bibliography/
		bibliography.csv
		bibliography.md
	notes/
		source-verification.md
		acquisition-log.md
```

## Bibliography Standard

Track each bibliography item with the following fields:

- `id`: unique slug (example: `plato-republic-jowett-1892`)
- `author`
- `title`
- `year`
- `type` (book, article, lecture, scripture, commentary, archive)
- `publisher_or_journal`
- `url_or_archive_ref`
- `access_date`
- `relation_to_nibley` (cited, discussed, paraphrased, context)
- `nibley_work_reference` (where it appears in Nibley's work)
- `notes`

## File Naming Guidance

- Use lowercase kebab-case names.
- Keep names stable once referenced in notes or scripts.
- Prefer descriptive names with year when available.

Examples:

- `nibley-authored/essays/what-is-a-temple-1980.md`
- `bibliography/plutarch-lives-loeb-1914.md`

## Source and Citation Rules

- Prefer primary sources and institutional archives.
- Record exact URL and access date for web sources.
- Mark uncertain references explicitly as `unverified` until validated.
- Preserve original wording in quotes and include page or section when available.

## Contribution Workflow

1. Verify content is legal to store and redistribute.
2. Add or update the resource file.
3. Add or update bibliography entry with required metadata.
4. Add provenance notes in `notes/acquisition-log.md`.
5. Cross-link the bibliography entry to relevant Nibley work references.

## Initial Seed Sources

- BYU Religious Studies Center author page:
	- https://rsc.byu.edu/author/nibley-hugh-w

This page is a starting index only. Confirm important claims against original publications when possible.
