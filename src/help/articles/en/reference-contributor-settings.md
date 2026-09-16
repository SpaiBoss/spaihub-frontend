---
id: con.ref.settings
slug: reference-contributor-settings
title: "Contributor settings reference"
description: "Display name, MoMo phone, Save. Email is read-only. No password change on this page (use Forgot password?). No notification bell."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-settings"]
buttons: ["Save"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.account", "con.tut.withdraw"]
updatedAt: 2026-09-16
minutes: 10
---

## What this page is

**Settings** for a contributor is a short profile: who you are and which Cameroon number should receive MoMo. Open **Settings** in the contributor nav. Title **Settings**. Subtitle **Profile and payout phone**.

This page does **not** change your password. Use **Forgot password?** on **Contributor sign in** (**Reset contributor password** → **Send reset link** → **Set new password**). After you are signed in there is no **Current password** form here.

**This build has no notification bell and no notification preferences.** When notifications ship, this article must be updated in the same change as the UI. Do not look for a bell next to **Help**.

Language is **EN** / **FR** in the navy header (**Switch language**), not a dropdown on this form.

You are not on owner **Settings**. There is no **Captive portal branding**, no 512 KB logo, no **Show upload speed on packages**, no locked **Powered by www.spaitrace.com** checkbox.

## Terms

**Email** — the address you used on **Create contributor account**. It is the **Sign in** identifier. Read-only here.

**Display name** — **Welcome, {name}** on Home and the header name. Required.

**MoMo phone** — national digits for payouts, placeholder **6XXXXXXXX**, stripped to 9 digits as you type. **Wallet** pre-fills the withdraw modal from this value.

**Save** — PATCH name + momo phone. Toast **Saved**.

## Every control

### **Email**

Text **Email: you@domain**. Not an input. You cannot rotate the login from this page. Wrong inbox is a support conversation after you have read [Create a contributor account](/help/create-contributor-account) — there is no change-email button today.

### **Display name**

Required text. This is not a hotspot SSID and not the owner **Brand name on the portal**.

### **MoMo phone**

Optional in the form (not marked required). Empty is allowed until you withdraw. A stale number is dangerous: the wallet modal will happily send to whatever you type. Update here so the next **Withdraw** opens correctly.

### **Save**

Busy **Saving...** (common **Saving...**). Success toast **Saved**. Failure **Save failed** or API error.

No **Cancel**. Leaving the page dumps unsaved edits.

### Password — not on this page

There is no **Change password** card. Path:

1. **Sign out**
2. **Contributor sign in** → **Forgot password?**
3. **Email address** → **Send reset link**
4. Mail → **Set new password** → **Reset password**

### Chrome

**Language toggle**, **Help**, **Sign out**. **No bell.** **No notification preferences.**

## Empty & error states

Profile not loaded: skeleton. After a normal login the fields fill.

Empty **MoMo phone**: Save still works; **Wallet** will ask for **Phone Number**.

Failed save: fields stay as typed until you reload (reload restores server values).

Name empty: browser required-field stop.

## What this page does not do

- **No password change** here.
- **No notification bell and no notification preferences** in this build.
- No logo, accent, welcome text, or white-label credit lock.
- No **Cap** / **Rate** editors.
- No remaining fair-use GB.
- Not an admin console and not owner Settings.

## Worked examples

**After first login.** Email shows the address you registered. **Display name** is what you typed as **Full name**. **MoMo phone** is blank. Tap **Save** after you add `6XXXXXXXX` so **Wallet** → **Withdraw** opens with that number.

**Rename.** Change **Display name** to the name family uses on MoMo SMS, **Save**, toast **Saved**. **Home** **Welcome** updates after the profile refresh.

**Language.** You work in French in the shop. Use header **FR**, not a Settings dropdown. This form labels follow the chrome language.

**Password forgotten while signed in.** **Sign out** → **Forgot password?** on **Contributor sign in**. You will not find **Current password** on this page (owners have that card; you do not).

**Looking for a bell.** There isn’t one. Queued withdrawals do not notify here. Open **Wallet** history.

**Looking for branding.** Logo and **Pay with MoMo** preview belong to the *owner* of the hotspot, not the contributor who feeds uplink.

If **Save** returns **Save failed**, stay on the page, check the phone is digits, try once more. Reloading discards unsaved typing and puts back the last server name/phone.

## Toasts and labels to memorise

**Saved** — name and/or phone wrote to the server.

**Save failed** — try once more; do not spam.

**Saving...** — wait.

Chrome **Sign out** ends the session; it does not save the form. Save first.

**Help** in the header opens the Help center, not a notification inbox.

Forgot-password toasts live on those auth pages (**Email sent**, **Request failed**), not here.

If you paste a logo URL thinking this is owner branding, you are on the wrong Settings. Contributor Settings has exactly: read-only **Email**, **Display name**, **MoMo phone**, **Save**.

Phone input strips letters as you type. Spaces are not stored. Use nine national digits, not `+237`.

Display name is required. Clearing it and hitting **Save** should be blocked by the browser before a toast.

Owner **Settings** also has **Account status** as a badge. Yours does not — activation is the login error **Your account is awaiting admin approval.** until it is not.

If two devices edit **Display name** at once, last **Save** wins. There is no version history on this page.

Keep **MoMo phone** matching the SIM that receives payouts. Orange vs MTN is not a Settings dropdown; the withdraw modal infers from digits.

HelpTip icons (circle question) appear on owner location forms, not on this contributor Settings card. The Help link in the header is the whole Help center.

You cannot attach a second email. You cannot enable 2FA on this page (it does not exist in this build). You cannot set a notification bell — say that out loud if a partner asks where the alerts are.

## Related jobs

- How the email login was created: [Create a contributor account](/help/create-contributor-account).
- Use the phone on a payout: [Withdraw contributor earnings to MoMo](/help/contributor-withdraw).
- Screen map of the payout page: [Contributor wallet reference](/help/reference-contributor-wallet).
