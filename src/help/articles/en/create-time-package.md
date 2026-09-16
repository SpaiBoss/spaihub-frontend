---
id: own.tut.time-package
slug: create-time-package
title: "Create a 1-hour time package with hidden fair use"
description: "Sell browse time in XAF with an owner-only gigabyte cap. Guests see unlimited data, never leftover GB."
role: ["owner"]
section: tutorials
intents: ["package", "fair use", "time", "time-based", "1 hour", "hidden cap"]
buttons: ["Add Package", "Fair use data limit (hidden from subscribers)"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-hidden", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 10
---

A **time-based** package sells a **Browse duration** — one hour at the corridor, three hours at a night shop — not a visible pile of gigabytes. Optionally you turn on **Fair use data limit (hidden from subscribers)** so one login cannot drain the whole uplink while the clock still shows time left.

**Fair use** here means an owner-side cap on the MikroTik. Buyers still see **Unlimited data** / **Unlimited data for this browse period**. You must not quote leftover GB to guests. When the cap hits, the session cuts and the login page can say **Fair use limit reached. Buy another package to continue.** Details: [Hidden fair-use cap on time packages](/help/hidden-fair-use).

## What you will have

An active package on the location, priced in XAF, type **Time-based**. In the **Details** column you (the owner) see the fair-use cap. On **Preview portal**, guests see duration and unlimited data — not the cap number.

New packages default fair-use **on** at **2 GB**. That is the SpaiHub starting point so a 1-hour walk-in plan cannot become a movie dump. You may uncheck it if you truly want unlimited bytes for the hour (risky on a small Orange/MTN uplink).

## Before you start

- A location. [Add a location](/help/add-location) if the list is **No locations yet**.
- A price you can say out loud: “1 hour, 200 XAF” or whatever the cité next door charges. Price is **Price (XAF)**.
- Know your uplink roughly. **Upload speed (MB/s)** defaults to **1** and maxes at **100**. Leave 1 unless you measured.
- Decide devices: cheap walk-in = **Simultaneous devices** **1**. House sharing = [family package](/help/create-family-package).

You do not need the Hex online to create the package. Guests cannot buy until a router is **ONLINE**, but the catalogue can exist.

## Steps

1. **Locations** → expand the site → **Packages** → **Add Package**.
2. **Package name** — something the portal can show, e.g. `1 Hour` or `Soirée 3h`.
3. **Package type** → **Time-based** (subscriber gets internet for a set browse time; optional data cap).
4. **Browse duration** — for this tutorial set **1** **hours**. You can use minutes or days later.
5. **Price (XAF)** — whole CFA francs, no commas required.
6. **Upload speed (MB/s)** — leave **1** unless you know the uplink. This is a rate (how fast), not a quota (how much). Mixing the two is the usual RouterOS confusion.
7. **Simultaneous devices** — **1** for a cheap walk-in plan (range **1–20**, default **1**).
8. Leave **Fair use data limit (hidden from subscribers)** checked. Default **2 GB** is correct for a first 1-hour SKU. The hint says buyers see unlimited browse; MikroTik still cuts when the cap is hit. The cap is shared with anyone on the same login, including tether/NAT. SpaiHub does not use anti-tether firewall rules.
9. Tap **Create package**.

To sell a true unlimited-byte hour, uncheck fair use. Only do that if your WAN can take it.

![Screenshot](about:blank)
_Screenshot slot: Add Package time-based with fair use 2 GB (staging)._

## What you should see

- Toast **Package created**.
- Row: name, **Time-based**, details with duration and a fair-use cap in owner language, price in XAF.
- **Preview portal**: package line like **1 hour browse · Unlimited data**. Guest page **Unlimited data for this browse period**. No remaining-GB meter for them.
- After a real session hits the cap: MikroTik drops the user; portal/login can show **Fair use limit reached**.

**Deactivate** hides the package from new sales without inventing a delete of history.

## If it fails

**Duration must be greater than 0.** Put a number in **Browse duration**. Zero hours is not a product.

**Price must be greater than 0.** Free WiFi is not a SpaiHub SKU on this form.

**Upload speed cannot exceed 100 MB/s.** Cap is 100. Default 1 is already plenty for phone WhatsApp.

**Guests ask “how many GB left?”** Do not answer with the hidden number. Sell time. If they hit fair use, they buy another package. Staff talking leftover GB at the counter trains people to argue.

**One login is sharing to four phones.** That is **Simultaneous devices** and NAT, not a broken cap. Price a [family package](/help/create-family-package) or keep cheap plans at 1 device. A cheap extender in router mode still looks like one MAC.

**Want a visible GB product instead.** That is [Create a data-based package](/help/create-data-package) — **Download allowance** is shown on purpose.

Next hardware-free check: [Preview the captive portal](/help/preview-captive-portal). Next live check: [test MoMo](/help/test-momo-online) once the router is **ONLINE**.

A 1-hour corridor SKU at 200–500 XAF with fair use on at 2 GB is the usual first product in Douala and Yaoundé shops. Raise the hidden cap only if your WAN is fat and you still do not want to tell guests a leftover number. Uncheck fair use only if you accept one login eating the uplink for the whole **Browse duration**. **Deactivate** the SKU if you need it off the portal without a speech at the counter.
