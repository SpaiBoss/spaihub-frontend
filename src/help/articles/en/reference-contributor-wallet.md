---
id: con.ref.wallet
slug: reference-contributor-wallet
title: "Contributor wallet reference"
description: "Single Contributor balance (no reserve split), Withdraw, history columns, minimum 100 XAF, queued vs sent toasts."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-wallet", "withdraw"]
buttons: ["Withdraw", "Submit withdrawal"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.withdraw", "tip.withdraw-queued"]
updatedAt: 2026-09-16
minutes: 11
---

## What this page is

**Wallet** is where a contributor cashes out credited uplink earnings to MTN MoMo or Orange Money. Open **Wallet** in the contributor nav (or **Home** → **Withdraw →**).

This screen today:

1. One hero number: **Contributor balance** (XAF) and **Withdraw**.
2. **Withdrawal history** with pagination.

There is **no Available vs Reserved split** on the contributor wallet. Owners see **Reserved for contributors** on *their* **Wallet** because some of their MoMo credit is earmarked to pay people like you. You only see a **single** **Contributor balance**.

There is **no ledger table** of meter samples, owner sales, or voucher events. **Links** has **Last meter**. **Home** has **Today** / **This month** GB + XAF. This page lists **payouts**.

## Terms

**Contributor balance** — XAF you can request from credited **Active** meters minus withdrawals already taken (and whatever the server still holds as pending). **Paused** stores samples **without** increasing this number.

**Minimum 100 XAF** — the amount field uses a HTML minimum of 100. You cannot legally submit 50 XAF through this form.

**Queued** — automatic Campay send could not finish; SpaiHub completes the transfer. Toast **Withdrawal queued** is a **success path**.

**Sent** — toast **Withdrawal sent to your MoMo**.

**Phone Number** — MSISDN for this payout. Pre-filled from **Settings** → **MoMo phone** when you saved one.

**Idempotency** — tapping **Submit withdrawal** once creates a key so a double network retry should not mean two payouts. Still tap once; wait for the toast.

## Every control

### Hero **Contributor balance**

Grey label **Contributor balance**. Large **N XAF**. No **Wallet total** subtitle. No HelpTip for contributor reserve (that tip is on the owner screen).

### **Withdraw**

Opens **Withdraw earnings**. You cannot open this modal from **Links**.

### **Amount (XAF)**

Number, min 100, max = current balance, required. Disabled while **Processing…**.

### **Phone Number**

Placeholder **6XXXXXXXX**, digits only, max 9. As you type, SpaiHub may detect MTN vs Orange internally. Unlike the owner modal, this contributor form does **not** show a **Payment Method** dropdown or **Detected: MTN** line. Keep the number a real MoMo wallet.

### In-flight

Spinner **Processing…**. Button also **Processing…**. Wait. Do not close and resubmit because the phone SMS is slow.

### **Submit withdrawal**

Toasts:

- **Withdrawal sent to your MoMo**
- **Withdrawal queued** (or a longer pending-admin message from the API)
- **Withdrawal failed** (or API error)

Queued: [Queued withdrawal is not a failure](/help/withdrawal-queued). Check **Withdrawal history** and your SMS. There is **no notification bell** on contributor **Settings** when queued flips to sent.

After success the modal closes, amount clears, phone may remain, table reloads.

### **Withdrawal history**

Title **Withdrawal history**.

Columns:

- **Date**
- **Amount**
- **Phone**
- **Status** (badge)

No **Method** column and no **admin note** line on this contributor UI today.

Empty: **No withdrawals yet**.

Pagination under the table (page size 20).

## Empty & error states

Load failure: **Could not load wallet** / **Failed to load wallet** with **Retry**.

Loading: skeleton.

Empty history + non-zero balance = you have not cashed out. Empty history + zero balance + **Paused** links = expected.

Browser will block amounts under 100. Earn credited GB on **Active** first.

If Settings phone is empty, the modal phone starts empty unless you typed one earlier in the session. Save **MoMo phone** to avoid sending to a mistyped number.

## What this page does not do

- **No reserve split.** One **Contributor balance** only.
- No meter ledger and no **Export CSV**.
- No password change and no branding.
- **No notification bell.**
- Does not pay **Paused** samples.
- Does not show remaining fair-use GB.
- Not an owner wallet and not an admin console. You cannot “retry as admin.”

## Worked examples

**First cash-out.** Settings **MoMo phone** is `67xxxxxxx` (MTN-looking). Balance **12 500 XAF**. **Withdraw**, amount `10000`, phone pre-filled, **Submit withdrawal**. Toast **Withdrawal sent to your MoMo**. History shows Date, 10 000, the phone, **Success**. Hero now ~2 500 XAF. You did not see **Reserved for contributors** because that line is owner-only.

**Queued.** Same flow, toast **Withdrawal queued**. History **Pending**. Do not submit 10 000 again. Wait for SMS or a later **Success** badge. There is still no bell on **Settings**.

**Paused week.** Links **Paused**, meters moving, Wallet **0**. **Withdraw** cannot invent money. Unpausing is not a contributor control.

**Wrong number in the modal.** You typed a friend’s digits. SpaiHub will send to that MSISDN if Campay accepts it. Fix **MoMo phone** on **Settings** for next time; this page will not reverse a sent payout.

**Under the floor.** Balance **80 XAF**. The amount field’s minimum is 100. Earn credited GB on **Active** first.

Owner colleagues may talk about **Export CSV** and **Transactions**. Those buttons are not on your Wallet. Your receipt is **Withdrawal history** only.

## Toasts and labels to memorise

On this page: no success toast just for opening it. Failures are the empty **Could not load wallet** card.

In the modal: **Processing…** is not a failure.

After submit: **Withdrawal sent to your MoMo**, **Withdrawal queued**, **Withdrawal failed**.

History empty string: **No withdrawals yet**.

Owner staff may say “check the ledger.” Reply: this build’s contributor **Wallet** has **Contributor balance**, **Withdraw**, and **Withdrawal history** only — no sales ledger, no reserve line, no **Export CSV**.

Campay SMS language follows the operator, not the **EN**/**FR** chrome toggle.

If two people share one contributor login, they share one balance. Prefer one **MoMo phone** in **Settings** so the modal default is not a surprise.

Minimum reminder: 100 XAF is a form floor. 99 XAF credited is real money that still cannot leave through **Submit withdrawal** until you cross 100.

## Related jobs

- Steps: [Withdraw contributor earnings to MoMo](/help/contributor-withdraw).
- Default phone: [Contributor settings reference](/help/reference-contributor-settings).
- Queued meaning: [Queued withdrawal is not a failure](/help/withdrawal-queued).
