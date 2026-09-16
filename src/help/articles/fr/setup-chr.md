---
id: own.tut.chr
slug: setup-chr
title: "CHR depuis une VM vide (trois scripts dans l’ordre)"
description: "Bootstrap, hotspot, puis connexion. Ne sautez pas, ne réordonnez pas."
role: ["owner"]
section: tutorials
intents: ["CHR", "cloud router"]
buttons: ["Add CHR & open wizard", "Setup CHR"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.chr-order", "own.tut.hex-existing"]
updatedAt: 2026-09-16
minutes: 15
---

Licence CHR avec Hotspot. HTTPS sortant. Pas de Wi‑Fi sur le CHR — branchez un AP sur le pont LAN.

1. **Ajouter un routeur** → **MikroTik CHR**.
2. Confirmez WAN/LAN (`ether1` / `ether2`).
3. **Bootstrap**, puis **hotspot SpaiHub**, puis **Connecter**.
4. Le statut passe **En ligne** après le heartbeat (~2 min).
