---
id: own.tut.hex-guest
slug: setup-mikrotik-hex-guest
title: "Physical Hex — create guest hotspot"
description: "Add a 10.10.10.0/24 guest network on LAN if you do not already have a hotspot."
role: ["owner"]
section: tutorials
intents: ["guest hotspot", "create guest"]
buttons: ["Create guest hotspot"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "tip.walled-garden"]
updatedAt: 2026-09-16
minutes: 12
---

In **Setup script**, choose **Create guest hotspot**. Set LAN (often `ether2`) and WAN (`ether1`). Confirm names with `/interface print` first.

This path does not wipe WAN or wireless. Then paste Script 1 and Script 2 in order.
