---
id: glossary.voucher-vs-momo
slug: glossary-voucher-vs-momo
title: "Voucher vs MoMo"
description: "Vouchers are cash tickets (SPAI-XXXX-XXXX plus PIN) that never credit Wallet. MoMo is Pay on the portal; the WiFi username is the phone digits; successful MoMo credits Available Balance after the fee."
role: ["owner", "contributor"]
section: glossary
intents: ["voucher vs momo", "cash vs campay", "SPAI code"]
buttons: ["Pay with MoMo", "I have a voucher", "Redeem voucher", "Create vouchers"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.voucher-not-wallet", "own.tut.vouchers"]
updatedAt: 2026-09-16
minutes: 4
---

## Terms

**MoMo** (MTN Mobile Money, Orange Money) is the portal tab **Pay with MoMo**. Buyer enters a Cameroon number, taps **Pay … XAF**, approves on the phone (Campay). Wi‑Fi **Username** becomes the **phone digits**. PIN appears after success. **Check payment status** recovers orphan SUCCESS. Pending survives reload.

**Voucher** is the tab **I have a voucher**: code **SPAI-XXXX-XXXX**, **6-digit PIN**, **Redeem voucher**. Owners generate stock with **Create vouchers**, **Print PDF**, optionally **Sync unused to router**.

**Wallet**: only **successful MoMo** (after platform fee) raises owner **Available Balance**. Voucher cash stays in the till. Contributors are paid from uplink accruals, not from voucher paper.

Both products can share the same packages (time/data, family devices, hidden fair use on time). Payment rail is what differs.

## Why it matters

At the counter, “he paid” is ambiguous. Paid MoMo? Paid cash for a ticket? Staff who mix them **Check payment status** on a voucher buyer, or wait for **Wallet** after a ticket sale.

Contributors should not expect a voucher night to move **Contributor balance**. That balance is not shop ticket cash.

Wrong diagnosis at the till: “Campay SMS came, so this `SPAI-` ticket should also show in **Transactions** as Mobile Money.” Ticket redeem is not Campay. Wrong diagnosis: “MoMo username is SPAI- because we print SPAI on the wall.” MoMo username is phone digits. Keep the two alphabets off the same chalkboard line.

## What you see

Portal: two tabs. MoMo waiting screen vs voucher fields. Offline router **disables Pay**; voucher redeem still needs a grant path if the box cannot import users.

Owner **Dashboard** payment mix: **Mobile Money** vs **Vouchers** as business stats — still not “voucher XAF held by SpaiHub.”

**Sessions**: MoMo rows keyed by phone; voucher rows by `SPAI-` code.

## What to do

1. Ask: “MoMo or ticket?”
2. MoMo stuck: **Check payment status**, do not charge twice.
3. Ticket stuck: code format, PIN, **Sync unused** + 15s if they never redeemed in the cloud.
4. Owners: book voucher cash locally; withdraw only MoMo available.
5. Contributors: ignore till tickets when reading your wallet.
6. If the router is **OFFLINE**, do not start a MoMo **Pay**. Vouchers you already synced may still help only if the Hex can actually authenticate — a dead box authenticates nobody.

## What not to say

- Do not say vouchers credit **Wallet**.
- Do not say MoMo username is the owner email.
- Do not tell guests remaining fair-use GB on either rail.
- Do not tell a contributor to print vouchers. That is an owner **Vouchers** page.
