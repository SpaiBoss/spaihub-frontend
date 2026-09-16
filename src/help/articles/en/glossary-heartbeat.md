---
id: glossary.heartbeat
slug: glossary-heartbeat
title: "Heartbeat"
description: "Heartbeat is the router’s once-a-minute check-in. ONLINE means last seen within 2 minutes, DEGRADED 2–5 minutes, OFFLINE more than 5 minutes or never. Heartbeat is not the commands scheduler that grants WiFi."
role: ["owner", "contributor"]
section: glossary
intents: ["heartbeat", "ONLINE OFFLINE DEGRADED", "last seen"]
buttons: ["Setup script", "Pay"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.offline-blocks-pay", "glossary.commands"]
updatedAt: 2026-09-16
minutes: 4
---

## Terms

**Heartbeat** is scheduler `spaihub-heartbeat` (about **1 minute**). The Hex or CHR POSTs “I am alive” to SpaiHub. **Last seen** is the timestamp of that check-in.

Status windows:

- **ONLINE** — last seen **≤ about 2 minutes**
- **DEGRADED** — last seen **about 2–5 minutes**
- **OFFLINE** — last seen **> about 5 minutes**, or **never** (including a preview-only router row)

Translated labels: **Online**, **Offline**, **Degraded**.

**OFFLINE disables Pay** on the portal. **DEGRADED** warns that payments may be delayed; Pay may still be attempted and may still fail on the server.

Heartbeat ≠ **spaihub-commands**. Alive boxes can still fail to GRANT if commands are missing.

Contributors do not paste heartbeat scripts. A shop **OFFLINE** still means buyers cannot MoMo there.

## Why it matters

“The router is on, I see lights” is not **ONLINE**. ONU lights without 443 egress = Never seen. Script 1 without Script 2 = maybe no heartbeat.

Wrong diagnosis: “DEGRADED means we should take two MoMo payments to be sure.” Never double charge. Wrong diagnosis: “heartbeat grants Wi‑Fi.” It does not.

**Last seen: Never (normal without MikroTik)** is expected on a row you added only to **Preview portal**. The same Never on a shop that was green at noon is a 443, power, or Script 2 problem. Do not treat those two Nevers as the same incident.

## What you see

**Locations** → **Routers**: **Status**, **Last Seen**. **Never (normal without MikroTik)** on a row created for preview.

**Dashboard** → **Router status**. Portal: offline copy blocks Pay; degraded copy warns. Contributors looking at a shop with no sales should ask whether **Pay** is blocked, not whether Campay “owes” a second debit.

CHR wizard: **Waiting for router heartbeat...** then **Router is online!**

## What to do

Owners: if Pay is blocked, restore power, WAN, HTTPS 443, then paste **2. Connect to SpaiHub**. Wait until **ONLINE** (seen within two minutes) before a test MoMo. If the portal says degraded, you may try Pay but stand there for **Check payment status** — do not assume success. Contributors: if the shop cannot sell, your **Links** may still show; do not promise buyers you can override Pay.

## What not to say

- Do not say ONLINE proves Script 2 grants exist. Check commands too.
- Do not tell guests remaining fair-use GB while you wait for Last seen.
- Do not publish the heartbeat URL or router token.
- Do not say contributors control heartbeat in **Settings**.
