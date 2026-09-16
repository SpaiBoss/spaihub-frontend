---
id: own.tut.preview
slug: preview-captive-portal
title: "Preview the captive portal"
description: "Open the same guest WiFi page buyers will see, even while Last seen is Never and no MikroTik is online."
role: ["owner"]
section: tutorials
intents: ["preview", "portal", "captive portal", "preview portal", "no hardware"]
buttons: ["Add Router", "Preview portal"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.time-package", "tip.preview-first"]
updatedAt: 2026-09-16
minutes: 8
---

The **captive portal** is the page a guest sees when they join your hotspot: **Pay with MoMo** or **I have a voucher**. SpaiHub lets you open that page from the dashboard with **Preview portal**. You do not wait for a Hex on the wall. **Last seen: Never (normal without MikroTik)** is the expected label until the connection script heartbeats.

This is the calm Douala move: design prices and branding on a laptop at the shop counter, then paste scripts when the technician arrives. See also [Preview before hardware](/help/preview-without-hardware).

## What you will have

A router **row** on the location (physical or CHR — the row is enough). A new browser tab with the guest page for that router. You can tap packages, read **Unlimited data** on time plans, and confirm your **Portal branding**. You cannot complete a live MoMo grant onto a box that is **OFFLINE**, and the portal will say so.

Preview does not replace [Confirm ONLINE and a test MoMo pay](/help/test-momo-online). It proves the page, not the heartbeat.

## Before you start

- At least one location. If **No locations yet**, do [Add a location without a router](/help/add-location).
- At least one **active** package if you want the catalogue to show prices. With zero packages the guest page says **No internet packages are available at this location yet.** Add a [time package](/help/create-time-package) first if you care about that copy.
- Optional: **Settings** → **Portal branding** so the preview shows your name instead of defaults.
- A browser that can open a second tab. Phone is fine.

You do **not** need Script 1, Script 2, Campay, or an SSID.

## Steps

1. Open **Locations**, expand the site, open **Routers**.
2. If the list is empty, tap **Add Router**. Fill **Router name** (for you: “Hex Akwa”, “CHR Bastos”). Choose **Router type**: **Physical MikroTik** (Hex / hAP) or **MikroTik CHR** (cloud VM). For a first preview, **Physical MikroTik** is enough even if the box is still in the carton.
3. Tap **Add Router** (or **Add CHR & open wizard** if you chose CHR and want the wizard now — you can still preview later with **Preview portal**).
4. On the router row, confirm **Last Seen** may be **Never (normal without MikroTik)**. That is not broken.
5. Tap **Preview portal**. A new tab opens the guest page.

On that page you should see **Pay with MoMo** and **I have a voucher**. Time packages advertise browse duration and **Unlimited data** — they do not show a leftover gigabyte number. Data packages show **Download allowance**. Family packages can say **Up to N devices**.

Walk the empty states: no package selected, voucher field placeholder `SPAI-XXXX-XXXX`, PIN field **6-digit PIN**. Do not collect a customer’s MoMo here unless the router is **ONLINE** and you mean to run a real test.

![Screenshot](about:blank)
_Screenshot slot: router row with Last seen Never and Preview portal (staging)._

## What you should see

- Dashboard router row: name, status **Offline** or never seen, actions **Setup script** (physical) or **Setup CHR** (CHR), **Preview portal**, **Remove**.
- Guest tab: your **Brand name on the portal** if you saved branding, otherwise SpaiHub defaults. Welcome text such as **Pay with Mobile Money to get online instantly**.
- **Powered by www.spaitrace.com** stays on the captive page.
- If the router is **OFFLINE**, MoMo **Pay {{amount}} XAF** is blocked with **Router offline — Mobile Money payments are unavailable until it reconnects.** Preview still works; pay does not. **DEGRADED** warns that payments may be delayed.

Status meaning, for later: **ONLINE** means a heartbeat in the last 2 minutes; **DEGRADED** is 2–5 minutes; **OFFLINE** is never, or more than 5 minutes.

## If it fails

**Preview portal missing.** You must have a router **row**. **Add Router** first. The location alone has no portal link.

**New tab is blank or “Router not found”.** Try again from the same row. Do not paste random URLs from old chats. If you **Remove**d the router, the old preview link dies.

**No packages on the page.** Add an active package under **Packages** → **Add Package**. Deactivated packages do not sell.

**Looks unbranded.** **Settings** → **Portal branding** → **Save branding**. Logo rules: PNG, JPEG, or WebP, 512 KB or smaller. See [Brand the captive portal](/help/brand-the-portal).

**I thought Preview would put phones online.** No. Heartbeat plus the **commands** scheduler grant WiFi. Preview is the shop window. Next hardware job: [Physical Hex — existing hotspot](/help/setup-mikrotik-hex-existing) or [CHR](/help/setup-chr), then a cheap [MoMo test](/help/test-momo-online).

**Pay with MoMo is grey while I preview.** If the row is **OFFLINE**, that is correct. You can still read package names, **I have a voucher**, and branding. Collecting a real MoMo in this state is how you create an orphan pay. Wait for **ONLINE**, or stay on preview-only.

**Guest copy says Unlimited data.** That is a time package doing its job. Data packages show **Download allowance**. Do not “correct” the guest page by quoting a hidden fair-use number from **Details**.
