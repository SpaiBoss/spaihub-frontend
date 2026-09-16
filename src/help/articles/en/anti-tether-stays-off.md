---
id: tip.anti-tether-off
slug: anti-tether-stays-off
title: "Anti-tether (TTL) stays off"
description: "SpaiHub does not install TTL anti-tether firewall rules. Older TTL=63 drops broke ordinary phones. Price sharing and hide a fair-use cap instead of pretending to ban tethering."
role: ["owner"]
section: pro-tips
intents: ["anti tether", "TTL", "tethering", "hotspot sharing"]
buttons: ["Setup script", "Simultaneous devices", "Fair use data limit (hidden from subscribers)"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.price-dont-ban", "tip.fair-use-hidden"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Tethering** is a phone sharing its Wi‑Fi (or USB) with other devices. A **phone hotspot** used as a second router toward your SSID is the same family of problem as a cheap extender in router mode: NAT, one WAN MAC.

**TTL** (time to live) is a number in every IP packet. Some hotspots try to guess “this packet was forwarded” by dropping unusual TTLs. A common amateur rule was **TTL=63 drop**.

**Anti-tether** in old SpaiHub scripts meant those MikroTik mangle/filter rules with comment `spaihub-anti-tether`. Current **Setup script** / **2. Connect to SpaiHub** **removes** them and **never reinstalls** them.

## Why it matters

We tried to “stop sharing” with TTL. It did not stop cheap extenders in router mode (those already look like one client). It **did** break walk-in phones that were not sharing: Tecno, Samsung, some iPhones, random Android VPN apps. Captive portal opened, MoMo paid, **Connect** looked fine, then the phone could not browse. Staff refunded. That is why anti-tether stays off — incident-backed, not a slogan.

Sharing is a price and cap problem, not a firewall-magic problem. A 1-device walk-in plus hidden fair use plus a family package is the shop policy that survives Saturday night. Pretending you “banned tethering” trains customers to argue when their cousin’s phone still works behind NAT.

Wrong diagnosis: “TTL will fix the compound that bought one voucher.” That compound is one MAC. TTL never saw the inner phones. If you re-add TTL=63 by hand, you will spend tonight unbreaking customers who paid.

## What you see

On a current Hex, after Script 2: schedulers `spaihub-heartbeat`, `spaihub-commands`, `spaihub-hotspot-active`. You should **not** see new `spaihub-anti-tether` firewall comments being added.

On the package form, when fair use is on, the hint says SpaiHub does not use anti-tether firewall rules. That sentence is deliberate.

On **Sessions**, a tethered house still looks like **On router** + one MAC. **Kick** drops that MAC. They can reconnect with the same username and PIN until the package ends.

## What to do

Tonight:

1. Do **not** paste TTL drop rules from a Facebook “MikroTik hotspot” post.
2. If an old install still has `spaihub-anti-tether` in `/ip firewall`, paste **2. Connect to SpaiHub** again. The connection script starts by removing those legacy rules.
3. Sell honestly: **Simultaneous devices** **1** on cheap plans; 2–4 on family plans; **Fair use data limit (hidden from subscribers)** on time packages (default 2 GB, hidden from buyers).
4. House rule: no personal routers. Enforce with **Kick** and staff, not TTL.
5. If a paying phone cannot browse after login, suspect leftover TTL or a walled-garden/HTTPS problem — not “they are tethering so we drop them.”

## What not to say

- Do not tell guests “tethering is impossible on SpaiHub.” It is not. NAT still works. You priced and capped it.
- Do not promise a future TTL switch in **Settings**. Settings has portal branding, not an anti-tether toggle, and no notification bell.
- Do not quote remaining fair-use GB to guests if you cut them for abuse.
- Do not blame Script 2 for “allowing hotspot” — Script 2 is required for grants; it is not a tethering permit.
