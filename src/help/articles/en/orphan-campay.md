---
id: tip.paid-no-wifi
slug: orphan-campay
title: "Payment succeeded, WiFi did not"
description: "Campay can show SUCCESS while the local grant is still FAILED. Check payment status recovers that. Pending payments survive reload. Do not charge the buyer twice."
role: ["owner"]
section: pro-tips
intents: ["orphan campay", "paid no wifi", "check payment status", "SUCCESS FAILED"]
buttons: ["Check payment status", "Pay", "Connect", "Setup script"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.paid-no-wifi", "glossary.commands"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

**Campay** is the MoMo rail behind **Pay … XAF**. The buyer approves on the phone. Campay can report **SUCCESS** even if SpaiHub later failed to create the hotspot user (router offline mid-flight, commands scheduler missing, timeout).

An **orphan payment** is that split-brain: money moved, Wi‑Fi did not. The portal button **Check payment status** is how the phone asks SpaiHub to reconcile Campay and finish the grant.

**Pending** means Campay has not finished. The portal keeps that pending across reload: **You can close this page and come back — we'll pick up where we left off.** and **Still waiting for MoMo approval. Tap “Check payment status” if you already paid.**

**FAILED** on the local grant is not the same as Campay failed. Staff mix those words at the counter. Ask which screen.

## Why it matters

Saturday 21h, Bonamoussadi: MTN debit SMS arrived, captive page said **Payment failed** or sat on **Approve MoMo on your phone**, Wi‑Fi still locked. Buyer is angry in front of the generator. The wrong move is **Pay** again. You may double-charge. The right move is **Check payment status**, then Script 2 if **Sessions** never becomes **On router**.

Wrong diagnosis: “Campay stole the money.” Often Campay succeeded and `spaihub-commands` was missing, so GRANT never imported. Wrong diagnosis: “tell them to pay Orange instead.” Same portal, same commands scheduler.

Heartbeat **ONLINE** is required to *start* new MoMo. It does not finish a grant by itself.

## What you see

On the portal:

- **Approve MoMo on your phone** while waiting.
- **Check payment status** / **Checking...**
- **Cancel and start over** — do not use this as a second charge. Cancel is for abandoning a stuck pending, not for retrying a success.
- After success: **Access ready**, **Username**, **WiFi PIN**, **Connect**.
- **Router offline — Mobile Money payments are unavailable until it reconnects.** if you should not have started Pay at all.

On **Sessions**: phone, package, **On router** vs **Not seen**. **Not seen** after Campay success = grant never imported or phone never logged in.

Owner **Transactions** will show the MoMo sale when SpaiHub recorded it. Voucher cash is a different story.

## What to do

Tonight, at the counter:

1. Look at router status. If **OFFLINE**, do not take another MoMo. Fix heartbeat first.
2. On the **same phone** that paid, open the captive page (or **Preview portal** only if that is the same router and it is online — real SSID is better).
3. Tap **Check payment status**. Wait. Username should be the MoMo **phone digits**, not the owner email.
4. If credentials appear, tap **Connect**. Wait through **Preparing router…** rather than paying again.
5. If credentials appear but **Sessions** stay **Not seen**, paste **2. Connect to SpaiHub**. Wait 15s. Confirm `spaihub-commands`.
6. Pending survives reload. If they still wait on MoMo PIN, they should approve on the phone, not pay a second package.

Do not invent a refund story until status is checked. Do not collect cash “because MoMo failed” if the debit SMS already landed — check status first.

## What not to say

- Do not say “pay again, the first one expired” until **Check payment status** and Campay are actually failed.
- Do not tell them remaining fair-use GB as compensation chatter.
- Do not promise you can reverse MoMo from the SpaiHub owner app. You sell access; you do not run Campay admin here.
- Do not blame the voucher tab. This incident is MoMo.
