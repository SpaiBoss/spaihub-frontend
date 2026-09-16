---
id: own.tut.hex-existing
slug: setup-mikrotik-hex-existing
title: "Physical Hex — existing hotspot (Script 1 then 2)"
description: "Your MikroTik already shows a login page. Overlay SpaiHub without wiping WAN."
role: ["owner"]
section: tutorials
intents: ["hex", "script", "existing hotspot"]
buttons: ["Setup script", "Existing hotspot"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.script-1-vs-2", "tip.login-html", "own.tut.online-momo"]
updatedAt: 2026-09-16
minutes: 12
---

## Before you start
Hotspot already assigns IPs. Router can reach the SpaiHub API on HTTPS (TCP 443).

## Steps
1. **Locations** → **Routers** → **Setup script**.
2. Script 1 path: **Existing hotspot**.
3. Copy Script 1 into the MikroTik terminal. It installs walled garden, PAP, and downloads `login.html` / `status.html`. RouterOS has **no** `login-url` property — that is why we install HTML files.
4. Copy **Script 2** (connection): heartbeat + **commands** scheduler.
5. Wait until status is **ONLINE**.

Do not skip Script 2. Heartbeat alone does not grant WiFi after MoMo.

Re-pasting Script 2 refreshes polling and should **not** mass-kick paying users.
