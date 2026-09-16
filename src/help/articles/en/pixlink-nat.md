---
id: tip.pixlink-nat
slug: pixlink-nat
title: "Cheap extender in router mode: one voucher for the whole house"
description: "Cheap Wi‑Fi extenders and travel routers often only stay up in router mode. That NATs every phone behind one WAN MAC, so one access code covers the whole house."
role: ["owner"]
section: pro-tips
intents: ["cheap extender", "pixlink", "tenda", "router mode", "one voucher whole house", "WAN MAC", "NAT"]
buttons: ["Sessions", "On router", "Simultaneous devices", "Kick"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.ap-vs-router", "tip.one-mac-nat", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

A **cheap extender** (also called a répéteur, travel router, or “Wi‑Fi booster”) is any low-cost box a neighbour plugs into a wall socket to stretch your hotspot. **Pixlink, Tenda, and similar brands are examples** — not a special SpaiHub category. The same physics applies to a phone used as a hotspot toward your SSID.

It is **not** a SpaiHub **Location**. A Location is your shop or site in **Locations**.

**NAT** (network address translation) is what a device in **router mode** does: every phone behind it borrows one public identity. On Wi‑Fi that identity is the extender’s **WAN MAC** — the hardware address the Hex actually sees.

**MAC** is a Wi‑Fi hardware address. **Simultaneous devices** on a package counts distinct MACs the hotspot sees, not “people in the house.”

**Voucher** is a cash code (`SPAI-XXXX-XXXX` plus PIN). The same NAT trap applies to a MoMo username (phone digits plus PIN).

## Why it matters

Saturday in Bonabéri: you sold a 500 XAF walk-in hour. Ten minutes later WhatsApp in the yard, two TVs, and a PlayStation are all online. **Sessions** shows one row, one MAC, **On router**. Staff swear the voucher is “broken” because “we only sold one.” Nothing is broken. The house plugged in a cheap extender, left it in **router mode**, and the Hex granted the WAN MAC. Everyone behind that box rides the same login.

Those boxes are sold as “just extend the Wi‑Fi.” In **AP / bridge** mode they would forward each phone’s MAC. Many cheap chipsets **fail in AP mode** (flap, lose DHCP, reboot when a few phones join) and only stay up in **router mode**. Router mode is NAT. That is the class of hardware to **discourage on your hotspot** — not one brand.

That is physics, not a SpaiHub bug. Anti-tether TTL rules will not save you. They stayed **off** after they dropped ordinary phones (Samsung, Tecno, iPhone) that were not tethering at all. Do not turn them back on, and do not promise guests that SpaiHub “sees every phone in the house.”

If you sell a cheap 1-device plan and a whole compound shares it through NAT, you lose money. If you sell a family plan and they still NAT, you still see **one** MAC — you charged more, which is the honest fix, but you still cannot count phones behind the box.

## What you see

On **Locations** → **Sessions**:

- One **Device** row (often the phone that paid, or a voucher code).
- Status **On router** — the Hex has an active hotspot host.
- A single MAC. The hint on the page already says a single MAC may still be a cheap extender, phone hotspot, or personal router sharing with many devices.
- **Kick** ends that hotspot user. The whole house drops together. They come back if they reconnect with the same username and PIN before the package ends.

You will **not** see a list of Tecno, iPhone, and laptop behind the extender. RouterOS never received those MACs.

Wrong diagnosis we hear every week: “the voucher duplicated,” “MoMo paid twice,” “fair use is leaking GB,” “Script 2 is broken.” Check **Sessions** first. One MAC + heavy airtime use = NAT, not a duplicate payment.

## What to do

Tonight, before you argue with the compound:

1. Walk the shop. Look for a cheap white extender (Pixlink, Tenda, no-name “répéteur”) with two Wi‑Fi names (one “_EXT”). If the sticker or admin page says **router** / **WISP** / **AP+Router**, that box is NATting.
2. House rule on the wall: **no personal routers or cheap extenders** on this hotspot. A phone hotspot used as a second router is the same problem.
3. Prefer a real access point in **AP / bridge** mode so each phone shows its own MAC. Do not fight a 8 000 XAF extender into AP if it only survives in router mode — [AP mode vs router mode](/help/ap-vs-router-mode).
4. On cheap walk-in packages set **Simultaneous devices** to **1**, keep **Fair use data limit (hidden from subscribers)** on (new time packages default **2 GB**), and sell a higher-priced family package (2–4 devices) for households that want to share **without** a NAT box.
5. If you must stop the house tonight: **Kick** that session. Do not refund “because many phones used it” unless your shop policy says so — they used the access they paid for, through NAT.

Do not promise you can “see phones behind NAT” after a firmware update. You cannot. Price the sharing you cannot see. Discourage the cheap NAT boxes; do not single out one logo.

## What not to say

- Do not tell guests how many GB they have left on a time package. They see unlimited browse until cutoff, then **Fair use limit reached. Buy another package to continue.**
- Do not say SpaiHub or MikroTik can list every phone behind a cheap extender.
- Do not promise TTL / anti-tether will block sharing. It stays off; it broke phones.
- Do not accuse staff of “printing the same voucher twice” when **Sessions** shows one MAC.
- Do not tell a tenant you “blocked their Pixlink.” You did not block a brand. NAT hid every phone behind whatever box they plugged in.
