---
id: glossary.fair-use
slug: glossary-fair-use
title: "Fair use"
description: "Fair use is a hidden gigabyte cap on a time package. Guests see Unlimited data, then Fair use limit reached. Buy another package to continue. Never remaining GB on the guest page."
role: ["owner", "contributor"]
section: glossary
intents: ["fair use", "hidden cap", "unlimited data"]
buttons: ["Fair use data limit (hidden from subscribers)"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-hidden", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 4
---

## Terms

**Fair use** on SpaiHub means an **optional hidden byte cap** on a **Time-based** package. Owners set it with **Fair use data limit (hidden from subscribers)**. New time packages default **on** at **2 GB**.

Guests **see**: **Unlimited data** during the browse period. They **do not** see remaining gigabytes.

When MikroTik hits the cap: **Fair use limit reached. Buy another package to continue.**

**Data-based** **Download allowance** is a *visible* quota product. Do not call that “hidden fair use.” Different checkbox, different guest sentence.

The cap is enforced **per login** (shared with tether/NAT on that username). It is not per phone behind a cheap extender. SpaiHub does **not** use anti-tether TTL to implement it.

## Why it matters

Time is what you sold. The hidden cap protects the uplink from one TikTok house. If anyone at the shop — owner, staff, contributor standing at the till — reads remaining GB aloud, you create a debt SpaiHub will not show.

Contributors do not configure the checkbox. They still must not invent remaining GB when a buyer argues next to their uplink.

Fair use is also not “unlimited time.” When **Browse duration** ends, the session ends even if the hidden cap was never hit. Two clocks: the hour you sold, and the silent gigabytes. Guests are told about the hour (and **Time remaining** while connected). They are not told remaining GB.

## What you see

Owner package form: fair-use checkbox, on/off hints, amount in MB/GB. **Details** column can show the cap to owners.

Portal: unlimited wording; then the cutoff banner. **Dismiss** hides the banner, does not add data.

No Settings bell when the cap hits. No guest GB bar.

## What to do

Owners: leave the default on unless you accept unlimited bytes for the whole **Browse duration**. Train the till: after the banner, sell another package. Contributors: if you hear a remaining-GB fight, point at the banner text, not at a number.

If cutoff is instant, suspect NAT sharing or a cap you set too low — change the owner form, still without announcing remaining GB. New time packages default the box **on** at 2 GB; uncheck only when you mean unlimited bytes for that browse period.

## What not to say

- Never remaining fair-use GB to guests. That is the whole glossary entry.
- Do not say fair use is a download-speed setting. Speed is MB/s; this is a quota.
- Do not say TTL is fair use. TTL stays off.
- Do not tell a contributor they can toggle the hidden cap in their **Settings**.
