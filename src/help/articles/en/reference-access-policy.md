---
id: own.ref.access-policy
slug: reference-access-policy
title: "Access policy reference"
description: "Location fallback Devices per access code (0 = one device), Save access policy, and why package Simultaneous devices wins. NAT caveat and HelpTip."
role: ["owner"]
section: reference
intents: ["reference", "reference-access-policy", "simultaneous devices", "fallback"]
buttons: ["Save access policy"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.access-fallback", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 10
---

## What this page is

**Access policy** is a tab on an expanded **location**, not a sidebar page. Open **Locations**, expand the shop, tap **Access policy** (phone: **Policy**).

This screen holds **one** number: **Devices per access code (fallback)**. It is the safety net for old voucher stock (or any grant) whose package has no simultaneous-device limit stored. Day-to-day, you set **Simultaneous devices** on each package when you tap **Add Package** / **Edit**. The package value **wins**.

If you came here hoping to “block tethering” or count phones behind a home router, stop. This field counts **distinct Wi‑Fi MACs** the hotspot sees. A cheap extender in router mode is still one MAC.

## Terms

**Access code** — the username + **PIN** pair a guest uses on the hotspot. MoMo username is the phone digits. Family plans share one pair up to the device limit.

**Simultaneous devices** — package field, 1–20. How many distinct MACs may use that pair at once. Use **1** for a cheap single-phone plan. Use **4** (for example) on a higher-priced **family** plan. The captive portal then shows **Disconnect this device** and **End session for all devices**.

**Fallback** — this location number, used only when a package limit is missing. It does not override a package that already has **Simultaneous devices**.

**0 = one device** — on this fallback field, zero means a single MAC, not “unlimited.” Do not leave it at 0 thinking you turned sharing off in a special way; you turned the fallback into one device.

**NAT caveat** — phones behind a customer’s own router or a cheap extender in **router mode** share one WAN MAC. SpaiHub cannot see the phones inside that house. Price the family plan; keep cheap plans at 1 device; discourage personal extenders in router mode. TTL “anti-tether” firewall rules stay **off** in SpaiHub — they broke normal phones.

**HelpTip** — the small circle-question icon next to the field label. Screen reader name: **Open the Help article for this setting**. It links here.

**Poll** — after you save, routers pick up the policy on their next command poll, not instantly in Winbox.

## Every control

### Title and intro

**Access policy**

**Simultaneous devices are controlled on each package. This location setting is only a fallback for vouchers when a package limit is missing.**

Read the intro before you change the number. If every live package already has **Simultaneous devices** (the form always sends 1–20 today), this fallback rarely fires. It still matters for older voucher batches created before a limit existed.

### **Devices per access code (fallback)**

Number input, minimum **0**.

Next to the label: HelpTip → this article.

Under the field (Help markup uses bold in the app):

**0 = one device. Prefer setting Simultaneous devices on each package (e.g. 4 for family plans). Counts distinct Wi‑Fi MACs — not phones behind a home router in NAT/router mode.**

What to type:

- **0** — fallback is one MAC.
- **1** — also one MAC (same practical outcome as 0 for this fallback).
- **2–20** — only as a fallback for grants that lack a package limit. Prefer **4** on the **family** package itself so the portal copy matches.

Do not set 20 here “to be safe” on a shop that sells 100 XAF hour passes. You will not see twenty phones if they NAT; you will allow twenty **MACs**, including twenty separate phones that joined the hotspot SSID directly.

### Tip box

Grey boxed sentence:

**Tip: use 1-device packages with a fair-use data cap, and discourage personal Wi‑Fi extenders in router mode on this hotspot.**

That is the product policy in one line: sell a cheap 1-device time plan with a **hidden** fair-use cap (owners see GB on **Packages** → **Details**; guests see unlimited browse, then **Fair use limit reached**). Do not promise you can count phones behind NAT. Do not tell guests remaining fair-use GB.

### **Save access policy**

Primary button. While the request runs: **Saving...**

Success toast: **Access policy saved — routers will apply changes on their next poll**

Failure toast: **Failed to save access policy**

There is no separate Cancel on this tab. Closing the location row without saving drops unsaved edits. Expand again to see the last saved number.

Saving this tab does **not** rewrite **Simultaneous devices** on packages. Edit the package to change family vs single-device products.

## Empty & error states

If you never expanded successfully, you will not see this form — toast **Failed to load location details**.

The field always has a number (default **0** from the location). There is no “empty policy” illustration.

Failed save leaves the input as you typed it; the server still has the old value until a successful save.

Routers that are **Never seen** will not apply anything until Script 2 heartbeats. Saving still succeeds in SpaiHub.

## What this page does not do

- It does not create a family package. Use **Add Package** and set **Simultaneous devices**. Tutorial: [Create a family package](/help/create-family-package).
- It does not kick a MAC. That is **Sessions** → **Kick**.
- It does not enable anti-tether firewall rules. Those stay off.
- It does not show remaining fair-use GB to anyone. Caps are owner **Details** only.
- It does not list which vouchers lack a package limit. Treat fallback as legacy insurance.
- It is not an admin console and not a contributor screen.

## Related jobs

- Why this number is a fallback: [Location policy is a fallback](/help/access-policy-fallback).
- Sell sharing honestly: [Create a family package](/help/create-family-package).
- NAT in the real shop: [Cheap extender in router mode](/help/pixlink-nat).
- Where the tab lives: [Locations reference](/help/reference-locations).
