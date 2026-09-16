---
id: own.tut.family-package
slug: create-family-package
title: "Create a family package (2–4 devices)"
description: "Charge more for plans that honestly share one username and PIN across a few WiFi MACs — not a promise to see phones behind a home router."
role: ["owner"]
section: tutorials
intents: ["family", "shared devices", "simultaneous devices", "house plan"]
buttons: ["Simultaneous devices", "Add Package"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.price-dont-ban", "own.ref.access-policy"]
updatedAt: 2026-09-16
minutes: 10
---

Families and small shops will share one code. SpaiHub will not magically list every phone behind a cheap extender. A **MAC** is the WiFi identity the Hex sees. If a cheap extender is in **router mode**, the whole house is **one MAC**. That is physics. Your job is to **price** sharing, not pretend to ban it. See [Price sharing, do not pretend to ban it](/help/price-dont-ban-sharing) and [Access policy reference](/help/reference-access-policy).

A **family package** is just a normal time or data package with **Simultaneous devices** set to **2–4** (allowed range **1–20**) and a higher **Price (XAF)**. The portal then shows **Family plan — up to N devices can share this access code**, plus **Disconnect this device** and **End session for all devices**.

## What you will have

A higher-priced SKU on **Packages** that allows a few distinct WiFi MACs on the same username and PIN. Cheap walk-in plans stay at **1**. You will not get a camera into someone’s sitting room.

## Before you start

- A location with at least the habit of [time packages](/help/create-time-package). Family works on **Time-based** or **Data-based**.
- A price gap. If 1-hour walk-in is 200 XAF, family 1-hour should not be 200 XAF. The cité next door already learned that lesson.
- Understand: username for MoMo is the 9-digit phone; PIN is 6 digits. The PIN is the secret. People will still whisper it. Price for that.
- Do not promise “we can see phones behind a home router.” You cannot. Read [Cheap extender in router mode](/help/pixlink-nat) when you have five minutes.

**Access policy** on the location is only a **fallback** for some vouchers when a package limit is missing. Prefer setting **Simultaneous devices** on the package itself. **Save access policy** is not the family SKU.

## Steps

1. **Locations** → **Packages** → **Add Package**.
2. Name it clearly: `Family 1h` or `Maison soir`. Guests should understand they are buying share-room, not a secret unlimited.
3. Choose **Time-based** (typical) or **Data-based** if you sell a visible **Download allowance**.
4. Set **Browse duration** or **Must be used within** as you would for a single-device plan.
5. Raise **Price (XAF)** above the 1-device twin.
6. **Upload speed (MB/s)** — still default **1** unless you know better. Four phones on 1 MB/s upload is already a policy choice.
7. Set **Simultaneous devices** to **2**, **3**, or **4**. Default is **1**. Max **20** exists for odd venues; 2–4 is the honest house plan.
8. For time plans, keep **Fair use data limit (hidden from subscribers)** on (new packages default **2 GB**) so one shared login cannot eat the month. Guests still see unlimited data — do not quote leftover GB at the counter.
9. **Create package**.

On the guest portal after pay, they share one username/PIN up to that many MACs. Extra devices wait or someone taps **Disconnect this device** / **End session for all devices**.

![Screenshot](about:blank)
_Screenshot slot: Simultaneous devices set to 4 on Add Package (staging)._

## What you should see

- Owner **Details** column includes the device count.
- **Preview portal** can show **Up to 4 devices** (or your number).
- After a live login: **Sessions** may list more than one phone **On router** for the same access, up to the cap.
- **Kick** still works per session row — about 15 seconds if **spaihub-commands** is running.

## If it fails

**Simultaneous devices must be between 1 and 20.** You typed 0 or 21. Use 1–20.

**Whole concession online with one voucher.** Extender in **router mode** = one WAN MAC. SpaiHub counts that as one device even if twelve people watch Netflix. Do not accuse the voucher of being “broken”. Sell the family SKU, keep cheap plans at 1, and prefer access points in **bridge** mode. TTL anti-tether stays **off** in SpaiHub — it broke normal phones.

**I set Access policy to 4 but the cheap package is still 1.** Package **Simultaneous devices** wins. Location fallback is for missing package limits on some vouchers only.

**Staff want to “ban sharing”.** You can kick and you can price. You cannot see NAT. Train staff with [price, don’t ban](/help/price-dont-ban-sharing).

**Fair use hit with four phones.** Expected: the hidden cap is shared on the login. They buy another package. Do not read remaining GB to them.

Related controls: [Access policy reference](/help/reference-access-policy). For a visible GB product, see [data-based packages](/help/create-data-package).

A Douala shop that sells only 200 XAF / 1-device hours and then shouts at families is doing the maths backwards. Put the family SKU on the portal with a price you can defend. Keep the cheap SKU at **Simultaneous devices** **1**. When a cheap extender shows up, you already have a sentence: one MAC, one login, buy **Family**. You still never promise a list of phones behind NAT, and you still never read leftover fair-use GB to guests on time plans.
