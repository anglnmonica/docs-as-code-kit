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

- **AI-readiness check,** which finds what makes pages hard for AI tools
  and search to quote correctly: 14 page rules, such as sections that don't
  make sense on their own and dates like "last year," and 5 site rules,
  such as a broken llms.txt. It reports findings, not a score. The same
  rules run in CI and in a browser. The review-doc skill adds the checks
  that need judgment, such as whether each question in a page's new
  `questions` list has a clear answer. See `docs/ai-readiness.md`.
- **Term consistency check,** which flags a page that uses more than one
  term from a group you list under `consistency` in `terms.yml`, such as
  "small cell," "radio," and "access point." It asks a person to review,
  because the terms may mean different things.
- **Retrieval preview** (`--retrieval`), which shows the section a keyword
  search retrieves first for each question in a page's `questions` list.
  review-doc uses it for a retrieval test: it answers each question from
  that section alone.
- **`--external`** for the site checks, for llms.txt links to another site
  under the same address, such as another GitHub Pages project site.
- **Skip rules** with `checks.ai_ready.skip` in `docs-kit.yml`, or
  `--skip` for one run.
- The AI-readiness checker page compares a page before and after your
  fixes, and tells you when you paste a web address instead of Markdown.
- **research-doc skill,** which researches a topic on the web, in research
  papers, and in published white papers and solution briefs, then drafts a
  white paper or solution brief. It saves research notes with a source for
  every finding, cites every outside fact in the draft, and never copies
  other documents.

- **White paper patterns,** a guide to what makes a white paper
  persuasive: numbered tables and figures, explaining the work before the
  network, real-world data, a scenario, and a business case. research-doc
  follows it, and the white paper template points to it.

- **Skills memory,** `skills/MEMORY.md`, which every skill reads before it
  starts: the writer's house style, lessons from corrections and test
  runs, and a library of verified public research, starting with private
  5G in ports. Skills offer to add new lessons and findings.

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
- The AI-readiness section-length rule didn't treat HTML headings, such as
  `<h2>`, as the start of a section, so it reported one long section.
- The AI-readiness check didn't read front matter lists written without
  indentation (`- item` under `questions:`) or on one line
  (`questions: [...]`), so it reported a missing `questions` list.
- The AI-readiness check reported empty files, such as placeholders, as
  pages with no front matter. It skips them now.

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
