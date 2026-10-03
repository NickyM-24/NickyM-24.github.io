# Nicky Malone's EDU 498 portfolio

**Read `RUNBOOK.md` in this directory before doing anything else.** It documents
the environment, the deploy path, and several traps that have each cost a full
session already.

The five things that matter most:

1. **Work here, on this Windows laptop** (`C:\Users\neely\NickyM-24-portfolio`).
   Git works. Do not reach for the Mac copy or the old `gh api` + base64 push
   workaround — that was a workaround for a constraint that does not apply here.

2. **Never invent content.** This is graded coursework documenting real
   internship hours toward BCBA certification. A fabricated event in a graded
   document is the worst error made on this project. If you need a specific you
   do not have, write `[VERIFY THIS ONE]` and ask.

3. **Google Drive cannot edit an existing Doc** — only replace it. Every
   replacement orphans the old ID, and an orphaned ID renders as an empty box to
   the grader. Audit embeds after any doc change. See RUNBOOK §4.

4. **Verify deploys from this device, not the Claude container** — container
   egress blocks `nickym-24.github.io`. Always use a `?cb=` cache-buster.

5. **Two steps are always hers, never ours:** Drive link-sharing, and adding the
   instructor as a commenter. Say so; don't report them as done.

Style: no em dashes in her documents. First person. Pink/white/black, and keep
the pink border on `#site-shell`.
