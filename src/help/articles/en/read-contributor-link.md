---
id: con.tut.links
slug: read-contributor-link
title: "Read a contributor link"
description: "How to read Location, Interface, Cap Mbps, Rate XAF/GB, last meter, and Active vs Paused. You do not configure RouterOS. No public typical rate."
role: ["contributor"]
section: tutorials
intents: ["cap", "rate", "meter", "paused"]
buttons: ["Links", "View all links →"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.withdraw", "con.ref.links"]
updatedAt: 2026-09-16
minutes: 11
---

## What this page is

This tutorial is how to **read** a contributor uplink once SpaiHub has attached it. It is not how to build a hotspot. You will not open Winbox, paste Script 1, or pick **Physical MikroTik**.

Open **Links** (title **Links**, subtitle **Physical uplinks SpaiHub configured for you**), or from **Home** tap **View all links →**.

The table is **read-only**. If the table says **No links yet**, the tutorial ends at “wait.” Home empty copy is the same promise: **SpaiHub will attach a physical uplink at a nearby hotspot and list it here.**

**SpaiHub does not publish a typical public rate.** Your pay is the **Rate** cell, not a Facebook rumour.

## Terms

**Location** — shop name whose hotspot consumes your spare capacity.

**Interface** — RouterOS interface name (mono). Technician territory.

**Cap** — **N Mbps** ceiling for that link.

**Rate** — **N XAF/GB** for **credited** volume.

**Last meter** — **{bytes} B · {date}** or **—**.

**Active** — can credit **Wallet**.

**Paused** — samples stored, **no credit**.

**Pending** / **Disabled** — not paying.

## Every control

### **Links** / **View all links →**

Those are the only controls you need. There is no **Edit**, **Save**, **Add**, or **Kick**.

### Step through one row

1. **Location** — confirm it is the neighbourhood you expected. You cannot retarget it.
2. **Interface** — treat as an ID. Do not rename ports.
3. **Cap** — Mbps limit. Guest “slow Wi‑Fi” is the owner’s packages, not your slider (you have none).
4. **Rate** — XAF per credited GB. Example only: 4 GB credited at 25 XAF/GB is 100 XAF toward the withdraw floor. Your cell wins over any example.
5. **Last meter** — bytes + time. Fresh **Paused** meter means the counter works and you are unpaid — by design. Stale **Active** meter means samples may have stopped — still not a RouterOS job for you.
6. **Status** — badge. No dropdown.

### Same data on **Home**

**Your links** shows name, **interface · cap Mbps · rate XAF/GB**, badge, **N active**. **Today** / **This month** convert credited volume to GB + XAF. **Paused** GB should not swell **Balance**.

## Empty & error states

**No links yet** — wait for attach. Do not register an owner account unless you actually run a shop.

**Could not load links** / **Failed to load** — reopen the page.

Skeleton while loading — not an empty shop.

## What this page does not do

- You never configure RouterOS, walled garden, CHR, or **Access policy**.
- You do not print vouchers or **Preview portal**.
- You do not see remaining fair-use GB (owner **Details** / guest banner **Fair use limit reached** only).
- You do not withdraw here (**Wallet** → **Withdraw**).
- No public typical rate.

## Steps

1. Sign in as contributor (email + password). If **Pending**, you will not reach **Links**.
2. Open **Home**. If **No links yet**, the job is wait — the attach sentence is the spec.
3. When a row exists, tap **View all links →** (or nav **Links**).
4. Read left to right: **Location**, **Interface**, **Cap**, **Rate**, **Last meter**, **Status**.
5. Copy the **Rate** mentally. There is no public typical rate to compare.
6. If **Paused**, expect **Wallet** not to move even if **Last meter** bytes increase.
7. If **Active** and the date on **Last meter** is today, **Home** **Today** GB/XAF is the credited summary.
8. When **Contributor balance** ≥ 100 XAF, go to the withdraw tutorial — not to Winbox.

## If it fails

Empty table after weeks: you still cannot add a link. Re-read the empty copy. Then Help.

You opened owner **Locations** with a different account: that is a shop owner login. Contributors do not paste **Setup script**.

You want to change Mbps: not a contributor control.

You want guest fair-use remaining GB: that number is never shown to guests; owners see caps on **Packages** → **Details**. Irrelevant to this table.

## What you will have after a real attach

A table row you can screenshot for yourself: location name, interface, Mbps cap, XAF/GB, last sample, badge. That screenshot is your contract. Home cards then make sense (**Today** GB vs frozen **Balance** if **Paused**).

You will still not have a **typical rate** published next to the table. You will still not have **Setup script**. You will still not see guest **On router** MACs — that is owner **Sessions**.

If the shop owner suspends the *location*, your link row may keep existing with a status SpaiHub set; you still cannot **Activate** a location. Your controls remain: read **Links**, **Save** Settings, **Withdraw** Wallet.

Bytes on **Last meter** are not remaining guest quota. Never tell a walk-in customer “you have N GB left” from this table — guests never get remaining fair-use GB anyway.

Print the six columns in order when you call Help: Location, Interface, Cap, Rate, Last meter, Status. That sentence is enough for a technician to find the row. Adding Winbox screenshots you took without permission is not required and not a contributor feature.

**Home** **N active** counts **Active** badges, not guest sessions. A busy shop with **Paused** uplink can still show **0 active**.

Rate is XAF per **GB**, Cap is **Mbps**. Do not mix them. Speed of the pipe is not the price of a gigabyte.

Bring a paper notebook if you want: date, last meter bytes, status. The UI has no export on **Links**. Screenshot the table on your phone instead of asking for a CSV that does not exist here.

If **Location** is an em dash, the attach is incomplete from your point of view — still not an **Add Location** button. Owner locations are created by owners.

Disabled vs paused: **Disabled** is off; **Paused** is “count but do not pay.” Do not use the words interchangeably when you talk to Help.

## Related jobs

Map of every column: [Contributor links reference](/help/reference-contributor-links). When **Contributor balance** ≥ 100 XAF: [Withdraw contributor earnings to MoMo](/help/contributor-withdraw).
