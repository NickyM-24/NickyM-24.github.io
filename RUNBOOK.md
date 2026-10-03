# PORTFOLIO RUNBOOK â€” Nicky Malone / EDU 498

Read this before touching anything. It lives in the repo on purpose: it travels
with the project and survives the end of a session.

Last verified: 2026-10-03.

---

## 0. START HERE â€” THE SETUP THAT ACTUALLY WORKS

**Work on the Windows laptop, not the Mac.**

| What | Value |
|---|---|
| Device | `laptop-fvra1dsd` (win32) |
| Working copy | `C:\Users\neely\NickyM-24-portfolio` |
| Git | 2.50.1 â€” **works**, credential helper `manager` |
| gh | logged in as `NickyM-24`, scopes incl. `repo` |
| Repo | `NickyM-24/NickyM-24.github.io` |
| Live site | https://nickym-24.github.io |
| Drive account | `drmalon1@asu.edu` |

**First command of any session:**

```powershell
cd C:\Users\neely\NickyM-24-portfolio
git fetch origin; git status --short; git rev-list --left-right --count HEAD...origin/main
```

`0  0` means local and live are identical. Anything else, reconcile before editing.

If the device tools are present but point somewhere else, call
`mcp__remote-devices__get_device_info` and read `deviceName`. Do not guess, and
do not start editing until you know which machine you are on.

---

## 1. HISTORY: THE TRAP THAT ATE THE LAST SESSION

The previous session assumed the work had to happen on Nicky's MacBook Air, in
`~/Downloads/portfolio 2/`. On the Mac, git is unusable â€” `/usr/bin/git` is the
Xcode placeholder and triggers a developer-tools install prompt â€” so everything
was pushed file-by-file through `gh api` with base64 payloads.

Meanwhile the desktop connector kept resolving to this Windows laptop. File
operations failed in ways that looked like an intermittent disconnection, and
most of the session went into chasing it.

**The resolution: this Windows laptop was the better machine all along.** It has
a full git clone with working credentials. Normal git replaces the entire
`gh api` + base64 workaround.

**Lesson:** call `get_device_info` first, look for an existing clone, and work
where the tooling already functions. Do not port a workaround from one machine
to another without checking whether the constraint still applies.

The Mac copy at `~/Downloads/portfolio 2/` may still exist and may drift out of
date. Treat the git clone as the source of truth. (`~/Downloads/portfolio`
without the "2" is a dead early scaffold on the Mac â€” ignore it entirely.)

---

## 2. DEPLOY

```powershell
cd C:\Users\neely\NickyM-24-portfolio
git add <files>
git -c user.name="NickyM-24" -c user.email="dnickymalone24@gmail.com" `
    commit -m "what changed"
