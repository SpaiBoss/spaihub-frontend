---
id: tip.fair-use-message
slug: fair-use-guest-message
title: "Fair-use message, never remaining GB"
description: "When a hidden time-package cap is hit, guests see Fair use limit reached. Buy another package to continue. They must never be told remaining gigabytes. Unlimited data is the wording during the browse period."
role: ["owner"]
section: pro-tips
intents: ["fair use guest message", "never remaining GB", "unlimited data wording"]
buttons: ["Fair use data limit (hidden from subscribers)", "Dismiss"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-hidden", "own.ref.portal"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

The **guest fair-use message** is exactly: **Fair use limit reached. Buy another package to continue.** It appears on the portal banner (and can appear via the captive login reason) after MikroTik cuts a time plan for the hidden byte cap.

**Unlimited data** / **Unlimited data for this browse period** / **browse · Unlimited data** is what the portal shows *before* cutoff on a time package. That is not a remaining-GB widget.

**Dismiss** closes the banner. It does not restore gigabytes.

Owner **Details** on **Packages** may show the cap you configured. That surface is for you and for staff who were trained not to read it aloud.

## Why it matters

This is the article you print next to the till. Every other fair-use tip exists so this sentence stays the only guest sentence.

Incident: a buyer in Cité Sic hit the cap, asked “how many mega left?”, a contributor-looking cousin read 0.4 GB from an owner phone screenshot of **Details**, and the buyer demanded that remainder as extra time. SpaiHub will not show remaining fair-use GB on the guest page. Staff must not create a second source of truth with their mouth.

Wrong diagnosis: “the banner is a bug because the package says Unlimited data.” Unlimited is the marketing of a *time* product. The hidden cap is your abuse brake. After cutoff, the message is buy another package — not “you have 12% left.”

Wrong diagnosis: “show them upload speed so they understand fair use.” **Show upload speed on the portal** is off by default and is a rate, not a quota.

## What you see

Guest portal during a healthy time session:

- Duration / **Time remaining** when connected.
- **Unlimited data for this browse period**
- Family line only if **Simultaneous devices** > 1
- No remaining-GB bar

After cutoff:

- Banner **Fair use limit reached. Buy another package to continue.**
- They pick a package again (**Pay … XAF** or voucher)

Data-based packages are different: they show **Download allowance: …** as the product. Do not call that “fair use remaining” either, and do not invent a guest countdown SpaiHub does not draw.

## What to do

1. Keep the hidden checkbox on for walk-in time plans (default 2 GB on new ones).
2. Script the counter in English/French Pidgin however you like, but the number of GB left is not in the script.
3. After the banner, sell the next hour or a data package. **Check payment status** if they already paid and the banner confused them — do not double charge.
4. If they hit the cap in 10 minutes, you have a NAT house or a tiny cap — price or raise the hidden cap *in the owner form*, still without announcing remaining GB.
5. Re-paste Script 2 if login.html is so old it lacks the fair-use redirect reason — still no GB counter.

## What not to say

- Never remaining fair-use GB to guests. Not “about 1 giga,” not “almost finished,” not a wink at **Details**.
- Do not say the banner means Campay failed.
- Do not say anti-tether caused the cutoff. Fair use is a byte cap on the login.
- Do not promise a Settings notification when they hit the cap. Settings has no bell.
