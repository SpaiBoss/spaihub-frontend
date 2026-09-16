---
id: own.ref.wallet
slug: reference-wallet
title: "Wallet reference"
description: "Available vs reserved, Withdraw to MoMo (minimum 100 XAF), queued vs sent toasts, Withdrawal History columns. No ledger table on this screen today."
role: ["owner"]
section: reference
intents: ["reference", "reference-wallet", "withdraw", "momo"]
buttons: ["Withdraw to MoMo", "Submit Withdrawal"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.withdraw", "tip.contributor-reserve", "tip.withdraw-queued"]
updatedAt: 2026-09-16
minutes: 11
---

## What this page is

**Wallet** is where you cash out owner credit to Cameroon Mobile Money. Open **Wallet** in the sidebar (phone: **Cash**). Title **Wallet**. Subtitle **Balance and withdrawals.**

This screen today shows:

1. A balance hero: **Available Balance** or **Available to withdraw**, optional **Wallet total** and **Reserved for contributors**, then **Withdraw to MoMo**, plus a fee note.
2. **Withdrawal History** — only withdrawal rows.

There is **no ledger table** on this screen today. You will not find a running list of every MoMo sale, voucher, or fee line here. Sales sit on **Transactions** and **Dashboard**. Voucher cash never enters this wallet.

## Terms

**Available Balance** — what you can request now, when no contributor reserve is held.

**Available to withdraw** — same idea, shown when **Reserved for contributors** is greater than zero. It is wallet total minus that reserve.

**Wallet total** — the full owner wallet figure before subtracting reserve. Shown only if reserve > 0.

**Reserved for contributors** — XAF SpaiHub holds so spare-uplink contributors can be paid for metered GB. You cannot withdraw the reserved slice. Help icon next to the amount opens [Available vs reserved for contributors](/help/contributor-reserve). If you have no contributor links on your sites, you typically only see **Available Balance**.

**Platform fee** — percent taken from **successful MoMo sales** before credit. The live percent is printed on the page. Voucher stock does not add balance (you already collected cash).

**Queued** — Campay could not finish automatically; an operator completes the MoMo transfer. This is a **success path**, not a failed request.

**Sent** — Campay accepted the payout toward your number.

**Minimum 100 XAF** — you cannot submit a smaller amount.

## Every control

### Balance hero

Big XAF number. Label **Available Balance** or **Available to withdraw**.

If reserve exists:

- **Wallet total: N XAF**
- **Reserved for contributors:** **N XAF** plus HelpTip

This is not a chart and not a list of sales.

### Fee note

Under the button:

**MoMo sales credit your wallet after the platform fee (X%). Voucher stock you sold offline does not add wallet balance.**

The percent is the live public config, not a guess. If a guest paid 500 XAF MoMo, you do not withdraw 500. If they redeemed a voucher, this wallet does not move.

### **Withdraw to MoMo**

Opens modal **Request Withdrawal**. Do not double-tap; SpaiHub sends an idempotency key so one intent stays one request.

### Modal field **Amount (XAF)**

Number, min 100, max available. Hint **Minimum 100 XAF**. If reserve exists, also **Max N XAF available**.

### Modal field **Phone Number**

Cameroon national digits, placeholder **6XXXXXXXX**, max 9 digits. As you type, **Detected: MTN** or **Detected: Orange** may appear and lock **Payment Method**.

### Modal field **Payment Method**

- **MTN MoMo**
- **Orange Money**

Disabled when the number already detected an operator.

### Auto note

**Withdrawals are sent automatically to your MoMo number via Campay.**

When the request is in flight: spinner **Sending withdrawal to your MoMo — please wait…** and the submit button **Processing withdrawal…**. You cannot close the modal while it is sending.

### **Submit Withdrawal**

Outcomes (toasts):

- **Withdrawal sent to your MoMo** — money should appear on the handset.
- **Withdrawal is queued. An admin will complete the MoMo transfer shortly.** or **Withdrawal queued for processing** — still success. See [Queued withdrawal is not a failure](/help/withdrawal-queued).
- **Withdrawal failed** (or the server error) — try once; do not hammer.

The modal then closes and **Withdrawal History** reloads.

### **Withdrawal History**

Title **Withdrawal History**. This is **not** a sales ledger.

Desktop columns:

- **Date**
- **Amount**
- **Method** (**MTN MoMo** or **Orange Money**)
- **Phone Number**
- **Status**

If SpaiHub stored an **admin note** on the row, it appears under status (small grey text). That is a message about that payout, not a general notification centre.

Phone: amount, status, method · phone, date, optional note.

Pagination under the table (20 per page).

Empty: **No withdrawals yet**.

Status badges use the shared labels (**Success**, **Failed**, **Pending**, and so on as the row’s status).

## Empty & error states

Page load failure: **Could not load wallet** plus **Retry**.

While loading: a skeleton block.

History empty is normal on a new shop. It does **not** mean MoMo sales failed — check **Transactions** and **Dashboard**.

Invalid amount or phone comes back as **Withdrawal failed** or the API error string. Fix the number and submit once.

### How this page relates to **Dashboard** and **Transactions**

**Dashboard** **Wallet Balance** is a glance card. It is not always the same as **Available to withdraw** when reserve is held. **Today's Revenue** includes voucher face value that **never** lands here.

**Transactions** lists each Campay/voucher payment row. That is the closest thing to a sales journal. **Wallet** only lists **payouts**. If a guest just paid 1 000 XAF MoMo, look at **Transactions** for SUCCESS; this page only moves after the feeed credit is already in the wallet and you (or a previous withdraw) change the balance.

### Status on a history row

Badges use the same English status words as the rest of the app (**Success**, **Failed**, **Pending**, …). A queued request may sit as pending until operations finish Campay. That row is your receipt. There is still **no** notification bell on **Settings** when it flips.

If **admin note** appears under **Status**, read it as a note on *that withdrawal* (for example a retry hint). It is not a shop-wide inbox.

## What this page does not do

- **No ledger table** of sales, fees, or voucher events on this screen today. Do not look for one. Do not ask staff to “open the ledger on Wallet.”
- No voucher credit. Paper stock is **Vouchers**.
- No contributor GB meters. Contributors have their own **Wallet** with a single **Contributor balance**.
- No notification bell. Payout status is the history table and the toast at submit time.
- Does not show remaining fair-use GB (unrelated to cash-out). Guests never see remaining GB on the portal either.
- Not an admin console. “Admin will complete” in the queued toast means SpaiHub operations will finish Campay — you have no extra button here.
- No **Export CSV** on this page (that bar is on **Dashboard**). No **Kick**. No branding.

## Related jobs

- First cash-out: [First withdrawal to MoMo](/help/first-withdrawal).
- Why available ≠ total: [Available vs reserved for contributors](/help/contributor-reserve).
- Queued is OK: [Queued withdrawal is not a failure](/help/withdrawal-queued).
- Where revenue charts live: [Dashboard reference](/help/reference-dashboard).
