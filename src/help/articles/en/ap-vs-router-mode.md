---
id: tip.ap-vs-router
slug: ap-vs-router-mode
title: "AP mode vs router mode on cheap extenders"
description: "AP or bridge mode forwards each phone’s MAC. Router mode NATs everyone behind one WAN MAC. Many cheap extenders (Pixlink, Tenda, and similar) only stay stable in router mode — discourage those boxes, or price that zone as one client."
role: ["owner"]
section: pro-tips
intents: ["ap vs router mode", "cheap extender", "bridge mode", "pixlink", "tenda", "travel router"]
buttons: ["Sessions", "Simultaneous devices", "On router"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.pixlink-nat", "tip.anti-tether-off"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

**AP mode** (access-point / bridge / “répéteur pur”) means the extender is a dumb radio. Phones keep their own MAC. The Hex sees each device.

**Router mode** (WISP, AP+Router, “routeur”) means the extender is a small NAT box. The Hex sees **one WAN MAC**. Every phone behind it looks like that box.

**WAN MAC** is the address on the cable or wireless uplink toward your hotspot, not the LAN addresses of phones in the house.

**Hex** is your MikroTik at the shop. **Cheap extender** means the low-cost repeaters and travel routers sold in the market (Pixlink, Tenda, no-name boosters). They are examples of the same class — not a SpaiHub object.

## Why it matters

In Douala, an 8 000 XAF extender is sold as “just extend the Wi‑Fi.” The menu is usually **AP** versus **Router**. AP is what you want if you sell per-phone packages. Router is what those boxes often fall back to because **AP mode on cheap chipsets flaps**, loses DHCP, or reboots when five phones join. Pixlink is one brand that behaves that way; plenty of others do too.

Incident from a New Bell corridor: owner switched the extender to AP, coverage died every evening, tenants shouted, he flipped back to router “so the Wi‑Fi stays.” Next day **Sessions** showed one **On router** MAC while the whole floor streamed. He thought **Simultaneous devices** was “broken.” It was counting MACs correctly — there was only one.

SpaiHub will not invent phones it cannot see. Anti-tether (TTL) stays off: dropping TTL=63 broke normal phones that were not sharing. Do not try to “fix AP vs router” with firewall magic.

**Discourage cheap extenders on the hotspot.** A proper AP that actually bridges is the coverage tool. A NAT box is a whole house on one voucher.

## What you see

On the extender’s own page (not SpaiHub):

- **AP / Bridge / Repeater** — good for per-device accounting if it stays up.
- **Router / WISP / AP+Router** — one client toward the Hex.

On SpaiHub:

- **Locations** → **Sessions**: one row per hotspot user the Hex reports.
- **On router** with one MAC after a whole house paid once = router-mode NAT (or a phone hotspot).
- Several MACs for the same username = they are actually joining your SSID separately (family plan or shared PIN), not hiding behind NAT.

Wrong diagnosis: “the Hex firmware is old,” “Script 1 duplicated users,” “fair use is not working because they are still online.” If they are still inside the browse window and under the hidden cap, NAT sharing is allowed by physics. The cap is shared with anyone on that same login.

## What to do

Tonight:

1. Label wall sockets: **no personal routers or cheap extenders.** A phone in hotspot mode toward your SSID is a mini router too.
2. If you need coverage in a courtyard, buy a proper AP that **bridges** (Ubiquiti-style, or a MikroTik cAP) and put it in AP mode. Do not fight an 8 000 XAF Pixlink, Tenda, or no-name booster into AP if it only survives in router mode.
3. Where you must leave a cheap extender in router mode, treat that floor as **one client**. Sell a family-priced plan or a time package with hidden fair use, not a 200 XAF 1-device walk-in you expect to stay exclusive.
4. Keep cheap packages at **Simultaneous devices** **1**. That still only limits MACs the Hex sees.
5. Leave anti-tether off. If an old script left `spaihub-anti-tether` comments in the firewall, re-paste **Setup script** → **2. Connect to SpaiHub** — current scripts remove those rules and do not put them back.

Do not promise a firmware update will “split” a router-mode extender into per-phone lines. It will not. See [Cheap extender in router mode](/help/pixlink-nat).

## What not to say

- Do not tell a tenant SpaiHub “blocked their Pixlink.” You did not block a brand. NAT hid them behind whatever box they used.
- Do not promise remaining fair-use GB on the guest page.
- Do not say TTL anti-tether is coming back. It broke phones; it stays off.
- Do not claim AP mode is always stable on cheap extenders. Many only hold in router mode — price that honestly, and prefer real APs.
