---
id: own.ref.vouchers
slug: reference-vouchers
title: "Vouchers reference"
description: "Generate prepaid codes, filter Unused/Redeemed/Expired/Revoked, copy, revoke, Sync unused to router, PDF 2–12 per page, CSV, batch label, redeem-by expiry."
role: ["owner"]
section: reference
intents: ["reference", "reference-vouchers", "pdf", "sync"]
buttons: ["Generate vouchers", "Sync unused to router", "PDF", "CSV", "Copy", "Revoke", "Copy all codes", "Download PDF"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.vouchers", "tip.voucher-not-wallet"]
updatedAt: 2026-09-17
minutes: 12
---

## What this page is

**Vouchers** is the paper-stock desk. You generate prepaid codes, print A4 sheets, copy a code to WhatsApp, revoke a leaked code, export CSV for your records, and optionally **Sync unused to router** so the Hex already has Hotspot users before a guest types the code.

Open **Vouchers** in the sidebar (phone: **Codes**). Title **Vouchers**. Subtitle **Prepaid access codes.**

A voucher is **not** Mobile Money. The guest already paid you in cash (or you are giving a promo). Redeeming a code **does not credit Wallet**. Only successful MoMo sales (after the platform fee) do that.

Codes look like **SPAI-XXXX-XXXX**. The guest also needs the **6-digit PIN** printed on the ticket (**WIFI PIN**). On the captive portal they open **I have a voucher**, type the code and PIN, then **Redeem voucher**.

## Terms

**Unused** — generated, not redeemed, not revoked, not past redeem-by.

**Redeemed** — used on the portal; a session exists.

**Expired** — redeem-by time you set at generate has passed unused.

**Revoked** — you tapped **Revoke** on an unused code. It cannot be redeemed.

**Batch label** — optional tag such as “March Promo” so you can recognise a print run in the table.

**Redeem-by expiry** — how long the *code* stays valid to redeem. Separate from the package’s browse duration or download expiry after redeem.

**Sync unused to router** — queue unused codes onto the MikroTik Hotspot user list. Wait ~15 seconds for `spaihub-commands`, then check **Hotspot users** in Winbox.

**PIN** — six digits. Printed on PDF tickets. Required on **I have a voucher**. Different from the Wi‑Fi PIN shown after MoMo pay (that PIN is created at payment).

## Every control

### Stat cards

Four counts for your whole account (not only the current filter): **Unused**, **Redeemed**, **Expired**, **Revoked**. Use them as inventory, then filter the table to print only **Unused**.

### Filter **All locations**

Dropdown of your sites. **Sync unused to router** stays disabled until you pick a real location (tooltip **Select a location first** / **Queue unused vouchers onto the MikroTik**).

### Filter **All statuses**

Options: **Unused**, **Redeemed**, **Expired**, **Revoked** (English status labels). Filter to **Unused** before **PDF** so you do not reprint dead codes.

### **Generate vouchers**

Header button and empty-state action. Modal title **Generate vouchers**. Description: **Create prepaid codes subscribers can redeem on the captive portal.**

Fields:

- **Location** — required. Placeholder **Select location**.
- **Package** — required. Placeholder **Select package**. Only **Active** packages. If the site has none: **This location has no active packages. Create one under Locations first.** Deactivated SKUs reappear here after **Activate**.
- **Quantity** — 1–500. Hint: **Generate 1–500 unique codes at once.**
- **Batch label (optional)** — placeholder **e.g. March Promo, Event 2026**.
- **Set redeem-by expiry** checkbox. When on: number + **minutes** / **hours** / **days**. Hint: **Codes must be redeemed before this period ends.**
- **Cancel** and **Generate vouchers** (busy: **Generating...**)

Errors in the modal: **Select a location**, **Select a package**, **Voucher API not found. Restart the backend and try again.**, **Cannot reach the API. Check that the backend is running on port 4000.**, **Failed to create vouchers**, or the server message.

Success view title **Vouchers created** with **N code ready to distribute** / **N codes ready to distribute**. Lists the **SPAI-XXXX-XXXX** lines. **Copy all codes** copies them newline-separated. **Done** closes.

Toast on the page after a successful batch is not required; the modal is the confirmation. Table reloads.

### **Sync to router** (full name **Sync unused to router**)

Secondary button. Disabled without a location. Busy label **Syncing...**.

Success: **Sync queued** (or the server message). If any were queued: **Wait ~15s for spaihub-commands to import, then check Hotspot users**.

Failure: **Could not sync vouchers to router**. Without a location: **Select a location**.

Sync does not print paper and does not credit Wallet.

### **PDF** (full **Print PDF**)

Opens **Export print-ready PDF**. Description: **Owner-branded A4 voucher sheets with cut guides and WiFi PINs.**

**Branding preview** explains tickets will use your brand name, optional logo, optional accent. Link copy: **Customize branding in Settings → Portal branding.**

**Included vouchers** follows the current table filters (status + location), up to 500 per PDF. Tip: **Tip: filter to Unused before printing fresh codes.**

**Vouchers per A4 page**:

- **2 per page** — Large tickets — best for handouts
- **4 per page** — 2 × 2 grid
- **6 per page** — 2 × 3 grid (recommended)
- **8 per page** — 2 × 4 grid
- **10 per page** — 2 × 5 grid
- **12 per page** — 3 × 4 grid — most compact

**Each ticket includes**: **Your logo or brand name · location · package · voucher code · WiFi PIN · redeem instructions**. Footer may show **Powered by www.spaitrace.com**.

**Download PDF** (busy **Generating PDF...**). Toast **PDF ready to print** or **PDF export failed**.

### **CSV**

Downloads `vouchers.csv` for the current location/status filters. Toast **CSV exported** or **CSV export failed**. This is voucher stock, not the Dashboard accounting export.

### Table / phone cards

Desktop columns: **Code**, **Location**, **Package** (name + owner summary, including fair-use cap **to you**), **Batch**, **Status**, **Expires**, **Redeemed**, **Actions**.

Phone cards: code, status, package, location · batch, then **Copy** and maybe **Revoke**.

**Copy** toasts **Code copied**. Copies the **SPAI-XXXX-XXXX** string, not the PIN (PIN is on the PDF).

**Revoke** appears only for **Unused**. Toast **Voucher revoked** or **Failed to revoke voucher**. Redeemed codes cannot be revoked from this button.

Pagination sits under the table.

## Empty & error states

Empty: **No vouchers yet** / **Generate prepaid codes for subscribers to redeem on your captive portal.** plus **Generate vouchers**.

Load failure card: **Could not load vouchers** with the error text and **Retry**. Toast **Failed to load locations** if sites fail to load for the dropdowns.

**Loading vouchers...** while the list refreshes.

## What this page does not do

- It does **not** credit **Wallet**. Cash already changed hands. See [Vouchers do not credit the wallet](/help/vouchers-do-not-credit-wallet).
- It does not start a Campay prompt. That is **Pay with MoMo** on the guest portal.
- It does not show remaining fair-use GB to guests. Owner **Details** on the package may show a cap; printed tickets follow portal rules (time packages still look unlimited to buyers).
- It does not kick a live session. **Locations** → **Sessions** → **Kick**.
- No admin console, no technician metering.

## Related jobs

- Print and sync walkthrough: [Print vouchers and sync unused to the router](/help/print-and-sync-vouchers).
- Wait 15s after sync: [Sync unused vouchers, wait 15s](/help/sync-unused-vouchers).
- Guest typing **SPAI-XXXX-XXXX**: [Captive portal (what guests see)](/help/reference-portal-preview).
