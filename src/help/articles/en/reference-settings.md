---
id: own.ref.settings
slug: reference-settings
title: "Settings reference"
description: "Owner Settings: account, password, captive portal branding (512 KB logo, show speed off, Powered-by locked). No notification bell in this build. Language toggle is top right beside Help."
role: ["owner"]
section: reference
intents: ["reference", "reference-settings", "branding", "password"]
buttons: ["Save name", "Update password", "Upload image", "Remove", "Save branding"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.branding", "own.tut.account"]
updatedAt: 2026-09-16
minutes: 11
---

## What this page is

**Settings** is your owner account plus what guests see on the captive portal. Open **Settings** in the sidebar (on phones you may use the sidebar menu; it is not in the five-icon bottom bar). Title **Settings**. Subtitle **Account and portal branding.**

This page has three cards today:

1. **Account** — email, status, **Display name**
2. **Change password**
3. **Captive portal branding** plus a live **Preview**

**This build has no notification bell and no notification preferences.** There is no bell in the header, no “alerts” tab, and no email/SMS opt-in list on Settings. When notifications ship, this article must be updated in the **same change** as the UI — Help stays the source of truth for what is on screen.

**Language** is not a Settings field. The **EN** / **FR** toggle sits in the top-right header beside **Help** (same **Switch language** control). It changes labels. It does not change guest portal language by itself — the portal has its own toggle.

## Terms

**Display name** (account) — your operator name in the dashboard chrome (avatar initial + sidebar). Different from **Display name** under branding, which is the name on the **guest** page.

**Account status** — badge such as **Active** or **Pending**. You cannot change it on this form.

**Captive portal** — the phone page when someone joins the hotspot (or when you tap **Preview portal**).

**Accent color** — header/button colour on that guest page.

**Show upload speed on packages** — off by default. Guests then see duration and data limits, not MB/s.

**Powered by www.spaitrace.com** — always shown on the captive portal in this build. The checkbox is locked.

**512 KB** — logo file size limit (PNG, JPEG, or WebP upload).

## Every control

### Card **Account**

Heading **Account**. Line **Your profile information**.

**Email address** — read-only. This is the address you use on **Sign in**. You do not change email here.

**Account status** — read-only badge.

### **Display name** / **Full name** / **Save name**

**Full name** is the text field. **Save name** (busy **Saving...**).

Toasts: **Profile updated**, **Failed to update profile**, or **Name is required**.

This name is not automatically the portal brand. Set **Display name** under branding for “Mbingfibieh WiFi”.

### Card **Change password**

Hint **Use at least 8 characters**.

- **Current password**
- **New password**
- **Confirm new password**
- **Update password** (busy **Updating...**)

Toasts: **Password updated**, **New password must be at least 8 characters**, **New passwords do not match**, **Failed to change password**.

After success the three fields clear. There is no “forgot password” on this signed-in page; that flow is the login screen **Forgot password?**

### **Captive portal branding**

Heading **Captive portal branding**. Subtitle **What subscribers see when they connect. Leave blank for SpaiHub defaults.**

### **Display name** (brand)

Placeholder **e.g. Mbingfibieh WiFi**. This is the large name on the portal header when you have no logo (and still used with a logo depending on layout).

### **Welcome message**

Placeholder **Pay with MoMo to get online**. Max 160 characters. Appears under the location name on the guest page. Default if blank: **Pay with Mobile Money to get online**.

### **Accent color**

Colour picker plus a hex text field. Default sample **#0F766E**. Drives the portal header and primary buttons in **Preview**.

### **Logo**

**Upload image** (busy **Uploading...**) accepts PNG, JPEG, or WebP. Over 512 KB: toast **Logo must be 512 KB or smaller**. Success **Logo uploaded**. Failure **Failed to upload logo**.

**Remove** (common **Remove**) clears the uploaded file. Toasts **Logo removed** / **Failed to remove logo**.

Optional **Or paste logo URL (https://...)** for a remote image.

**Current logo** preview if one is set.

### **Show upload speed on packages**

Checkbox, **off** by default. Hint: **Off by default. Subscribers only see duration and data limits unless enabled.** Speed is an owner tool on **Packages** → **Details**. Leave this off unless you truly want MB/s on the guest list.

### **Show "Powered by www.spaitrace.com"**

Checkbox is **checked and locked**. Hint: **Always shown on the captive portal. Contact us about white-label options.** Tapping it shows a toast: **White-label removal requires a custom agreement. Contact us at www.spaitrace.com to negotiate.** Saving still sends the credit as on.

### **Save branding**

Busy **Saving...**. Toast **Portal branding saved** or **Failed to save branding**. Upload already saved the logo; still tap **Save branding** after name, welcome, accent, or speed checkbox changes.

### **Preview**

Right-hand (or below on phone) **Preview** card: sample header, **WiFi hotspot**, **Sample Location**, welcome text, and a fake **Pay with MoMo** button. **Powered by www.spaitrace.com** under it. This is not **Preview portal** (that opens the real guest page from **Locations**).

## Empty & error states

Branding card pulses while `/api/owner/branding` loads.

Failed profile or password saves keep you on the form with a toast. Failed logo upload leaves the previous logo.

There is no empty-state illustration — a new owner still sees email and empty brand fields.

## What this page does not do

- **No notification bell and no notification preferences** in this build. Do not look for a bell on Settings. When that ships, update this article in the same PR as the UI.
- No language field (chrome **EN** / **FR** only).
- No MoMo payout phone here — that is the **Wallet** withdraw modal (and contributor **Settings** for contributors).
- No location, package, or voucher controls.
- Does not tell guests remaining fair-use GB. Branding cannot add a quota counter.
- Not an admin console.

## Related jobs

- Brand walkthrough: [Brand the captive portal](/help/brand-the-portal).
- Logo size: [Logo 512 KB](/help/logo-512kb).
- Create the owner login you are using: [Create an owner account](/help/create-owner-account).
- See the real guest page: **Locations** → **Preview portal**.