git push origin main
```

Git writes progress to stderr, so PowerShell renders a red `NativeCommandError`
block on a **successful** push. Look for the `303803e..2366cdc  main -> main`
line, not the colour.

**Verify from the device, never from the Claude container.** Container egress
blocks `nickym-24.github.io` (`connect_rejected`, organization policy). GitHub
Pages also serves `cache-control: max-age=600`, so a plain fetch shows a
ten-minute-old page. Bust the cache:

```powershell
$r = Invoke-WebRequest "https://nickym-24.github.io/PAGE.html?cb=$(Get-Random)" -UseBasicParsing
([regex]::Matches($r.Content,"SOMETHING_NEW")).Count
```

Pages typically rebuilds in under a minute. Retry a few times before concluding
anything failed.

---

## 3. SITE STRUCTURE

Plain HTML/CSS/JS. No build step, no framework, no dependencies â€” chosen so the
site still works after a year untouched and stays editable by Nicky rather than
by a toolchain.

```
NickyM-24-portfolio/
â”œâ”€â”€ index.html                 Home
â”œâ”€â”€ profotilio.html            About Me (filename is a legacy typo, leave it)
â”œâ”€â”€ internship-*.html
â”œâ”€â”€ hcd.html
â”œâ”€â”€ inspiration-*.html         EDU 484 legacy pages
â”œâ”€â”€ ideation.html
â”œâ”€â”€ implementation-*.html      THIS TERM'S GRADED PAGES
â”œâ”€â”€ project-conclusion-*.html
â”œâ”€â”€ program-outcomes-*.html
â”œâ”€â”€ template.html              start a new page from this
â”œâ”€â”€ css/style.css              ALL styling
â””â”€â”€ js/site.js                 NAV array + renderNav() + footer
```

**Adding a page:** copy `template.html`, then add one line to the `NAV` array in
`js/site.js`. The nav renders on every page from that array, so one line updates
the whole site. Commit both files.

**Design tokens** (`css/style.css`) â€” pink/white/black, matching her original
Google Sites theme:

```css
--pink: #e8368f;         --pink-deep: #c31f74;
--pink-soft: #fdeaf4;    --pink-soft-line: #f5b8d6;
--page-pink: #fbdcee;    --ink: #141116;
--radius-lg: 22px;
```

`#site-shell` carries the 4px pink border and offset `box-shadow` that keeps
pages from reading as one flat white rectangle. She asked for that explicitly,
twice. Do not flatten it back out.

**Reuse these classes, don't invent new ones:** `.meta-list`, `.embed-frame`,
`.table-wrap`, `table.data`, `.month-block`, `.week-grid`, `.week-box`,
`.milestone`, `.role-grid`, `.role-card`, `.pending-notice`, `.eyebrow`.

---

## 4. GOOGLE DRIVE â€” CAPABILITIES AND HARD LIMITS

**Works:** read any doc; create a formatted Doc from HTML via `create_file` with
`contentMimeType: text/html` (Drive converts it, keeping tables, headings and
colors â€” this is how every assignment doc was built); copy; trash; search; read
permissions.

**Does not work. Stop trying:**

- **UPDATE 2026-10-02: Docs and Sheets CAN now be edited in place** through the
  Google Docs and Google Sheets connectors (replaceAllText, updateTextStyle,
  update_values, update_formulas). Edit in place; do NOT rebuild a doc, which
  changes its ID and breaks the portfolio embed. The Drive connector itself
  still only renames and moves files.
- **The Drive text export shows bold as `**text**`.** That is the exporter, not
  literal asterisks in the doc. Check with the Google Docs read tool before
  "fixing" it.
- **Cannot set "Anyone with the link â†’ Viewer."** `share_file` only grants
  per-email. The link-sharing toggle is manual, every time. Say so plainly;
  never report it as done.

### The dead-embed trap â€” this has happened twice

Because a doc can only be "edited" by replacement, **any replaced doc leaves a
dead ID embedded on the portfolio, which renders as an empty box to the
grader.** It looks fine in the HTML. You only catch it by checking.

This was found live on 2026-10-03: `implementation-monitor-and-evaluate.html`
pointed at a trashed Impact and Evaluation doc. Fixed in commit `2366cdc`.

**After replacing any doc, audit every embed:**

```powershell
cd C:\Users\neely\NickyM-24-portfolio
Select-String -Path *.html -Pattern "docs\.google\.com/(document|spreadsheets|forms)/d/([A-Za-z0-9_-]{25,})" -AllMatches |
  ForEach-Object { $f=$_.Filename; $_.Matches | ForEach-Object {
    [pscustomobject]@{page=$f; id=$_.Groups[2].Value} } } |
  Sort-Object page,id -Unique | Format-Table -AutoSize
```

Then confirm each ID resolves via Drive `get_file_metadata`. A trashed ID returns
`Requested entity was not found`.

### Duplicate drafts â€” embed the right one

Drive currently holds **three** docs titled "Education in Society Brainstorm" and
**three** Roadmap variants, from earlier revision rounds. She has already hit
this once ("i see 2 of them in my doc fix to only the right doc"). Match on ID,
never on title.

