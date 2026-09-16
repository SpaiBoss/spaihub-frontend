---
id: con.tut.account
slug: create-contributor-account
title: "Create a contributor account"
description: "Register with email, verify, then wait PENDING until SpaiHub activates you. This is not an owner hotspot account. Sign in with email."
role: ["contributor"]
section: tutorials
intents: ["contributor register", "verify", "pending", "sign in"]
buttons: ["Create account", "Sign in", "Resend verification email"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.links", "con.ref.home"]
updatedAt: 2026-09-16
minutes: 11
---

## What this page is

This tutorial walks a person in Cameroon onto SpaiHub as a **contributor**: you will sell spare uplink into a nearby hotspot that SpaiHub already runs. You will **not** become a shop **owner**. Owners sell packages to walk-in guests, paste Hex scripts, print **SPAI-XXXX-XXXX**, and open **Wallet** for MoMo shop sales. Contributors wait for a technician to attach a physical uplink, then read **Links** and withdraw XAF.

Screens in order:

1. **Create contributor account**
2. Inbox — verification mail
3. **Contributor email verification**
4. **Contributor sign in**
5. After activation: **Home** (**Spare uplink contribution overview**)

After you click the mail link, status stays **Pending** until SpaiHub activates you. **Sign in** then shows **Your account is awaiting admin approval.** That sentence is the product, not a bug. You cannot self-approve. You have no admin console.

Login identity is **Email address**. There is no separate username.

## Terms

**Contributor** vs **Owner** — two accounts, two URLs. Contributor login subtitle: **Spare uplink dashboard**. Owner: **Access your operations dashboard**. Footer on contributor login: **Hotspot operator?** **Owner sign in**.

**Pending** (account) — exists, maybe verified, dashboard blocked.

**Create account** — register submit (busy **Creating account...**).

**Verify** — token page **Contributor email verification**.

## Every control

### **Create contributor account**

Subtitle **Sell spare uplink to a nearby SpaiHub hotspot**.

- **Full name** — later **Display name** / **Welcome, {name}**
- **Email address** — unique; taken → **Email already registered**
- **Password** — ≥ 8 characters (**Password must be at least 8 characters** if short)
- **Confirm password** — mismatch toast **Passwords do not match**
- **Create account**

**Already registered?** **Sign in**

Preferred language is whatever **EN**/**FR** you had on that page.

No MoMo field here. Add **MoMo phone** on contributor **Settings** after you can sign in.

### **Check your email**

Title **Check your email**. Subtitle **Verify, then wait for SpaiHub approval**.

**Click the link in your email, then an admin will activate your contributor account. After that,** **Sign in**.

Register failure toast: **Registration failed** or API text.

### **Contributor email verification**

Missing token: **No verification token provided**. Failure: **Verification failed**. Success: server message + **Go to login**.

### **Contributor sign in**

- **Email address**
- **Password**
- **Forgot password?**
- **Sign in** / **Signing in...**
- Success toast **Signed in** → **Home**

**New contributor?** **Create account**

Unverified login reveals **Resend verification email** / **Sending...**. Empty email: **Enter your email above first**.

### Password reset (not Settings)

**Forgot password?** → **Reset contributor password** → **Send reset link** → **Email sent**. Contributor **Settings** has **no** **Update password**.

## Empty & error states

| Message | Meaning |
| --- | --- |
| **Please verify your email before signing in.** | Mail link or **Resend verification email**. |
| **Your account is awaiting admin approval.** | Verified, still **Pending**. Wait. |
| **Account is not active. Please verify your email or contact support.** | Inactive path. |
| **Invalid email or password** | Wrong pair. |
| **Sign-in failed** | Generic. |

After you *are* active, empty **Home** is **No links yet** / **SpaiHub will attach a physical uplink at a nearby hotspot and list it here.** Register worked. The pipe is not attached yet.

## What this page does not do

- Does not create an owner hotspot or show **Locations**.
- Does not let you paste MikroTik scripts or set **Rate (XAF/GB)**.
- Does not show remaining fair-use GB.
- No notification bell at register or on later **Settings**.
- You do not approve **Pending** yourself.

## Steps (happy path)

1. Open **Create contributor account** (not owner **Create account**).
2. Fill **Full name**, **Email address**, **Password**, **Confirm password**.
3. Tap **Create account** once. Wait for **Check your email**.
4. Open the mail on that same address. Tap the link. Read **Contributor email verification**. Tap **Go to login**.
5. **Contributor sign in** with the same **Email address**. If you see **Please verify your email before signing in.**, use **Resend verification email**.
6. If you see **Your account is awaiting admin approval.**, stop. You are **Pending**. Wait for activation. Do not create an owner account unless you run a hotspot.
7. After activation, **Sign in** → toast **Signed in** → **Home**. Empty links is OK: **SpaiHub will attach a physical uplink at a nearby hotspot and list it here.**
8. Optional: **Settings** → **MoMo phone** → **Save** so later **Withdraw** is pre-filled.

## If it fails

Wrong product: you wanted **Locations** and vouchers. That is owner **Sign in**.

Mail never arrives: check spam, **Resend verification email**, confirm you typed the email once.

**Email already registered**: **Sign in** or **Forgot password?** — do not invent a second Gmail unless you truly have two people.

Password mismatch: the toast is **Passwords do not match**. Fix **Confirm password**.

Token page **Verification failed**: request a fresh mail; old links expire.

## What you will have

An **Email address** that is your login. A verified inbox. Then a **Pending** wait. Then **Home** with **Balance**, **Today**, **This month**, **Your links**. Then, when SpaiHub attaches uplink, a **Links** row you can read. Then, when credited XAF ≥ 100, a **Wallet** you can withdraw.

You will not have **Add Location**, **Generate vouchers**, **Preview portal**, **Kick**, or remaining fair-use GB. Those belong to owners and guests of the hotspot, not to this account type.

Preferred locale from the register page only affects which language SpaiHub may use in mail/UI; it does not activate **Pending**.

If someone in the shop already has an **owner** login, they still need a **separate contributor** register to see this Home. Do not share the owner password to “check links.”

## Related jobs

When **Home** opens: [Contributor home reference](/help/reference-contributor-home). When a row appears: [Read a contributor link](/help/read-contributor-link).
