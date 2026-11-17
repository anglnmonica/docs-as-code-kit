# Docs-as-code kit

Automated documentation checks for any technical writing team, set up from
one config file.

Every pull request to your docs repository gets checked for style, spelling,
broken links, and accuracy before it's published. You choose which checks run,
which style guide to follow, and which domain rules to add, all in
`docs-kit.yml`. You don't edit the workflow or any tool's settings by hand.

## What's included

| Check | Tool | What it catches |
| --- | --- | --- |
| Style | [Vale](https://vale.sh) | Departures from the Google or Microsoft developer documentation style guide, plus any domain pack rules |
| Rule tests | Vale | A domain pack rule that stops catching the mistakes it's meant to catch |
| Spelling | [codespell](https://github.com/codespell-project/codespell) | Common misspellings |
| Links | [Lychee](https://lychee.cli.rs) | Broken internal and external links. Also runs weekly, because outside pages can break when your docs don't change. |
| Accuracy | [Doc Detective](https://doc-detective.com) | A page that no longer matches what the docs say, found by walking through the built site like a reader |

### Domain packs

A domain pack adds style rules for a field, with tests that prove each rule
works. Turn a pack on in `docs-kit.yml`.

| Pack | Rules |
| --- | --- |
| [Telecom](packs/telecom/) | Acronym-first definitions, such as CBRS (Citizens Broadband Radio Service), plus standard spellings of terms like Wi-Fi and 5G NR, unit symbols, and unit spacing |

### Templates

A template for each common document type: installation guide,
configuration guide, how-to, troubleshooting, release notes, API reference,
white paper, and solution brief. Each one explains who reads that type of
document and what each section is for. See [templates/](templates/) to
choose one.

### AI skills

Instructions for an AI assistant, such as Claude, to draft and review
documents using your templates, style settings, and word list. They never
state a fact unless a source confirms it: anything unconfirmed is marked
for a person to check. See [skills/](skills/).

## Before you begin

You need:

- A GitHub repository for your docs, written in Markdown, MDX, or AsciiDoc.
- Permission to add files and run GitHub Actions in that repository.

## Set up the kit

1. Copy these files and folders into the root of your docs repository:

   - `docs-kit.yml`
   - `terms.yml`
   - `scripts/`
   - `packs/`
   - `templates/`
   - `checklists/`
   - `skills/`, if you plan to use the AI skills
   - `.github/workflows/docs-checks.yml`
   - `.github/doc-detective/`, if you plan to use the accuracy check
   - `.gitignore` entries, added to your own `.gitignore`

2. Open `docs-kit.yml` and fill in the `project` and `repository` sections.
   Set `repository.content_path` to the folder that holds your docs.

3. Add your product names and terms to `terms.yml`, so the style check
   accepts them.

4. Optional: turn on a domain pack under `packs`.

5. Open a pull request. The checks run automatically. To see the results,
   go to the pull request's **Checks** tab.

To confirm that the checks work, misspell a word on any page in your pull
request. The spelling check fails, and the result names the word and line.

## Change what's checked

Edit `docs-kit.yml`. Each setting has a comment that explains it. Common
changes:

| To | Set |
| --- | --- |
| Follow the Microsoft style guide instead of Google's | `style.base: microsoft` |
| Write in the first person, such as for a blog | `style.voice.person: first` |
| Fail on style warnings, not just errors | `checks.style.fail_on: warning` |
| Skip a site that blocks link checkers | Add it to `checks.links.exclude` |
| Turn off a check | `checks.<check>.enabled: false` |

### Turn on the accuracy check

The accuracy check needs a built site.

1. In `docs-kit.yml`, set `repository.site_generator`, `build_command`, and
   `build_output`. For example, for Jekyll:

   ```yaml
   repository:
     site_generator: jekyll
     build_command: "bundle exec jekyll build"
     build_output: _site
   ```

2. Set `checks.accuracy.enabled: true`.
3. Edit `.github/doc-detective/tests/example.spec.json` so its test visits
   a page on your site and checks for text that should be there.

## Run the checks on your computer

The checks run on GitHub, so this is optional.

1. Install [Vale](https://vale.sh/docs/install), Python 3, and the Python
   packages the kit uses:

   ```bash
   pip install pyyaml codespell
   ```

2. From the root of your repository, generate the tool settings and
   download the base style:

   ```bash
   python3 scripts/configure.py
   vale sync
   ```

3. Run a check. For example, to check style:

   ```bash
   vale docs/
   ```

Rerun `python3 scripts/configure.py` after you change `docs-kit.yml`.

## How it works

`scripts/configure.py` reads `docs-kit.yml` and writes each tool's settings:
`.vale.ini`, `.codespellrc`, and `.lychee.toml`. It also copies the domain
packs you turned on, and your word list from `terms.yml`, into
`.docs-kit/styles/`. These generated files are listed in `.gitignore`,
because `docs-kit.yml` is the only file you maintain.

The workflow runs the same script first, then runs only the checks you
turned on.

## License

[MIT](LICENSE). Created by [Angelin Monica Selvaraj](https://anglnmonica.github.io).
