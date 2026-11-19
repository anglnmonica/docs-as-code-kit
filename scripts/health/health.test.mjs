// Tests for the docs health report. Run: node --test scripts/health/health.test.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pageHealth, buildReport, publishProblems, markdownFiles } from "./health.mjs";

const TODAY = new Date("2026-11-18T00:00:00Z");
const page = (front, body = "## Install\n\nMount the radio on a pole.\n") => `---\n${front}\n---\n\n${body}`;

test("a review older than review_every_days is due", () => {
  const p = pageHealth("a.md", page('title: A\nlast_reviewed: "2026-01-01"'), { today: TODAY, reviewEveryDays: 180 });
  assert.equal(p.review, "due");
  assert.equal(p.reviewAgeDays, 321);
  assert.equal(p.reviewDueOn, "2026-06-30");
});

test("a recent review is current, and a missing date is reported", () => {
  assert.equal(pageHealth("a.md", page("title: A\nlast_reviewed: 2026-11-01"), { today: TODAY }).review, "current");
  assert.equal(pageHealth("a.md", page("title: A"), { today: TODAY }).review, "missing");
  assert.equal(pageHealth("a.md", page('title: A\nlast_reviewed: "<YYYY-MM-DD>"'), { today: TODAY }).review, "missing");
});

test("status is read, and an unknown status is invalid", () => {
  assert.equal(pageHealth("a.md", page("title: A\nstatus: In-Review")).status, "in-review");
  assert.equal(pageHealth("a.md", page("title: A")).status, "not-set");
  const odd = pageHealth("a.md", page("title: A\nstatus: final"));
  assert.equal(odd.statusValid, false);
});

test("the title falls back to the first heading, then the file name", () => {
  assert.equal(pageHealth("a.md", "# Heading title\n\nText.\n").title, "Heading title");
  assert.equal(pageHealth("dir/b.md", "Text only.\n").title, "b.md");
});

test("AI readiness and questions are counted", () => {
  const p = pageHealth("a.md", page("title: A\nquestions:\n  - How do I mount it?\n  - <placeholder>", "## Install\n\nTODO: write this.\n"));
  assert.equal(p.questions, 1);
  assert.equal(p.ai.errors, 1);
  assert.ok(p.ai.failing.includes("leftover-markers"));
});

test("publish readiness fails drafts and unknown statuses, and passes the rest", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "health-"));
  const write = (name, text) => fs.writeFileSync(path.join(dir, name), text);
  write("draft.md", page("title: D\nstatus: draft"));
  write("odd.md", page("title: O\nstatus: final"));
  write("review.md", page("title: R\nstatus: in-review"));
  write("done.md", page("title: P\nstatus: published"));
  write("none.md", page("title: N"));
  write("empty.md", "");
  const report = buildReport(markdownFiles([dir]), { today: TODAY, root: dir });
  assert.equal(report.summary.pages, 5, "an empty file isn't a page");
  assert.deepEqual(report.summary.status, { draft: 1, "in-review": 1, published: 1, "not-set": 1 });
  assert.equal(report.summary.invalidStatus, 1);
  const problems = publishProblems(report).map((p) => p.file).sort();
  assert.deepEqual(problems, ["draft.md", "odd.md"]);
});
