---
title: "Docs health, page status, and reviewers"
description: "How the kit reports the state of every page, keeps draft pages from being merged, and asks the right reviewers on every pull request."
status: published
last_reviewed: "2026-11-18"
questions:
  - What does the docs health report show?
  - How do I publish the docs health report with my site?
  - How do I keep a draft page from being merged?
  - How do I make GitHub ask the right reviewers for each folder?
  - When is a page's review due?
---

# Docs health, page status, and reviewers

The kit's checks pass or fail one pull request at a time. The docs health
report shows the state of all your docs at once: which pages are
published, which are overdue for review, and which are hard for AI tools
to use. Two related settings keep unfinished pages from going live and
send each pull request to the right reviewers.

## What the docs health report shows

The docs health report lists every page, with the pages that need
attention first:

| Column | What it shows | Where it comes from |
| --- | --- | --- |
| Page | The page title and file | `title` in the front matter, or the first heading |
| Status | Draft, In review, Published, or Not set | `status` in the front matter |
| Last reviewed | The date, and when the next review is due | `last_reviewed` in the front matter |
| AI readiness | How many AI-readiness checks the page passes, and which to fix | The [AI-readiness checks](ai-readiness.md) |
| Questions | How many questions the page's `questions` list has | `questions` in the front matter |

The row of numbers before the table counts the pages, the reviews that are
due, the drafts and pages in review, the pages with AI-readiness errors,
and the pages with no questions list. Select a number to show only those
pages.

The report also writes `report.json`, with the same data, for other tools.

## When a page's review is due

A page's review is due when its `last_reviewed` date is more than 180 days
old. To change the number of days, set `checks.health.review_every_days`
in `docs-kit.yml`. A page with no `last_reviewed` date shows as "No review
date."

The report runs again every Monday, with the weekly link check, because a
review comes due even when no one changes the page.

## Build the report

In CI, the Docs health job builds the report on every pull request and
attaches it to the run as an artifact called `docs-health`. The run's
summary page also shows the counts.

To build the report on your computer, run:

```bash
python3 scripts/configure.py
node scripts/health/report.mjs --out docs-health docs/
```

Then open `docs-health/index.html`. Without `--out`, the report prints as
text.

## Publish the report with your site

To publish the report at `<your docs URL>/docs-health/`, build the report
into your site's build folder after the site builds. Add this step to the
workflow that deploys your site, after the build step:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "22"
- name: Build the docs health report
  run: node scripts/health/report.mjs --title "Docs health" --out site/docs-health docs/
```

Replace `site/` with your `repository.build_output` folder and `docs/` with
your `repository.content_path` folder. The page tells search engines not to
index it.

## Keep a draft page from being merged

Each template's front matter starts with `status: draft`. Move the page
through these statuses as you work:

1. `draft` while you write the page.
2. `in-review` when you open the pull request.
3. `published` once the reviewers approve it.

The Publish readiness check fails a pull request that would merge a page
marked `draft`, or a page with a status other than these three. Pages with
no `status` pass, so existing docs don't fail the day you turn the check
on. To turn the check off, set `checks.publish_readiness.enabled: false`.

## Ask the right reviewers for each folder

List who reviews which folder under `review.owners` in `docs-kit.yml`:

```yaml
review:
  owners:
    - path: docs/
      reviewers: ["@docs-lead"]
    - path: docs/api/
      reviewers: ["@api-team", "@docs-lead"]
```

Each reviewer is a GitHub username, a team such as `@org/docs`, or an email
address. When a folder matches more than one entry, the last one wins, so
list the broadest folder first.

Then write the file that GitHub reads, and commit it:

```bash
python3 scripts/configure.py
git add .github/CODEOWNERS
```

GitHub now asks those reviewers on every pull request that changes their
folder. To require their approval before a merge, turn on **Require review
from Code Owners** in the branch protection rules for your main branch.

If your repository already has a `.github/CODEOWNERS` that a person wrote,
the setup script leaves it alone and prints a warning. Delete the file to
let the kit manage it from `docs-kit.yml`.
