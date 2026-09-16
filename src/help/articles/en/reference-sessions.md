---
id: own.ref.sessions
slug: reference-sessions
title: "Sessions reference"
description: "Live session table on a location: phone, Voucher vs Mobile Money, On router vs Not seen, MAC, Kick (about 15 seconds)."
role: ["owner"]
section: reference
intents: ["reference", "reference-sessions", "kick", "on router"]
buttons: ["Kick"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.kick-suspend", "tip.one-mac-nat"]
updatedAt: 2026-09-16
minutes: 10
---

## What this page is

There is no separate **Sessions** item in the owner sidebar. Live sessions live on **Locations**. Expand a site and open the **Sessions** tab (on a phone the tab is **Live**).

This table is the shop CCTV for paid Wi‑Fi: who paid, with what, which router they should be on, whether the Hex actually has the login, when the browse ends, and a **Kick** if you need them off now.

It is a **location** filter of `/api/owner/sessions` — you only see this site’s active paid window, not history of expired days.

Use this map so a cashier does not guess what **On router** means, and so you do not treat one MAC as “only one phone in the house.”

## Terms

**Session** — a paid access window: start, end, username, PIN, package. It exists in SpaiHub even before the Hex imports the login.

**On router** — SpaiHub saw that username in MikroTik **active hosts** (the hotspot is actually using the grant). A MAC may be listed next to it.

**Not seen** — the grant is in SpaiHub, but this poll did not see the login on the box. Common just after payment (wait for `spaihub-commands`, about 15 seconds), if Script 2 is missing, or if the guest has not tapped **Connect to WiFi now**.

**Kick** — queue a disconnect on the router. The toast says the device should drop within **15 seconds**. The scheduler `spaihub-commands` must exist.

**Payment source** — how this session was bought. SpaiHub shows **Voucher** or **Mobile Money** under the phone number.

**MAC** — the Wi‑Fi client address the Hex reports. One MAC can be a **cheap extender** (Pixlink, Tenda, or similar) in **router / NAT mode**, or a phone sharing a hotspot. Many people can sit behind that one MAC. SpaiHub is not lying; NAT hides the rest.

**Device** column — labelled **Device**, but the first line is the **subscriber phone** (MoMo username digits, or the phone tied to that voucher redeem). It is not a device brand name.

## Every control

### Tab **Sessions** / **Live**

After you expand a location, tap **Sessions**. While expand is loading you see a pulse block, not an empty message.

### Empty copy

When nobody is in an active window:

- **No active sessions at this location.**
- Hint: **After re-pasting the router connection script, live “On router” status appears here. One seen MAC can still be a NAT gateway.**

Empty can mean a quiet morning. It can also mean Script 2 never ran, so grants never land and you never see **On router**. If people paid on the portal and this stays empty, paste **2. Connect to SpaiHub** from **Setup script**. Tutorial: [Kick a session or suspend a location](/help/kick-and-suspend).

### NAT hint (when rows exist)

Above the table:

**“On router” means the login is in MikroTik active hosts. A single MAC may still be a cheap extender, phone hotspot, or personal router sharing with many devices.**

Read that before you accuse a family of “stealing” because you see one line. See [One MAC on Sessions can be a NAT gateway](/help/one-mac-can-be-nat).

### Column **Device**

- Bold line: Cameroon phone digits (the Wi‑Fi **Username** for MoMo is this number).
- Second line: **Voucher** or **Mobile Money**.

Use this when a guest says “I paid.” Match the number they used on Campay. Voucher sessions still show a phone if SpaiHub stored one at redeem; the source line tells you it was paper stock, not MoMo wallet credit.

### Column **Package**

The package **name** they bought (for example “1 Hour Browse”). It does not repeat the owner **Details** fair-use cap here. Caps stay on **Packages** → **Details**.

### Column **Router**

Router **name** on this location, or an em dash if none is attached to the session. If you have two Hexes in one building, this is how you see which box should hold the login.

### Column **Status** — **On router** vs **Not seen**

**On router** (green): login is in active hosts. If the API sent a MAC, it appears after a dot: **On router · AA:BB:…**

**Not seen** (grey): not in the last active-host snapshot.

Honest workflow:

1. Guest pays or redeems.
2. Portal may show **Preparing router… Ns** then **Connect to WiFi now**.
3. Within about 15 seconds of a healthy `spaihub-commands` poll, this row should move to **On router**.
4. If it stays **Not seen** after a minute, check router **Online** on **Dashboard** / **Routers**, then re-paste Script 2.

Do not take a second MoMo payment until you have checked **Check payment status** on the portal and this column.

### Column **Ends**

Local timestamp of **session end**. When it passes, the row leaves this live table. Time packages end on the clock; data packages also end if the allowance (or a time-package fair-use cap) is exhausted on the router — guests then see **Fair use limit reached**, never a remaining-GB counter.

### **Kick**

Red control with the user-off icon. Tap once.

Success toast: **Session ended — device should disconnect within 15 seconds.**

Failure toast: **Failed to end session.**

**Kick** does not refund MoMo and does not revoke a voucher code. It ends this access window and asks the Hex to drop the host. If Script 2 is absent, the toast may still succeed in SpaiHub while the phone stays online until expiry — paste the connection script.

To stop the whole shop selling, use **Suspend** on the location row, not **Kick** on every line. See [Kick a session or suspend a location](/help/kick-and-suspend).

## Empty & error states

If expand fails: **Failed to load location details** — the Sessions tab has nothing useful until you retry expand.

**Kick** failures stay on the row; reload by collapsing and expanding the location.

There is no pagination, search, or date filter on this tab. Expired sessions are not listed here. Historical money is **Transactions** and **Dashboard**.

There is no “refresh” button. Expanding the location again reloads sessions.

## What this page does not do

- It does not show remaining fair-use GB. Owners see caps on **Packages** → **Details**. Guests never see remaining GB.
- It does not list voucher inventory or **Revoke**. That is **Vouchers**.
- It does not change **Simultaneous devices**. That is the package form or **Access policy** fallback.
- It does not prove how many phones are behind a cheap extender. **On router** + one MAC can still be a whole house. [Cheap extender in router mode](/help/pixlink-nat).
- It is not a network packet capture. No speed graph, no DNS log.
- No admin console.

## Related jobs

- When to kick vs suspend the shop: [Kick a session or suspend a location](/help/kick-and-suspend).
- Why one MAC is not one person: [One MAC on Sessions can be a NAT gateway](/help/one-mac-can-be-nat).
- Paid on MoMo, still captive: [Staff script: paid but no WiFi](/help/paid-but-no-wifi).
- Full site map including this tab: [Locations reference](/help/reference-locations).
