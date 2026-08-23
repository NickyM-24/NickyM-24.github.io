# Nicky Dominique Malone — Portfolio (v2)

Migrated off Google Sites. This is plain HTML/CSS/JS — no build step,
no framework to go stale, no login required to edit. Every file here
is just a file: open it, change it, save it, done.

## Status

This is fully content-migrated. All 25 pages from the old site have
the real writeup from the underlying Drive docs pulled in directly —
not just links out anymore. Design/visual polish is still the next
pass (see below).

**Genuinely empty on the old site (nothing was lost):**
- `internship.html`
- `profotilio-framing-your-design.html`
- `inspiration-design-challenge-secondary-research-recruitment-strategy.html`

**Still just templates, never filled in:**
- `hcd.html` / `inspiration.html` — the class Slides template, every
  slide still says "Add your text here"

## A privacy note on the foster-care research

Several of the source docs (Survey/Interview Guide, the three
Recruitment Strategy pages, Survey and Interview Data) originally
included specific youth participants' names, ages, and interview
dates tied to detailed accounts of trauma and violent behavior. Real
name or not, that combination — paired with the real agency name and
real dates — is enough to identify a specific real kid to anyone who
was around that group home at the time. That doesn't belong on a
public, permanent, indexed website, especially not one tied to your
name and BCBA path.

What's on the pages now keeps all the real substance — the
methodology, the findings, the reflections, the actual insight — but
generalizes interview logistics to something like "youth participants
interviewed in fall 2023" instead of named individuals with exact
ages and dates. Nothing about the quality of the work is lost; the
specific combination that made it re-identifiable is.

Separately: those Drive docs are shared "anyone with the link can
view," which is how this content was readable at all — meaning the
original names/ages/dates are still sitting at a public link right
now, independent of this site. Worth tightening sharing settings on
those specific docs when there's time.

## Duplicates worth cleaning up

The old site had the same file embedded on two different pages in a
few places — probably from reorganizing the nav without deleting the
old entry:

- `inspiration-seconday-research.html` and
  `inspiration-design-challenge-secondary-research.html` → same doc
- `inspiration-survey-and-interview-datadata.html` and
  `inspiration-survey-interview-and-data.html` → same doc
- Three separate "Recruitment Strategy" pages exist
  (`inspiration-recruitment-strategy.html`,
  `inspiration-surveyinterview-guide-recruitment-staregy.html`, and
  one under Design Challenge that's empty) — worth consolidating
  into one page.

Each affected page has a note at the top flagging this. Nothing was
deleted — just flagged for a decision once there's time to look.

## Images

The Home page had three photos, hosted on Google's own servers —
they couldn't be pulled in automatically. Worth re-saving them from
the old site and dropping them in `images/`.

## How it's organized

```
portfolio/
├── index.html                  ← Home
├── template.html                ← duplicate this to make a new page
├── profotilio.html              ← "Portfolio" section (typo kept from
│                                    old URL for now — rename later)
├── profotilio-framing-your-design.html
├── internship.html
├── internship-timesheet.html
├── internship-treasure-hunt.html
├── internship-brainstorm.html
├── hcd.html
├── inspiration.html
├── inspiration-*.html           ← 14 pages under Inspiration
├── css/style.css                ← all styling lives here
├── js/site.js                   ← nav menu + footer, shared site-wide
└── images/                      ← drop image files here, reference
                                     them as images/filename.jpg
```

Filenames deliberately mirror the old site's URLs (including its
typos, like `seconday-research` and `recruitment-staregy`) so it's
easy to trace which new file replaces which old page. A few pages
are near-duplicates carried over from the old site (three separate
"Recruitment Strategy" pages, two "Secondary Research" pages, two
"Survey and Interview Data" pages) — each duplicate page says so at
the top. Worth consolidating down to one page per topic when there's
time; nothing is broken by leaving them as-is in the meantime.

## Adding a new page

1. Duplicate `template.html`, rename it (`lowercase-with-hyphens.html`).
2. Fill in the `<title>`, the eyebrow label, and the `<h1>`.
3. Write content inside `<main>` using normal HTML (`<h2>`, `<p>`,
   `<img src="images/whatever.jpg">`, etc).
4. Open `js/site.js`, find the `NAV` array near the top, and add one
   line pointing to the new file. It appears in the nav on every page
   automatically — nothing else to touch.

## Editing the design

Everything visual lives in `css/style.css`. Colors and fonts are
defined once at the top as CSS variables (`--paper`, `--ink`,
`--accent`, etc.) — change them there and it updates everywhere.

## Deploying

Not needed right now, but for later: this folder can be pushed
straight to a GitHub repo and turned on as a GitHub Page (Settings →
Pages → deploy from branch), or dragged into Cloudflare Pages. No
build command, no config file needed — it's already static output.
