---
id: own.tut.hex-existing
slug: setup-mikrotik-hex-existing
title: "Physical Hex — existing hotspot (Script 1 then 2)"
description: "Your MikroTik already shows a login page. Overlay SpaiHub with Script 1, then connect with Script 2, without wiping WAN."
role: ["owner"]
section: tutorials
intents: ["hex", "script", "existing hotspot", "physical mikrotik", "setup script"]
buttons: ["Setup script", "Existing hotspot"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.script-1-vs-2", "tip.login-html", "own.tut.online-momo"]
updatedAt: 2026-09-16
minutes: 16
---

This job is for a **physical MikroTik** (Hex, hAP, and cousins) that **already** hands out IPs and already shows a hotspot login page. SpaiHub does not rebuild your WAN. You overlay SpaiHub in two pastes: **Script 1** (hotspot overlay) then **Script 2** (**Connect to SpaiHub**).

**Script 1** vs **Script 2** in one breath: 1 = walled garden, PAP, `login.html` / `status.html`. 2 = schedulers that talk to SpaiHub. Heartbeat alone does **not** grant WiFi after MoMo. Full split: [Script 1 vs Script 2](/help/script-1-vs-script-2).

If you do **not** already have a guest hotspot, use [Physical Hex — create guest hotspot](/help/setup-mikrotik-hex-guest) instead.

## What you will have

The same WAN you had this morning, plus SpaiHub’s captive HTML, plus three schedulers: **spaihub-heartbeat** (1 minute), **spaihub-commands** (15 seconds), **spaihub-hotspot-active** (2 minutes). Dashboard status should reach **ONLINE** (heartbeat within 2 minutes). Then you can [test MoMo](/help/test-momo-online).

RouterOS has **no** `login-url` property. That is why Script 1 downloads HTML files. See [RouterOS has no login-url](/help/no-login-url).

## Before you start

- Owner **Sign in**, a location, and a router row: **Locations** → **Routers** → **Add Router** → **Physical MikroTik**. Name it so the technician will not mix two Hexes.
- At least one active package so the portal is not empty.
- WinBox or a terminal on the Hex. You must paste into **this** box, not a neighbour’s.
- Confirm hotspot already assigns IPs and a login page appears when a phone joins the SSID.
- The Hex must reach SpaiHub over **HTTPS (TCP 443)** outbound. A walled garden that blocks the API host will sit **OFFLINE** forever.
- Backup the config if this Hex also runs the shop’s office VLAN. Script 1 on **Existing hotspot** is overlay, not a WAN wipe — still backup if you are nervous.

Do not skip Script 2 because “the page already looks pretty”. Pretty is Script 1. Paid WiFi is Script 2.

## Steps

1. **Locations** → expand the site → **Routers** → on the Hex row tap **Setup script**. The sheet says two pastes. You can still **Preview portal** any time.
2. **Script 1 path**: choose **Existing hotspot**. Hint on screen: hotspot must already assign IPs and show a login page; Script 1 only installs SpaiHub (walled garden, PAP, captive HTML).
3. Copy **1. Hotspot setup (once)** and paste it in the MikroTik terminal. Wait until it finishes without error. It installs the walled garden, PAP, and downloads `login.html` / `status.html`. It does **not** create `10.10.10.0/24` and it does **not** wipe WAN.
4. Copy **2. Connect to SpaiHub** (Script 2) and paste it next. This installs the three schedulers. Heartbeat marks **ONLINE**. **spaihub-commands** (15s) pulls GRANT/KICK. **spaihub-hotspot-active** (2m) reports who is actually on the box.
5. Stay on the dashboard until **Last Seen** is recent and status is **ONLINE** (≤ 2 minutes since heartbeat). **DEGRADED** is 2–5 minutes. **OFFLINE** is never or > 5 minutes.
6. Tap **Preview portal** and confirm the guest page. Then run a cheap live pay: [Confirm ONLINE and a test MoMo pay](/help/test-momo-online).

Re-pasting **Script 2** later should **not** mass-kick paying users. It refreshes polling. See [Re-paste the connection script](/help/repaste-connection-script). Re-run Script 1 only when the captive page itself is wrong.

![Screenshot](about:blank)
_Screenshot slot: Setup script with Existing hotspot selected (staging)._

## What you should see

- Terminal: scripts added, schedulers listed. On the Hex: `/system scheduler print` shows **spaihub-heartbeat**, **spaihub-commands**, **spaihub-hotspot-active**.
- Dashboard: not **Never (normal without MikroTik)** anymore.
- Guest SSID still your old SSID; login page now SpaiHub HTML.
- After MoMo: username = 9-digit phone, PIN 6 digits, **Connect to WiFi now** (~22s preparing). **Sessions** should show **On router**.

If you only have heartbeat, the row can go green while grants never land. Green is not “WiFi works”.

## If it fails

**Last seen still Never.** Script 2 did not run, HTTPS 443 is blocked, or you pasted on the wrong router. Check WAN DNS and that the Hex is not in a lab VLAN with no internet.

**ONLINE but paid users stay captive.** Commands scheduler missing. Confirm **spaihub-commands**. Re-paste Script 2 only. Staff script: [Paid but no WiFi](/help/paid-but-no-wifi). Do **not** take a second MoMo.

**Login page still the old MikroTik default.** Script 1 did not download HTML, or you are hitting a different hotspot profile. Paste Script 1 again on **Existing hotspot**. Remember: no `login-url` knob to twist.

**I pasted Create guest hotspot by mistake.** That path can add `10.10.10.0/24` on LAN. If you already had a working hotspot, stay on **Existing hotspot**. If you meant to build a guest net, switch articles: [create guest hotspot](/help/setup-mikrotik-hex-guest).

**Mass disconnect after a paste.** Script 2 should not mass-kick. If people dropped, look for a reboot, a DHCP change, or Script 1 hitting the wrong interface — not “SpaiHub hates my clients”.

**OFFLINE blocks Pay.** Expected. The portal disables MoMo until reconnect. Fix 443 and Script 2, then test.

You can **Remove** the router row if this Hex will never come back; guests will no longer reach the portal through it.
