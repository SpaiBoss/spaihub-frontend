---
id: tip.speed-vs-quota
slug: speed-vs-data-cap
title: "Upload speed is not a data cap"
description: "Upload speed is a rate in MB/s. A data cap is a quota in MB or GB. Download speed is platform-wide. Showing upload speed on the portal is off by default."
role: ["owner"]
section: pro-tips
intents: ["upload speed", "data cap", "MB/s vs GB", "rate limit"]
buttons: ["Upload speed (MB/s)", "Download allowance", "Fair use data limit (hidden from subscribers)", "Show upload speed on the portal"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.data-package", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

**Rate** is how fast bits move **right now**. SpaiHub package **Upload speed (MB/s)** is a rate. Default is **1 MB/s** per subscriber. MB/s means megabytes per second, not megabits. Do not confuse with the “M” you may see in RouterOS (that UI talks megabits).

**Quota** (cap, allowance) is how much can be transferred **in total** before the session is cut. On a **Data-based** package that product is **Download allowance**. On a **Time-based** package an optional hidden quota is **Fair use data limit (hidden from subscribers)**.

**Download speed** (how fast guests can pull video) is **platform-wide** for SpaiHub hotspots. You do not set a per-package download rate in **Add Package**. You set upload. You set quota or time.

**Unlimited data** on a time plan is the guest wording for “this is not a visible data product.” It is not a promise about rate.

## Why it matters

The most common RouterOS confusion we hit in Douala workshops: an owner sets **Upload speed (MB/s)** to 2, then tells the counter “this package is 2 GB.” Guests buy, stream, and argue when the hour ends with “you said 2 giga.” MB/s ≠ GB. One is a tap opening. The other is the size of the bucket.

Incident: a cyber café in Makepe sold “5 MB” meaning they typed 5 in **Upload speed (MB/s)**. The portal, with **Show upload speed on the portal** off (the default), did not even show that number. Buyers saw a time plan with **Unlimited data**. Staff thought the portal was hiding “5 GB.” It was hiding a *rate* you asked not to display, and there was no 5 GB quota at all.

Wrong diagnosis: “increase upload speed to stop fair use from hitting.” Faster upload can burn a hidden cap *sooner*. Speed is not extra gigabytes.

## What you see

On **Add Package** / **Edit Package**:

- **Upload speed (MB/s)** — “Maximum upload speed per subscriber. Default is 1 MB/s.”
- **Time-based**: **Browse duration** plus optional hidden fair use (GB/MB quota, not shown to buyers).
- **Data-based**: **Download allowance** (visible quota) and **Must be used within**.

On **Settings** → **Portal branding**:

- **Show upload speed on the portal** / **Show upload speed on packages** — **Off by default.** Hint: subscribers only see duration and data limits unless enabled.

On the portal, if you turn that switch on, packages can show **N MB/s upload**. Time plans still show **Unlimited data** for the browse period. Data plans show the download allowance. Neither of those is “remaining fair-use GB.”

Owner **Details** may include the fair-use cap and the upload rate. That is for you.

## What to do

1. Decide the product: clock (**Time-based**) or bucket (**Data-based**). Write it on the chalkboard in those words, in XAF.
2. Leave upload at **1 MB/s** unless you measured your uplink and you know why a buyer should upload faster (not typical for a cité hotspot).
3. Do not use upload speed as a marketing “GB.” If you sell gigabytes, create a **Data-based** package with **Download allowance**.
4. Keep **Show upload speed on the portal** off unless you really want guests arguing about MB/s versus “slow Orange.”
5. If guests hit **Fair use limit reached**, sell another package. Do not raise upload speed as a “fix” and do not announce remaining GB.

## What not to say

- Do not say “1 MB/s means 1 GB.”
- Do not tell guests remaining fair-use GB on a time plan.
- Do not promise you can set download MB/s per package in this screen. Download speed is platform-wide.
- Do not blame Script 2 when a data package empties. Quota worked.
