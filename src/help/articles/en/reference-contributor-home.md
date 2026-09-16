---
id: con.ref.home
slug: reference-contributor-home
title: "Contributor home reference"
description: "Contributor Home: Welcome, Balance, Withdraw →, Today and This month GB + XAF, Your links, empty uplink copy."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-home"]
buttons: ["Withdraw →", "View all links →"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.account", "con.tut.links"]
updatedAt: 2026-09-16
minutes: 10
---

## What this page is

**Home** is the first screen after you sign in as a **SpaiHub contributor** — someone who sells spare uplink into a nearby hotspot. You do **not** run the shop, sell vouchers, paste MikroTik scripts, or design the captive portal. SpaiHub technicians attach a physical uplink; this page shows whether that link exists, how much GB was metered, and what you can withdraw.

Open **Home** in the contributor nav. The navy header shows **SpaiHub** and a **Contributor** badge so you know you are not in the owner dashboard. Subtitle on the page: **Spare uplink contribution overview**.

You are not an owner. Owner **Dashboard** (**Today's Revenue**, routers, vouchers, **Export CSV**) is a different login. If you meant to sell Wi‑Fi to walk-in guests, use **Owner sign in** on the contributor login screen — do not wait on this Home for hotspot tools that will never appear.

If you just verified email and **Sign in** still says **Your account is awaiting admin approval.**, you will not see this page yet. Status stays **Pending** until SpaiHub activates you. That is not a broken Home; you are not in.

## Terms

**Contributor** — a person paid XAF per credited GB for spare capacity on an interface SpaiHub configured.

**Link** — one physical uplink: a location name, a RouterOS **Interface**, a **Cap** in Mbps, a **Rate** in XAF/GB, a last meter sample, a status badge.

**Balance** — your **Contributor balance** in XAF, the same bucket as **Wallet**. Contributors do **not** see the owner split **Available to withdraw** vs **Reserved for contributors**. That reserve is money the *owner* cannot withdraw because it funds people like you.

**Today** / **This month** — GB and XAF SpaiHub attributes to you for those periods. **Paused** links still store meter samples **without** adding XAF.

**Active** (count on **Your links**) — how many of your rows are in **Active** status, not how many guests are on the hotspot.

**Pending** (account) — you after verify, before activation. Different from a link status **Pending**.

## Every control

### **Welcome, {name}**

Heading uses **Display name** from **Settings**. Under it: **Spare uplink contribution overview**. There is no pencil on Home — change the name under **Settings** → **Save**.

### Card **Balance**

Label **Balance**. Large **N XAF** with thousands separators. This is not GB and not owner shop revenue.

If this is 0 after a week of an **Active** link, read **Links** (**Last meter**, **Status**) before you assume Campay failed. Paused meters do not fill this card.

### **Withdraw →**

Text link, not a modal. It routes to contributor **Wallet**. On that page you tap **Withdraw**. Home never asks for a phone number.

### Card **Today**

Label **Today**. Large **N.NN GB** (two decimal places). Under it, **N XAF** for today’s credited amount. A quiet day shows **0.00 GB** and **0 XAF**. That can be honest (no traffic) or **Paused** (traffic without pay).

### Card **This month**

Label **This month**. Same pair for the calendar month. Use it for “did I earn enough to hit the **100 XAF** withdraw floor?” not for tax ledgers — there is no CSV export on contributor Home.

### Block **Your links**

Heading **Your links**. Right side: **N active**.

Each row:

- Location **name** (or the generic **Location** label if a name is missing)
- Mono line **interface · cap Mbps · rate XAF/GB**
- Status badge: **Active**, **Paused**, **Pending**, or **Disabled**

Tapping a row does **not** open a detail page. Use **View all links →** for **Last meter**.

### **View all links →**

Footer link to **Links**. Always shown, even when the list is empty.

### Header and nav (on every contributor page)

**SpaiHub**, **Contributor**, **EN** / **FR** (**Switch language**), **Help**, your name (wide screens), **Sign out**. Nav tabs: **Home**, **Links**, **Wallet**, **Settings**.

**There is no notification bell.** Balance changes and queued withdrawals do not ring a bell on this Home.

## Empty & error states

No links — this is the important empty state:

- **No links yet**
- **SpaiHub will attach a physical uplink at a nearby hotspot and list it here.**

Read that twice. You do not add a location. You do not paste Script 2. You do not invent a rate. When a technician attaches the uplink, the row appears on Home and **Links**.

Load failure: **Could not load dashboard** with description **Failed to load** (or the API error). There is no **Retry** button on this empty state — reopen **Home** or **Sign out** / **Sign in**.

Loading: grey skeleton, not fake zeros.

## What this page does not do

- No **Add Location**, **Add Router**, **Generate vouchers**, **Preview portal**, or **Kick**.
- No RouterOS terminal and no CHR wizard.
- No public typical XAF/GB. Your rate is on the link line when a link exists.
- No remaining fair-use GB — that is a guest/owner hotspot rule. You meter uplink GB.
- No owner MoMo sales list and no **Export CSV**.
- No notification preferences. No admin console.

## A normal week on this screen

Monday: **No links yet** and the attach sentence. You did not fail registration.

Wednesday: a row appears, badge **Pending** or **Active**, **Balance** still 0. **Today** may stay **0.00 GB** until traffic and credit.

Friday: **This month** shows GB + XAF, **N active** is 1, **Withdraw →** is worth opening only if the hero on **Wallet** is at least **100 XAF**. If the badge is **Paused**, ignore the temptation to treat **Last meter** movement as pay.

If **Welcome** shows the wrong name, that is **Settings**, not a bug in Home.

## Related jobs

- Register, verify, wait **Pending**: [Create a contributor account](/help/create-contributor-account).
- Read cap, rate, pause: [Read a contributor link](/help/read-contributor-link) and [Contributor links reference](/help/reference-contributor-links).
- Cash out when balance ≥ 100 XAF: [Withdraw contributor earnings to MoMo](/help/contributor-withdraw).