### Verified live IDs (2026-10-03)

| Document | ID |
|---|---|
| Roadmap to Success | `1uspktJnWZ2owoYfPaalXFOHjTQOa66Sng9d1M-YGsOU` |
| Funding Strategy | `1ZJzEzyu9Qhpxm9Id7zRaURcb_eYgtpeL53RjRtihSVY` |
| Project Budget (sheet) | `1VhFVk34_Q-1_q0ReqLdSWsgbtccFjRfdz4r3qOifxGU` |
| Impact and Evaluation | `1CPLW_ql8ZUQYIxMUTfYJHCM2O7udP2YONsL4uEY3vEE` |
| Preparing to Pilot | `1aCyZm02HCi5YRtcpY0iNePqJRAz3xtbjqG16pymHPeE` |
| Sustainable Revenue | `1a0INJxvN7VYGa7IYTIVV5OuUj1IJ5MP17eKt3KmXg5U` |
| ES Brainstorm (current) | `1Kkr-PveeWKPHUlF4JKBAuAIuiaxhGR7Zn1RwLkejRkQ` |
| Tool 1 â€“ Tantrum Tracking Log | `12QQ3-Gl1xuATnoatLX9uCQ5ZKq_AlEmYzZLTB2iTdaA` |
| Tool 2 â€“ Caregiver Readiness Survey | `1JOubJREV_BussN_PrabUbj0sbykoNm9vsAjUgio_8ic` |
| Tool 3 â€“ Strategy Fit by Age Tier | `1lwVN3Q__CDaRSEJfGvpoOT-b3bV7c6Cs5DPy_CGzvVs` |
| Timesheet (sheet, current) | `1G5GvrKxJZZvrqUdii9e3syiqxMKcAJ-uNjfBGlu4PPU` |

The 16 other IDs embedded site-wide are 2023 EDU 484 documents on the
`inspiration-*` legacy pages. Spot-checked and alive â€” the Google Sites migration
carried valid IDs. Note the legacy timesheet (`19HQL6...`) is owned by her
personal Gmail, not the ASU account.

**Embed pattern:**

```html
<div class="embed-frame">
  <iframe src="https://docs.google.com/document/d/DOC_ID/preview"
          width="100%" height="800" frameborder="0" loading="lazy"></iframe>
</div>
```

---

## 5. DO NOT INVENT CONTENT

This is the most important rule here. It caused the worst error of the last
session.

A detailed account of an "autism inclusion workshop for Elevate Academy staff"
was written into the ES Brainstorm â€” a graded document â€” inferred from
surrounding context. **It never happened.** Her response: *"none of this shit
about the fucking workshop actually happened."*

Her coursework is a record of real internship hours at a real agency with a real
supervisor, on the path to BCBA certification. Fabricated specifics in that
record are not a style problem.

**Rules:**

- Never write a specific event, date, name, place, number or quote she has not
  supplied.
- When a section needs a specific you don't have, write `[VERIFY THIS ONE]` or
  leave a bracketed placeholder. A visible gap always beats a plausible
  invention.
- Memory and conversational context are not sources for graded content. Her own
  words in the current conversation are.
- Check real places and organizations against a search before writing them in.
  *"Vegas Play Pin"* went into Preparing to Pilot in four places from voice
  input and matches no actual Las Vegas business. **Still unresolved.**
- Reference URLs: fetch and confirm the section matches before citing. Ch. 37
  Sec. 5 was cited with Sec. 4's URL and the whole doc had to be rebuilt.

---

## 6. OTHER TRAPS

- **Zip files ship stale content.** A re-zip errored partway (`returncode: -1`)
  and shipped the old stylesheet while the working copy had the new one. If you
  zip anything, verify:
  `unzip -p portfolio.zip portfolio/css/style.css | grep -c "page-pink"`
  Better: don't zip. Use git.
