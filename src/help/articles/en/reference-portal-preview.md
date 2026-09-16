---
id: own.ref.portal
slug: reference-portal-preview
title: "Captive portal (what guests see)"
description: "Owner-facing map of the guest page: Pay with MoMo, I have a voucher, Check payment status, Connect to WiFi now, family disconnect, fair-use banner (no remaining GB), router offline, Retry, Open in browser."
role: ["owner"]
section: reference
intents: ["reference", "reference-portal-preview", "momo", "voucher redeem"]
buttons: ["Pay with MoMo", "I have a voucher", "Check payment status", "Cancel and start over", "Connect to WiFi now", "Disconnect this device", "End session for all devices", "Retry", "Open in browser"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.preview", "own.tut.paid-no-wifi", "tip.fair-use-message"]
updatedAt: 2026-09-16
minutes: 13
---

## What this page is

This article is an **owner map of the guest captive portal** — the phone page customers see on your hotspot (and the tab that opens from **Locations** → **Preview portal**). You do not “configure” this page here; you brand it in **Settings** and sell packages in **Locations**. Staff should know every button a customer can tap so they can talk someone through it in the shop.

**Preview portal does not need a live Hex.** **Last Seen: Never** is normal. Preview uses the router token URL. **Connect to WiFi now** only works when the phone opened this page from the MikroTik captive login (`link-login`). From a desktop preview you still see packages, MoMo, and vouchers; you may be told to enter **Username** and **PIN** on the hotspot login instead.

Guests never see remaining fair-use gigabytes. After a hidden cap cuts them, they see **Fair use limit reached. Buy another package to continue.**

## Terms

**Captive portal** — the page the phone opens before the internet is free. SpaiHub’s page, with your brand.

**Username** — for Mobile Money, the **phone digits** the guest typed. That is the hotspot username. PIN is the secret.

**PIN** — six digits. After MoMo, shown as **WiFi PIN**. For vouchers, printed on the ticket; typed on **I have a voucher**.

**Campay** — the MoMo prompt on the customer’s phone (MTN or Orange).

**Family plan** — package **Simultaneous devices** greater than 1. Portal copy: **Family plan — up to N devices can share this access code.** Extra buttons: **Disconnect this device** / **End session for all devices**.

**Fair use** (time packages) — owner-hidden cap. Buyers still see **Unlimited data for this browse period**. Data packages instead show **Download allowance: …**.

**Router offline** — heartbeat gone. **Mobile Money payments are unavailable until it reconnects.** Voucher redeem may still be attempted; MoMo pay is blocked.

## Every control

### Chrome

Header: your logo or brand name, **Switch language** (**EN** / **FR**). Footer: **Powered by www.spaitrace.com**.

### Load failures

**Loading portal…** while fetching.

If load is too slow or fails: **Portal is taking too long to load. Retry or open in your browser.** Buttons **Retry** and **Open in browser**.

**Router not found or unavailable** — bad token or unpublished router.

### No packages

**No internet packages are available at this location yet. Check back soon or ask the staff.** Add an **Active** package under **Locations**.

### **Fair use limit reached** banner

Amber box: **Fair use limit reached. Buy another package to continue.** **Dismiss** hides the banner on this visit. There is no remaining-GB number. See [Fair-use message, never remaining GB](/help/fair-use-guest-message).

### Router banners

**Router offline — Mobile Money payments are unavailable until it reconnects.**

Or **Router connectivity is degraded — payments may be delayed.**

### Package list (buy screen)

Location name, welcome text (from branding or **Pay with Mobile Money to get online instantly**). Time packages summarise as **… browse · Unlimited data**. Data packages show download + expiry. **Up to N devices** if shared. Upload MB/s only if you enabled **Show upload speed on packages**.

Guest taps a package, then a tab.

### Tab **Pay with MoMo**

Phone field placeholder **6XX XXX XXX**. Hint: **Pay via Campay — your phone number becomes your WiFi username. A PIN appears here after payment; then tap Connect.** Operator line **MTN Mobile Money detected** / **Orange Mobile Money detected**.

Primary **Pay N XAF** (busy **Processing...**). Errors **Payment failed**, **Select a package**, **Payment failed. Please try again.**

### Waiting for MoMo

**Approve MoMo on your phone**

**Your WiFi username and PIN appear here instantly once Campay confirms payment.**

**Username will be 6XXXXXXXX**

**Check payment status** (busy **Checking...**) — staff should use this if Campay succeeded but the page still spins. Recovers orphan SUCCESS. Tutorial: [Staff script: paid but no WiFi](/help/paid-but-no-wifi).

**Cancel and start over** (busy **Cancelling...**). Failure **Could not cancel payment. Try again.**

**You can close this page and come back — we'll pick up where you left off.**

Timeout copy: **Still waiting for MoMo approval. Tap “Check payment status” if you already paid.**

### Tab **I have a voucher**

**Voucher code** placeholder **SPAI-XXXX-XXXX**.

**PIN** placeholder **6-digit PIN**.

**Redeem voucher** (busy **Redeeming...**). Error **Invalid voucher code** (or server text). Needs both code and six PIN digits.

### Access ready

**Access ready**, package name, **Save your username and PIN below, then connect to WiFi when the router is ready.**

**Time remaining** countdown (then **Expired** / **Your session has expired. Choose a package to renew.**).

Family sentence if shared.

Time package: **Unlimited data for this browse period** (even if you set a hidden cap). Data package: **Download allowance: N GB**.

### **WiFi login — save these**

**Username** and **PIN** (labelled **PIN** in the credentials panel; field name **WiFi PIN** elsewhere).

If MikroTik login URL exists:

- Countdown button **Preparing router… Ns (tap to try anyway)** then **Connect to WiFi now**.
- While preparing: **Your credentials stay here. Wait for the router to import access, then connect.**
- After: **If connect fails, wait a few seconds and tap again.**

If you opened preview in a normal browser without captive `link-login`:

**Open this portal from the WiFi captive page so Connect is available, or enter these credentials on the hotspot login.**

### Single-device **Log out**

**Log out** (busy **Logging out...**). Failure **Could not log out. Try again.**

### Family **Disconnect this device** / **End session for all devices**

**Disconnect this device** (busy **Disconnecting...**) — this phone only. Failure **Could not disconnect this device. Try again.**

**End session for all devices** (busy **Ending session...**) — whole access code.

## Empty & error states

Covered above: no packages, router missing, load timeout with **Retry** / **Open in browser**, pay/voucher/cancel/disconnect failures as toasts or red lines on the card.

**Session expired** returns the guest to the package list.

Preview without hardware will not magically log a laptop onto a shop SSID. Use it to check brand, prices, and copy.

## What this page does not do

- It does not show remaining fair-use GB. Never. Owners see caps on **Locations** → **Packages** → **Details**.
- It does not let guests pick MTN vs Orange as a dropdown — the number is detected.
- It does not print vouchers. **Vouchers** in the owner app.
- It does not display your **Wallet**.
- **Preview portal** is not a speed test and does not require **Online** status.

## Related jobs

- Open preview from Locations: [Preview the captive portal](/help/preview-captive-portal).
- Preview with **Never seen**: [Preview before hardware](/help/preview-without-hardware).
- Paid, still captive: [Staff script: paid but no WiFi](/help/paid-but-no-wifi).
- Username is the phone: [MoMo username is the phone digits](/help/username-is-phone).
