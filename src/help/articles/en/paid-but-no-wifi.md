---
id: own.tut.paid-no-wifi
slug: paid-but-no-wifi
title: "Staff script: paid but no WiFi"
description: "What to check when Campay succeeded and the phone is still captive."
role: ["owner"]
section: troubleshooting
intents: ["paid no wifi", "orphan payment"]
buttons: ["Check payment status", "Setup script"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.paid-no-wifi", "own.tut.repaste-script2"]
updatedAt: 2026-09-16
minutes: 6
---

1. Confirm router **ONLINE**. Offline blocks new MoMo.
2. On the portal: **Check payment status**. SpaiHub recovers orphan Campay SUCCESS and keeps pending payments across reloads.
3. Confirm **spaihub-commands** exists: `/system scheduler print`. Heartbeat alone is not enough.
4. Re-paste Script 2 if the scheduler is missing.
5. **Sessions** → if **On router**, the Hex has the login. If **Not seen**, the grant never imported.

Do not take a second payment until you have checked status.
