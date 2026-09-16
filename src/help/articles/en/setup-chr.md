---
id: own.tut.chr
slug: setup-chr
title: "CHR from a blank VM (three scripts in order)"
description: "Cloud Hosted Router: Prerequisites, Network, Bootstrap, SpaiHub hotspot, Connect, Verify. Do not skip or reverse the order."
role: ["owner"]
section: tutorials
intents: ["CHR", "cloud router", "wizard", "bootstrap", "virtual router"]
buttons: ["Add CHR & open wizard", "Setup CHR"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.chr-order", "own.tut.hex-existing"]
updatedAt: 2026-09-16
minutes: 16
---

**CHR** means MikroTik **Cloud Hosted Router**: RouterOS in a virtual machine. It has **no built-in Wi‑Fi**. You still plug an access point or a switch on the LAN bridge so phones in the cité can join an SSID. SpaiHub walks you with a wizard. Order is not a suggestion. See [CHR scripts must stay in order](/help/chr-script-order).

Wizard steps on screen: **Prerequisites** → **Network layout** → **Bootstrap script** → **SpaiHub hotspot** → **Connect to SpaiHub** → **Verify connection**.

This is not the physical Hex **Setup script** (two pastes). Hex overlay is [existing hotspot](/help/setup-mikrotik-hex-existing). Do not mix the pastes.

## What you will have

A CHR row on the location, interfaces named correctly (defaults **ether1** WAN / **ether2** LAN), hotspot + NAT from bootstrap, SpaiHub HTML from the hotspot script, heartbeat + commands from **Connect to SpaiHub**, and **ONLINE** after a heartbeat (often about 1–2 minutes). An AP on LAN so humans can join.

## Before you start

- CHR license that includes **Hotspot**: **Level 4+** (or a trial that actually includes Hotspot). Level 1 without Hotspot will waste your Saturday.
- VM can reach the internet on **HTTPS 443** outbound. Cloud security groups that allow “everything in” but block egress will stay **OFFLINE**.
- Confirm `/interface print` inside CHR. Defaults in the wizard: WAN on **ether1**, LAN/AP on **ether2**, hotspot bridge often documented as `192.168.88.0/24` in the network step. If your cloud NIC order is reversed, change the names **before** bootstrap.
- An AP or switch on the LAN bridge port. CHR will not emit Wi‑Fi from the hypervisor.
- A location in SpaiHub and at least one package for later testing.
- Backup if this VM is not blank. The warning on screen: run scripts in order on a fresh CHR or backup first.

Never reverse Bootstrap → hotspot → connect. Never skip Bootstrap because “I already made a bridge in a YouTube video”.

## Steps

1. **Locations** → **Routers** → **Add Router** → **MikroTik CHR**. Tap **Add CHR & open wizard**. If the row already exists, tap **Setup CHR**.
2. **Prerequisites.** Confirm Hotspot license, HTTPS 443 out, egress allowed, and that you understand there is no built-in Wi‑Fi. Continue.
3. **Network layout.** Defaults: **ether1** WAN, **ether2** LAN. Set **WAN interface**, **LAN interface**, bridge, hotspot name, CIDR, gateway, DHCP pool if you must. **Save & continue**. Verify names with `/interface print` on the VM, not from memory.
4. **Bootstrap script.** Paste this **first** in the CHR terminal. It creates bridge, DHCP, hotspot, and NAT. Wait for success.
5. **SpaiHub hotspot.** Paste **after** bootstrap. Walled garden, SpaiHub profiles, download of `hotspot/login.html`. RouterOS has no `login-url`.
6. **Connect to SpaiHub.** Paste **last**. Heartbeat + command polling so grants land after MoMo. Same idea as Hex Script 2: heartbeat is presence; commands are GRANT/KICK.
7. **Verify connection.** The wizard polls about every 10 seconds and marks **ONLINE** when a heartbeat arrives (about 1–2 minutes). If it waits, use **Re-check scripts**. When **Router is online!**, add packages if needed and **Preview captive portal**.

![Screenshot](about:blank)
_Screenshot slot: CHR wizard Network layout with ether1 WAN / ether2 LAN (staging)._

## What you should see

- Schedulers **spaihub-heartbeat** and **spaihub-commands** (and hotspot-active on the connect script).
- Dashboard **Last Seen** fresh, status **ONLINE** (≤2 min), not **DEGRADED** (2–5) or **OFFLINE**.
- **Preview portal** shows **Pay with MoMo**. Live phones need the AP on LAN, not a browser on the hypervisor only.
- **Powered by www.spaitrace.com** on the captive page.

After that: [test MoMo](/help/test-momo-online). Re-paste connect if polling dies; it should not mass-kick.

## If it fails

**Not online yet.** Wizard checks: all three scripts pasted without errors; schedulers exist; CHR can reach SpaiHub over HTTPS; walled garden includes portal and API hosts from the connect script.

**Hotspot feature missing.** License is not Level 4+. Bootstrap will not save you. Fix the licence, do not reorder scripts.

**Phones have no SSID.** CHR has no radio. Cable the AP to LAN. Putting the AP on WAN skips the hotspot.

**I pasted Connect first.** You skipped the overlay. Start from Bootstrap on a known-good (or restored) VM. Order is the whole product: [CHR script order](/help/chr-script-order).

**ONLINE, pay works in preview, phones stay captive on the AP.** Commands scheduler, or phones not on the hotspot bridge. Same staff path as Hex: [paid but no WiFi](/help/paid-but-no-wifi). No second MoMo.

**Wrong NIC names.** Cloud “eth0” stories do not override `/interface print`. Change **Network layout**, do not force ether1 if the WAN is ether2.

**Physical Hex sitting in the rack.** Wrong article. Use **Setup script**, not **Setup CHR**.

Once **ONLINE**, add or confirm packages, **Preview captive portal**, then a cheap live pay. CHR without an AP on LAN is a VM that only you can admire. The cité still needs an SSID. If grants fail after a pretty wizard, you are in the same staff path as Hex: commands scheduler, [re-paste connect](/help/repaste-connection-script), no second MoMo. Keep script order for the life of the VM — [CHR script order](/help/chr-script-order).
