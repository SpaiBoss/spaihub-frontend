---
id: own.tut.withdraw
slug: first-withdrawal
title: "First withdrawal to MoMo"
description: "Cash out owner wallet credit to MTN MoMo or Orange Money. Auto send and queued-for-admin are both success paths."
role: ["owner"]
section: tutorials
intents: ["withdraw", "wallet", "momo", "payout", "orange money"]
buttons: ["Withdraw to MoMo", "Submit Withdrawal"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.withdraw-queued", "tip.contributor-reserve"]
updatedAt: 2026-09-16
minutes: 10
---

**Wallet** is where successful **MoMo** portal sales land after the live platform fee. It is not the metal cash drawer and it is not voucher stock. If the evening was only paper tickets, **Available to withdraw** will sit still. That is by design.

**Available to withdraw** = wallet total minus **Reserved for contributors** (if you have contributor uplink deals). Reserved XAF funds contributor payouts; you cannot pull it as owner cash. See [Available vs reserved for contributors](/help/contributor-reserve).

Minimum send is **100 XAF**. Methods: **MTN MoMo** or **Orange Money**. Submit **once**.

## What you will have

Either **Withdrawal sent to your MoMo**, or a queued message that an admin will complete the transfer shortly. **Both are success.** Queued is not a failed request. See [Queued withdrawal is not a failure](/help/withdrawal-queued).

The page shows **Withdrawal History** — date, amount, status — not a full accounting ledger of every sale. Sales live on **Transactions**. Dashboard cards are a snapshot.

## Before you start

- At least one successful MoMo sale (after fee) so the balance is not zero. Run [test MoMo](/help/test-momo-online) if you are still on empty.
- A Cameroon number that can receive the operator you pick. Detected operator should match the wallet that actually rings.
- **Available to withdraw** ≥ 100 XAF. If total looks big but available is small, read the **Reserved for contributors** line.
- Quiet ten minutes. Double-tap is how you argue with yourself.

There is no notification bell in **Settings** for “payout done”. Watch **Withdrawal History** and the MoMo SMS. If you came from a voucher-heavy weekend, read the fee note twice before you accuse the page of theft.

**MTN MoMo** vs **Orange Money** must match the number. A 67x MTN number on Orange as the method is how payouts sit in the wrong queue. The form may show **Detected: MTN MoMo** or Orange — believe it. Minimum **100 XAF** is a hard floor, not a suggestion from the cité.

## Steps

1. Open **Wallet** (phone short: **Cash**).
2. Read **Available to withdraw**, **Wallet total**, and **Reserved for contributors**. The fee note on the page: MoMo sales credit after the platform fee; voucher stock you sold offline does not add wallet balance.
3. Tap **Withdraw to MoMo** (you may also see **Withdraw** depending on layout). Title **Request Withdrawal**.
4. **Amount (XAF)** — at least 100, at most available. **MoMo number**. **Method**: **MTN MoMo** or **Orange Money**. Detected operator should make sense.
5. Tap **Submit Withdrawal** once. Wait for **Sending withdrawal to your MoMo — please wait…** / **Processing withdrawal…**.
6. Read the result toast. **Withdrawal sent to your MoMo** means Campay paid out. **Withdrawal is queued. An admin will complete the MoMo transfer shortly.** (or **Withdrawal queued for processing**) means a human will finish it. Do not submit again for the same amount.

Check **Withdrawal History**. Your MoMo SMS is the street proof.

![Screenshot](about:blank)
_Screenshot slot: Wallet Available to withdraw and Request Withdrawal (staging)._

## What you should see

- History row with amount and a non-failed status on success paths.
- MoMo notification on the phone (operator-dependent).
- **Dashboard** **Wallet Balance** drop after a sent payout.
- **Transactions** unchanged — that page is sales, not this payout list.

If you expected voucher nights to appear here, reread [vouchers do not credit the wallet](/help/vouchers-do-not-credit-wallet).

## If it fails

**Minimum 100 XAF.** Collect a bit more MoMo volume or wait. Do not invent a 50 XAF send.

**Available is 0 but Transactions look busy.** Those rows may be vouchers, failed pays, or money still reserved. Filter **Transactions** by source in your head: MoMo vs voucher. Check reserved line.

**Queued for a long time.** Still success-path. Do not double submit. If the amount never arrives and history stays queued, contact SpaiHub support with the history row — not a second **Submit Withdrawal** for the same cash-out.

**Withdrawal failed.** Read the toast. Fix number/operator, confirm available, try **once** more only if nothing is pending in history.

**Sent to the wrong number.** Treat it like any MoMo mis-send: you typed it. Use the shop’s own number next time.

**Contributor partners angry.** You cannot withdraw their reserve. That XAF is not yours to Orange. See [contributor reserve](/help/contributor-reserve).

**Want a CSV of sales.** That is **Transactions** → **Export CSV**, not Wallet history. See [Dashboard vs wallet vs transactions](/help/dashboard-wallet-transactions).

**Queued vs sent.** **Withdrawal sent to your MoMo** means the automatic Campay path fired. Queued means a person will finish the Orange/MTN send. Both belong in **Withdrawal History** as success-shaped rows. Refresh the page; do not hammer **Submit Withdrawal**. If you run contributors, explain to yourself once: reserved XAF is their fuel, not your Saturday beer.

**Dashboard Wallet Balance still high.** Either the payout is queued, the page is stale, or you are looking at **Wallet total** in your head instead of **Available to withdraw**. Reload **Wallet**. History is the judge.
