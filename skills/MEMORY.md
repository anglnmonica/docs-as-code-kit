# Skills memory

What the docs-kit skills have learned from real use. Every skill reads this
file before it starts, and follows it unless the writer says otherwise in
the current request.

Keep it current: when the writer corrects a draft or a review, or a test
run finds a problem, add a dated lesson under the matching heading. Write
each lesson as an instruction. Never record confidential or proprietary
details, such as unreleased product specifications, prices, or customer
names: this file is part of the kit and may be public.

## Writer's house style

- Follow the Google developer documentation style guide.
- For white papers and solution briefs, follow
  [research-doc/white-paper-patterns.md](research-doc/white-paper-patterns.md).
  It comes from the writer's own published white papers.
- Real-world data is the strongest pitch. Lead with named deployments and
  measured results, and the cost of the problem, from named sources.
  (2026-11-17)
- Every major section of a white paper needs at least one numbered table
  or figure. A paper of paragraphs alone isn't finished. (2026-11-17)

## Process lessons

- **Follow the writer's outline.** When the writer has an outline, use its
  sections and order, and add only what the template requires that the
  outline lacks. (2026-11-17)
- **Wait for approval of the research notes** before drafting, as
  research-doc says. A test run that skipped this step drafted before the
  writer could drop or add sources. (2026-11-17)
- **Ask which products to feature** before drafting product sections, and
  take product facts only from material the writer approves. (2026-11-17)
- **Flag confidential sources.** When product material is marked
  confidential or internal, use it only with the writer's permission, add
  a `TODO:` at the top of the section to get approval before publishing,
  and leave out prices entirely. (2026-11-17)
- **Don't claim deployments a source calls illustrative.** Sales and
  training material often shows example architectures that aren't real
  customer sites. (2026-11-17)
- **Prefer independent sources.** Regulators, governments, standards
  bodies, research papers, and the site operator's own statements carry
  more weight than vendor material. Label sponsored articles as sponsored,
  or don't use them. (2026-11-17)
- **Report what went wrong in trials.** Honest lessons, such as a trial
  that couldn't hold its latency target, make the rest of the paper more
  believable. (2026-11-17)
- **Don't cite or name competitors** of the company the paper is for,
  unless the writer asks. (2026-11-17)

## Delivery lessons

- **Google Docs:** Docs can insert an image only from a public web
  address. When the content isn't public, put a numbered figure caption in
  the doc where each image goes, and give the writer the image files to
  insert. (2026-11-17)
- **Edit the writer's doc in place.** Once a doc exists, make changes in
  that doc so the link stays the same. Don't create a second copy.
  (2026-11-17)

## Style check lessons

- Turn the style check off for a reference list with `<!-- vale off -->`
  and `<!-- vale on -->`: source titles aren't the writer's text.
  (2026-11-17)
- Define each acronym the first time it appears in the body, acronym
  first: SAS (Spectrum Access System). Model numbers, such as SCU5050, and
  standard names, such as TR-069, don't need definitions. (2026-11-17)

## Research library

Verified public findings by topic, to reuse before searching again. Check
that each source is still current, and add new findings as you verify
them.

| Topic | File |
| --- | --- |
| Private 5G in ports and container terminals | [research/private-5g-ports.md](research/private-5g-ports.md) |
