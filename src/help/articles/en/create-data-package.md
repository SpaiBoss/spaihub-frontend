---
id: own.tut.data-package
slug: create-data-package
title: "Create a data-based package"
description: "Sell a visible download allowance that must be used before it expires. Speed is MB/s; allowance is MB or GB."
role: ["owner"]
section: tutorials
intents: ["data package", "download", "data-based", "quota", "allowance"]
buttons: ["Data-based", "Download allowance"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.speed-vs-quota", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 10
---

A **data-based** package sells a **Download allowance** — 1 GB for the week, 500 MB for the bus park — that **Must be used within** a number of hours or days. Buyers **see** the allowance on the portal. That is the opposite of a time plan’s hidden fair-use cap.

Do not confuse this with **Upload speed (MB/s)**. Speed is how fast the pipe feels. Allowance is how much they can pull before MikroTik stops them. Mixing rate and quota is the most common RouterOS confusion we hit in Cameroon shops. Read [Upload speed is not a data cap](/help/speed-vs-data-cap).

If you wanted “one hour, don’t show GB”, go back to [Create a 1-hour time package](/help/create-time-package).

## What you will have

An active **Data-based** row. Portal copy looks like **1 GB download · expires in 1 day** (numbers depend on you). Guests see **Download allowance: …**. They do **not** get a hidden leftover meter from staff — the product is the allowance plus the expiry clock.

## Before you start

- A location on **Locations**.
- A price in XAF that matches nearby cyber cafés. Data SKUs often sit above a cheap 1-hour time plan.
- Decide expiry: **Must be used within** 1 day is a tight commute pack; 7 days is a weekly. Unused data dies when the clock ends — say that at the counter.
- **Simultaneous devices** default **1**. Raise it only if you are selling a family data pack on purpose.
- No Hex required to create the SKU. Live redeem still needs **ONLINE**.

## Steps

1. **Locations** → **Packages** → **Add Package**.
2. **Package name** — e.g. `1 GB / 24h` so the portal is honest.
3. **Package type** → **Data-based**. Description on the form: subscriber gets a download allowance that must be used before expiry.
4. **Download allowance** — set value and **MB** or **GB**. Example: **1** **GB**. This is visible to buyers.
5. **Must be used within** — value plus **minutes**, **hours**, or **days**. Example: **1** **days**. That becomes the session’s time bound on the router.
6. **Price (XAF)**.
7. **Upload speed (MB/s)** — default **1**, max **100**. Leave 1 unless you measured the WAN.
8. **Simultaneous devices** — **1** unless this is a house data pack (then 2–4 and a higher price).
9. **Create package**.

There is no separate “fair use” checkbox on data-based: the allowance **is** the cap, and it is shown. That is why staff can say “1 GB, one day” out loud. They still must not invent a leftover-GB theatre for **time** plans sold on the same portal — those stay **Unlimited data**.

Price in XAF like a human. If the cité next door sells 500 XAF for a visible gigabyte, do not undercut so hard that one WhatsApp group empties your Orange uplink by 14:00. **Upload speed (MB/s)** default **1** is a brake; raising it to 20 without raising allowance just makes the pack vanish faster. That is the [speed vs quota](/help/speed-vs-data-cap) lesson in shop language.

![Screenshot](about:blank)
_Screenshot slot: Data-based package with Download allowance and Must be used within (staging)._

## What you should see

- Owner **Details**: allowance plus expiry, not “unlimited data”.
- **Preview portal**: **{{cap}} download · expires in {{duration}}**. After pay, **Download allowance: {{cap}}**.
- When bytes are gone, the session ends even if the expiry clock had time left. When the clock ends, leftover bytes are gone.
- **Deactivate** stops new sales of this SKU.

Time packages nearby can still say **Unlimited data**. That is a different product. Do not mix explanations at the counter.

## If it fails

**Download allowance must be greater than 0** / **Expiry period must be greater than 0.** Both fields need a positive number.

**Guests think they bought unlimited time.** You sold quota. The portal already prints the allowance. Staff should repeat expiry, not invent leftover GB theatre.

**Upload speed 20 and they still “finish the GB too fast”.** Speed is not size. 20 MB/s empties 1 GB faster. If you want the pack to last the afternoon, lower speed or raise allowance — two different knobs. See [speed vs quota](/help/speed-vs-data-cap).

**Same login on many phones eats the GB.** Expected. Allowance is shared on the credentials. Use **Simultaneous devices** **1** for walk-in data, or price a family data SKU.

**Want hidden GB on a time plan instead.** That is **Fair use data limit (hidden from subscribers)** on **Time-based**, default on at 2 GB for new packages. Never read remaining fair-use GB to guests.

**Package still listed after Deactivate.** It should stop appearing for new portal purchases. Old sessions continue until they expire or you **Kick**.

**Expiry felt “unfair”.** **Must be used within** is the clock you printed. A 1 GB pack that **Must be used within** 3 hours is a commute SKU; 7 **days** is a weekly. Say the clock at the counter. SpaiHub will not extend leftover bytes because someone went to village.

**Preview still shows Unlimited data.** You are looking at a **Time-based** neighbour SKU. Filter with your eyes: data lines include **download** and **expires**. Add both products if you want; just do not explain them as the same thing.
