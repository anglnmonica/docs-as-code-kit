---
title: "AI-readiness checks"
description: "What the kit's AI-readiness check looks for in your pages and your site, why each rule matters, and how to fix what it finds."
last_reviewed: "2026-11-17"
questions:
  - What does the AI-readiness check look for?
  - How do I run the AI-readiness check on my own computer?
  - What does the review-doc skill check that the AI-readiness script can't?
  - Does passing the AI-readiness check make AI tools rank my page higher?
  - How do I check that my page uses one term for each thing?
  - How do I see which section an AI tool would retrieve for a question?
---

# AI-readiness checks

The AI-readiness check finds what makes a documentation page hard for AI
assistants, search engines, and retrieval systems to quote correctly. These
tools quote one section at a time, out of context, so a section has to make
sense on its own. Every rule also helps people who read the page.

The check has three parts:

- **Page checks** run on every Markdown page in `repository.content_path`.
- **Site checks** run on the built site, when `repository.build_output` is
  set.
- **Review checks** need judgment, so the review-doc skill does them.

The page and site checks run on every pull request when
`checks.ai_ready.enabled` is `true` in `docs-kit.yml`. They report
findings, not a score: each finding names the line, the rule, and the fix.

## Passing the check doesn't raise a page's rank

No tool can promise how an AI assistant or a search engine ranks a page.
The AI-readiness check finds problems that make a page harder to quote
correctly. Fixing them makes the page clearer for every reader, but it
doesn't guarantee that an AI assistant cites the page.

## What the page checks look for

| Rule | ID | Level | Why it matters | Fix |
| --- | --- | --- | --- | --- |
| Title and description | `front-matter` | Warning | Search engines and AI tools use the page's title and description as its summary. Without them, they guess. | Add a title and a one-sentence description (or excerpt) to the front matter. |
| Last-updated date | `last-updated` | Warning | A dated page tells readers and AI tools how current its facts are. | Add `last_reviewed` (or `last_updated`) to the front matter, as YYYY-MM-DD. |
| No skipped heading levels | `heading-levels` | Warning | Tools split pages by headings. A jump from H2 to H4 breaks the outline they build. | Use the next heading level down, such as H3 after H2. |
| Sections short enough to quote | `section-length` | Warning | AI tools retrieve one section at a time. A section over about 400 words of text, not counting tables and code, is hard to quote in one piece. | Split the section under more specific headings. |
| Sections that make sense on their own | `cross-reference` | Warning | A quoted section loses the text around it. "As mentioned earlier" points to text the reader doesn't have. | Repeat the fact, or link to the section by name. |
| Sections that name their subject | `section-opener` | Warning | A section that starts with "It" or "This is" doesn't say what it's about once it's quoted alone. | Start the section with the name of the product, feature, or task. |
| Dates that stay true | `relative-dates` | Warning | "Last year" and "currently" become wrong as the page ages, and a quote doesn't show when the page was written. | Write a date or a version instead, such as "as of version 4.2." |
| Numbers with units | `number-units` | Warning | "Set the timeout to 30" can mean seconds or milliseconds. A quote can't ask. | Add the unit, such as "30 seconds." |
| No unfinished content | `leftover-markers` | Error | A `TODO` or `[unverified]` marker in a published page tells readers and AI tools the content isn't confirmed. | Resolve the marker, or remove the sentence. |
| Images described in text | `image-alt` | Warning | AI tools and screen readers can't see images. The alt text is all they get. | Write alt text that says what the image shows. For a diagram, describe the flow or the parts. |
| Code blocks labeled with a language | `code-language` | Warning | A language label tells tools whether a block is a command, a config file, or output, so they don't run or quote the wrong thing. | Add the language right after the opening fence, such as `bash` or `json`. |
| Tables with headers | `table-header` | Warning | Tools read a table cell by its column header. A column with no header loses its meaning. | Give every column a header. |
| One name for each thing | `term-consistency` | Suggestion | A reader or an AI tool that sees "access point" in one section and "radio" in the next can't tell whether they're one device or two. | Choose one term, and use it throughout. If the terms mean different things, define each one where it first appears. |
| Link text that names the destination | `link-text` | Warning | "Click here" tells a reader or an AI tool nothing about where the link goes. | Use the destination's title as the link text. |
| Questions the page answers | `questions` | Suggestion | Listing the questions a page answers lets a reviewer, or the review-doc skill, check that each one has a clear answer. | Add a `questions` list to the front matter, with the questions readers ask. |

The page checks skip code blocks, inline code, HTML comments, and text in
quotation marks, which is usually an example rather than the writer's own
words. An HTML heading, such as `<h2>`, starts a section, the same as a
Markdown heading.

### Check that each thing has one name

The `term-consistency` rule is off until you list term groups. A term group
is a set of terms that readers might take for one thing, such as "small
cell," "radio," and "access point." List the groups under `consistency` in
`terms.yml`:

```yaml
consistency:
  - ["small cell", "radio", "access point", "AP"]
  - ["UE", "device", "end device"]
```

