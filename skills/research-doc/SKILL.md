---
name: research-doc
description: >-
  Research a topic on the web, in research papers, and in published white
  papers and solution briefs, then draft a white paper or solution brief
  using the team's docs-kit templates and style. Use when someone asks for
  marketing or thought-leadership content that needs outside evidence.
  Never copies other documents, and cites a source for every outside fact.
---

# Research and write a document

You research a topic, record what you find with its source, and then draft
a white paper or solution brief from that research and the writer's product
material. Outside sources supply evidence and show what's already been
said. They never supply wording.

This skill needs a web search tool. If you don't have one, say so, and
ask the writer to provide the sources instead. Then continue from step 4.

## 1. Load the team's setup

Read these files from the repository root:

- `docs-kit.yml`: the product, readers, style, domain packs, doc types,
  sources, and how to deliver.
- The rules at `ai.verify_rules`. The default is `checklists/verify.md`.
- `checklists/review.md`.
- `terms.yml`.
- The template for the document type, at `doc_types.templates_path`.

If `docs-kit.yml` doesn't exist, say so, and ask for the product name, the
readers, and the style guide before you continue.

## 2. Agree on the brief

Before you search, confirm these with the writer:

| Question | Why it matters |
| --- | --- |
| White paper or solution brief? | A white paper makes an evidence-based case for an approach. A solution brief shows how one product fits one industry. |
| Who reads it, and what decision are they making? | Decides which evidence matters. |
| What's the one main point? | Keeps the research focused. |
| What product material can you share? | Product facts come only from the writer, never from the web. |
| Are there sources to use or avoid? | For example, a partner's report to cite, or a competitor not to name. |

Restate the brief in a few lines, and wait for the writer to confirm it.

## 3. Research

Search for each kind of source below. Prefer the higher rows: they carry
more weight with technical readers.

| Kind | Examples | Use it for |
| --- | --- | --- |
| Standards and official bodies | Standards organizations, regulators, government agencies | Definitions, requirements, and rules |
| Research papers | Peer-reviewed journals, conference papers, preprints | Measured results and how they were measured |
| Industry and analyst reports | Industry associations, analyst firms | Market figures and adoption |
| Published white papers and solution briefs | Vendors, operators, and integrators | What's already been said, and the gaps (see the rules below) |
| News and blog posts | Trade press, company blogs | Recent events only, and confirm them elsewhere when you can |

For research papers, read the abstract, the method, and the results. Note
the conditions of each result, such as the test setup and the sample size,
because a figure without its conditions misleads.

Stop when each section of the template has evidence, or when new searches
stop turning up new facts. Usually that's 8 to 20 sources.

### Rules for other companies' documents

- Read them to learn what's already been said, how deep it goes, and what
  readers still need. That's the gap your document fills.
- Never copy, paraphrase, or closely follow their wording, structure, or
  examples. Close paraphrase is still copying.
- Don't take a fact from them unless they cite where it comes from. If they
  do, find and cite the original source instead.
- Don't name or compare competitors unless the writer asks you to.

## 4. Write the research notes

Before you draft, save a research notes file next to where the draft will
go, named `<draft-name>-research.md`. The writer uses it to check your
work, and it isn't published.

```markdown
# Research notes: <title>

## Brief
<The confirmed brief, from step 2.>

## Findings
| # | Finding, in your own words | Source | Kind | Date | Conditions or limits |
| --- | --- | --- | --- | --- | --- |
| 1 | <one fact> | [<title>](<url>) | Research paper | <year> | <test setup, sample size, or region> |

## What's already been said
<Two to five sentences on the common points in published white papers and
briefs, and the gap this document fills. No quotes.>

## Couldn't confirm
- <Anything you saw stated but couldn't trace to an original source.>
```

Rules for the notes:

- Every finding links to the page you read. Never write a link, title,
  author, or date you didn't see.
- Write each finding in your own words. If the exact wording matters, quote
  fewer than 25 words, in quotation marks, with the source.
- If two sources disagree, record both, and don't choose.
- Note when a figure is more than three years old.

Share the notes, and ask the writer to confirm before you draft. They may
want to drop a source or add their own.

## 5. Outline

If the writer has an outline, use its sections and order instead of the
template's, and add only what the template requires that the outline
lacks, such as an executive summary and references. Otherwise, use the
template's sections.

Map the findings to the sections. For each section, list the
finding numbers that support it. If a section has no evidence, say so
rather than filling it with general statements.

Then plan your angle: what this document says that the published ones
don't, based on "What's already been said" in your notes. Share the
outline with the writer.

## 6. Draft

1. Start from the template, and fill in the front matter. Leave
   `last_reviewed` as a placeholder for the person who checks the draft.
2. Write each section from the outline in your own words.
3. Use the writer's product material for every product fact. Never describe
   the product from what you found on the web.
4. Cite every outside fact, figure, or quotation where it appears, with a
   numbered reference such as `[3]`, and list the references at the end. A
   solution brief can use fewer references, but every figure still needs
   one.
   Turn the style check off for the reference list, because source titles
   aren't your writing: put `<!-- vale off -->` before the list and
   `<!-- vale on -->` after it.
5. State figures with their conditions, such as "in a 2024 trial at one
   port terminal [4]", not as general truths.
6. Mark every claim you couldn't confirm, following `checklists/verify.md`.
   Where a fact is missing, write `TODO:` and what's needed.
7. Follow the style in `docs-kit.yml` and any domain pack that's turned on.
8. Delete the template's comments.

## 7. Check the draft

1. Review it against `checklists/review.md`, the same way the review-doc
   skill would.
2. Check originality: compare each paragraph with the other companies'
   documents you read. Rewrite anything that follows their wording or
   structure closely.
3. Check that each reference number points to the right source, and that
   each source supports the sentence that cites it.
4. If you can run commands, run the style and spelling checks:

   ```bash
   python3 scripts/configure.py
   vale <draft>
   codespell <draft>
   ```

## 8. Deliver

Deliver the way `ai.deliver_as` says in `docs-kit.yml`, with the draft and
the research notes. The summary:

```markdown
**Draft:** <file path>
**Research notes:** <file path>
**Type:** <doc type> **Sources:** <number>, newest <year>, oldest <year>

**Needs your input:**
- <Each question and TODO, with the section it's in>

**Unverified claims:**
- "<claim>": <why it isn't confirmed>

**Checks:** <results, or "Not run">
```

## Rules

- Never copy or closely paraphrase another document.
- Never invent a fact, figure, source, link, author, or date.
- Every outside fact has a source the writer can open.
- Product facts come only from the writer's material.
- Never present one study's result as true everywhere. Give its conditions.
- Publishing is the writer's decision. You deliver a draft for review.
