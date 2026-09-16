---
id: own.tut.location
slug: add-location
title: "Add a location without a router"
description: "Create a hotspot site so you can add packages, add a router row, and preview the captive portal before any MikroTik is online."
role: ["owner"]
section: tutorials
intents: ["location", "add site", "add location", "shop", "hotspot site"]
buttons: ["Add Location", "Create"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.preview", "own.ref.locations"]
updatedAt: 2026-09-16
minutes: 8
---

A **location** in SpaiHub is one hotspot site — one shop, one corridor, one cité courtyard — not a GPS pin and not the MikroTik itself. You create the location first, then you hang routers and packages on it. You do not need hardware on the desk to finish this job.

Think of it as the folder for “Akwa corridor” or “Bastos night shop”. Guests will later see packages for that site. You can still [preview the captive portal](/help/preview-captive-portal) with **Last seen** **Never (normal without MikroTik)**.

## What you will have

One location row on **Locations**. Expanded, you will see four tabs: **Routers**, **Packages**, **Sessions**, **Access policy**. Empty is fine. You can **Edit location**, **Suspend**, or **Activate** without deleting history.

On a phone, **Locations** is the **Sites** short in the bar. Same page.

## Before you start

- An **Active** owner account and **Sign in**. If you are still on **Check your email**, finish [Create your owner account](/help/create-owner-account) first.
- A name people in the shop will recognise. “Akwa 2” is better than “Router 1”.
- An address string. It does not have to be cadastral — “Face Total, Bessengue” is enough for you and staff.
- No MikroTik required. No package required yet, though the portal will say no packages until you add one.

If **Locations** already lists sites, you can still add another. One owner can run several corridors. A location is cheaper to split now than to untangle later when Akwa MoMo and the night-shop vouchers share one pile of **Transactions**.

On a phone the nav short is **Sites**. The empty title **No locations yet** is the same job — **Add Location**, then **Create**. You are not looking for a notification bell. This page is the shop folder.

## Steps

1. Open **Locations** (phone: **Sites**). If this is your first site, the empty title is **No locations yet**. The body tells you to add a hotspot location to deploy routers and sell packages.
2. Tap **Add Location**.
3. Fill **Location name** (shop or neighbourhood) and **Address**.
4. Tap **Create**. You should get a toast such as **Location created**.
5. Find the new row. Expand it (tap the row / chevron). Confirm the four tabs: **Routers**, **Packages**, **Sessions**, **Access policy**.

You can tap **Edit location** any time to change **Location name** or **Address**, then **Save changes**. That does not move routers or wipe sales.

**Suspend** on the location row stops new portal sales for that site and kicks live sessions. Use it when the shop is closed for a week or the Hex is in the repair box. **Activate** turns selling back on. Do not confuse **Suspend** with deleting the location — history on **Transactions** stays.

![Screenshot](about:blank)
_Screenshot slot: Locations empty state and Add Location form (staging)._

## What you should see

- The list count, for example **1 location**.
- Empty **Routers** copy: no routers yet, and that you can still get a captive portal link without a physical box.
- Empty **Packages**: no packages yet, add one so subscribers can buy.
- Empty **Sessions**: **No active sessions at this location.**
- **Access policy** explains that **Simultaneous devices** live on each package; this tab is only a fallback for some vouchers.

None of that is an error. Hardware comes in [Physical Hex — existing hotspot](/help/setup-mikrotik-hex-existing) or [CHR from a blank VM](/help/setup-chr). Packages come in [Create a 1-hour time package](/help/create-time-package).

Full control names: [Locations reference](/help/reference-locations).

## If it fails

**Create does nothing / Location name required.** Both **Location name** and **Address** need a value. Do not paste only spaces.

**I added a router by mistake.** This job does not require **Add Router**. If you already added one, **Last seen** **Never (normal without MikroTik)** is expected until Script 2 heartbeats. You can still **Preview portal**. **Remove** deletes the router row and guests will no longer reach the portal through it — only do that if you meant to.

**Wrong neighbourhood name.** **Edit location** → **Save changes**. Guests see the brand from **Settings** → **Portal branding**, not necessarily this internal name.

**Suspended and nobody can pay.** That is the point of **Suspend**. Tap **Activate**. If you only wanted to kick one abusive phone, use **Kick** on **Sessions** instead — see [Kick a session or suspend a location](/help/kick-and-suspend).

**Two shops, one location.** Split them: **Add Location** again. Packages, vouchers, and MoMo rows are easier to read per site when the corridor and the night shop are not mixed.

**Access policy** can wait. Simultaneous devices belong on each package (walk-in = 1, family = 2–4). The location fallback is only for some vouchers when a package limit is missing. Do not pause here to invent a house ban — [price sharing instead](/help/price-dont-ban-sharing).

After **Create**, a healthy next hour looks like: add a cheap [time package](/help/create-time-package), **Add Router**, then [preview the captive portal](/help/preview-captive-portal) before anyone climbs a pole. Hardware scripts come when the Hex is actually on the desk. **Last seen** **Never (normal without MikroTik)** on that router row is still success for a preview-only afternoon.
