---
id: tip.offline-blocks-pay
slug: router-offline-blocks-momo
title: "Offline router blocks MoMo"
description: "OFFLINE disables Pay on the portal. DEGRADED only warns; payment may still fail on the server. Heartbeat must land at least every two minutes for ONLINE."
role: ["owner"]
section: pro-tips
intents: ["router offline", "blocks momo", "DEGRADED", "Pay disabled"]
buttons: ["Pay", "Preview portal", "Setup script"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["glossary.heartbeat", "own.tut.online-momo"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Heartbeat** is the Hex or CHR calling SpaiHub about once a minute (`spaihub-heartbeat`). Status is derived from **Last seen**:

- **ONLINE** — seen within about **2 minutes**.
- **DEGRADED** — last seen between about **2 and 5 minutes**.
- **OFFLINE** — last seen **more than 5 minutes** ago, or **never**.

**Pay** is the portal button **Pay … XAF**. When the router is **OFFLINE**, MoMo is disabled: **Router offline — Mobile Money payments are unavailable until it reconnects.**

**DEGRADED** shows **Router connectivity is degraded — payments may be delayed.** Pay may still be tappable. The server can still refuse or the grant can still fail. Degraded is a warning, not a green light.

## Why it matters

During a Eneo dip in New Bell the Hex rebooted. Heartbeat stopped. Buyers still saw packages (the portal is in the cloud) and tried to pay. Old firmware stories say “MoMo will queue.” SpaiHub will not take a walk-in payment it cannot grant. **OFFLINE disables Pay.** That is kindness: you do not create orphan Campay SUCCESS while the box is dead.

Wrong diagnosis: “Campay is down because Pay is grey.” Look at **Locations** router **Status** / **Last seen** first. Wrong diagnosis: “DEGRADED means we should collect cash vouchers only.” You may still try MoMo, but warn that it can fail; have unused vouchers as backup if the box is actually dying.

Voucher redeem also needs the router to import users if you rely on hotspot users. An offline box will not help a printed code that was never synced and cannot GRANT.

## What you see

**Locations** → **Routers** table: **Name**, **Status**, **Last Seen**, **Setup script**.

**Dashboard** → **Router status**. **Never seen** on a preview-only row is normal. **Never seen** on a shop that used to be green is a Script 2 / HTTPS / power problem.

Portal copy:

- Offline: Pay unavailable until reconnect.
- Degraded: payments may be delayed.

**Sessions** will not get new **On router** lines from a box that cannot poll commands.

## What to do

Tonight:

1. If Pay is blocked, do not send buyers to another package price as if Campay were the issue.
2. Power, WAN, DNS, TCP **443** egress. Then paste **2. Connect to SpaiHub** if schedulers vanished after reboot.
3. Wait until **ONLINE** (heartbeat within two minutes), then one test **Pay** on a cheap plan.
4. If status is **DEGRADED**, you may attempt Pay, but stand next to the buyer. If it fails, **Check payment status** — do not double charge. Expect grants to be slow or to fail until **ONLINE**.
5. Keep a small stack of unused vouchers for true offline nights — knowing voucher cash does not credit **Wallet**.

## What not to say

- Do not say “pay anyway, we will grant later” while **OFFLINE**. The button is disabled for a reason.
- Do not promise DEGRADED is harmless. The server may still fail the pay.
- Do not tell guests remaining fair-use GB while you wait for heartbeat.
- Do not blame MoMo username format for a disabled Pay button.