The rule flags a page that uses more than one term from a group, and
counts each one, so a person can decide. The terms in a group aren't
treated as synonyms. If a page uses two of them on purpose, because they
mean different things, define each term where it first appears, and skip
the finding.

A term in capital letters, such as `AP`, matches only in capitals, so the
"ap" in "map" doesn't count.

### Turn a rule off

To turn a page rule off for every page, list its ID under
`checks.ai_ready.skip` in `docs-kit.yml`:

```yaml
checks:
  ai_ready:
    skip: [last-updated, questions]
```

Turn a rule off only when it doesn't fit your docs, such as
`last-updated` on a site whose generator adds the date. The check still
lists the skipped rules as not checked.

## What the site checks look for

| Rule | ID | Level | Why it matters | Fix |
| --- | --- | --- | --- | --- |
| llms.txt that works | `llms-txt` | Error | llms.txt gives AI tools a map of your docs. A broken link in it sends them to a missing page. | Fix or remove each broken link, and keep each link's text matching its page title. |
| Sitemap that lists every page | `sitemap` | Warning | Search engines and crawlers find pages through the sitemap. A page that isn't listed may never be found. | Add the missing pages to sitemap.xml, or let your site generator build it. |
| AI crawler access, on purpose | `robots` | Info | robots.txt decides which AI crawlers can read your docs. Blocking or allowing them is a business decision, so this check only reports it. | Confirm that the crawlers listed are allowed or blocked on purpose. |
| Structured data | `structured-data` | Suggestion | Structured data (JSON-LD) tells search engines what a page is, such as a technical article or a how-to. | Add JSON-LD with a type such as `TechArticle` to your page layout. |
| Markdown copies of pages | `markdown-copies` | Suggestion | The llms.txt proposal suggests publishing a Markdown copy of each page, which AI tools read more reliably than HTML. | Publish `page.md` next to each `page.html`, and link to it from llms.txt. |

## Review checks that the script can't do

These checks need judgment, so the review-doc skill does them, as part of
the AI readiness section of `checklists/review.md`:

- **Question coverage.** Each question in the page's `questions` list has a
  clear answer in one section.
- **Answer first.** The first sentence under each heading gives the answer,
  before the background.
- **Consistent names.** One name for each thing. A page doesn't call the
  same device an access point, an AP, and a radio. The `term-consistency`
  rule finds the terms in your term groups. The review finds the rest.
- **Claims have sources.** Facts and figures have a citation or a link.
- **Retrieval test.** For each question, the reviewer reads only the
  section that the retrieval preview returns, and answers the question from
  that section alone. If the answer is wrong, incomplete, or needs another
  section, the section needs work.

## Preview what an AI tool retrieves

AI tools that answer from your docs, such as a support chatbot, first
split each page into sections, then retrieve the sections that best match
the question. The retrieval preview shows which section that would be.

For each question in a page's `questions` list, the preview ranks the
page's sections with BM25, the keyword scoring that many search systems
start from, and shows the top section:

```bash
node scripts/ai-ready/cli.mjs --retrieval docs/
```

```text
docs/install.md: 14 of 14 checks pass
  Question: How do I register a small cell?
    Retrieves: "Register the small cell" (line 24). Check that this section answers it on its own.
```

The preview is a guide, not a measurement:

- **It uses keywords only.** Most AI tools also use embeddings, which match
  meaning as well as words. A section that the preview misses might still
  be found by an AI tool, and the reverse.
- **It ranks one page at a time.** A real tool ranks sections from every
  page in its index.
- **It doesn't grade the answer.** Whether the section answers the
  question is the retrieval test, a review check.

When the preview returns the wrong section, the usual fix is a heading
that uses the reader's words, such as "Register the small cell" rather
than "Registration."
## Run the AI-readiness check on your computer

You need Node.js 18 or later.

1. Check your pages:

   ```bash
   node scripts/ai-ready/cli.mjs docs/
   ```

2. To check the built site too, build it first, then add the build folder
   and the site's address:

   ```bash
   node scripts/ai-ready/cli.mjs --site _site --base-url https://example.com/docs/ docs/
   ```

The check exits with status 1 when it finds a problem at the
`checks.ai_ready.fail_on` level or higher. To fail on warnings too, add
`--fail-on warning`.

The check reads your term groups and skipped rules from
`.docs-kit/ai-ready.json`. To write that file after you change
`docs-kit.yml` or `terms.yml`, run `python3 scripts/configure.py`. To skip
a rule for one run, add `--skip`, such as `--skip last-updated`.

## Change a rule

The page rules are in `scripts/ai-ready/rules.mjs`, and the site rules are
in `scripts/ai-ready/site.mjs`. Each rule has a test case in
`scripts/ai-ready/rules.test.mjs`: a page it must flag and a page it must
not flag. Run the tests after you change a rule:

```bash
node --test scripts/ai-ready/rules.test.mjs
```

A test also checks that this page lists every rule, so the rules and the
docs can't drift apart.
