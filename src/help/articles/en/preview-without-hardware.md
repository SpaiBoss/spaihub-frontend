---
id: tip.preview-first
slug: preview-without-hardware
title: "Preview before hardware"
description: "Add a router row and tap Preview portal before any Hex is online. Last seen Never is normal. You still need at least one active package. Preview is not a real MoMo grant."
role: ["owner"]
section: pro-tips
intents: ["preview portal", "without hardware", "test without a router"]
buttons: ["Add Router", "Preview portal", "Add Package", "Pay"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.preview", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Preview portal** opens the guest Wi‑Fi page in a new browser tab, using the same branding and packages buyers will see. You can do this **before** a physical Hex or CHR is **ONLINE**.

**Last seen: Never (normal without MikroTik)** means no heartbeat yet. That is expected for a row you created only to design the shop.

A **router row** in **Locations** → **Routers** is a SpaiHub object. It is not the plastic Hex. **Add Router** creates the row (and the preview link). Hardware comes later.

**Test without a router** on **Setup script** is the same idea: look at the portal while you still have the Hex in a carton.

## Why it matters

Owners in Cité des Palmiers used to wait for a technician before they even named a 1-hour plan. Then the Hex arrived at 19h, packages were empty, and the first buyer saw **No internet packages are available at this location yet.** Preview exists so you fight branding and prices in the afternoon, not during the first MoMo.

Wrong diagnosis: “Preview failed so the token is bad” when the tab shows **No internet packages**. Add a package. Wrong diagnosis: “Last seen Never means I created the router wrong.” Never is normal until Script 2 / CHR connect heartbeats.

Preview will not grant hotspot users on a Hex that is off. A **Pay … XAF** in preview against an **OFFLINE** router is blocked the same way as a real phone: **Router offline — Mobile Money payments are unavailable until it reconnects.** Do not use preview as a Campay test until the router is **ONLINE**.

## What you see

1. **Locations** → expand a location → **Routers**.
2. Empty copy: **No routers yet. Add one to get your captive portal link — no physical router needed to preview.**
3. **Add Router** → **Router name**, **Physical MikroTik** or **MikroTik CHR** → **Add Router**.
4. **Preview portal** on that row.
5. **Setup script** intro: test the portal with **Preview portal** anytime.

On the preview tab: your **Brand name on the portal**, welcome text, **Pay with MoMo**, **I have a voucher**. Time packages show **Unlimited data** for the browse period. Upload speed is hidden unless you enabled **Show upload speed on the portal**.

If you enabled hidden fair use, guests still must not see remaining GB — not in preview, not in production.

## What to do

Tonight, even with the Hex still boxed:

1. **Add Location** if needed, then **Add Router**, then **Add Package** (time plan with default hidden 2 GB fair use is fine).
2. Tap **Preview portal**. Check price in XAF, spelling, logo (512 KB or smaller).
3. Fix branding in **Settings** → **Portal branding** → **Save branding**, then preview again.
4. When the technician arrives, paste scripts; wait for **ONLINE**; then a real phone on the SSID is the true test, including **Connect**.
5. Do not skip packages because “we will add them after the first customer.” The first customer is the one who complains.

## What not to say

- Do not tell staff the shop is “live” because preview opened. Heartbeat and Script 2 are still required for grants.
- Do not promise a preview MoMo will put a MAC in **Sessions** while the Hex is off.
- Do not read remaining fair-use GB from owner **Details** to a friend who is “just previewing.”
