---
id: tip.shared-creds
slug: credential-sharing
title: "Username + PIN can be shared"
description: "Whoever has the hotspot username and WiFi PIN can try to log in. Cheap plans should allow one MAC. Family plans should cost more. A cheap extender in router mode still looks like one device."
role: ["owner"]
section: pro-tips
intents: ["credential sharing", "username PIN", "share login"]
buttons: ["Simultaneous devices", "Disconnect this device", "End session for all devices", "Kick"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.price-dont-ban", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Credentials** on the guest network are **Username** + **WiFi PIN**. For MoMo, username is the **phone digits**. For tickets, username is **SPAI-XXXX-XXXX**. Either pair can be read aloud, screenshotted, or sent on WhatsApp.

**Simultaneous devices** is how many MACs may use that pair at once. It is not a promise that the PIN cannot be forwarded.

**Disconnect this device** / **End session for all devices** appear on family plans so the buyer can kick a cousin without calling the shop. **Kick** on owner **Sessions** ends the hotspot user from your side.

Sharing is allowed by physics. You **price** it. You do not **ban** it with TTL (anti-tether stays off).

## Why it matters

At a lycée gate, one 500 XAF MoMo PIN served three Androids until the 1-device limit bounced the fourth — unless they plugged in a cheap extender, in which case three Androids became **one MAC** and the limit never bounced. Both sentences can be true the same evening.

Wrong diagnosis: “if they shared the PIN, Sessions would show three rows, so we are safe.” Not behind NAT. Wrong diagnosis: “change the owner email so they cannot share.” Email is not the hotspot username.

Cheap plans use **1** simultaneous device *because* PINs travel. That is the whole reason.

MoMo usernames are phone digits — easy to shout across a yard. Voucher usernames are `SPAI-` plus a PIN on paper — easy to photograph. Neither is the owner email. Teaching the till those three identities is how you stop “reset the Gmail, the Wi‑Fi is shared.”

## What you see

After MoMo: **Save your username and PIN below**. After voucher redeem: same pair on the ticket PDF (**voucher code · WiFi PIN**).

Portal family copy: **Family plan — up to N devices can share this access code.**

When a second MAC joins a 1-device plan, MikroTik shared-users refuses it. The buyer thinks Wi‑Fi is “full.” It is the package you sold.

**Kick** toast: disconnect within ~15 seconds. Shared users all drop if they were the same hotspot user.

## What to do

1. Print on tickets: “Do not send this PIN if you bought a 1-phone plan.”
2. Sell a family package with **Simultaneous devices** 2–4 and a higher XAF price when sharing is the product.
3. If a PIN is circulating at the gate, **Kick**, and **Revoke** unused twins from the same batch if needed.
4. Do not install TTL drop rules to “punish sharing.” They broke ordinary phones.
5. If they NAT, treat it as one client: hidden fair use on time plans, house rule against extenders, family price if they want many MACs *on your SSID*.
6. After a shared PIN burns the hidden cap, the guest message is still **Fair use limit reached. Buy another package to continue.** — not a remaining-GB split among cousins.

## What not to say

- Do not say “the PIN only works on the phone that paid.” It works for whoever has it, up to the MAC limit you set, and NAT collapses MACs.
- Do not tell the cousins remaining fair-use GB so they can “share fairly.”
- Do not promise Settings can remote-wipe a WhatsApp screenshot.
- Do not mix owner password reset with guest PIN sharing.
