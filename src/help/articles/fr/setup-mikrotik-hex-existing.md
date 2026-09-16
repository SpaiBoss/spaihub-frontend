---
id: own.tut.hex-existing
slug: setup-mikrotik-hex-existing
title: "Hex physique — hotspot existant (script 1 puis 2)"
description: "Votre MikroTik a déjà une page de login. Superposez SpaiHub sans toucher au WAN."
role: ["owner"]
section: tutorials
intents: ["hex", "script", "existing hotspot"]
buttons: ["Setup script", "Existing hotspot"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.script-1-vs-2", "tip.login-html", "own.tut.online-momo"]
updatedAt: 2026-09-16
minutes: 12
---

## Étapes
1. **Sites** → **Routeurs** → **Script de setup**.
2. Chemin du script 1 : **Hotspot existant**.
3. Collez le script 1 dans le terminal (walled garden, PAP, `login.html` / `status.html`). RouterOS n’a **pas** de propriété `login-url`.
4. Collez le **script 2** (heartbeat + commandes).
5. Attendez **En ligne**.

Le heartbeat seul n’accorde pas le WiFi après MoMo. Recoller le script 2 ne devrait pas expulser tout le monde.
