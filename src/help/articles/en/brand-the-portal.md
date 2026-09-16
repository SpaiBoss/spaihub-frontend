---
id: own.tut.branding
slug: brand-the-portal
title: "Brand the captive portal"
description: "Set display name, welcome text, accent, and a logo of 512 KB or smaller so corridor guests see your shop, not a blank default."
role: ["owner"]
section: tutorials
intents: ["branding", "logo", "portal branding", "accent", "welcome text"]
buttons: ["Save branding"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.logo-512", "own.ref.settings"]
updatedAt: 2026-09-16
minutes: 10
---

**Portal branding** is what subscribers see when they join WiFi: shop name, welcome line, colour, logo. It is not the owner **Display name** used only inside the dashboard, though you may keep them similar. You change branding under **Settings**. Full control list: [Settings reference](/help/reference-settings).

There is **no notification bell** in this build. Do not hunt for alert preferences. Help describes what is on screen today.

**Powered by www.spaitrace.com** stays on the captive portal. The checkbox is always on. White-label removal is a custom agreement — this article will not pretend you can hide it with a toggle.

## What you will have

Guest page and voucher PDFs that show your **Brand name on the portal**, optional logo, accent colour, and **Welcome text**. **Show upload speed on the portal** remains **off** by default — speed is an owner tool, not something to argue about in the queue.

## Before you start

- **Sign in** as owner. **Settings** is in the nav (not a bell).
- A logo file if you want one: **PNG, JPEG, or WebP**, **512 KB or smaller**. Served through SpaiHub, not a random public bucket you pasted from Facebook. If the file is a 4 MB phone photo, compress it first. See [Logo must be 512 KB or smaller](/help/logo-512kb).
- A short welcome in the language your corridor actually speaks. Placeholder energy: **Pay with MoMo to get online**.
- Optional: [Preview portal](/help/preview-captive-portal) open in another tab so you can refresh after save.

Password changes are the same **Settings** page (**Current password**, **New password**, **Update password**) but they are not branding. Do them separately so you do not mix a failed logo with a password toast.

## Steps

1. Open **Settings**.
2. If you need the dashboard name right: **Display name** / **Full name** → **Save name**. That is your profile, not necessarily the captive title.
3. Scroll to **Portal branding** (**Captive portal branding**). Subtitle: what subscribers see; leave blank for SpaiHub defaults.
4. **Brand name on the portal** — e.g. `Mbingfibieh WiFi` or `Akwa Corridor`. This is what tickets and the guest header should say.
5. **Welcome text** / **Welcome message** — one honest line. Do not promise leftover GB on time plans.
6. **Accent color** — pick something that still lets **Pay {{amount}} XAF** stay readable at noon glare.
7. **Logo**: **Upload image**. Wait for **Logo uploaded**. If you replace it, the old file is gone. You can remove it (**Logo removed**).
8. Leave **Show upload speed on the portal** unchecked unless you really want guests to see **N MB/s upload** on packages.
9. Leave the Powered-by credit as it is (always shown).
10. Tap **Save branding**. Toast **Portal branding saved**.
11. **Locations** → router → **Preview portal**. Confirm header, welcome, logo, **Pay with MoMo**, **I have a voucher**, and the Powered-by line.

Print a sample voucher PDF if you sell paper: branding preview on **Print PDF** follows this save.

![Screenshot](about:blank)
_Screenshot slot: Settings Portal branding with Save branding (staging)._

## What you should see

- Captive title = brand name, not a generic **WiFi hotspot** only.
- Time packages still **Unlimited data** — branding does not reveal hidden fair use.
- Family packages can still say **Up to N devices**.
- **Preview** on the branding card may show a sample location; live **Preview portal** is the source of truth for a real router row.

**Account status** **Active** stays on the same page. Email login does not change.

## If it fails

**Logo must be 512 KB or smaller.** Compress. Wrong type? Use PNG, JPEG, or WebP — not a PDF of the shop sign. [Logo 512 KB](/help/logo-512kb).

**Failed to save branding / Failed to upload logo.** Retry once; check the file; do not paste a tracking URL from a social app as “logo URL” unless you know it is a stable https image.

**Guests still see old name.** Hard refresh the captive page, or they are on a cached hotspot HTML. Script 1 HTML redirects to the portal; branding is the portal, not a WinBox title.

**I turned off Powered by and it came back.** It is always shown. Contact SpaiTrace about white-label if that is a real contract, not a Help toggle.

**Show upload speed confused customers.** Turn it back off. Sell duration and (for data SKUs) **Download allowance**. Speed fights start at the counter.

**Looked for a bell to preview screenshots.** Not shipped. Use **Preview portal**.

Related: [Settings reference](/help/reference-settings). Next cheap live check remains [test MoMo](/help/test-momo-online).

A good Akwa header is the shop name people already shout, a welcome in French or English that matches the corridor, and a logo that is actually under 512 KB. Voucher PDFs pick up the same brand. **Show upload speed on the portal** stays off so you sell time and (for data SKUs) allowance, not an argument about megabytes per second at the counter. Password changes stay on **Settings** with **Update password** — separate tap, separate toast.
