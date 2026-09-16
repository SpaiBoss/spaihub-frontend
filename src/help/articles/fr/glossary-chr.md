---
id: glossary.chr
slug: glossary-chr
title: "CHR (Cloud Hosted Router)"
description: "CHR, c’est RouterOS MikroTik en machine virtuelle dans le cloud. Pas de Wi‑Fi intégré. Le setup, c’est trois scripts dans l’ordre : amorçage, hotspot SpaiHub, puis connecter."
role: ["owner", "contributor"]
section: glossary
intents: ["CHR", "cloud hosted router", "MikroTik virtuel"]
buttons: ["Ajouter le CHR et ouvrir l’assistant", "Setup CHR", "Ajouter un routeur"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.chr", "tip.chr-order"]
updatedAt: 2026-09-16
minutes: 4
---

## Termes

**CHR** veut dire **Cloud Hosted Router** : RouterOS qui tourne comme **VM** (machine virtuelle) chez un fournisseur cloud, pas un **Hex** plastique sous la caisse.

CHR n’a **pas de radios**. La couverture a encore besoin d’un **AP** (point d’accès) ou d’un switch sur le pont **LAN**. Cet AP doit être en mode **AP / bridge**. Si quelqu’un met un répéteur bon marché en **mode routeur** derrière le CHR, SpaiHub voit encore **une MAC WAN**.

**Licence** : Hotspot a besoin d’une licence CHR capable (niveau 4+ ou essai avec Hotspot). Sans Hotspot, les scripts de l’assistant ne peuvent pas faire leur travail.

**Trois collages, dans l’ordre** : **Script d’amorçage** (pont, DHCP, squelette hotspot, NAT) → **Hotspot SpaiHub** (walled garden, HTML de login) → **Connecter à SpaiHub** (heartbeat + commandes). N’inverse jamais.

Les contributeurs ne lancent pas l’assistant CHR. Ils peuvent encore entendre « le routeur cloud à la boutique ».

## Pourquoi c’est important

Un CHR, c’est comment certaines boutiques gardent la logique MikroTik dans un datacenter pendant que des AP pas chers sont dans la cité. Mélanger le vocabulaire CHR avec les libellés Hex **Script 1 / Script 2** fait sauter l’amorçage. Une VM vide n’a pas de LAN jusqu’à l’amorçage.

Mauvais diagnostic : « CHR est hors ligne parce que la prévisualisation a échoué. » La prévisualisation n’a jamais eu besoin de la VM. Mauvais diagnostic : « CHR inclut le Wi‑Fi comme un répéteur Wi‑Fi bon marché. » Non.

Un CHR **En ligne** sans AP sur le LAN vend encore un portail auquel les téléphones ne peuvent pas s’associer. Le heartbeat ne crée pas de radio. À l’inverse, un bel AP dans la cité avec les scripts CHR inversés n’a toujours pas de DHCP. L’ordre, puis la radio, puis un téléphone test — pas l’inverse.

## Ce que tu vois

Propriétaire **Ajouter un routeur** → **MikroTik CHR** → **Ajouter le CHR et ouvrir l’assistant**, ou **Setup CHR** sur une ligne existante. Badge type **CHR**.

Assistant : prérequis (licence Hotspot, egress HTTPS 443, security group, AP sur le LAN), noms réseau (`ether1` WAN / `ether2` LAN par défaut), trois étapes script, **En attente du heartbeat du routeur...**, **Le routeur est en ligne !**

**Dernier contact : Jamais** jusqu’à ce que connecter marche — même famille de sens qu’un Hex prévisualisation seulement.

## Quoi faire

Propriétaires : suis l’ordre, vérifie `/interface print`, attends 1–2 minutes pour **En ligne**, puis forfaits + vrai AP en bridge. Contributeurs : si ta liaison est « sur la boutique CHR », ton **Portefeuille** est encore un seul solde ; tu ne colles pas de scripts.

Si le heartbeat n’arrive jamais, vérifie l’egress 443 et l’ordre des scripts avant d’accuser Campay. Ne saute pas **Connecter à SpaiHub** parce que **Prévisualiser le portail captif** a déjà l’air joli. La prévisualisation est la page cloud ; les grants ont encore besoin de `spaihub-commands`.

## Quoi ne pas dire

- Ne dis pas à un électricien que CHR est « le répéteur ».
- Ne publie pas de tokens cloud ni d’URL API live.
- Ne promets pas le reste de Go du plafond d’usage sur un portail CHR.
- Ne dis pas que les contributeurs relancent **Setup CHR**.
