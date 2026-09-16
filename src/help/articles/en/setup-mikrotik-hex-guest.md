---
id: own.tut.hex-guest
slug: setup-mikrotik-hex-guest
title: "Physical Hex — create guest hotspot"
description: "Add a 10.10.10.0/24 guest network on LAN when the Hex has no hotspot yet. WAN and wireless are not wiped."
role: ["owner"]
section: tutorials
intents: ["guest hotspot", "create guest", "10.10.10", "hex from scratch"]
buttons: ["Create guest hotspot"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "tip.walled-garden"]
updatedAt: 2026-09-16
minutes: 15
---

Use this when the physical MikroTik does **not** already show a hotspot login page. **Create guest hotspot** adds a guest network on LAN at **10.10.10.0/24** if it is missing. It does **not** wipe WAN. It does **not** wipe wireless. Office PCs on WAN should keep their internet while you build the guest side.

If the box **already** assigns hotspot IPs and a login page, stop. Use [Physical Hex — existing hotspot](/help/setup-mikrotik-hex-existing) so you do not stack a second guest net by accident.

The Hex still needs **HTTPS (TCP 443)** out to SpaiHub. Walled garden must include the API host. Cloud or ISP firewalls that block 443 leave you **OFFLINE**. See [Hex needs HTTPS out to SpaiHub](/help/walled-garden-https).

## What you will have

A guest LAN (default idea: often **ether2**) with `10.10.10.0/24`, a hotspot overlay (Script 1), and **Connect to SpaiHub** (Script 2) with **spaihub-heartbeat** (1m), **spaihub-commands** (15s), **spaihub-hotspot-active** (2m). Phones on the guest SSID/port get a SpaiHub login page. WAN (**ether1** in many shops) stays the uplink.

## Before you start

- **Add Router** as **Physical MikroTik** on the right location.
- A package so the portal is not empty.
- Terminal/WinBox. Run `/interface print` **before** you guess names. Some Hexes renamed ports. Some shops put the AP on **ether3**. The dashboard fields **LAN (guest)** and **WAN** must match reality.
- Know which cable is the guest AP. Plugging the AP into WAN will confuse everyone at 22:00 in the cité.
- Backup if this Hex is also the shop’s only router. Create guest is add-if-missing, not a full reset — still backup.
- Outbound 443. No captive on the WAN side that blocks SpaiHub.

Script 1 is overlay (walled garden, PAP, HTML). Script 2 is connection. Same rule as the existing-hotspot article: do not skip 2.

## Steps

1. **Locations** → **Routers** → **Setup script**.
2. **Script 1 path** → **Create guest hotspot**. On-screen hint: add-if-missing guest network on LAN (`10.10.10.0/24`); does not wipe WAN or wireless; set your guest port below.
3. Set **LAN (guest)** (often `ether2`) and **WAN** (often `ether1`). Confirm with `/interface print`. Wrong names = guest DHCP on the uplink. Do not “try both” during peak.
4. Copy **1. Hotspot setup (once)** and paste in the terminal. Wait for success. This creates the guest overlay as needed and installs SpaiHub HTML. RouterOS still has **no** `login-url`; HTML files are the login.
5. Copy **2. Connect to SpaiHub** and paste. Schedulers appear.
6. Wait for **ONLINE**. **Last seen Never (normal without MikroTik)** should go away.
7. Connect a test phone to the **guest** SSID or the AP on the LAN port — not the office WAN. Open the captive page. **Preview portal** still works from the dashboard even before that.

Then a cheap MoMo: [test MoMo online](/help/test-momo-online).

![Screenshot](about:blank)
_Screenshot slot: Create guest hotspot with LAN ether2 and WAN ether1 (staging)._

## What you should see

- Guest clients in `10.10.10.0/24` (unless you already had another guest plan and the script left it).
- Shop WAN still up. If the whole building died, you pasted on the wrong interface — restore the backup, do not keep pasting.
- `/system scheduler print` lists the three **spaihub-*** jobs.
- Portal: **Pay with MoMo** / **I have a voucher**. Offline still blocks **Pay {{amount}} XAF**.

Re-paste Script 2 if polling dies; it should not mass-kick. Re-paste Script 1 only if the login HTML is wrong.

## If it fails

**WAN died.** Likely LAN/WAN names swapped. Pull the guest AP cable, restore config, `/interface print`, start again. Create guest is not supposed to wipe WAN; a wrong port selection can still break a small Hex topology.

**No DHCP on phones.** AP not on the LAN guest port, or phones still on a different SSID. Create guest does not configure every wireless package in Cameroon — you still aim the AP at the guest Ethernet.

**OFFLINE forever.** 443 blocked, DNS broken, or Script 2 never pasted. Walled garden must allow the SpaiHub hosts from the script. See [walled garden / HTTPS](/help/walled-garden-https).

**I already had a hotspot and now two portals.** You wanted **Existing hotspot**. Read [existing hotspot](/help/setup-mikrotik-hex-existing) and do not run Create guest on a box that already logins.

**ONLINE but no grant after pay.** **spaihub-commands** missing. [Re-paste Script 2](/help/repaste-connection-script). Do not charge the customer twice.

**CHR confusion.** This article is physical Hex. Cloud VMs use [CHR from a blank VM](/help/setup-chr) — CHR has no Wi‑Fi; you still hang an AP on the LAN bridge.

After Create guest, treat Script 2 as sacred as Script 1. A pretty login page with **Last seen Never** is only half the job. Phones on `10.10.10.0/24` still need commands to import a MoMo grant. When that works, run [test MoMo online](/help/test-momo-online) on a cheap SKU before Saturday night. If you later refresh polling, paste Script 2 only: [re-paste connection script](/help/repaste-connection-script).
