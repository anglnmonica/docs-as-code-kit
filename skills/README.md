# AI skills

Instructions that an AI assistant follows to write and review documents
the way your team does. Each skill reads your `docs-kit.yml`, templates,
word list, and checklists, so its work matches the rest of your docs.

| Skill | What it does |
| --- | --- |
| [write-doc](write-doc/SKILL.md) | Drafts a document from source material, such as a spec or engineering notes, using the right template. Anything the sources don't confirm is marked for a person to check. |
| [research-doc](research-doc/SKILL.md) | Researches a topic on the web, in research papers, and in published white papers and solution briefs, then drafts a white paper or solution brief. Cites a source for every outside fact, and never copies other documents. Needs an AI assistant that can search the web. |
| [review-doc](review-doc/SKILL.md) | Reviews a draft against its template, the [review checklist](../checklists/review.md), and the style settings, and reports what to fix by severity. |

All three skills follow the same [fact-checking rules](../checklists/verify.md):
a document never states something as fact unless a source confirms it.

## See an example

[examples/](examples/) has a deliberately flawed draft, the product notes it
should match, and the review that review-doc produced. The review catches
two facts that contradict the notes, a missing prerequisite, and a warning
placed after the step it warns about.

## Use the skills

The skills are Markdown files in the `SKILL.md` format that Claude uses.
Other AI assistants can follow them, too, as instructions.

### Claude Code

1. Copy the `skills/` folders into `.claude/skills/` in your docs repository:

   ```bash
   mkdir -p .claude/skills
   cp -r skills/write-doc skills/research-doc skills/review-doc .claude/skills/
   ```

2. Open Claude Code in the repository, and ask for what you need, such as
   "Review docs/install-access-point.md", "Write a configuration guide
   from this spec", or "Research and write a white paper on private 5G
   in ports."

### Other AI assistants

Give the assistant the skill's `SKILL.md` as instructions, along with
`docs-kit.yml`, `terms.yml`, the files in `checklists/`, and the template
for your document type. Then make your request.

## What the skills won't do

- Copy other companies' documents. The research skill reads them only to
  learn what's already been said.
- Make up facts, values, or sources. Gaps become `TODO:` notes and
  questions for the writer.
- Publish anything. The write skill opens a pull request or saves a file,
  and a person reviews it.
- Replace the automated checks. The skills run them when they can, and the
  pull request checks run them every time.
