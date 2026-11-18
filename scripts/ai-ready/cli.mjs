#!/usr/bin/env node
// Check documentation pages, and optionally a built site, for AI readiness.
//
// Usage:
//   node scripts/ai-ready/cli.mjs [--fail-on error|warning] [--json]
//        [--site BUILD_FOLDER --base-url https://example.com/docs/] PATH...
//
// PATH is a Markdown file or a folder of them. The check exits with status 1
// when it finds a problem at the --fail-on level or higher.

import fs from "node:fs";
import path from "node:path";
import { checkPage, summarize, PAGE_RULES } from "./rules.mjs";
import { checkSite, SITE_RULES } from "./site.mjs";

const RANK = { error: 3, warning: 2, suggestion: 1, info: 0 };

function parseArgs(argv) {
  const opts = { paths: [], failOn: "error", json: false, site: null, baseUrl: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--fail-on") opts.failOn = argv[++i];
    else if (a === "--json") opts.json = true;
    else if (a === "--site") opts.site = argv[++i];
    else if (a === "--base-url") opts.baseUrl = argv[++i];
    else if (a === "--help" || a === "-h") opts.help = true;
    else opts.paths.push(a);
  }
  if (!(opts.failOn in RANK)) {
    console.error(`--fail-on must be error or warning, not ${opts.failOn}.`);
    process.exit(2);
  }
  return opts;
}

function markdownFiles(p) {
  if (!fs.existsSync(p)) {
    console.error(`${p} doesn't exist.`);
    process.exit(2);
  }
  if (fs.statSync(p).isFile()) return /\.(md|mdx|markdown)$/.test(p) ? [p] : [];
  return fs
    .readdirSync(p, { withFileTypes: true })
    .flatMap((e) => (e.name.startsWith(".") || e.name === "node_modules" ? [] : markdownFiles(path.join(p, e.name))));
}

const opts = parseArgs(process.argv.slice(2));
if (opts.help || (!opts.paths.length && !opts.site)) {
  console.log(`Usage: node scripts/ai-ready/cli.mjs [--fail-on error|warning] [--json] [--site FOLDER --base-url URL] PATH...

Page checks: ${PAGE_RULES.map((r) => r.id).join(", ")}
Site checks: ${SITE_RULES.map((r) => r.id).join(", ")}`);
  process.exit(opts.help ? 0 : 2);
}

const results = [];
for (const file of opts.paths.flatMap(markdownFiles)) {
  const { findings, checked } = checkPage(fs.readFileSync(file, "utf8"));
  results.push({ file, findings: findings.map((f) => ({ ...f, file })), checked });
}
let site = null;
if (opts.site) site = checkSite(opts.site, opts.baseUrl);

const all = results.flatMap((r) => r.findings).concat(site ? site.findings : []);
const failing = all.filter((f) => RANK[f.severity] >= RANK[opts.failOn]);

if (opts.json) {
  console.log(JSON.stringify({ pages: results, site, failing: failing.length }, null, 2));
} else {
  for (const r of results) {
    const s = summarize(r.findings, r.checked);
    console.log(`\n${r.file}: ${s.passed} of ${s.total} checks pass`);
    for (const f of r.findings) console.log(`  ${r.file}:${f.line}  ${f.severity.padEnd(10)} ${f.rule}  ${f.message}`);
  }
  if (site) {
    const s = summarize(site.findings.filter((f) => f.severity !== "info"), site.checked.filter((id) => id !== "robots"));
    console.log(`\nSite (${site.pages} pages): ${s.passed} of ${s.total} checks pass`);
    for (const f of site.findings) console.log(`  ${f.file || "(site)"}  ${f.severity.padEnd(10)} ${f.rule}  ${f.message}`);
  }
  const pagesPassing = results.filter((r) => r.findings.every((f) => RANK[f.severity] < RANK[opts.failOn])).length;
  console.log(`\n${results.length} pages checked; ${pagesPassing} have no problems at the ${opts.failOn} level or higher.`);
  if (failing.length) console.log(`${failing.length} problems to fix. Each rule's reason and fix: docs/ai-readiness.md`);
}
process.exit(failing.length ? 1 : 0);
