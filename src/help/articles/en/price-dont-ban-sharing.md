---
id: tip.price-dont-ban
slug: price-dont-ban-sharing
title: "Price sharing, do not pretend to ban it"
description: "Username plus PIN can be shared. Cheap plans should be one device. Family plans should cost more. Do not promise a ban you cannot enforce behind NAT."
role: ["owner"]
section: pro-tips
intents: ["price sharing", "family package", "do not ban tethering"]
buttons: ["Simultaneous devices", "Add Package", "Disconnect this device", "End session for all devices"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.family-package", "tip.shared-creds"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Access code** here means the hotspot **Username** plus **WiFi PIN** shown after MoMo or printed on a voucher. Anyone who has both can try to log in.

**Simultaneous devices** is how many distinct Wi‑Fi MACs may use that username and PIN at once (1–20). Phones behind a home router in router/NAT mode still count as **one** MAC.

A **family package** is not a special SpaiHub product type. It is an ordinary time or data package with **Simultaneous devices** set to 2–4 and a higher XAF price.

**Ban** would mean the network can refuse sharing. SpaiHub does not pretend to do that with TTL. Sharing is priced.

## Why it matters

At Deido market, a 200 XAF hour with a PIN written on the ticket will be WhatsApp’d to three cousins before the hour ends. That is Cameroon, not a defect. If you shout “sharing is forbidden” and then sell the cheapest plan in the street, you train people to hide behind a cheap extender.

The honest shop: walk-in 1 device, family 2–4 devices, hidden fair use on time so a shared login cannot download the uplink. You still cannot see phones behind NAT. You still should not promise a ban.

Wrong diagnosis: “we need anti-tether so family plans are not cheated.” Family plans assume sharing. Cheap plans assume one MAC. NAT cheats the MAC counter, not the family checkbox. Price the risk; do not invent a firewall story.

## What you see

On **Add Package**:

- **Simultaneous devices** with hint: how many distinct Wi‑Fi MACs can use the same username and PIN. Use 1 for a single device, or 4 for a family package. NAT still counts as one MAC.

On the guest portal, when the package allows more than one device:

- **Family plan — up to N devices can share this access code.**
- **Disconnect this device** and **End session for all devices**.

On a 1-device plan those family controls are not the story. The PIN is still the secret. The username for MoMo is usually the phone digits — easy to tell a friend. The PIN is what you actually sold.

## What to do

1. Put two products on the board: “1 phone” and “maison / 4 appareils” with a real price gap in XAF.
2. **Locations** → **Packages** → **Add Package**. Set **Simultaneous devices** on the package — do not rely on **Access policy** fallback except for old vouchers missing a package limit.
3. Keep **Fair use data limit (hidden from subscribers)** on time packages so a shared PIN cannot stream your fibre to death. Do not tell guests remaining GB.
4. If someone resells your PIN at the gate, **Kick** and **Revoke** unused vouchers; change the story at the counter, not with TTL.
5. If a “1 device” sale is clearly a NAT house, **Kick** if that is your house rule, then offer the family price. Do not refund and also leave the PIN alive.

## What not to say

- Do not say “SpaiHub blocks sharing.” Username + PIN can be shared. You limit MACs you can see.
- Do not promise you will catch every cheap extender. One WAN MAC looks legitimate.
- Do not read remaining fair-use GB to the cousins sharing a PIN.
- Do not tell them anti-tether is “on for cheaters.” It stays off because it broke phones.
