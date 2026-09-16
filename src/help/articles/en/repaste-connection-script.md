---
id: own.tut.repaste-script2
slug: repaste-connection-script
title: "Re-paste the connection script without kicking users"
description: "Paste Script 2 only to refresh heartbeat and commands polling. It should not mass-kick paying users. Leave Script 1 unless the captive page is wrong."
role: ["owner"]
section: tutorials
intents: ["script 2", "commands scheduler", "repaste", "heartbeat", "connection script"]
buttons: ["Setup script"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.script-1-vs-2", "own.tut.hex-existing"]
updatedAt: 2026-09-16
minutes: 10
---

When **Sessions** stay empty, kicks never land, or MoMo succeeds but WiFi does not, the usual hole is **Script 2** — **Connect to SpaiHub** — not a new hotspot overlay. Script 2 installs **spaihub-heartbeat** (1 minute), **spaihub-commands** (15 seconds), and **spaihub-hotspot-active** (2 minutes). Heartbeat paints **ONLINE**. Commands fetch GRANT and KICK. Active reports who is on the box.

Re-pasting Script 2 **refreshes polling** and should **not mass-kick** paying users. That is the point of this job. Do not reboot the Hex “for luck” during peak; a reboot **does** drop people.

Script 1 is the overlay: walled garden, PAP, `login.html` / `status.html`. Re-run Script 1 only when the captive **page** is wrong. Split: [Script 1 vs Script 2](/help/script-1-vs-script-2). Physical walkthrough: [Hex existing hotspot](/help/setup-mikrotik-hex-existing). CHR uses the wizard’s **Connect to SpaiHub** step, not this two-paste sheet.

## What you will have

Schedulers back on the MikroTik, a fresh **Last Seen**, **ONLINE** within two minutes if 443 works, and grants/kicks that land again. People who already paid should stay on unless something else reboots the box.

## Before you start

- WinBox/terminal on the **correct** router. Pasting Script 2 on the office Hex while the guest Hex is sick helps nobody.
- Dashboard **Locations** → that router’s **Setup script**.
- Know you need HTTPS 443 out. Script 2 cannot phone home from a walled-off WAN.
- If guests are in the shop, tell them you are refreshing the link, not resetting WiFi.
- Read the dashboard banner if present: **Update your router connection script** — re-run the connection script from Locations → your router → Setup. After you paste, you may **Dismiss** the banner.

Do not take a second MoMo from someone who already paid. If that is the case, keep [paid but no WiFi](/help/paid-but-no-wifi) open. Script 2 is how grants start landing; it is not a refund button and not a WAN reset.

If the captive **login.html** is still the old MikroTik default, that is Script 1, a different paste. This article assumes the guest page already looks like SpaiHub (**Pay with MoMo**, **I have a voucher**) and only the radio/grant path is sick.

## Steps

1. **Locations** → **Routers** → **Setup script**.
2. Leave **Script 1 path** as it already is (**Existing hotspot** or **Create guest hotspot**). You are **not** redoing guest DHCP in this job.
3. Copy **only** **2. Connect to SpaiHub**. Paste in the terminal. Let it remove/re-add the three **spaihub-*** scripts and schedulers (that is how the generated script refreshes them).
4. On the Hex: `/system scheduler print` and confirm **spaihub-heartbeat**, **spaihub-commands**, **spaihub-hotspot-active**.
5. Wait up to about two minutes. Dashboard **Last Seen** should move. Status **ONLINE** (≤2 min). **DEGRADED** (2–5) wait. **OFFLINE** means 443 or paste failed.
6. **Dismiss** the connection-script banner if it is still there after a good paste.
7. Test a **Kick** on a session you control, or a cheap MoMo on your own number. Paying strangers should not have dropped in a wave.

CHR owners: open **Setup CHR**, jump to **Connect to SpaiHub**, paste that block only if bootstrap and hotspot already ran. Do not paste Bootstrap again on a live VM.

![Screenshot](about:blank)
_Screenshot slot: Setup script panel highlighting Connect to SpaiHub (staging)._

## What you should see

- Scheduler intervals: 1m / 15s / 2m.
- **Sessions** start showing **On router** for live logins after **spaihub-hotspot-active** has a cycle (up to ~2 minutes, often faster with commands).
- New pays grant without a reboot.
- No mass captive-portal stampede.

**Last seen Never (normal without MikroTik)** should be gone after a real heartbeat.

## If it fails

**Still OFFLINE.** WAN DNS, 443, wrong router, or paste errors. Fix reachability before you paste a fourth time.

**ONLINE, still no grants.** Confirm **spaihub-commands** by **name**. Heartbeat-only green is the classic trap. See staff script [paid but no WiFi](/help/paid-but-no-wifi).

**I also pasted Script 1 and DHCP changed.** Then you left this article. Script 1 on **Create guest hotspot** is a different job. Restore if WAN died.

**People disconnected.** Look for reboot, power blink, or you ran Bootstrap on CHR. Script 2 alone should not mass-kick. If it did, collect scheduler print and continue support — do not charge guests again.

**Banner dismissed, problem remains.** UI hide ≠ fix. Paste Script 2.

**Preview portal worked all along.** Preview does not need heartbeat. Live grant does. Do not use a pretty preview as proof Script 2 is healthy.

**Scheduler print shows heartbeat but not commands.** Paste Script 2 again. Do not “fix” it with a reboot at 20:30. After commands exists, a **Kick** on your own test session should drop within ~15 seconds — that is a healthier proof than another stranger’s MoMo.

**CHR vs Hex.** Physical: **Setup script** → block 2. Cloud: **Setup CHR** → **Connect to SpaiHub**. Mixing Bootstrap into a live CHR is how you mass-disconnect. Order reminder: [CHR scripts must stay in order](/help/chr-script-order).

**Dismissed banner, still DEGRADED.** Wait for a heartbeat ≤2 minutes. **DEGRADED** is 2–5. **OFFLINE** is never or >5. Status is time, not a mood. Fix 443 if Last Seen does not move.
