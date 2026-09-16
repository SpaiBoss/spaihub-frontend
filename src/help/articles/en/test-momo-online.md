---
id: own.tut.online-momo
slug: test-momo-online
title: "Confirm ONLINE and a test MoMo pay"
description: "Wait for a recent heartbeat, then complete a small MTN MoMo or Orange Money payment on the captive portal."
role: ["owner"]
section: tutorials
intents: ["momo", "test payment", "online", "campay", "orange money"]
buttons: ["Preview portal", "Pay"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.paid-no-wifi", "tip.offline-blocks-pay"]
updatedAt: 2026-09-16
minutes: 12
---

Until the router is **ONLINE**, you are window-shopping. **ONLINE** means a **heartbeat** in the last **2 minutes**. **DEGRADED** is **2–5** minutes — the portal warns, and the backend may also reject pay. **OFFLINE** is never, or more than **5** minutes: the portal **blocks** MoMo. That is not a bug; it stops charging people when the Hex cannot grant. See [Offline router blocks MoMo](/help/router-offline-blocks-momo).

This job is a real (usually small) Campay payment with **MTN MoMo** or **Orange Money**. Use a number you control. Do not experiment on a stranger in the queue.

## What you will have

A **SUCCESS** pay, a **9-digit** username (the phone), a **6-digit** PIN, a session row, and — if **spaihub-commands** is healthy — **On router**. You keep XAF after the platform fee in **Wallet** (vouchers never do this).

## Before you start

- Script 2 (or CHR **Connect to SpaiHub**) pasted. Heartbeat **and** commands. Heartbeat alone does not grant WiFi.
- At least one cheap active package. Time-based 1 hour is enough. Guests on time plans see **Unlimited data**, not leftover GB — do not narrate hidden fair use during the test.
- A Cameroon MoMo wallet with a little balance. Minimum package price is yours; pick the cheapest SKU.
- Phone on the guest SSID **or** dashboard **Preview portal**. Preview can run the pay UI; **Connect to WiFi now** is meant for the captive path on the hotspot.
- Router not **OFFLINE**. If **DEGRADED**, wait for **ONLINE** unless you are testing the warning on purpose.

## Steps

1. **Locations** → **Routers**. Confirm status **Online** and a fresh **Last Seen**. If **Never (normal without MikroTik)**, you are not ready.
2. Tap **Preview portal**, or join the guest WiFi and open the captive page.
3. Stay on **Pay with MoMo** (the other tab is **I have a voucher**). Select the cheap package.
4. Enter the MoMo number (placeholder like `6XX XXX XXX`). You should see MTN or Orange detected.
5. Tap **Pay {{amount}} XAF** (the button prints the price). Approve the push on the phone. Do not tap pay twice.
6. Wait for **Access ready**. Username is the phone digits. PIN is 6 digits. Save them. Tap **Connect to WiFi now**. Preparing can show about **22 seconds** (`Preparing router… 22s`). If connect fails, wait a few seconds and tap again.
7. Open **Sessions** on the location. You want the phone, package, **On router**, and a MAC.

If the page sits on **Approve MoMo on your phone**, tap **Check payment status**. You can **Cancel and start over** only if you are sure nothing was taken. If money left the wallet and WiFi did not, **do not collect a second MoMo**. Switch to [Staff script: paid but no WiFi](/help/paid-but-no-wifi).

![Screenshot](about:blank)
_Screenshot slot: portal Pay amount XAF and ONLINE router row (staging)._

## What you should see

- Portal hint: pay via Campay; phone number becomes WiFi username; PIN appears after payment.
- **Transactions**: the row, **You keep {{amount}} XAF**.
- **Wallet**: balance moves after the platform fee. This is MoMo, not a voucher.
- **Dashboard**: **Today's Revenue** and **Active Sessions** can tick up.
- Time package guest copy still **Unlimited data for this browse period**.

**DEGRADED** banner: **Router connectivity is degraded — payments may be delayed.** Prefer to wait.

## If it fails

**Pay button dead / Router offline.** Fix Script 2 and 443 first. Do not take cash “we will activate later” unless you mean a [voucher](/help/print-and-sync-vouchers).

**Customer paid, still captive.** [Paid but no WiFi](/help/paid-but-no-wifi). **Check payment status**. Orphan Campay SUCCESS can be recovered. Confirm **spaihub-commands**. Re-paste Script 2. **Sessions** **Not seen** means the grant never imported. No second charge.

**Wrong username.** Username is the 9-digit phone, not the email you use to **Sign in**. PIN is the secret.

**Preview pay succeeded but Connect does nothing.** Open the portal from the WiFi captive page so **Connect** can talk to the hotspot, or type username/PIN on the hotspot login. Preview is still useful for the UI.

**DEGRADED then failed pay.** Wait for **ONLINE**, **Check payment status** before retrying. Double pay is how corridor arguments start.

**Wanted Orange, typed MTN number.** Operator is detected from the number. Use the wallet that actually rings.

Once this works, you are in business. Print stock next if you sell cash: [Print vouchers and sync](/help/print-and-sync-vouchers).

A clean test is a cheap SKU on **your** MTN or Orange number, **ONLINE** router, **Check payment status** if the push is slow, then **Sessions** **On router**. If the cité WiFi is busy, do not test on a stranger. If they already paid, you are in the staff script — still one Campay, never two. **Wallet** should move after the platform fee; a voucher test would not.
