---
id: glossary.commands
slug: glossary-commands-scheduler
title: "Commands scheduler"
description: "spaihub-commands polls every 15 seconds for GRANT and KICK. Heartbeat is not enough. Paid MoMo, voucher sync, and Kick all wait on this scheduler."
role: ["owner", "contributor"]
section: glossary
intents: ["commands scheduler", "GRANT KICK", "spaihub-commands", "15 seconds"]
buttons: ["Setup script", "Check payment status", "Sync unused to router", "Kick"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.repaste-script2", "own.tut.paid-no-wifi"]
updatedAt: 2026-09-16
minutes: 4
---

## Terms

The **commands scheduler** is `spaihub-commands` on the Hex/CHR, interval **15 seconds**. It is installed by Hex **2. Connect to SpaiHub** and by CHR’s last script **Connect to SpaiHub**.

It pulls pending **GRANT_ACCESS** (create hotspot user, PIN, time, optional byte cap, shared-users) and **KICK** (remove user / active host). Then it acknowledges the batch.

**Heartbeat** (`spaihub-heartbeat`, ~1 min) only updates **ONLINE**. **hotspot-active** (~2 min) reports who is actually online so **Sessions** can show **On router**. You need commands for money-to-Wi‑Fi.

**Sync unused to router** queues GRANTs for unused **SPAI-** codes. Toast: wait ~15s, then check Hotspot users.

**Kick** toast: device should disconnect within 15 seconds — that number *is* this poll.

Contributors do not run schedulers. If grants fail, the shop looks “broken” next to their uplink; the fix is still the owner’s Script 2.

## Why it matters

The classic orphan: Campay **SUCCESS**, portal PIN visible, phone captive, router **ONLINE**, **Sessions** **Not seen**. Heartbeat lived. Commands did not. **Check payment status** retries reconciliation; without `spaihub-commands`, the user still never imports.

Wrong diagnosis: “pay again to force the grant.” Do not charge twice. Wrong diagnosis: “Preview working means commands work.” Preview is cloud HTML.

Re-pasting Script 2 should not mass-kick paying users; it is the usual repair when the scheduler vanished after a reboot. Re-pasting Script 1 is for a wrong captive page. CHR’s last wizard step is the same job as Hex Script 2 — do not skip it because bootstrap already “looked like a router.”

## What you see

**Setup script** copy and the dashboard banner about re-running the **connection** script (commands ack). `/system scheduler print` should list `spaihub-commands`.

Symptoms of absence: paid no Wi‑Fi, sync never creates Hotspot users, Kick toast but nobody drops.

## What to do

Owners: if grants fail, paste Script 2 only; wait 15s; confirm **On router**. Keep Script 1 for overlay/HTML, not as a grant hammer. After Campay success, **Check payment status** first. After **Sync unused to router**, wait those same 15 seconds before you declare Hotspot users empty. Contributors: send the owner to Help; do not collect a second MoMo “for the uplink.”

## What not to say

- Do not say heartbeat is enough for paid Wi‑Fi.
- Do not tell guests remaining fair-use GB while waiting for a GRANT.
- Do not paste commands URLs or tokens into a guest chat.
- Do not promise TTL will GRANT faster. Anti-tether stays off and is unrelated.
