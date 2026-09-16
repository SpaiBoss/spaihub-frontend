---
id: own.tut.time-package
slug: create-time-package
title: "Create a 1-hour time package with hidden fair use"
description: "Sell browse time. Optionally cap gigabytes without showing remaining data to buyers."
role: ["owner"]
section: tutorials
intents: ["package", "fair use", "time"]
buttons: ["Add Package", "Fair use data limit (hidden from subscribers)"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-hidden", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 5
---

## Steps
1. **Locations** → **Packages** → **Add Package**.
2. Name it (e.g. “1 Hour”).
3. **Package type** → **Time-based**.
4. Set **Browse duration** (1 hour).
5. Price in XAF.
6. **Upload speed** defaults to 1 MB/s — change only if you know your uplink.
7. **Simultaneous devices** → **1** for a cheap walk-in plan.
8. Enable **Fair use data limit (hidden from subscribers)** (e.g. 2 GB).
9. Save.

## What buyers see
The portal shows unlimited browse for the hour. It does **not** show remaining GB.

When the cap hits, MikroTik cuts the session and the login page can say **Fair use limit reached**.

Owners see the cap in the package **Details** column.
