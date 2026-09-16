---
id: own.tut.chr
slug: setup-chr
title: "CHR from a blank VM (three scripts in order)"
description: "Cloud Hosted Router: bootstrap, hotspot, then connect. Do not skip or reorder."
role: ["owner"]
section: tutorials
intents: ["CHR", "cloud router"]
buttons: ["Add CHR & open wizard", "Setup CHR"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.chr-order", "own.tut.hex-existing"]
updatedAt: 2026-09-16
minutes: 15
---

## Before you start
CHR license with Hotspot (Level 4+ or trial). Outbound HTTPS. CHR has no Wi‑Fi — plug an AP or switch on the LAN bridge port.

## Steps
1. **Add Router** → **MikroTik CHR** → **Add CHR & open wizard** (or **Setup CHR** later).
2. Confirm WAN/LAN names (defaults `ether1` / `ether2`).
3. Paste **Bootstrap** first (bridge, DHCP, hotspot, NAT).
4. Paste **SpaiHub hotspot**.
5. Paste **Connect to SpaiHub**.
6. The wizard polls every 10s and marks **ONLINE** when a heartbeat arrives (about 2 minutes).

Never reverse the order.
