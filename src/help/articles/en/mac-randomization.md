---
id: tip.mac-random
slug: mac-randomization
title: "Phones randomize MAC addresses"
description: "Modern phones often present a private Wi-Fi MAC. Do not treat a Sessions MAC as a person. The portal also stores a browser device id that disappears if the guest clears site data."
role: ["owner"]
section: pro-tips
intents: ["MAC randomization", "private Wi-Fi address", "device id"]
buttons: ["Sessions", "On router", "Kick", "Disconnect this device"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["glossary.shared", "own.ref.sessions"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

A **MAC address** is the Wi‑Fi hardware identity the Hex reports in hotspot active hosts. **Sessions** shows that MAC when the router has seen the client.

**MAC randomization** (private Wi‑Fi address, “adresse Wi‑Fi privée”) is an OS setting. iPhone and Android often invent a new MAC per SSID, or even rotate. The printed sticker on the phone is not what you will see.

A **browser device id** is a random id the captive portal keeps in the phone’s browser storage for this router. SpaiHub uses it to resume **Check payment status**, family **Disconnect this device**, and “is this the same browser.” It is **not** the MAC. Clearing site data or switching browsers creates a new device id.

**Simultaneous devices** counts distinct MACs the hotspot accepts for one username, not “unique humans.”

## Why it matters

Monday in Bali: a student paid MoMo, lost the captive page, opened Chrome instead of the captive browser, and looked like a second device. Or they toggled “private Wi‑Fi address,” reassociated, and **Sessions** showed a new MAC while the old row looked stale. Staff said “he cloned the voucher.” He did not. The phone changed identity on purpose.

Wrong diagnosis: “this MAC is always this customer, so if I see a new MAC they stole the PIN.” The PIN *can* be shared — that is a different article — but a new MAC is also what honest phones do. Do not treat MAC as a national ID.

Random MACs also interact with NAT: an extender WAN MAC is stable (the box does not randomize like a phone). One stable MAC plus heavy use is often an extender, not “one very loyal Tecno.”

## What you see

**Locations** → **Sessions**:

- **Device**, package, router, **Ends**, **Kick**.
- **On router** vs **Not seen** — whether that login is in MikroTik active hosts right now.
- A MAC column when the Hex has reported one. Empty or changing MACs are normal around phone private-Wi‑Fi.

Empty **Sessions** after a good pay is usually Script 2 / commands, not randomization. Randomization does not hide a client that is online; it just changes the address.

The portal may still know the buyer by device id even when the MAC flipped. If they wipe the captive site data, they look new to the portal too. They still have username + PIN.

## What to do

Tonight:

1. If a paying guest “became a new phone,” ask whether they switched browser, cleared cache, or have **Private Wi‑Fi address** on. Have them reconnect to the same SSID and open the captive page again.
2. Do not **Kick** as punishment for a MAC change unless you are sure it is a second person on a 1-device plan.
3. For 1-device plans, a second *simultaneous* MAC is the actual limit. A replacement MAC after the first left can be the same person.
4. For family plans, extra MACs are expected. Use **End session for all devices** only when the buyer wants everyone off.
5. Never inventory people from MAC printouts. Never promise a guest you can “trace their phone” from **Sessions**.

## What not to say

- Do not say a MAC is a person.
- Do not tell guests remaining fair-use GB while you “investigate the MAC.”
- Do not claim SpaiHub disables iPhone private Wi‑Fi. We do not.
- Do not mix device id with MAC when talking to staff — different clocks, different storage.
