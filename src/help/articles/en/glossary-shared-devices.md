---
id: glossary.shared
slug: glossary-shared-devices
title: "Simultaneous devices"
description: "Simultaneous devices is how many distinct Wi-Fi MACs may use one username and PIN at once. Package value wins over Access policy fallback. 0 on the fallback means one device. NAT still counts as one MAC."
role: ["owner", "contributor"]
section: glossary
intents: ["simultaneous devices", "shared devices", "family plan"]
buttons: ["Simultaneous devices", "Devices per access code (fallback)", "Disconnect this device"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.family-package", "tip.access-fallback"]
updatedAt: 2026-09-16
minutes: 4
---

## Terms

**Simultaneous devices** is a package field (1–20). It is MikroTik **shared-users**: how many distinct **MACs** can sit on the same hotspot username + PIN at once.

A **family package** is simply that number set to 2–4 with a higher XAF price. The portal then shows **Family plan — up to N devices**, **Disconnect this device**, **End session for all devices**.

**Access policy** **Devices per access code (fallback)** is used only when a voucher/grant lacks a package limit. **0 = one device**. Package **Simultaneous devices** **wins** when present.

**MAC randomization** can make one phone look new. **NAT** (cheap-extender router mode, phone hotspot) makes many phones look like **one** MAC. Simultaneous devices cannot split NAT.

Contributors do not set this field. They may still hear “family plan” at the shop.

## Why it matters

If you think simultaneous devices means “people I can see with my eyes,” Saturday night will confuse you. The Hex counts radio identities it sees. A courtyard behind one extender is one.

Wrong diagnosis: “raise location fallback to 8 so cheap plans become family.” Package 1 still wins.

Anti-tether will not raise the MAC counter. It stays off because TTL=63 dropped ordinary phones. Sharing is this field plus price plus hidden fair use — not a firewall rumour from Facebook.

## What you see

Package hint: 1 for a single device, 4 for family; NAT counts as one MAC.

Location hint: prefer setting **Simultaneous devices** on each package.

Owner **Sessions**: one row per hotspot user, not per inner phone. **Kick** on that row drops every device using the same username — family or NAT house alike. Wait ~15 seconds for `spaihub-commands`.

## What to do

Owners: put 1 on walk-in, 2–4 on family, save packages, do not rely on fallback. Price sharing; do not install TTL. Test two phones on your SSID (not behind a cheap extender) after you raise the number. Contributors: if two phones fail on a 1-device plan, that is the product, not a broken uplink.

## What not to say

- Do not say simultaneous devices “sees through” a cheap extender.
- Do not say 0 fallback = unlimited.
- Do not tell guests remaining fair-use GB as a sharing allowance. Fair use is hidden bytes, not extra MACs.
- Do not tell a contributor their **Links** cap Mbps is the same as simultaneous devices. One is uplink metering language; the other is hotspot logins.
