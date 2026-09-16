---
id: own.ref.home
slug: reference-dashboard
title: "Dashboard reference"
description: "Screen map of the owner Dashboard: stat cards, charts, router health, accounting Export CSV, and the connection-script banner."
role: ["owner"]
section: reference
intents: ["reference", "reference-dashboard", "csv", "router health"]
buttons: ["Export CSV", "Dismiss"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.reports", "own.tut.repaste-script2"]
updatedAt: 2026-09-16
minutes: 10
---

## What this page is

**Dashboard** is the first screen after you sign in as a SpaiHub shop owner. It is a morning glance: how much money came in, how many people are online, whether your MikroTik boxes are talking to SpaiHub, and whether voucher stock is moving. It does not sell internet, kick a phone, or send MoMo. It reports.

Open it from the sidebar **Dashboard** (on a phone, the bottom bar **Home**). The page title is **Dashboard**. The subtitle is **Revenue, sessions, and network health.**

Use this article as a map. Every card and chart below is on this screen today. Button names match English. Switch the chrome to **FR** if your staff work in French — the numbers stay the same.

## Terms

**Revenue** here is money from hotspot sales in Central African CFA francs (**XAF**). **Today's Revenue** and **This Month** are net earnings SpaiHub attributes to your shops for those periods — not the cash in your pocket, and not the same number as **Wallet Balance**.

**Wallet** is the payout bucket for successful **Mobile Money** sales after the live platform fee. Voucher stock you sold as cash at the counter does **not** land here. The dashboard still charts voucher face value so you can see shop activity.

**Active Sessions** are paid logins that have not expired yet across your locations. That is not a headcount of phones in the room. One MAC on the Hex can be a cheap extender or phone hotspot sharing with a whole house.

**Last seen** is the last time a router sent a heartbeat to SpaiHub. **Never seen** means no heartbeat yet. That is normal if you added a router only to **Preview portal**, or you have not pasted the connection script.

**Accounting CSV** is a date-range file for your books. It is not a live ledger on this page, and it is not the **Wallet** withdrawal list.

**Connection script** (Script 2) is the MikroTik paste that starts heartbeat and command polling so SpaiHub can grant access after payment and honour **Kick**.

## Every control

### Accounting date range and **Export CSV**

At the top sit two date pickers (from and to) and **Export CSV**. The default range is the last 30 days through today. Tap **Export CSV**. While the file builds, the button reads **Exporting...**. On success you get the toast **CSV downloaded**. On failure: **Export failed**.

The hint on this bar is **Export accounting CSV for your books.** Use it for accountants, not for kicking users or checking a single MoMo. For the walkthrough of Dashboard vs Wallet vs Transactions, see [Dashboard vs wallet vs transactions](/help/dashboard-wallet-transactions).

### Banner: **Update your router connection script**

If you already have at least one router, an amber banner can appear:

- Title: **Update your router connection script**
- Body: **Re-run the connection script from Locations → your router → Setup. The new script confirms commands with SpaiHub so access grants and kicks are reliable.**

**Dismiss** hides the banner on this browser (SpaiHub remembers the choice in local storage). Dismissing does **not** update the Hex. You still open **Locations**, expand the site, open **Setup script** (physical) or **Setup CHR**, and paste Script 2. Step-by-step: [Re-paste the connection script](/help/repaste-connection-script).

The banner does not show when you have zero routers.

### **Today's Revenue**

Large card. Amount in XAF. Under it, a percent **vs yesterday**. If yesterday was zero and today has sales, the trend shows as 100%. This is shop intake for the calendar day, not wallet cash.

### **This Month**

Same idea for the current calendar month, with **vs last month**. Compare Akwa in March to Akwa in February here — do not confuse it with **All-time**.

### **Active Sessions**

Count of sessions that are still inside their paid window. Tap nothing — it is not a button. To see phone, MAC, **On router** / **Not seen**, and **Kick**, expand a location and open the **Sessions** tab.

### **Wallet Balance**

Wallet total shown for a glance. The number on **Wallet** (**Available to withdraw** after contributor reserve) is the one you cash out. This card does not open **Withdraw to MoMo**.

### **All-time**

Smaller card. Sum of recorded hotspot revenue since you started on SpaiHub. It is not “cash you withdrew.”

### **Subscribers today**

How many distinct paying subscribers SpaiHub counted today. Under it: **N payments** (the transaction count for the day). Two payments from the same phone still count as two payments; unique subscribers is the other number.

### **MoMo month**

Face of Mobile Money sales this calendar month. This is the stream that can credit **Wallet** after the platform fee.

### **Voucher month**

Face of voucher redemptions this month. Useful for paper-stock shops. It does **not** mean that amount is sitting in **Wallet**.

### **Revenue trend**

Title **Revenue trend**. Hint: **Daily net earnings — last 30 days**. Badge **Live**. The area chart plots **Net earnings** by day. Hover a date for the XAF amount. Empty days sit at zero; the chart still draws.

### **Payment mix**

Title **Payment mix**. Hint: **Last 30 days by source**. Donut plus legend: **Mobile Money** and **Vouchers**, each with an XAF total. Empty: **No revenue in this period**.

This mix answers “are people paying on the phone or with paper codes?” It is not a profit-and-loss statement.

### **Revenue by location**

Title **Revenue by location**. Hint: **Top locations — last 30 days**. Horizontal bars, up to six sites. Empty: **No location revenue in the last 30 days**. If you run one corridor shop, you should see that name here after MoMo or voucher sales.

### **Voucher performance**

Title **Voucher performance**. Hint: **Inventory and redemption**. Four tiles:

- **Unused** — printed or generated codes not yet redeemed
- **Redeemed** — used on the captive portal
- **Expired** — past the redeem-by time you set at generate
- **Redemption rate** — percent redeemed

A small pie may appear when there is inventory. Empty: **No voucher data yet**. Revoked codes are managed on **Vouchers**, not on this card.

### **Router status**

Title **Router status**. Hint: **By location**. Each row: router name, location name, a status badge (**Online**, **Offline**, **Degraded**), and last-seen time — or **Never seen**.

**Never seen** is not a broken shop. It is the default until the connection script heartbeats. Preview-only routers stay **Never seen** forever and that is fine.

Empty: **No routers configured yet**. Add them under **Locations** → **Add Router**.

### **Top packages today**

Horizontal bars of package name vs **Sales**. Tooltip: **N sales**. Empty: **No sales today yet**. Use this to see whether “1 Hour Browse” or “2 GB Weekly” is actually selling this morning.

## Empty & error states

While the page loads you see skeleton blocks, not zeros.

If `/api/owner/stats` (or the chart / router calls) fail, the whole dashboard becomes **Unable to load dashboard** with **Failed to load dashboard data. Try signing in again.** Sign out and **Sign in** again before you assume the shop made zero.

If the main stats load but analytics fail, you still see the four big cards, and a toast **Some analytics could not be loaded**. Mix, location bars, and voucher tiles then render empty-safe (zeros / **No revenue in this period** / **No voucher data yet**).

**Export CSV** can fail independently; the rest of the dashboard stays.

**Dismiss** on the script banner is local to that browser. Another phone or a cleared cache shows the banner again until you dismiss there too.

## What this page does not do

- It does not list individual Campay rows. That is **Transactions**.
- It does not withdraw. That is **Wallet** → **Withdraw to MoMo**.
- It does not generate vouchers. That is **Vouchers** → **Generate vouchers**.
- It does not paste MikroTik scripts. The banner only points you to **Locations**.
- It does not show guests how much fair-use data they have left. Guests never see remaining fair-use GB. Owners see caps on **Locations** → **Packages** → **Details**.
- It is not an admin console. You will not find technician tools here.

## Related jobs

- Read numbers vs cash vs CSV: [Dashboard vs wallet vs transactions](/help/dashboard-wallet-transactions).
- After the amber banner, paste Script 2: [Re-paste the connection script](/help/repaste-connection-script).
- If routers stay **Never seen**, finish **Setup script** on **Locations**.
- If **Active Sessions** looks wrong, open **Locations** → **Sessions** and read **On router** vs **Not seen**.
