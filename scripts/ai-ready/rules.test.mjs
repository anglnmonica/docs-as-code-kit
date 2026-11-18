// Tests for the AI-readiness rules. Run: node --test scripts/ai-ready/
// Each rule has a page it must flag and a page it must not flag, so a change
// that breaks a rule fails here before it reaches anyone's docs.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkPage, PAGE_RULES, summarize, retrieve, pageQuestions } from "./rules.mjs";
import { checkSite } from "./site.mjs";

const FM = `---
title: "Register a small cell"
description: "Register a small cell with a SAS so it can transmit."
last_reviewed: "2026-11-17"
questions:
  - How do I register a small cell?
---
`;

// One term group, as a team would list it under consistency: in terms.yml.
const OPTIONS = { termGroups: [["small cell", "radio", "access point", "AP"]] };
const rules = (md, options = OPTIONS) => new Set(checkPage(md, options).findings.map((f) => f.rule));
const page = (body) => `${FM}\n${body}\n`;

const CASES = {
  "front-matter": ["# Title\n\nText about the small cell.\n", `---\ntitle: "A"\nexcerpt: "B"\ndate: 2026-11-02\nquestions:\n  - Q?\n---\n\nText.\n`],
  "last-updated": [`---\ntitle: "A"\ndescription: "B"\nlast_reviewed: "<YYYY-MM-DD>"\n---\n\nText.\n`, page("Text.")],
  questions: [`---\ntitle: "A"\ndescription: "B"\nlast_reviewed: "2026-11-17"\n---\n\nText.\n`, page("Text.")],
  "heading-levels": [page("## Setup\n\n#### Details\n\nThe radio needs power."), page("## Setup\n\n### Details\n\nThe radio needs power.")],
  "section-length": [page(`## Long\n\n${"word ".repeat(420)}`), page(`## Short\n\n${"word ".repeat(380)}`)],
  "cross-reference": [page("## Power\n\nConnect power as described above."), page("## Power\n\nConnect power as described in Install the radio. Don't write \"as described above.\" To get the next page of results, use the cursor.")],
  "section-opener": [page("## The radio\n\nIt needs 48 V power."), page("## The radio\n\nThe radio needs 48 V power. It mounts on a pole.")],
  "relative-dates": [page("## Bands\n\nThe radio currently supports band n48."), page("## Bands\n\nAs of version 4.2, the radio supports band n48.")],
  "number-units": [page("## Timers\n\nSet the timeout to 30."), page("## Timers\n\nSet the timeout to 30 seconds. Set the retry limit to 5% of peak.")],
  "leftover-markers": [page("## Power\n\nTODO: confirm the voltage."), page("## Power\n\nThe radio needs 48 V.")],
  "image-alt": [page("## Setup\n\n![](setup.png)\n\n![Architecture](images/architecture.png)"), page("## Setup\n\n![The radio mounted on a pole](setup.png)\n\n![Devices connect to small cells, which connect to the 5G core](images/architecture.png)")],
  "code-language": [page("## Run\n\n```\nnpm test\n```"), page("## Run\n\n```bash\nnpm test\n```")],
  "table-header": [page("## Bands\n\n| Band | |\n| --- | --- |\n| n48 | CBRS |"), page("## Bands\n\n| Band | Use |\n| --- | --- |\n| n48 | CBRS |")],
  "term-consistency": [page("## Power\n\nThe small cell needs 48 V. Mount the radio on a pole."), page("## Power\n\nThe small cell needs 48 V. Mount the small cell on a pole. The map shows each site.")],
  "link-text": [page("## Docs\n\nFor details, [click here](https://example.com)."), page("## Docs\n\nSee [Install the radio](https://example.com).")],
};

test("every page rule has a test case", () => {
  for (const r of PAGE_RULES) assert.ok(CASES[r.id], `No test case for ${r.id}`);
});

for (const [id, [bad, good]] of Object.entries(CASES)) {
  test(`${id}: flags the problem`, () => assert.ok(rules(bad).has(id), `${id} missed:\n${bad}`));
  test(`${id}: passes good text`, () => assert.ok(!rules(good).has(id), `${id} flagged good text:\n${good}`));
}

test("ignores code blocks, inline code, and HTML comments", () => {
  const md = page("## Run\n\n```bash\n# TODO: as described above\n```\n\nRun `currently` in the shell.\n\n<!--\nTODO: template note\n-->\n\nThe tool runs.");
  assert.deepEqual([...rules(md)], []);
});

