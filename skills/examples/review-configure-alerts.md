# Example review

This is the review the review-doc skill produced for
[draft-configure-alerts.md](draft-configure-alerts.md), a deliberately
flawed draft for a fictional product, checked against
[source-notes.md](source-notes.md). It shows the format and level of
detail to expect.

---

## Review: Alerts

**Verdict:** Needs rework
The draft is missing the configuration guide's required sections, and two
of its facts contradict the product team's notes: the alert channels and
the default threshold.

**Checks run:** Vale (2 suggestions, included below), codespell (no
problems)

### Must fix

1. **Overview:** "The Relay Gateway can send alerts by email or SNMP."
   The source notes say the channels are email and syslog, and that SNMP
   traps are planned for release 2.3. Readers on version 2.1 would look for
   an option that doesn't exist. **Fix:** "The Relay Gateway can send alerts
   by email or syslog."

2. **Steps, step 3:** "The default is 80%."
   The source notes give a default of 90%, with a range of 50 to 95%.
   **Fix:** "Set the CPU alert threshold. Valid range: 50 to 95%. Default:
   90%."

3. **Structure:** The draft has no "Before you begin" or "Verify the
   configuration" section, which the configuration guide template requires.
   The source notes list a prerequisite the draft leaves out: the
   Administrator role. **Fix:** Add "Before you begin" with "You need the
   Administrator role." Add "Verify the configuration," using the test
   email as the check (see Should fix 3).

4. **Steps, step 4:** "This can't be changed later without resetting the
   gateway."
   No source mentions this, and it's a strong claim: readers might avoid
   saving at all. It's also placed after the action it warns about.
   **Fix:** Confirm it with the product team. If it's true, move the warning
   before step 4. If not, delete it.

5. **Front matter:** `last_reviewed` is still a placeholder. **Fix:** Set it
   when the draft is checked against the product.

### Should fix

1. **Overview:** "click here and follow the steps below"
   The link text doesn't say where it goes, and the link has no
   destination. **Fix:** Delete the sentence. The steps follow directly.

2. **Steps, step 1:** "click the blue Notifications button on the right"
   Visual directions fail for readers using screen readers and for AI tools
   reading the text. The menu path is also incomplete. **Fix:** "Go to
   **Settings** > **Notifications** > **Alerts**."

3. **Steps, step 2:** "It sends a test message."
   "It" is unclear, and the timing contradicts the source notes: saving,
   not turning on alerts, sends the test email, and it goes to every listed
   address. **Fix:** Move the result to step 4: "Click **Save**. A test
   email goes to every address in the list."

4. **Headings:** "Alerts," "Overview," "Steps," and "Troubleshooting" don't
   say what each section does. An AI assistant that retrieves one section
   can't tell what it answers. **Fix:** Title the page "Configure alerts,"
   and use headings like "Configure email alerts."

5. **Troubleshooting:** "If you don't get emails, check it again."
   This gives the reader nothing to check. **Fix:** Name the checks, such as
   the spam folder and the address list. `TODO: confirm the common causes
   with the product team.`

6. **Overview:** "SNMP" isn't defined. Vale flagged it too. The fix to Must
   fix 1 removes it.

7. **Steps:** UI labels aren't bold. **Fix:** **Settings**, **Save**, and so
   on.

### Consider

1. **Front matter:** `description: "Alerts."` doesn't help search results
   or link previews. **Fix:** "Set up email and syslog alerts for the Relay
   Gateway."

2. **Steps, step 4:** Vale suggests active voice for "can't be changed."
   This sentence may be deleted (Must fix 4).

### Unverified claims

| Claim | Outcome | Notes |
| --- | --- | --- |
| "send alerts by email or SNMP" | Contradicted | Source: email and syslog. SNMP is planned for 2.3. |
| "The default is 80%." | Contradicted | Source: 90%, range 50 to 95%. |
| "It sends a test message." (on turning on alerts) | Contradicted | Source: saving sends the test email, to every listed address. |
| "This can't be changed later without resetting the gateway." | Not found | Ask the product team. |

### What works

- The opening sentence explains why alerts matter, in the reader's terms.
- The steps are numbered and start with verbs.
- The front matter sets the product version, so readers know which release
  the page covers.
