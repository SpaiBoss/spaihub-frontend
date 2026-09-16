---
id: own.tut.hex-guest
slug: setup-mikrotik-hex-guest
title: "Hex physique — créer un hotspot invité"
description: "Ajoute un réseau invité 10.10.10.0/24 sur le LAN."
role: ["owner"]
section: tutorials
intents: ["guest hotspot", "create guest"]
buttons: ["Create guest hotspot"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "tip.walled-garden"]
updatedAt: 2026-09-16
minutes: 12
---

Dans **Script de setup**, choisissez **Créer un hotspot invité**. Indiquez LAN (souvent `ether2`) et WAN (`ether1`). Vérifiez avec `/interface print`.

Cela ne touche pas au WAN. Puis scripts 1 et 2 dans l’ordre.
