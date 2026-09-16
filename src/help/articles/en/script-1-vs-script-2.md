---
id: tip.script-1-vs-2
slug: script-1-vs-script-2
title: "Script 1 vs Script 2"
description: "Script 1 overlays the hotspot (walled garden, PAP, login HTML). Script 2 runs heartbeat, commands every 15s, and hotspot-active. Grants and kicks need Script 2. Do not skip it."
role: ["owner"]
section: pro-tips
intents: ["script 1", "script 2", "connection script", "spaihub-commands"]
buttons: ["Setup script", "Existing hotspot", "Create guest hotspot"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "own.tut.repaste-script2"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

**Script 1** is **1. Hotspot setup (once)** on **Setup script**. Path is **Existing hotspot** (overlay) or **Create guest hotspot** (add-if-missing guest LAN). It installs walled garden, PAP, profiles, and downloads captive `login.html`. It is not the grant engine.

**Script 2** is **2. Connect to SpaiHub**. It installs `spaihub-heartbeat` (about every 1 minute), `spaihub-commands` (every **15 seconds**, GRANT/KICK), and `spaihub-hotspot-active` (tells SpaiHub who is actually online so **Sessions** can show **On router**).

A **GRANT** is the queued command that creates the hotspot user after MoMo or after **Sync unused to router**. A **KICK** removes the user when you tap **Kick** or when the session should end.

**Heartbeat** only answers “is this router alive?” Heartbeat is not enough to give Wi‑Fi after payment.

## Why it matters

Incident: Campay said SUCCESS, the portal showed username (phone digits) and PIN, the buyer tapped **Connect**, and the phone stayed captive. **Locations** showed the router **ONLINE** (heartbeat worked). **Sessions** stayed **Not seen** or empty. `/system scheduler print` had `spaihub-heartbeat` only — Script 2 was never finished, or an old banner was ignored. Staff took a second MoMo “to retry.” Do not. Recover with **Check payment status** and paste Script 2.

Wrong diagnosis: “Script 1 failed because status is ONLINE.” ONLINE means heartbeat. Grants need commands.

The dashboard may show **Update your router connection script** — re-run the connection script from **Locations** → your router → **Setup**. That banner is about Script 2 reliability (commands ack). Dismiss it after you paste.

Re-pasting Script 2 refreshes polling and should **not** mass-kick paying users. Re-pasting Script 1 is for a wrong captive page, not for a missed grant.

## What you see

On **Setup script**:

- **Script 1 path**: **Existing hotspot** or **Create guest hotspot**.
- Copy blocks labelled hotspot setup vs connect.

On the Hex (owner/technician terminal, not a guest conversation):

- Schedulers: `spaihub-heartbeat`, `spaihub-commands`, `spaihub-hotspot-active`.
- Missing commands scheduler = paid MoMo will not import users.

On **Sessions**: **On router** after hotspot-active reports the user. **Not seen** means the grant never landed or the phone never logged in.

## What to do

Tonight, if people pay and do not browse:

1. Confirm **ONLINE** or at least not **OFFLINE** (offline also blocks new MoMo).
2. On the phone: **Check payment status**. Do not charge twice.
3. Paste **2. Connect to SpaiHub** only if schedulers are missing or grants never arrive.
4. Wait ~15 seconds (commands interval), then check **Sessions**.
5. Use Script 1 again only if the captive page is still stock MikroTik or branding/fair-use HTML is stale.

CHR is a different three-script order (bootstrap → hotspot → connect). Do not mix Hex Script 1/2 labels with the CHR wizard names.

## What not to say

- Do not tell a buyer “the router is online so your Wi‑Fi must work.” Online ≠ grant.
- Do not take a second payment because Script 2 was missing.
- Do not promise remaining fair-use GB while you debug scripts.
- Do not paste Script 1 over a working overlay “just in case” during peak hour unless the login page is wrong.