test("a clean page passes every check", () => {
  const md = page("## Register the radio\n\nThe radio registers with the SAS when it starts.\n\n```bash\nradio register\n```");
  const { findings, checked } = checkPage(md, OPTIONS);
  assert.deepEqual(findings, []);
  assert.equal(summarize(findings, checked).passed, PAGE_RULES.length);
});

test("term-consistency is off until a team lists term groups", () => {
  const md = page("## Power\n\nThe small cell needs 48 V. Mount the radio on a pole.");
  const { findings, checked } = checkPage(md);
  assert.ok(!checked.includes("term-consistency"));
  assert.ok(!findings.some((f) => f.rule === "term-consistency"));
});

test("front matter lists can be unindented or inline", () => {
  const flat = `---\ntitle: A\ndescription: B\nlast_reviewed: '2026-11-17'\nquestions:\n- How do I list sites?\n---\n\nText.\n`;
  const inline = `---\ntitle: A\ndescription: B\nlast_reviewed: 2026-11-17\nquestions: [How do I list sites?]\n---\n\nText.\n`;
  assert.ok(!rules(flat).has("questions"));
  assert.ok(!rules(inline).has("questions"));
  assert.deepEqual(pageQuestions(flat), ["How do I list sites?"]);
});

test("skip turns rules off", () => {
  const md = "# Title\n\nTODO: write this.\n";
  const { findings, checked } = checkPage(md, { skip: ["front-matter", "leftover-markers"] });
  assert.ok(!findings.some((f) => f.rule === "front-matter" || f.rule === "leftover-markers"));
  assert.ok(!checked.includes("front-matter"));
});

test("an HTML heading starts a new section", () => {
  const md = page(`<h2>One</h2>\n\n${"word ".repeat(300)}\n\n<h2>Two</h2>\n\nThe radio needs power. ${"word ".repeat(300)}`);
  assert.ok(!rules(md).has("section-length"));
});

test("retrieve ranks the section that answers the question first", () => {
  const md = page("## Install the radio\n\nMount the radio on a pole.\n\n## Register with the SAS\n\nThe SAS grants spectrum. Register each radio with the SAS before it transmits.");
  const top = retrieve(md, "How do I register a radio with the SAS?");
  assert.equal(top[0].title, "Register with the SAS");
  assert.deepEqual(pageQuestions(md), ["How do I register a small cell?"]);
});

test("site checks: llms.txt, sitemap, robots, structured data", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ai-ready-"));
  const write = (f, s) => (fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true }), fs.writeFileSync(path.join(dir, f), s));
  write("index.html", "<title>Home | Docs</title>");
  write("install/index.html", "<title>Install the radio | Docs</title>");
  write("faq/index.html", "<title>FAQ | Docs</title>");
  write("llms.txt", "# Docs\n\n- [Install the radio](https://ex.com/docs/install/)\n- [Missing page](https://ex.com/docs/gone/)\n- [Configure bands](https://ex.com/docs/faq/)\n");
  write("sitemap.xml", "<urlset><url><loc>https://ex.com/docs/</loc></url><url><loc>https://ex.com/docs/install/</loc></url></urlset>");
  write("robots.txt", "User-agent: GPTBot\nDisallow: /\n");
  const { findings } = checkSite(dir, "https://ex.com/docs/");
  const msg = (id) => findings.filter((f) => f.rule === id).map((f) => `${f.file} ${f.message}`).join(" | ");
  assert.match(msg("llms-txt"), /Missing page/);
  assert.match(msg("llms-txt"), /titled "FAQ"/);
  assert.doesNotMatch(msg("llms-txt"), /Install the radio/);
  assert.match(msg("sitemap"), /faq/);
  assert.match(msg("robots"), /GPTBot/);
  assert.match(msg("structured-data"), /3 pages/);
  const ext = checkSite(dir, "https://ex.com/docs/", { external: ["https://ex.com/docs/gone/"] });
  assert.doesNotMatch(ext.findings.map((f) => f.message).join(" "), /Missing page/);
});

test("docs/ai-readiness.md lists every rule", async () => {
  const { SITE_RULES } = await import("./site.mjs");
  const doc = fs.readFileSync(new URL("../../docs/ai-readiness.md", import.meta.url), "utf8");
  for (const r of [...PAGE_RULES, ...SITE_RULES]) assert.ok(doc.includes(`\`${r.id}\``), `docs/ai-readiness.md doesn't list ${r.id}`);
});
