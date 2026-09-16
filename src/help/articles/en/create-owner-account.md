---
id: own.tut.account
slug: create-owner-account
title: "Create your owner account"
description: "Register with email, verify your inbox, and open the SpaiHub dashboard as an Active owner."
role: ["owner"]
section: tutorials
intents: ["register", "verify", "login", "create account", "sign in", "owner account"]
buttons: ["Create account", "Sign in"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.settings", "own.tut.location"]
updatedAt: 2026-09-16
minutes: 8
---

SpaiHub is the hotspot operations product you use to sell WiFi in Cameroon — corridor shops in Douala, cité spots in Yaoundé, and everywhere in between. This job creates the **owner** account: you, the person who owns the location, sets prices in XAF, and later withdraws MoMo sales.

An **owner** is not a contributor. A contributor sells spare uplink and waits for approval after verify. You verify email and become **Active** yourself. Login is always **email**, never a phone number.

## What you will have

A verified owner account, **Account status** **Active**, and the English dashboard with the six nav items: **Dashboard**, **Locations**, **Vouchers**, **Transactions**, **Wallet**, **Settings**. On a phone the shorts are **Home**, **Sites**, **Codes**, **Sales**, **Cash**. Cards such as **Today's Revenue** and **Wallet Balance** can be zero — that is normal on day one.

You will not need a MikroTik, a Campay test, or a logo yet. The next job is [Add a location without a router](/help/add-location). Account details live later in [Settings reference](/help/reference-settings).

## Before you start

- A working email inbox you can open on this phone or laptop. Gmail, Yahoo, or a shop address is fine — SpaiHub will send a verification link there.
- A password of at least 8 characters. Write it down somewhere safe; you sign in with **Email address**, not MTN MoMo or Orange Money.
- About five quiet minutes. If you are at the corridor with customers, wait until the rush drops.
- No router, no voucher printer, no branding file. Those come after this account exists.

Do not try to register as a contributor if you are the hotspot operator. Contributor verify does not make you **Active** the same way.

## Steps

1. Open the public site and tap **Start free**. That is the register path. If you already have an account, skip to **Sign in**.
2. On **Create account**, fill **Full name** (the name staff and contributors will see later), **Email address**, **Password**, and **Confirm password**. Password must be at least 8 characters. The meter may say Fair, Good, or Strong — 8 characters is the hard rule.
3. Tap **Create account**. You should land on **Check your email**.
4. Open the inbox for that address. Tap the verification link. If the mail is slow, wait a minute and check spam or promotions.
5. After the link works, go back to **Sign in**. Enter the same **Email address** and **Password**, then tap **Sign in**.

That is the whole register job. You are not asked for a Cameroon phone number on this form. MoMo numbers appear later when a guest pays, or when you [withdraw to MoMo](/help/first-withdrawal).

![Screenshot](about:blank)
_Screenshot slot: Create account form (staging, fake name and email)._

## What you should see

- After **Create account**: **Check your email** with the address you typed.
- After the link: a verification success path, then **Sign in**.
- After **Sign in**: **Dashboard**. **Today's Revenue**, **This Month**, **Active Sessions**, and **Wallet Balance** may all be zero. Charts can be empty. **Router status** may say no routers yet.
- In **Settings**, **Account status** should read **Active**. **Display name** matches what you typed as **Full name**.

If the dashboard shows a connection-script banner, you can ignore it until you add a router. There is no notification bell in this build — do not hunt for one under **Settings**.

## If it fails

**No verification email.** Stay on **Sign in**, type the same **Email address**, then tap **Resend verification email**. Check spam. Ask the shop WiFi not to block mail from SpaiHub. Wrong address? Register again with the inbox you actually open.

**Cannot Sign in / Account is not active.** Owners become **Active** only after the email link. Contributors stay pending until a human approves them — that is a different product path. If you verified and still cannot enter, wait a minute and try **Sign in** again. If the account was suspended later, contact SpaiHub support; this Help article will not walk around a suspension.

**Forgot password.** On **Sign in**, tap **Forgot password?**, enter **Email address**, tap **Send reset link**. Use the latest mail within about one hour, then **Reset password**.

**Typed a phone as email.** Login is email. `677xxxxxx` is not an account. Register with a real inbox, then use MoMo only on the guest portal and **Wallet**.

**Landed on contributor sign-in.** Use **Owner sign in** / **Start free** for operators. Mixing the two accounts is the usual Douala café mix-up.

Once **Active**, add a site: [Add a location without a router](/help/add-location). You can still preview the guest page with no Hex. Password and **Display name** are in [Settings reference](/help/reference-settings).

On a phone after **Sign in**, the shorts **Home**, **Sites**, **Codes**, **Sales**, **Cash** are the same six destinations as the desktop words. **Dashboard** can show a connection-script banner you will **Dismiss** only after you actually paste Script 2 later. Nothing here asks for MTN MoMo yet. Email in, email out — that is the owner door.