- **Safari auto-unzips** on download, so on the Mac she may already have a folder
  when you think she has an archive.
- **Week dates anchor to Saturdays**, not Wednesdays. Week 4 is Sep 19. The
  course runs **8/26 â€“ 12/4** â€” 15 weeks, not 12. A calendar built on 12 had to
  be rebuilt.
- **Standing style preferences:** no em dashes anywhere in her documents or on
  the About Me page. First person, not third. She corrected both. Don't
  reintroduce them.
- **Her voice input is phonetic.** "profotilio" = portfolio, "assignememnt" =
  assignment, "profoilio" = portfolio. Read through the typing; don't ask her to
  restate.
- **Never kill an auth listener.** A previous `gh auth login` was started with
  `nohup ... &` and later killed with `pkill`, destroying the process waiting for
  the token. Not an issue on this machine â€” gh is already authenticated.

---

## 7. ASSIGNMENT WORKFLOW

Every HCD assignment has the same shape.

1. Read the rubric. Build a section for **every** criterion â€” the point split is
   the outline.
2. Gather her actual material first. Ask for what's missing before drafting.
3. **PreWork** section: name each reading and say how it was used. Worth 5 pts
   and most often left thin.
4. Build the HTML, create the Doc via Drive with `contentMimeType: text/html`.
5. Build or update the portfolio page, embed the doc, commit the page and
   `js/site.js`, push.
6. Verify live from the device with a cache-buster.
7. **Tell her the two manual steps:** set link-sharing to "Anyone with the link â†’
   Viewer," and add `pclawson@asu.edu` as Commenter or Editor. Neither can
   be done from here.
8. Hand her the page URL to submit in Canvas.

**Stakeholder feedback sections are worth 7 pts and cannot be written for her.**
They need what L'Tricia actually said and what changed as a result. Leave them
bracketed and tell her they are the largest single block of points on the page.

---

## 8. STATE AS OF 2026-10-03

**Internship:** A Parentz Touch ABA. Supervisor L'Tricia Turner. Tueâ€“Sat
9:00â€“2:30, supervisor meeting Saturdays 10â€“12. Target 7 hrs/week.

**Project:** Communication and Coping Skills â€” skill reinforcement through
therapeutic activities, for children with behavioral needs and violent tantrums.

**Done and verified:** Funding Strategy page embeds the correct doc and budget
(summary figures $325 / ~$355 / ~$115). Monitor and Evaluate page built, with its
dead embed fixed and verified live.

**Open:**

1. `implementation-pilot.html` is a **790-byte stub** â€” needs building from the
   Preparing to Pilot doc.
2. `implementation-sustainable-revenue.html` is an **828-byte stub** â€” needs
   building from the Sustainable Revenue doc.
3. Resolve the "Vegas Play Pin" name â€” 4 places in Preparing to Pilot.
4. Stakeholder feedback still blank in Sustainable Revenue (7 pts).

**Hers to do, not ours:**

- Link-sharing on every Doc and the Sheet.
- Add `pclawson@asu.edu` as Commenter/Editor.
- Timesheet hours â€” Week 3 (Sep 12): 1/1/0.5/1/3.5 Â· Week 4 (Sep 19):
  1.5/1/0.5/1/3 Â· Week 5 (Sep 26): 1/1.5/0.5/1/3

---

## 9. PRIVACY DECISION â€” PRESERVE THIS REASONING

Source documents from EDU 484 contain foster children's names, ages and interview
dates alongside trauma accounts. She confirmed names were changed and permission
obtained.

Even so, interview logistics on the public site were generalized to *"youth
participants interviewed in fall 2023."* Reasoning: ages plus exact dates plus
the real agency name remain re-identifiable even with changed names, and this
bears on BACB confidentiality standards given her BCBA path.

**Four pages embed Drive documents that still contain the original details**, and
those docs are shared "anyone with the link" independent of the site. She was
told. If the scope of that sharing changes, revisit this.
