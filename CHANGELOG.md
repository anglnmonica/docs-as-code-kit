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

- **research-doc skill,** which researches a topic on the web, in research
  papers, and in published white papers and solution briefs, then drafts a
  white paper or solution brief. It saves research notes with a source for
  every finding, cites every outside fact in the draft, and never copies
  other documents.

- **White paper patterns,** a guide to what makes a white paper
  persuasive: numbered tables and figures, explaining the work before the
  network, real-world data, a scenario, and a business case. research-doc
  follows it, and the white paper template points to it.

### Changed

- The setup script adds the product name from `docs-kit.yml` to the style
  check's word list, so the check accepts it everywhere, including in
  headings. With the Telecom pack on, it also accepts Wi-Fi in headings.
- The Telecom pack's acronym rule no longer asks you to define UK, EU, GB,
  MB, KB, TB, USB, or TODO, model numbers such as SCU5050 or IP65, or
  standard names such as TR-069.
- write-doc now points to research-doc when a white paper or solution brief
  needs outside evidence.

### Fixed

- The Telecom pack's acronym rule flagged plurals, such as PALs, even when
  they were defined, as in PALs (Priority Access Licenses).
- The rule tests didn't test the acronym rule. They do now.
- The acronym rule didn't accept definitions with commas, such as
  MIMO (multiple-input, multiple-output).
- The Google style flagged US (United States) as the word "us." The style
  check now skips it.
- The Telecom pack's README listed the reversed-acronym rule as a warning.
  It's an error.

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
- **`repository.base_path`** in `docs-kit.yml`, for sites published under a
  folder, such as GitHub Pages project sites at
  `https://example.github.io/my-docs/`. The link check uses it to resolve
  full links the way they work once published.
- **Link check:** skips full links to the site's own address
  (`project.docs_url`) when it checks a built site, since every page is
  already checked as a file. New pages in a pull request aren't published
  yet, so these links would fail.

Using the kit to document the [Relay demo API](https://anglnmonica.github.io/relay-api-docs/)
led to the last two changes.
