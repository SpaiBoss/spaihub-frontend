---
id: tip.contributor-reserve
slug: contributor-reserve
title: "Available vs reserved for contributors"
description: "Owner Wallet splits Available Balance from Reserved for contributors. OPEN contributor accruals sit in that reserve. The contributor themselves see a single balance with no reserve split."
role: ["owner"]
section: pro-tips
intents: ["reserved for contributors", "available balance", "OPEN accruals"]
buttons: ["Wallet", "Available Balance", "Available to withdraw", "Withdraw"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.wallet", "own.tut.withdraw"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Available Balance** / **Available to withdraw** is the XAF you can send to MoMo with **Withdraw**. It is wallet total minus what is reserved.

**Reserved for contributors:** is XAF held because a **contributor** (someone whose spare uplink SpaiHub attached at a hotspot) has **OPEN accruals** — earnings not yet paid out to them. That reserve funds their future **Withdraw**, not your till.

**Contributor balance** on the contributor app is a **single** number. They do not see Available vs Reserved. Do not tell them to “check the reserve split.” They cannot.

**OPEN accrual** is bookkeeping for GB they already contributed at the agreed rate. You do not manage accruals in owner **Wallet**. You just cannot withdraw the reserved slice.

Voucher cash is unrelated. Vouchers never enter this split.

## Why it matters

Incident: owner in Yaoundé corridor saw **Wallet total** 80 000 XAF, tapped **Withdraw** for 80 000, got an error that thousands of XAF are reserved for contributors. They thought a withdrawal **queued** (or failed) because Campay was down. It was the reserve. **Max … XAF available** on the modal is the number that matters.

Wrong diagnosis: “contributors stole my MoMo sales.” MoMo sales still credit you after the platform fee. The reserve is a hold for uplink payouts, not a silent second fee line you invent at the counter.

Wrong diagnosis: “I should tell the contributor to withdraw so my Available goes up tonight.” Their withdraw, when it succeeds, is how reserve clears. You do not push it from a hidden admin tool in this Help.

If **Reserved for contributors:** is 0, the line may not stress you. When it is not 0, read **Available to withdraw** twice before you promise the shop phone a full wallet-total payout the same evening.

## What you see

Owner **Wallet**:

- **Available Balance**
- **Wallet total: … XAF**
- **Reserved for contributors:** (when non-zero)
- **Withdraw** / **Withdraw to MoMo**
- **Request Withdrawal** modal: **Amount (XAF)**, **Phone Number**, **Payment Method**, **Max {{amount}} XAF available**, **Submit Withdrawal**
- **Withdrawal History** — not a full accounting ledger table of every hotspot sale

Contributor **Wallet**: **Contributor balance**, **Withdraw**, history. One balance.

If you request more than available: insufficient available balance, reserved XAF called out in the error.

## What to do

1. Withdraw only **Available to withdraw**.
2. If reserve is large and you need cash, that is a contributor-payout timing issue, not a voucher bug and not a fair-use guest issue.
3. Explain to staff: “green number is what we can MoMo to the shop phone tonight.”
4. Do not double-tap **Submit Withdrawal**. Queued is success-shaped, not a reason to retry the same amount immediately.
5. Never mix this conversation with guest remaining GB. Different universes.

## What not to say

- Do not tell a contributor “your money is in my Reserved line, go split it.” They see one balance.
- Do not tell guests anything about contributor reserve.
- Do not promise remaining fair-use GB as if it funded the reserve.
- Do not document admin metering screens here. Owner Help stops at the wallet numbers on this page.
