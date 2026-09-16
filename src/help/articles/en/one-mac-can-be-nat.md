---
id: tip.one-mac-nat
slug: one-mac-can-be-nat
title: "One MAC on Sessions can be a NAT gateway"
description: "On router means the Hex has that login in active hosts. A single MAC can still be a cheap extender or phone hotspot hiding many devices. Sessions is not a headcount of people in the house."
role: ["owner"]
section: pro-tips
intents: ["one MAC NAT", "on router", "sessions MAC", "gateway"]
buttons: ["Sessions", "On router", "Not seen", "Kick"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.pixlink-nat", "own.ref.sessions"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Sessions** is **Locations** → **Sessions** (short **Live**). It lists access SpaiHub believes is active for that site.

**On router** means the login is in MikroTik **hotspot active** as reported by `spaihub-hotspot-active`. The Hex currently has that user online.

**Not seen** means SpaiHub has a paid or redeemed session in software, but the router has not reported that user in active hosts. Common after a grant that never imported, a phone that never **Connect**ed, or a box that stopped polling.

A **NAT gateway** here is a cheap extender in router mode, a travel router, or a phone hotspot: many people, **one WAN MAC**.

## Why it matters

The Sessions empty hint says it plainly: after re-pasting the connection script, live **On router** appears here. **One seen MAC can still be a NAT gateway.** Owners skip that sentence and bill staff for “only one user on the screen” while the courtyard is full.

Incident: Kick on that one row dropped eight people. Owner thought Kick was “bugged” and refunded. Kick did exactly one hotspot user — the gateway.

Wrong diagnosis: “On router is a lie because I count 12 phones with my eyes.” Your eyes see 2.4 GHz clients including ones on the extender LAN. SpaiHub sees the WAN MAC.

**On router** is honest. It is not a census.

Phones also randomize MACs. A *changing* MAC on one quiet student is not NAT. NAT is the opposite: a *stable* MAC with courtyard-level traffic. Learn both before you **Kick** the wrong person. **Not seen** after a successful pay is usually missing `spaihub-commands`, not a clever gateway. Fix Script 2 first; hunt personal routers second.

## What you see

Columns: **Device**, **Package**, **Router**, **Ends**, **Kick**, plus **On router** / **Not seen**, and MAC when known.

Hints on the page:

- Live **On router** after Script 2.
- A single MAC may still be a cheap extender, phone hotspot, or personal router sharing with many devices.

Toast after **Kick**: **Session ended — device should disconnect within 15 seconds** (commands poll). The whole NAT house drops together.

Empty: **No active sessions at this location.**

## What to do

1. If the yard is busy and Sessions shows one **On router** MAC, walk for an extender before you accuse the voucher printer.
2. Use **Kick** as a house-rule tool against a NAT box, knowing you disconnect everyone behind it.
3. If **Not seen** after MoMo, fix **spaihub-commands**, not the MAC story.
4. Do not add TTL to “split” the MAC. Anti-tether stays off.
5. Sell family prices when people want many phones **on your SSID**. NAT will still collapse them to one MAC if they hide.
6. After **Kick**, wait the ~15s commands poll. If the same MAC returns immediately, they still have the PIN — that is credential sharing plus NAT, not a Sessions bug. Change the shop rule or the price; do not reinstall TTL.

## What not to say

- Do not tell a customer “I see all your phones on Sessions.” You do not, if they NATed.
- Do not promise remaining fair-use GB per phone behind the gateway. The cap is on the login.
- Do not say Not seen means they did not pay. Check Campay / voucher redeem first.
