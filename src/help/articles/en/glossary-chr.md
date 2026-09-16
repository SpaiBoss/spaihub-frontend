---
id: glossary.chr
slug: glossary-chr
title: "CHR (Cloud Hosted Router)"
description: "CHR is MikroTik RouterOS as a virtual machine in the cloud. It has no built-in Wi-Fi. Setup is three scripts in order: bootstrap, SpaiHub hotspot, then connect."
role: ["owner", "contributor"]
section: glossary
intents: ["CHR", "cloud hosted router", "virtual MikroTik"]
buttons: ["Add CHR & open wizard", "Setup CHR", "Add Router"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.chr", "tip.chr-order"]
updatedAt: 2026-09-16
minutes: 4
---

## Terms

**CHR** means **Cloud Hosted Router**: RouterOS running as a **VM** (virtual machine) at a cloud provider, not a plastic **Hex** under the till.

CHR has **no radios**. Coverage still needs an **AP** (access point) or switch on the **LAN** bridge. That AP should be in **AP / bridge** mode. If someone puts a cheap extender in **router mode** behind CHR, SpaiHub still sees **one WAN MAC**.

**License**: Hotspot needs a capable CHR license (Level 4+ or trial with Hotspot). Without Hotspot, the wizard scripts cannot do their job.

**Three pastes, in order**: **Bootstrap script** (bridge, DHCP, hotspot skeleton, NAT) → **SpaiHub hotspot** (walled garden, login HTML) → **Connect to SpaiHub** (heartbeat + commands). Never reverse.

Contributors do not run the CHR wizard. They may still hear “the cloud router at the shop.”

## Why it matters

A CHR is how some shops keep MikroTik logic in a datacenter while cheap APs sit in the cité. Mixing CHR vocabulary with Hex **Script 1 / Script 2** labels causes skipped bootstrap. A blank VM has no LAN until bootstrap.

Wrong diagnosis: “CHR is offline because preview failed.” Preview never needed the VM. Wrong diagnosis: “CHR includes Wi‑Fi like a cheap Wi‑Fi extender.” It does not.

A CHR that is **ONLINE** with no AP on LAN still sells a portal that phones cannot associate to. Heartbeat does not create radio. Conversely, a beautiful AP in the cité with CHR scripts reversed still has no DHCP. Order, then radio, then a test phone — not the other way around.

## What you see

Owner **Add Router** → **MikroTik CHR** → **Add CHR & open wizard**, or **Setup CHR** on an existing row. Type badge **CHR**.

Wizard: prerequisites (Hotspot license, HTTPS 443 egress, security group, AP on LAN), network names (`ether1` WAN / `ether2` LAN by default), three script steps, **Waiting for router heartbeat...**, **Router is online!**

**Last seen: Never** until connect works — same family of meaning as a preview-only Hex.

## What to do

Owners: follow order, verify `/interface print`, wait 1–2 minutes for **ONLINE**, then packages + real AP in bridge. Contributors: if your link is “on the CHR shop,” your **Wallet** is still one balance; you do not paste scripts.

If heartbeat never comes, check 443 egress and script order before blaming Campay. Do not skip **Connect to SpaiHub** because **Preview captive portal** already looks pretty. Preview is the cloud page; grants still need `spaihub-commands`.

## What not to say

- Do not tell an electrician CHR is “the extender.”
- Do not publish cloud tokens or live API URLs.
- Do not promise remaining fair-use GB on a CHR portal.
- Do not say contributors re-run **Setup CHR**.
