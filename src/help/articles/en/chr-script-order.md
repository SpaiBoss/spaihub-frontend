---
id: tip.chr-order
slug: chr-script-order
title: "CHR scripts must stay in order"
description: "Cloud Hosted Router setup is three pastes in order: Bootstrap, SpaiHub hotspot, then Connect to SpaiHub. Skipping or reversing leaves a VM with no DHCP, no portal, or heartbeat without grants."
role: ["owner"]
section: pro-tips
intents: ["CHR script order", "bootstrap", "cloud hosted router"]
buttons: ["Add CHR & open wizard", "Setup CHR", "Save & continue", "Preview captive portal"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.chr", "glossary.chr"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

**CHR** (Cloud Hosted Router) is MikroTik RouterOS running as a **virtual machine** in a cloud, not a plastic Hex on the counter. CHR has **no built-in Wi‑Fi**. You must plug an AP or switch into the LAN bridge port.

The CHR wizard is **three scripts**, in order:

1. **Bootstrap script** — bridge, DHCP, hotspot skeleton, NAT. Paste first.
2. **SpaiHub hotspot** — walled garden, profiles, `hotspot/login.html`.
3. **Connect to SpaiHub** — heartbeat + commands + hotspot-active. Paste last.

This is not the same labelling as physical Hex **Script 1** / **Script 2**, but the last paste is the same idea as Script 2: without it, payments do not grant.

## Why it matters

Incident: an owner in a Douala datacenter pasted **Connect to SpaiHub** first because the wizard page loaded that tab. Heartbeat never came (no working path), then they pasted bootstrap, then wondered why hotspot HTML 404’d. Order is not bureaucracy. Bootstrap creates the network the later fetches need. Hotspot HTML needs the hotspot. Connect needs HTTPS out and something to attach schedulers to.

Wrong diagnosis: “CHR license is fake because status stays Never seen.” More often: scripts reversed, WAN/LAN names wrong (`ether1` / `ether2` vs what `/interface print` shows), or cloud firewall blocking **TCP 443** egress. CHR trial/Level 4+ must include Hotspot — that part is real, but it is not the first thing to blame.

Never reverse the order. Do not skip bootstrap on a blank VM.

## What you see

**Add Router** → **MikroTik CHR** → **Add CHR & open wizard**, or later **Setup CHR**.

Wizard steps: **Prerequisites**, **Network layout**, **Bootstrap script**, **SpaiHub hotspot**, **Connect to SpaiHub**, **Verify connection**, **Complete**.

- **Waiting for router heartbeat...** after all three pastes. Should go **Router is online!** in about 1–2 minutes.
- **Not online yet** checklist: all three scripts without errors; schedulers `spaihub-heartbeat` and `spaihub-commands` exist; CHR can reach SpaiHub over HTTPS; walled garden includes portal and API hosts from the hotspot script.
- **Last seen: Never (normal without MikroTik)** on the location row is normal *before* connect works — same as a preview-only physical router.

Defaults: WAN `ether1`, LAN/AP `ether2`, hotspot bridge around `192.168.88.0/24`. **Save & continue** stores names before you paste.

## What to do

Tonight on a blank CHR:

1. Confirm Hotspot-capable license, outbound 443, security group allows egress, AP on LAN.
2. Verify interface names with `/interface print` before you trust defaults.
3. Paste **Bootstrap** → **SpaiHub hotspot** → **Connect to SpaiHub**. No remix.
4. Wait for **ONLINE**. Then add packages and **Preview captive portal**.
5. If you already reversed order, backup, start from bootstrap again rather than stacking random schedulers.

Do not paste Hex **Existing hotspot** Script 1 onto a blank CHR and expect a LAN. Blank CHR needs bootstrap.

## What not to say

- Do not tell the AP vendor that CHR “is a cheap Wi‑Fi extender.” CHR is the router VM; the AP should be in bridge/AP mode.
- Do not promise remaining fair-use GB on the CHR portal.
- Do not share cloud API tokens or live script URLs in a guest chat.
- Do not say skipping Connect is fine “because preview works.” Preview never needed the VM.
