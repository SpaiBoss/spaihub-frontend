---
id: own.tut.kick-suspend
slug: kick-and-suspend
title: "Kick a session or suspend a location"
description: "Cut one login in about 15 seconds, or suspend the whole site to stop new sales and kick everyone. Needs the commands scheduler."
role: ["owner"]
section: tutorials
intents: ["kick", "suspend", "activate", "ban", "end session"]
buttons: ["Kick", "Suspend", "Activate", "Deactivate"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.sessions", "own.ref.locations"]
updatedAt: 2026-09-17
minutes: 10
---

Two different hammers. **Kick** is one live session — the phone that is hogging the Hex at 21:00. **Suspend** is the whole **location**: new portal purchases stop, and live sessions are kicked. Use **Suspend** when the shop is closed, the router is in the repair bag, or you must freeze a site without deleting history.

**Activate** turns the site back on. **Deactivate** on a **package** is yet another hammer — it hides one SKU, not the shop. **Activate** on that same package row puts the SKU back on the portal.

Kick is not instant magic from the cloud to the radio. SpaiHub queues a MikroTik kick. The **spaihub-commands** scheduler (Script 2, every **15 seconds**) must be running. Toast copy: **Session ended — device should disconnect within 15 seconds**.

Read the tables: [Sessions reference](/help/reference-sessions) and [Locations reference](/help/reference-locations).

## What you will have

Either one row gone from **Sessions**, or a location marked suspended so the corridor cannot buy until you **Activate**. Transactions history remains. Wallet does not refund anyone — Kick is access, not a Campay reverse.

## Before you start

- Router should be **ONLINE** for a kick to land. **OFFLINE** means you are shouting into a dead radio.
- Confirm **spaihub-commands** exists if kicks “do nothing”. If missing, [re-paste Script 2](/help/repaste-connection-script) — should not mass-kick payers just by pasting.
- Know **On router** vs **Not seen**. **On router** means the login is in MikroTik active hosts. **Not seen** means SpaiHub has a session idea the Hex has not shown. Kicking a **Not seen** row may still queue a command; if the MAC was never there, the guest was never online.
- One MAC can be a NAT gateway (cheap extender, phone hotspot). Kicking that MAC drops everyone behind it. That can be what you want.

Do not **Suspend** because one child bought a 1-hour plan. **Kick** that session. **Suspend** is the “shop is closed / Hex is in the bag” switch. It kicks **all** live sessions on that location and stops **Pay with MoMo** and new voucher redeems there. **Activate** is how you reopen. You keep **Transactions** history either way — this is not a delete.

On a phone, **Sessions** is the **Live** short under the expanded location. **Kick** is still the row button. There is no bell that lists “banned MACs”. Randomised phone MACs will look like a new device tomorrow; that is a phone setting, not SpaiHub revenge.

## Steps — kick one session

1. **Locations** → expand the site → **Sessions** (short: **Live**). Empty copy: **No active sessions at this location.**
2. Find the row: device/phone, package, router, ends, **On router** or **Not seen**, MAC.
3. Tap **Kick**. Wait about 15 seconds.
4. The phone should return to the captive page. If they paid a time plan, they may buy again — Kick is not a lifetime ban.

## Steps — suspend the site

1. **Locations** list row (not only the tab). Tap **Suspend**.
2. Confirm the site shows suspended. New **Pay with MoMo** / voucher redeem for that location should stop. Live people get kicked.
3. When the shop reopens or the Hex is back, tap **Activate**. Toast paths: **Location suspended** / **Location activated**.

**Edit location** only changes **Location name** and **Address**. It does not kick.

![Screenshot](about:blank)
_Screenshot slot: Sessions Kick and location Suspend (staging)._

## What you should see

- After Kick: row disappears or the device drops; toast about 15 seconds.
- After Suspend: location status **Suspended**; **Active Sessions** on **Dashboard** for that site fall.
- **Transactions** still lists today’s MoMo and vouchers. You do not erase the evening’s XAF story.
- Family plans: **End session for all devices** on the portal is the guest-side cousin of Kick-all for that code. Owner **Kick** is per session row.

## If it fails

**Kick does nothing.** Commands scheduler missing or router **OFFLINE**. Paste Script 2. Do not reboot the Hex as a first reflex during peak — that does mass-kick.

**I wanted to stop one package.** **Deactivate** on **Packages**, not **Suspend** the location. **Activate** on that row when the SKU should sell again.

**Suspended but people still online.** Wait the command poll (~15s) and any in-flight sessions. If still on, check you suspended the **correct** location — Akwa vs Bastos mix-ups are common.

**Not seen forever.** Grant never imported, or heartbeat/active script stale. See [paid but no WiFi](/help/paid-but-no-wifi) if they paid. **On router** is the healthy live flag.

**Kicked a NAT MAC and the whole house screamed.** Expected. Sell [family packages](/help/create-family-package) and explain cheap-extender router mode. You cannot Kick “just the nephew” behind NAT.

**Looked for a ban list bell.** Not in this build. Kick + Suspend + package **Deactivate** / **Activate** are the tools.

**Activate does nothing.** You may already be active, or you tapped on the wrong site. Confirm the row label. If the portal still refuses pay, check router **OFFLINE** — that is a different block than suspend.

**I suspended to “reset fair use”.** Wrong tool. Fair use on time plans is the hidden cap on the package; guests still see unlimited data. When they hit the cap they buy again. Do not quote remaining GB, and do not freeze the whole corridor.

When the site is healthy again, [test MoMo](/help/test-momo-online) on a cheap SKU before you trust peak hour. If kicks never landed, paste Script 2 first: [re-paste the connection script](/help/repaste-connection-script).
