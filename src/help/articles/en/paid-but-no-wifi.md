---
id: own.tut.paid-no-wifi
slug: paid-but-no-wifi
title: "Staff script: paid but no WiFi"
description: "Campay succeeded and the phone is still captive. Recover the payment. Do not take a second MoMo. Check commands, not just heartbeat."
role: ["owner"]
section: troubleshooting
intents: ["paid no wifi", "orphan payment", "campay", "staff script", "check payment status"]
buttons: ["Check payment status", "Setup script"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.paid-no-wifi", "own.tut.repaste-script2"]
updatedAt: 2026-09-16
minutes: 12
---

This is a **staff script** for the corridor when someone shows you an Orange Money or MTN MoMo SMS and the captive page is still asking them to pay. Money moved. WiFi did not. Your first sentence is: **we will not take a second MoMo**. The second is: tap **Check payment status**.

SpaiHub can recover an **orphan Campay SUCCESS** — the operator paid, the portal tab died, or the phone reloaded — and it can keep a **pending** payment across reloads. The guest can close the page and come back. That is why you never “just pay again” as step one. Short tip: [Payment succeeded, WiFi did not](/help/orphan-campay).

## What you will have

Either the existing pay unlocked (username = 9-digit phone, PIN 6 digits, **Connect to WiFi now**), or a clear diagnosis: router **OFFLINE**, **spaihub-commands** missing, or **Sessions** stuck on **Not seen**. You will not have a second debit on the customer’s wallet from this shop.

## Before you start

- Stay calm. Peak-hour Douala queues escalate when staff grab another 200 XAF.
- The guest’s MoMo SMS or Campay proof. Same phone number they typed on the portal.
- Access to **Locations** → that site’s **Routers** and **Sessions**.
- Terminal if you must inspect schedulers: `/system scheduler print`.
- Know heartbeat vs commands: **spaihub-heartbeat** (1m) marks **ONLINE**. **spaihub-commands** (15s) imports GRANT/KICK. **spaihub-hotspot-active** (2m) is who is actually on the Hex. Green last-seen without commands = pretty lie.

If the router is **OFFLINE**, new MoMo is blocked on purpose. This guest may still have an old SUCCESS to recover — still no second pay.

## Steps — at the counter (no second charge)

1. **Do not** tap **Pay {{amount}} XAF** again. **Do not** take cash “for a voucher instead” unless you are giving a **free** courtesy code you generated. Charging twice is the failure.
2. On the guest phone, open the captive portal (same WiFi). Tap **Check payment status**. Wait. Copy: **Still waiting for MoMo approval. Tap “Check payment status” if you already paid.** After SUCCESS: **Access ready**, credentials, **Connect to WiFi now** (~22s preparing). They may **Cancel and start over** only if you are sure Campay did **not** succeed — if SMS says paid, do not cancel into a new debit.
3. If the tab was lost: they can reopen the portal from the hotspot page. Pending and SUCCESS recovery should pick up. Username will be that phone. PIN is the secret; if they never saw it, status check should show **WiFi login — save these** again after recovery.
4. Watch **Sessions**. **On router** = the Hex has the login in active hosts. **Not seen** = SpaiHub knows a session but the grant never imported (or active script has not reported). One MAC can still be a NAT box — many humans, one row.

## Steps — if status check is not enough

5. Confirm router **ONLINE** (heartbeat ≤ 2 min). **DEGRADED** (2–5) can delay or reject pay; wait if you can. **OFFLINE**: fix WAN/443 and Script 2; still no second MoMo.
6. On the MikroTik: `/system scheduler print`. You need **spaihub-commands**. Heartbeat alone is not enough. If commands is missing, **Locations** → **Setup script** → paste **2. Connect to SpaiHub** only. Re-paste should not mass-kick. Guide: [Re-paste the connection script](/help/repaste-connection-script).
7. Wait one commands cycle (~15s) plus a moment. Guest taps **Connect** again. If connect fails, wait a few seconds and tap again (portal hint).
8. Recheck **Sessions**. **On router** with a MAC: the radio has them. If they are still captive, they may not be on this SSID, or a second device is confused with family limits.
9. Owner **Kick** is the wrong tool to “fix” a paid-not-online guest. Kick ends a session that already exists. You want import, not kick.

## What you should see when it is fixed

- Portal **Access ready** / **Connect to WiFi now**.
- **Transactions** already shows the first SUCCESS and **You keep {{amount}} XAF**. There is **not** a second SUCCESS from a panic pay.
- **Sessions**: phone, package, **On router**.
- Time package copy still **Unlimited data** — do not “compensate” by reading hidden fair-use GB.

![Screenshot](about:blank)
_Screenshot slot: Check payment status on portal and Sessions On router (staging)._

## If it fails

**SMS paid, Check payment status still waiting.** Wait a minute, retry status, confirm they used the **same** number as the wallet that rang. Do not start a second **Pay**. Escalate with the existing transaction, not a new one.

**Two SUCCESS rows.** Someone double-paid. Stop. Help the first credentials online; the second is a support/refund conversation — not another product click in this article.

**On router but phone captive.** Wrong SSID, browser cache, or they need to use username/PIN on the hotspot login. **Connect** is available from the WiFi captive page; preview-only tabs are weaker.

**Not seen after Script 2.** Commands still failing, clock/DNS on Hex, or they are not hitting this router. Confirm **Last Seen**. CHR: AP must be on LAN, not WAN.

**OFFLINE blocks the button.** Expected. [Offline router blocks MoMo](/help/router-offline-blocks-momo). Recover SUCCESS if it already exists; do not invent a cash pay “until the Hex wakes” unless you issue a real voucher you will not also charge as MoMo.

**Family plan, extra phone.** Simultaneous device cap. **Disconnect this device** / **End session for all devices** on the portal, or they buy a [family package](/help/create-family-package). Not a Campay orphan.

**Staff want leftover GB as goodwill.** No. Time plans do not show remaining GB to guests. Offer a clean reconnect or a voucher you actually generated.

When the site is calm, run your own cheap [MoMo test](/help/test-momo-online) so the next stranger is not the experiment.
