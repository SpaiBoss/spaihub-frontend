---
id: con.tut.withdraw
slug: contributor-withdraw
title: "Withdraw contributor earnings to MoMo"
description: "Cash out Contributor balance (minimum 100 XAF). Sent vs queued toasts. Single balance — no owner reserve split. Set MoMo phone in Settings."
role: ["contributor"]
section: tutorials
intents: ["contributor wallet", "withdraw", "momo", "queued"]
buttons: ["Withdraw", "Submit withdrawal", "Save"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.withdraw-queued", "con.ref.wallet"]
updatedAt: 2026-09-16
minutes: 11
---

## What this page is

This tutorial is the first time a **contributor** turns credited spare-uplink XAF into MTN MoMo or Orange Money. The page is **Wallet**. The hero label is **Contributor balance** — one number, **no** owner **Available to withdraw** / **Reserved for contributors** split.

Path A: nav **Wallet**. Path B: **Home** → **Withdraw →** (still the Wallet page). Then **Withdraw** opens **Withdraw earnings**.

Set **MoMo phone** on **Settings** → **Save** before you cash out so the modal is pre-filled.

Minimum **100 XAF**. **Paused** links do not fill this wallet.

## Terms

**Contributor balance** — withdrawable XAF from **Active** credited meters.

**Withdrawal sent to your MoMo** — Campay accepted the send.

**Withdrawal queued** — success, not failure. Operations finish MoMo. [Queued withdrawal is not a failure](/help/withdrawal-queued).

**Submit withdrawal** — confirm (busy **Processing…**). Tap once.

## Every control

### Before you start

1. **Links**: status **Active**, **Last meter** not stuck forever if you expect new credit.
2. **Settings**: **MoMo phone** **6XXXXXXXX** → **Save** → toast **Saved**.
3. **Wallet**: hero ≥ **100 XAF**.

### **Withdraw**

Opens the modal. An idempotency key is created. Do not double-tap because SMS is slow.

### **Amount (XAF)**

Min 100, max = balance.

### **Phone Number**

Placeholder **6XXXXXXXX**. Pre-fill from Settings. You may type another number for this payout. This modal has **no** **Payment Method** dropdown (owner Wallet does).

### **Submit withdrawal**

Toasts:

- **Withdrawal sent to your MoMo**
- **Withdrawal queued**
- **Withdrawal failed**

Then **Withdrawal history** columns **Date**, **Amount**, **Phone**, **Status**. Empty before first payout: **No withdrawals yet**.

Load error on the page: **Could not load wallet** + **Retry**.

**No notification bell** when queued completes. Watch history and the handset SMS.

## Empty & error states

Zero balance + **Paused**: expected (meters without credit).

Zero + **Active** + fresh meter: credit may lag. Wait. Do not open a second contributor account.

Under 100 XAF: the amount field will not accept a valid submit. Earn more credited GB.

Failed toast: fix phone/amount, **one** retry. Queued: do **not** submit the same amount again as if the first died.

## What this page does not do

- No reserve split and no sales ledger.
- No password change (use **Forgot password?**).
- No remaining fair-use GB.
- Not owner **Withdraw to MoMo** (different label, extra method dropdown, reserve lines).
- Not an admin retry console.

## Steps

1. Confirm **Links** **Status** is **Active**. **Paused** will not fund this wallet.
2. **Settings** → **MoMo phone** → **Save** (toast **Saved**).
3. Open **Wallet** (or **Home** → **Withdraw →**).
4. Read **Contributor balance**. If under **100 XAF**, stop — the amount field will not take a valid cash-out.
5. Tap **Withdraw** once. Modal title **Withdraw earnings**.
6. **Amount (XAF)** between 100 and the hero balance.
7. Confirm **Phone Number** (`6XXXXXXXX`).
8. Tap **Submit withdrawal** once. Wait for **Processing…** to finish.
9. Read the toast: **Withdrawal sent to your MoMo** or **Withdrawal queued**. Both are success paths.
10. Confirm a new row under **Withdrawal history**.

## If it fails

**Could not load wallet** → **Retry**.

**Withdrawal failed** → check min 100, max available, phone digits. One retry.

Queued → do not duplicate the amount. See [Queued withdrawal is not a failure](/help/withdrawal-queued). No bell will ring on **Settings**.

Sent to the wrong number → prevent the next one via **Settings**. This tutorial cannot reverse Campay.

You expected owner **Available to withdraw** minus reserve: wrong role. Contributors have one balance.

## What you will have

A MoMo hit on the number you typed, or a **queued** row that will become that hit. **Withdrawal history** as the only on-screen journal. **Contributor balance** reduced by the amount (when the server accepts the request).

You will not have a platform-fee sentence on this contributor page (that fee note is on **owner** Wallet: MoMo sales minus percent). Your rate was already applied when GB was credited.

You will not have **Submit Withdrawal** (owner capitalisation). Yours is **Submit withdrawal**.

You will not have **MTN MoMo** / **Orange Money** dropdown. Detection is silent.

If Home **Withdraw →** is easier on a phone, use it — it is the same **Wallet** page, not a different product.

Do not withdraw “to test” 100 XAF twice in a panic. Read the toast and the history row.

Pagination: if you withdraw often, older rows move to page 2. The hero always shows the current balance, not the sum of visible history rows.

**Home** **Withdraw →** and nav **Wallet** are the same screen. There is no third “payouts” page.

If Campay SMS says the money arrived but history still **Pending**, wait; do not create a second request for the same amount. Queued is documented as success.

Never tell hotspot guests remaining fair-use GB while you wait for SMS. That number is not on your Wallet and not on their portal.

Before you start, know the owner **Wallet** is a different building: **Withdraw to MoMo**, **Submit Withdrawal**, fee note, optional reserve. Yours is **Withdraw**, **Submit withdrawal**, single balance.

After a sent toast, stay on **Withdrawal history** until the badge is clearly **Success** or you have the SMS. Then **Sign out** if you are on a shared phone in the shop.

If **Settings** phone was empty and you typed a number only in the modal, that number is for this request. Save it on **Settings** so the next modal is not blank.

Amount 100 on a 100 balance is allowed (max is the balance). Amount 101 is not.

## Related jobs

Screen map: [Contributor wallet reference](/help/reference-contributor-wallet). Phone: [Contributor settings reference](/help/reference-contributor-settings). Queued: [Queued withdrawal is not a failure](/help/withdrawal-queued).
