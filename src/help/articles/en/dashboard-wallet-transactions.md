---
id: own.tut.reports
slug: dashboard-wallet-transactions
title: "Dashboard vs wallet vs transactions"
description: "Read Today's Revenue, export a CSV of sales, and cash out only what Available to withdraw allows. Three screens, three jobs."
role: ["owner"]
section: tutorials
intents: ["csv", "accounting", "reports", "dashboard", "wallet", "transactions"]
buttons: ["Export CSV"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.home", "own.ref.wallet"]
updatedAt: 2026-09-16
minutes: 10
---

Owners mix these three pages, then swear SpaiHub “lost money”. Usually the XAF is on another screen.

- **Dashboard** (**Home** on a phone) is the morning glance: **Today's Revenue**, **This Month**, **Active Sessions**, **Wallet Balance**, charts, **Router status**, voucher widgets.
- **Transactions** (**Sales** on a phone) is each Campay or voucher row. Filter, then **Export CSV**. **You keep {{amount}} XAF** is the owner share on a line.
- **Wallet** (**Cash** on a phone) is what you can send to MoMo: **Available to withdraw**, minus **Reserved for contributors**. **Withdrawal History** is payouts, not a full ledger.

Deep labels: [Dashboard reference](/help/reference-dashboard) and [Wallet reference](/help/reference-wallet).

Voucher cash you already held does not raise Wallet. MoMo sales credit after the platform fee. Time-plan guests still see unlimited data — none of these reports are for quoting leftover GB at the door.

## What you will have

A head-clear picture for the comptable: dashboard snapshot, a CSV on the laptop, and a MoMo payout path that matches **Available to withdraw**. You will not get a notification bell; none is shipped.

## Before you start

- Some sales help. Empty **No transactions yet** / **No revenue in this period** is honest on day one.
- A spreadsheet program if you **Export CSV**.
- Know which location is which. “All locations” is fine for a single shop; two corridors should be filtered.
- A working idea of MoMo vs voucher. **Payment mix** on Dashboard exists because those two are not the same cash story. MoMo (after fee) can be withdrawn. Vouchers already sat in the drawer.

## Steps — read the dashboard

1. Open **Dashboard**.
2. Read the four cards: **Today's Revenue**, **This Month**, **Active Sessions**, **Wallet Balance**. Comparisons **vs yesterday** / **vs last month** can be zero.
3. Charts: **Revenue trend** (daily net, last 30 days), **Payment mix** (MoMo vs vouchers), **Revenue by location**, **Voucher performance** (unused / redeemed / expired / redemption rate), **Top packages today**.
4. **Router status** / **By location**. **Never seen** is normal without a MikroTik. **Online** / **Degraded** / **Offline** follow heartbeat: ≤2 min / 2–5 / never or >5 min.
5. If a connection-script banner appears (**Update your router connection script**), finish Script 2 then **Dismiss**. Dismiss hides the banner; it does not paste the script for you.

## Steps — export sales

1. Open **Transactions**.
2. Filter location, status, dates as needed. Statuses include success/fail style labels on each pay.
3. Confirm lines show phone, package, amount, **Your Share**, **You keep {{amount}} XAF**.
4. Tap **Export CSV**. Toast **CSV downloaded** / **CSV exported**. Keep that file for the books.

Dashboard may also hint to export accounting CSV; **Transactions** is the row-level export.

## Steps — reconcile wallet

1. Open **Wallet**.
2. Compare **Wallet Balance** on Dashboard with **Available to withdraw**. Available can be lower because of **Reserved for contributors**.
3. Remember: **Withdrawal History** ≠ transaction ledger. Payouts live here; sales live on **Transactions**.
4. Cash-out is [First withdrawal to MoMo](/help/first-withdrawal) — **Withdraw to MoMo**, **Submit Withdrawal**, min 100 XAF.

![Screenshot](about:blank)
_Screenshot slot: Dashboard cards and Transactions Export CSV (staging)._

## What you should see

- Busy MoMo day: Dashboard today up, Transactions SUCCESS rows, Wallet available up (after fee).
- Busy voucher day: Dashboard mix shifts to vouchers, Transactions voucher rows, Wallet **not** up.
- CSV opens with dates and XAF you can give a comptable. You keep XAF is owner share, not the guest’s sticker price if a fee applied.

## If it fails

**CSV failed / nothing downloaded.** Retry; disable blockers; try another browser. Filter a smaller date range.

**Dashboard today ≠ sum of Transactions.** Timezones, filters, failed pays, or “today” vs a custom range. Use CSV for the argument, not a screenshot of one card.

**Wallet empty, CSV full.** Vouchers. Or reserved contributors. Or you already withdrew. Read [vouchers do not credit the wallet](/help/vouchers-do-not-credit-wallet) and [contributor reserve](/help/contributor-reserve).

**I dismissed the script banner and grants died.** Dismiss only hides UI. Re-open **Setup script** and paste Script 2. See [re-paste connection script](/help/repaste-connection-script).

**Looked for remaining GB per guest on Dashboard.** You will not get a guest-facing leftover meter from Help, and you must not invent one at the counter for time plans.

**Want router health only.** **Router status** on Dashboard plus **Last Seen** on **Locations** → **Routers**. Kick/suspend are different jobs: [kick and suspend](/help/kick-and-suspend).

**This Month looks fat, Available to withdraw looks thin.** Fees, contributor reserve, and money you already sent to MoMo. Open **Wallet** and read **Reserved for contributors** plus **Withdrawal History**. Then open **Transactions** and notice voucher rows. The three screens agree when you stop treating them as one.

**Export CSV during a fight with staff.** Filter the location and the evening’s dates first so the CSV is the argument, not the whole year. You keep XAF is the owner share column — that is what the comptable should reconcile to Wallet-bound MoMo, not the guest’s sticker price on time plans.

No remaining-GB column will appear for guests on time packages. Do not add one in the spreadsheet and show it at the door.
