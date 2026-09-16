---
id: tip.access-fallback
slug: access-policy-fallback
title: "Location policy is a fallback"
description: "Devices per access code on Access policy is only a fallback when a package has no simultaneous-device limit. 0 means one device. Simultaneous devices on the package always wins."
role: ["owner"]
section: pro-tips
intents: ["access policy", "devices per access code", "fallback", "simultaneous devices wins"]
buttons: ["Access policy", "Devices per access code (fallback)", "Save access policy", "Simultaneous devices"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.access-policy", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Access policy** is the location tab **Access policy** (short **Policy**). It is not a second product catalog.

**Devices per access code (fallback)** is the number used only when a voucher (or grant) is missing a package-level shared-user limit. Intro text: simultaneous devices are controlled on each package. This location setting is only a fallback for vouchers when a package limit is missing.

**0 = one device.** That is the hint, not a typo. Zero does not mean “unlimited phones.” Unlimited simultaneous devices is not what this box does.

**Simultaneous devices** on **Add Package** / **Edit Package** **wins**. Family plans belong there (2–4), not as a silent location-wide override that you hope will beat the package.

Counts are distinct Wi‑Fi **MACs**, not phones behind a home router in NAT/router mode.

## Why it matters

Incident: owner set location fallback to 4, left cheap 1-hour packages at **Simultaneous devices** **1**, and advertised “the whole shop is family now.” Buyers on the 300 XAF plan still got 1 MAC. The package won. They called SpaiHub broken.

Opposite incident: old vouchers printed before shared-device existed on the package. Fallback is for those codes. Raising fallback to 4 does not rewrite every live package.

Wrong diagnosis: “Save access policy is what enables NAT detection.” It does not. NAT remains one MAC. The location tip even says: use 1-device packages with a fair-use data cap, and discourage personal Wi‑Fi extenders in router mode.

Toast **Access policy saved — routers will apply changes on their next poll** means Script 2 must be alive. Saving policy on an **OFFLINE** Hex files the number in SpaiHub; the box applies it later. Do not tell the courtyard “family is on” the second you tap save.

## What you see

**Locations** → **Access policy**:

- Intro about package control vs voucher fallback.
- **Devices per access code (fallback)**
- Hint: 0 = one device. Prefer **Simultaneous devices** on each package (e.g. 4 for family). Counts MACs, not NAT phones.
- Tip about 1-device packages + fair-use + no personal routers.
- **Save access policy**

Toast: **Access policy saved — routers will apply changes on their next poll** (commands/heartbeat cycle, not instant on a dead box). **Failed to save access policy** on error.

Empty location with no packages: still not a reason to use fallback as your only family control. Add packages.

## What to do

1. Set **Simultaneous devices** on every new package. Cheap = 1. Family = 2–4. Price in XAF accordingly.
2. Leave fallback at 0 or 1 unless you know you have old vouchers without a package limit.
3. Tap **Save access policy** once; wait for the router to poll. Do not save during **OFFLINE** and expect an instant Hex change.
4. Do not use fallback 4 as a “ban NAT” workaround. It cannot see inner phones.
5. After save, test with two phones on a family package (both on your SSID, not behind a cheap extender).

## What not to say

- Do not say the location number overrides family packages. Package wins.
- Do not tell guests remaining fair-use GB as if policy were a data cap. Policy is device count, and a hidden GB cap is separate.
- Do not promise 0 means unlimited. 0 = one device.
