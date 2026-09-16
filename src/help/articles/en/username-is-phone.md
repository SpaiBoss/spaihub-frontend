---
id: tip.username-is-phone
slug: username-is-phone
title: "MoMo username is the phone digits"
description: "After a MoMo purchase the WiFi username is the buyer’s phone digits. Owner and contributor account login is still email. Vouchers use SPAI-XXXX-XXXX plus PIN. Do not mix the three."
role: ["owner"]
section: pro-tips
intents: ["username phone", "hotspot username", "email login", "SPAI voucher"]
buttons: ["Pay", "Connect", "I have a voucher", "Redeem voucher"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.online-momo", "tip.shared-creds"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Account login** (owner or contributor) is **email** plus password on the SpaiHub app. That email is never the guest hotspot username.

**MoMo Wi‑Fi username** is the **phone digits** the buyer entered on **Pay with MoMo** (Cameroon format like 6XX XXX XXX). After Campay success the portal shows **Username** = those digits and a **WiFi PIN**. Copy on the portal: your phone number becomes your WiFi username.

**Voucher username** is the code **SPAI-XXXX-XXXX**. PIN is the 6-digit **PIN** on the ticket. Tab **I have a voucher** → **Redeem voucher**.

**Connect** posts those hotspot credentials into MikroTik. It does not sign anyone into the owner dashboard.

## Why it matters

Incident at a Douala supermarket hotspot: staff told a MoMo buyer to “log in with the Gmail we use for SpaiHub.” The captive page rejected it. They refunded. The username was on the success screen the whole time — the MTN number.

Second incident: a voucher buyer typed their own 6XX number into **Voucher code**. Invalid. Codes start with `SPAI-`.

Third: a family shared the phone-digit username (easy to remember) and argued the PIN was “the shop PIN.” The PIN is per purchase. Sharing it is possible — that is why 1-device plans exist — but it is not the owner password.

Wrong diagnosis: “Campay failed because username is email.” If they have a PIN on the portal, Campay already succeeded.

Orange vs MTN does not change the rule. The digits they typed in **Pay with MoMo** are the username, even if the SIM that approved Campay is a different phone in the family (people pay from a parent’s MoMo). Write the username the portal showed, not “whichever phone dinged.” If they paid from 6XX A and expected username 6XX B, they will fail **Connect**. The screen is the source of truth.

## What you see

Portal **Pay with MoMo**:

- **Username will be {{phone}}** while waiting.
- After success: **Username**, **WiFi PIN**, **Connect**, **Save your username and PIN**.

Portal **I have a voucher**:

- Placeholder **SPAI-XXXX-XXXX**, **6-digit PIN**, **Redeem voucher**.

Owner app sign-in: email. **Settings** **Email address** is not a hotspot user.

**Sessions** **Device** often shows the phone for MoMo rows, or the voucher code for tickets.

## What to do

1. Train the counter with three lines on the wall: App = email. MoMo Wi‑Fi = phone number. Ticket = SPAI-… + PIN.
2. After Pay, make them screenshot **Username** and **WiFi PIN** before they leave the captive page.
3. If they lose the page, the same phone + portal device id can resume; if they clear site data, they still use phone digits + PIN on the hotspot login — not email.
4. Do not reset the owner password because a guest “cannot log in to Wi‑Fi.”
5. If two people share one MoMo username, that is credential sharing. Price it; do not pretend the username secretly includes the MAC.
6. Keep owner **Settings** **Email address** for signing into the dashboard only. Never write it on a voucher stub.

## What not to say

- Do not say “your Gmail is the Wi‑Fi.”
- Do not tell MoMo buyers to type SPAI- unless they bought a voucher.
- Do not read remaining fair-use GB when they confuse username types.
- Do not promise a username change in Settings will rename hotspot users.
