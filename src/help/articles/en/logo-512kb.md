---
id: tip.logo-512
slug: logo-512kb
title: "Logo must be 512 KB or smaller"
description: "Portal branding accepts PNG or JPEG logos of 512 KB or smaller. A 2 MB shop photo will fail. Compress the file, then Save branding. This is not a router script problem."
role: ["owner"]
section: pro-tips
intents: ["logo 512 KB", "portal branding", "upload image"]
buttons: ["Upload image", "Save branding", "Preview"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.branding", "own.ref.settings"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**Portal branding** lives under **Settings** (account + branding). There is **no notification bell** on Settings. You are here for the guest page look, not alerts.

**Logo** is PNG or JPEG, **512 KB or smaller**. Hint on the form matches the error **Logo must be 512 KB or smaller**.

**Upload image** sends the file. **Or paste logo URL (https://...)** is an alternative field. **Current logo**, **Logo uploaded**, **Logo removed**.

**Save branding** stores name, welcome text, accent, speed toggle, and logo choices. **Preview** on that page is a sample; **Preview portal** on the router row is the real guest tab.

512 KB is about half a megabyte. A phone photo from an iPhone is often 2–4 MB. That will fail. This is not “the Hex rejected the picture.”

## Why it matters

Incident: owner in Akwa exported a PNG from Photoshop at full shop-front resolution, hit **Upload image**, saw **Failed to upload logo** or **Logo must be 512 KB or smaller**, then pasted Script 2 “to refresh the portal.” Scripts do not resize JPEGs. The captive page kept the old logo or the SpaiHub default until a small file landed.

Wrong diagnosis: “CHR cannot show logos.” CHR serves the same portal HTML. Wrong diagnosis: “walled garden blocks the logo so we must list extra secret URLs.” Do not start adding random hosts. Fix the file size first; branding is stored with SpaiHub and served on the already-walled portal.

A huge logo also makes the captive page heavy on a bad Orange uplink. Small file is kindness to the first packet.

## What you see

**Settings** → **Portal branding** / **Captive portal branding**:

- **Brand name on the portal**
- **Welcome message**
- **Accent color**
- **Logo** — PNG or JPEG, 512 KB or smaller
- **Upload image** / **Uploading...**
- **Show upload speed on the portal** (off by default)
- **Save branding** → **Portal branding saved**

Voucher PDF uses the same brand: **Tickets will use [name] with your uploaded logo**. If upload failed, tickets stay text-only or old art.

## What to do

Tonight:

1. On a computer, export PNG or JPEG under 512 KB (reduce pixels; 400–800 px wide is plenty on a phone captive page).
2. **Upload image**. If you see **Logo must be 512 KB or smaller**, compress again — do not retry the 3 MB file.
3. **Save branding**. Open **Preview portal** on the location router row (not only the settings sample).
4. If a URL paste fails, prefer upload. Do not paste random file-share links that expire.
5. Do not re-paste Script 1 unless the *login.html redirect* is wrong. Logo lives in branding, not in a missing login-url (RouterOS has none).

## What not to say

- Do not tell a technician the logo failed because TTL anti-tether “ate images.” Anti-tether stays off and never did that.
- Do not promise guests remaining fair-use GB on the branded splash.
- Do not ask Help to list live CDN URLs with tokens.
- Do not say Settings will notify you when a logo fails — there is no bell.
