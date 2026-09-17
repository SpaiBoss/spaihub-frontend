---
id: own.tut.vouchers
slug: print-and-sync-vouchers
title: "Print vouchers and sync unused to the router"
description: "Create prepaid SPAI-XXXX-XXXX stock, print A4 sheets, optionally sync unused codes to MikroTik, and revoke what you must. Vouchers do not credit the wallet."
role: ["owner"]
section: tutorials
intents: ["voucher", "pdf", "sync", "print", "prepaid codes"]
buttons: ["Generate vouchers", "Print PDF", "Sync unused to router"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.voucher-not-wallet", "tip.sync-vouchers"]
updatedAt: 2026-09-17
minutes: 12
---

A **voucher** is a prepaid access code you sell for cash at the counter — `SPAI-XXXX-XXXX` — then the guest types it under **I have a voucher**. You already held the XAF in your hand. **Voucher redemptions do not credit the wallet.** Only successful MoMo sales do, after the platform fee. If you stare at **Wallet** after a busy voucher evening and it did not move, that is correct. See [Vouchers do not credit the wallet](/help/vouchers-do-not-credit-wallet).

This job is generate → print → optionally **Sync unused to router**. Sync is for Hotspot users on the Hex so a code can work even when you care about on-box users. Wait about **15 seconds** after sync, then check MikroTik **Hotspot users**. Details: [Sync unused vouchers, wait 15s](/help/sync-unused-vouchers).

## What you will have

A batch of unused codes (1–500), an A4 PDF with cut guides, and — if you synced — those unused codes queued onto the router. Compromised unused codes can be **Revoke**d.

## Before you start

- A location with at least one **active** package. The form will say if there are no active packages.
- A printer or a PDF you can take to the papeterie. Branding on tickets comes from **Settings** → **Portal branding** (logo, name, accent).
- Router **ONLINE** if you plan to sync. Sync without commands scheduler is a shrug.
- A cash price list that matches the package. Do not print 1-hour tickets and sell them as 1 GB.
- Paper: **Unused** filter before you print fresh stock so you do not reprint redeemed codes.

## Steps

1. Open **Vouchers** (phone short: **Codes**). Empty state: **No vouchers yet**.
2. Tap **Create vouchers** (page button). Fill location, package, **Quantity** (1–500 unique codes), optional **Batch label** (e.g. `March Promo`), optional **Set redeem-by expiry**.
3. Tap **Generate vouchers**. Wait for **Vouchers created**. Codes look like `SPAI-XXXX-XXXX`. You can **Copy all codes** then **Done**.
4. Back on the list, filter **Unused** (and the location). Tap **Print PDF**. Choose **Vouchers per A4 page** (2, 4, **6 recommended**, 8, 10, 12). Each ticket includes brand, location, package, code, WiFi PIN, redeem instructions. Tap **Download PDF**.
5. To push unused codes to the Hex: select a location, tap **Sync unused to router**. Toast path: **Sync queued** — wait ~15s for **spaihub-commands** to import, then check Hotspot users. Short label on small screens: **Sync to router**.
6. If a sheet is stolen or a code leaked on WhatsApp, **Revoke** unused codes. Redeemed history stays history.

Do not generate 500 codes “to credit Wallet”. Wallet will not move. A batch of 50 for Saturday at the corridor is a better first print than 500 you will lose in a drawer. Quantity hint on the form: generate 1–500 unique codes at once.

Each ticket carries a WiFi PIN as well as the `SPAI-XXXX-XXXX` code. The guest still uses **I have a voucher** on the portal — they do not **Sign in** to your owner dashboard with that code. Owner login stays **email**. If branding looks generic on the PDF, save [portal branding](/help/brand-the-portal) first, then print again. Footer credit stays **Powered by www.spaitrace.com** unless you have a real white-label deal.

![Screenshot](about:blank)
_Screenshot slot: Generate vouchers form and Print PDF layout (staging)._

## What you should see

- List columns: code, location, package, batch, status **Unused** / **Redeemed** / **Expired** / **Revoked**.
- Guest portal tab **I have a voucher**, placeholder `SPAI-XXXX-XXXX`, **PIN** **6-digit PIN**, **Redeem voucher**.
- **Transactions** may show voucher rows for your books. **You keep** still displays, but **Wallet** / **Available to withdraw** does not rise from voucher cash. You already collected cash.
- **Dashboard** voucher widgets: unused, redeemed, expired, redemption rate.

**Revoke** is not **Kick**. Kick ends a live session. Revoke stops an unused code.

## If it fails

**This location has no active packages.** Create one under **Locations** first, or **Activate** a deactivated SKU on that site.

**PDF export failed.** Retry; filter fewer than 500; check branding logo size (512 KB) if tickets look odd.

**Sync failed / Select a location first.** Pick the site, confirm **ONLINE** and **spaihub-commands**. Wait 15s before you declare the Hex empty. See [sync unused](/help/sync-unused-vouchers).

**Guest says invalid code.** Status might be redeemed, expired, revoked, or wrong location package. Do not generate a “replacement” that you also try to treat as MoMo wallet credit.

**Staff mixed MoMo and voucher in the same argument.** MoMo → wallet after fee. Voucher → cash in the drawer. Train that once.

**Printed time packages, guests ask remaining GB.** Time vouchers still show unlimited data on the portal. Do not read hidden fair-use GB.

**Sync said queued but Hotspot users empty.** Wait the full ~15 seconds, confirm **ONLINE**, confirm **spaihub-commands**. Syncing during **OFFLINE** only queues hope. Re-paste Script 2 if commands is missing — that should not mass-kick. Then sync again.

**Codes on paper, guests still on Pay with MoMo.** Point them to the **I have a voucher** tab. MoMo is the other product; it credits **Wallet** after fee. Mixing the two in one sentence is how the comptable gets angry.

When MoMo cash-out is the goal, use [First withdrawal to MoMo](/help/first-withdrawal), not more PDF sheets. Paper is for the drawer. Wallet is for Campay.
