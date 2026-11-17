# Changelog

Every change to the kit, newest first. Version numbers follow
[Semantic Versioning](https://semver.org):

- **Major** (1.0.0 to 2.0.0): a change that needs teams to update their
  setup, such as a renamed setting in `docs-kit.yml`.
- **Minor** (0.1.0 to 0.2.0): something new, such as a skill, template, or
  domain pack.
- **Patch** (0.1.0 to 0.1.1): a fix or wording improvement.

Until version 1.0.0, any release can include changes that need teams to
update their setup. The notes for each release say what to change.

## How to record a change

Add a line under **Unreleased**, in the matching group: Added, Changed,
Fixed, or Removed. Say what changed for the people using the kit, not how
the files changed. For example: "review-doc now checks that warnings come
before the step they apply to."

When you release, rename **Unreleased** to the new version number and date,
update `VERSION`, and start a new **Unreleased** section.

## Unreleased

### Added

- **`repository.base_path`** in `docs-kit.yml`, for sites published under a
  folder, such as GitHub Pages project sites at
  `https://example.github.io/my-docs/`.

### Fixed

- The link check no longer reports every page as broken on a site
  published under a folder. Found while documenting the Relay demo API.
- The link check skips full links to the site's own address
  (`project.docs_url`) when it checks a built site. Every page is already
  checked as a file, and new pages in a pull request aren't published yet.

## 0.1.0 - 2026-11-17

The first release.

### Added

- **Automated checks,** set up from one file, `docs-kit.yml`: style (Vale,
  with Google or Microsoft style), spelling (codespell), links (Lychee,
  also weekly), accuracy (Doc Detective), and rule tests for domain packs.
- **Setup script,** `scripts/configure.py`, which writes each tool's
  settings from `docs-kit.yml`, and warns when a doc type is turned on but
  its template is missing.
- **Telecom domain pack,** with rules for acronym-first definitions,
  standard terms, unit symbols, and unit spacing, and tests for each rule.
- **Templates** for eight document types: installation guide,
  configuration guide, how-to, troubleshooting, release notes, API
  reference, white paper, and solution brief.
- **AI skills:** `write-doc` drafts a document from source material, and
  `review-doc` reviews a draft and reports findings by severity.
- **Checklists:** the review checklist, built on guidance for writing docs
  that AI tools can use, and the fact-checking rules both skills follow.
- **Example review** of a deliberately flawed draft, in `skills/examples/`.
