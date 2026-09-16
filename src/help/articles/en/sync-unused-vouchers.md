---
id: tip.sync-vouchers
slug: sync-unused-vouchers
title: "Sync unused vouchers, wait 15s"
description: "Sync unused to router queues GRANT commands. Wait about 15 seconds for spaihub-commands to import, then check Hotspot users. Sync queued is not instant magic and does not credit the wallet."
role: ["owner"]
section: pro-tips
intents: ["sync unused vouchers", "15 seconds", "hotspot users"]
buttons: ["Sync unused to router", "Sync to router", "Create vouchers"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.vouchers", "glossary.commands"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Sync unused to router** (short **Sync to router**) queues every **Unused** voucher at the selected location as MikroTik **GRANT** commands so a phone can log in with the printed code and PIN even without opening the cloud redeem flow first.

**spaihub-commands** runs every **15 seconds**. The toast after a good sync is **Sync queued** and **Wait ~15s for spaihub-commands to import, then check Hotspot users**.

**Hotspot users** is the MikroTik list of usernames. Voucher usernames are the **SPAI-XXXX-XXXX** codes, not the buyer’s phone and not your owner email.

If the commands scheduler is missing, sync queues in the cloud and nothing appears on the Hex. That is a Script 2 problem, not a PDF problem.

## Why it matters

Event night in Akwa: you print tickets at 16h, guests arrive at 18h, the generator is loud, captive portal is slow. If unused codes were synced, a buyer can type code + PIN on the hotspot login and get on. If you never synced and the portal cannot complete redeem, you have paper that does not open the air.

Incident: owner tapped **Sync unused to router**, immediately opened Winbox, saw no users, tapped sync five more times, then said SpaiHub duplicated tickets. The first queue was still waiting for the 15s poll. Extra taps re-queue; they do not print extra paper. Wait.

Wrong diagnosis: “sync credits wallet.” It does not. Wrong diagnosis: “redeemed codes should sync too.” The button is unused only.

A third failure: router **OFFLINE**. You can still tap **Sync unused to router** in the cloud; the toast may even say **Sync queued**. Nothing imports until heartbeat and commands live again. Do not reprint the batch. Wait for **ONLINE**, wait 15 seconds, then look at Hotspot users. If you already sold those papers, guests can still **Redeem voucher** on the portal once Pay/redeem is possible — sync is the offline-login shortcut, not the only path.

## What you see

**Vouchers** page: location filter (required for sync), **Sync unused to router**, **Syncing...**

Toasts:

- **Sync queued** + wait ~15s copy.
- **Could not sync vouchers to router**
- **Select a location** if you forgot the filter.

On the Hex after a successful poll: hotspot users named like `SPAI-AB12-CD34` with comment `spaihub`.

**Sessions** still fill when someone actually logs in (**On router**). Syncing unused does not create fake live sessions.

## What to do

1. **Create vouchers** for the location and package.
2. Filter that **location**, tap **Sync unused to router** once.
3. Wait at least 15 seconds. Confirm `spaihub-commands` exists. Then check Hotspot users.
4. If nothing imports: router **ONLINE**? Script 2 pasted? TCP 443? Fix that, tap sync once more.
5. **Revoke** lost tickets, then do not expect those usernames to keep working after the next kick/grant cycle.

Safe to run anytime for unused stock — it re-queues GRANT. Prefer once per batch, then a 15s pause, then Winbox. If **Could not sync vouchers to router**, fix location filter and API reachability before you generate a second batch “because the first did not stick.”

## What not to say

- Do not tell a guest to “wait for wallet sync.” Wrong system.
- Do not promise remaining fair-use GB on the ticket stub.
- Do not say tapping sync faster than 15s “pushes harder.”
- Do not claim sync bypasses NAT. A cheap extender in router mode is still one MAC after they log in.
