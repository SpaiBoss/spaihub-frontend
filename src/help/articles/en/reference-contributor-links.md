---
id: con.ref.links
slug: reference-contributor-links
title: "Contributor links reference"
description: "Read-only Links table: Location, Interface, Cap Mbps, Rate XAF/GB, Last meter, Status Active/Paused/Pending/Disabled. Paused meters without credit."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-links", "cap", "rate"]
buttons: []
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.links", "con.tut.withdraw"]
updatedAt: 2026-09-16
minutes: 11
---

## What this page is

**Links** is a **read-only** table of physical uplinks SpaiHub configured for you. You cannot add a row, change **Cap**, edit **Rate**, pause the link yourself, or open Winbox from here.

Open **Links** in the contributor nav. Title **Links**. Subtitle **Physical uplinks SpaiHub configured for you**.

If Home said **No links yet**, this page is the same fact as a table with a single empty cell until a technician attaches an uplink at a nearby hotspot.

This is not the owner **Sessions** tab. You will not see guest phones, **On router**, or **Kick**. You will not see remaining fair-use GB (guests never see that either). You see the spare pipe into the shop.

## Terms

**Location** — the owner hotspot site your spare capacity feeds. A name only. You do not open that owner’s **Locations** page.

**Interface** — the RouterOS interface name in mono text — the ethernet, VLAN, or similar the technician chose. You do not rename it.

**Cap** — **N Mbps**. Ceiling SpaiHub set for that link. Not a guest package’s **Upload speed (MB/s)**.

**Rate** — **N XAF/GB**. What you earn per **credited** gigabyte. **SpaiHub does not publish a typical public rate.** Ignore rumours of “what contributors usually get.” Your contract is this cell.

**Last meter** — last sample: **N B · date/time** (raw **bytes** and when). Em dash if nothing has been sampled yet. Home then shows credited volume as GB.

**Status**:

- **Active** — samples can credit **Contributor balance**.
- **Paused** — SpaiHub still **stores meter samples without credit**. The link is not deleted; **Wallet** does not rise for those GB until status is **Active** again.
- **Pending** — not yet in service.
- **Disabled** — off.

Only SpaiHub technicians change status. There is no **Pause** button on your table.

**Meter** — a byte counter snapshot on that interface. It is not Campay, not a voucher, not a guest PIN.

## Every control

There are **no action buttons** on this page: no **Add**, **Edit**, **Save**, **Sync unused to router**, **Kick**, **Withdraw**. **Withdraw** lives on **Wallet**. **Save** lives on **Settings**.

### Table column **Location**

Hotspot name, or an em dash if missing. One contributor can have more than one row if SpaiHub attached more than one uplink.

### Table column **Interface**

`interfaceName` in a small mono font. A technician would recognise it in `/interface print`. You do not run that command. If the name looks like nonsense, read this article first, then use Help **Chat on WhatsApp** if you are still stuck — do not guess RouterOS.

### Table column **Cap**

**N Mbps**. If guests complain the Wi‑Fi is slow, that is the owner’s packages and the shop radio — not a slider here.

### Table column **Rate**

**N XAF/GB**. Home **Today** / **This month** XAF should move only for **credited** GB on **Active** rows. Arithmetic in your head is fine; this cell is the price.

### Table column **Last meter**

**{bytes} B · {local date}** or **—**. Large byte counts are normal. This is not a remaining-quota bar.

**Paused + fresh timestamp** = counter works, pay does not. That is the designed pause.

**Active + dash** = not sampled yet (new attach, or the meter has not reported).

**Active + old timestamp** = samples may have stopped. You still cannot fix RouterOS from this page.

### Table column **Status**

Badge only: **Active**, **Paused**, **Pending**, **Disabled** (shared SpaiHub colours).

### Header chrome

Language toggle, **Help**, **Sign out**. **No notification bell** when status flips from **Pending** to **Active**.

## Empty & error states

Empty: one table row spanning six columns, centred **No links yet**.

Load error: **Could not load links** with **Failed to load** (or API text). No **Retry** button on this empty state.

Loading: skeleton.

No search, no filters, no pagination on this table today. If you have one link, you see one row.

## What this page does not do

- **Read-only.** You never configure RouterOS, walled garden, Script 1, Script 2, or CHR.
- You do not set **Simultaneous devices**, generate **SPAI-XXXX-XXXX**, or brand the portal.
- No public typical rate and no “suggested XAF/GB” footnote on this screen.
- No remaining fair-use GB for hotspot guests.
- No withdraw control.
- Not an admin console. Status is not a self-service dropdown.

## Worked examples

**New attach.** Location “Akwa corridor”, interface `ether3`, **Cap** 20 Mbps, **Rate** 15 XAF/GB, **Last meter** **—**, **Pending**. Do nothing. Do not paste scripts. Do not WhatsApp for a “typical rate.”

**Earning.** Same row, **Active**, last meter `123456789 B ·` a time from this morning. **Home** **Today** should be able to move. **Wallet** may still be under 100 XAF — that is a floor, not a broken link.

**Paused on purpose.** Last meter keeps increasing, **Status** **Paused**, **Balance** frozen. Samples are stored without credit. You cannot unpause from this table.

**Two rows.** One **Active**, one **Disabled**. Only the active rate and meters should grow **Contributor balance**. The disabled row is documentation, not a delete button.

**Stale Active meter.** Timestamp from last week while the shop is busy. You still have no RouterOS control. Read this article, then Help if you are stuck — do not guess `/interface print` as if you were the technician.

Compare Home vs Links: Home omits **Last meter**. If you need “did the counter tick?”, this table is the screen.

## Related jobs

- Plain-language walkthrough: [Read a contributor link](/help/read-contributor-link).
- Cash out credited XAF: [Withdraw contributor earnings to MoMo](/help/contributor-withdraw).
- GB + XAF cards: [Contributor home reference](/help/reference-contributor-home).
