---
id: own.tut.kick-suspend
slug: kick-and-suspend
title: "Kick a session or suspend a location"
description: "Cut one login now, or stop a whole site from selling."
role: ["owner"]
section: tutorials
intents: ["kick", "suspend"]
buttons: ["Kick", "Suspend"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.sessions", "own.ref.locations"]
updatedAt: 2026-09-16
minutes: 3
---

**Sessions** → **Kick** queues a MikroTik kick. Needs the **commands** scheduler.

**Suspend** on the location row stops new portal purchases. Existing sessions may still run until they expire or you kick them.
