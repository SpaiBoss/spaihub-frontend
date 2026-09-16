---
id: tip.fair-use-hidden
slug: hidden-fair-use
title: "Hidden fair-use cap on time packages"
description: "Time packages sell browse time. Owners can hide a GB cap from buyers. Guests see Unlimited data. After cutoff they see Fair use limit reached — never remaining gigabytes."
role: ["owner"]
section: pro-tips
intents: ["hidden fair use", "time package cap", "unlimited data", "fair use data limit"]
buttons: ["Add Package", "Fair use data limit (hidden from subscribers)", "Create package", "Details"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-message", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

A **time package** (**Time-based**) sells **Browse duration** — one hour, one night, one day. The buyer is paying for a clock, not a visible pile of gigabytes.

**Fair use** is an optional hidden GB cap on that clock. You set it. MikroTik still cuts the session when the cap is hit. The guest page must not show a remaining-GB countdown.

**Data-based** is different: **Download allowance** is the product. Buyers *are* supposed to see that allowance. Do not mix the two when you explain a cutoff.

**Unlimited data** on the portal means “we are not showing you a data product,” not “the pipe can never end.”

## Why it matters

In Akwa a 1-hour plan at 300 XAF is a walk-in. Without a cap, one TikTok house on a cheap extender can burn your uplink before the hour ends. With a hidden cap, you still advertise time, you still look generous, and the router stops abuse.

New time packages in **Add Package** default **Fair use data limit (hidden from subscribers)** **on**, at **2 GB**. You can raise it, lower it, or uncheck it. Unchecked means no byte limit for that browse period (speed limits still apply).

The incident we keep repeating: a buyer asks the counter “how many GB do I have left?” Staff glance at the owner **Details** column and read the number out loud. That is the wrong surface. Guests must never be told remaining fair-use GB. If they hit the cap, the login page and portal banner say **Fair use limit reached. Buy another package to continue.** That is the whole guest story.

Wrong diagnosis: “the portal is lying because it says Unlimited data.” It is not a lie to the buyer’s contract: they bought time. The cap is your abuse brake, shared with anyone on the same username (including tether/NAT).

## What you see

When you create or edit a package:

- Checkbox **Fair use data limit (hidden from subscribers)**.
- Hint: buyers see unlimited browse; MikroTik still cuts when the cap is hit.
- When the box is on: “Enforced on the router for abuse prevention (shared with anyone on the same login, including tether/NAT). Subscribers still see unlimited data. SpaiHub does not use anti-tether firewall rules.”
- When off: “Leave unchecked for unlimited data during the browse period.”

On **Packages**, the **Details** column is for **you**. It can mention a fair-use cap. That number is owner-only.

On the guest portal, time plans show **Unlimited data** / **Unlimited data for this browse period** / “browse · Unlimited data.” They do not show remaining GB. **Show upload speed on the portal** is a separate branding switch and is off by default.

After cutoff, the captive login can bounce with a fair-use reason, and the portal banner is **Fair use limit reached. Buy another package to continue.**

## What to do

1. **Locations** → **Packages** → **Add Package** → **Time-based**.
2. Set **Browse duration** and price in XAF.
3. Leave **Fair use data limit (hidden from subscribers)** on unless you truly want no byte cap (café with huge uplink, or a promo night you accept).
4. 2 GB is the default starting point for a new time plan — change it if your uplink or price is different. Do not announce the number at the counter.
5. Train staff: if a guest asks “how much data is left?”, answer with time remaining if they are still in session, or sell another package after **Fair use limit reached**. Never read remaining GB from **Details**.
6. If a whole house NATs through one MAC, the hidden cap is shared. That is intended. Price family plans separately; do not “ban sharing” with TTL.

## What not to say

- Never tell a guest remaining fair-use GB, even if you can see the cap you configured.
- Do not print the hidden GB on voucher tickets as if it were a data product. Time tickets sell browse.
- Do not promise the cap is per phone behind a cheap extender. It is per login, on the MAC the Hex sees.
- Do not say anti-tether will stop them before fair use. Anti-tether stays off.
