---
id: glossary.shared
slug: glossary-shared-devices
title: "Appareils simultanés"
description: "Appareils simultanés = combien de MAC Wi‑Fi distinctes peuvent utiliser un identifiant et un PIN en même temps. La valeur forfait gagne sur le repli Politique d’accès. 0 sur le repli = un appareil. Le NAT compte encore comme une MAC."
role: ["owner", "contributor"]
section: glossary
intents: ["appareils simultanés", "appareils partagés", "forfait famille"]
buttons: ["Appareils simultanés", "Appareils par code d’accès (repli)", "Déconnecter cet appareil"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.family-package", "tip.access-fallback"]
updatedAt: 2026-09-16
minutes: 4
---

## Termes

**Appareils simultanés** est un champ forfait (1–20). C’est MikroTik **shared-users** : combien de **MAC** distinctes peuvent s’asseoir sur le même identifiant hotspot + PIN en même temps.

Un **forfait famille**, c’est simplement ce nombre à 2–4 avec un prix XAF plus élevé. Le portail montre alors **Forfait famille — jusqu’à N appareils**, **Déconnecter cet appareil**, **Terminer pour tous les appareils**.

**Politique d’accès** **Appareils par code d’accès (repli)** n’est utilisé que quand un bon/grant n’a pas de limite de forfait. **0 = un appareil**. **Appareils simultanés** du forfait **gagne** quand il est présent.

La **randomisation MAC** peut faire paraître un téléphone nouveau. Le **NAT** (répéteur bon marché en mode routeur, hotspot téléphone) fait paraître plusieurs téléphones comme **une** MAC. Appareils simultanés ne peut pas découper le NAT.

Les contributeurs ne règlent pas ce champ. Ils peuvent encore entendre « forfait famille » à la boutique.

## Pourquoi c’est important

Si tu crois qu’appareils simultanés veut dire « les gens que je vois avec mes yeux », samedi soir va t’embrouiller. Le Hex compte les identités radio qu’il voit. Une cour derrière un répéteur, c’en est une.

Mauvais diagnostic : « monte le repli site à 8 pour que les forfaits pas chers deviennent famille. » Le forfait 1 gagne encore.

L’anti-tether ne montera pas le compteur de MAC. Ça reste désactivé parce que TTL=63 coupait les téléphones ordinaires. Le partage, c’est ce champ plus le prix plus le plafond d’usage caché — pas une rumeur firewall Facebook.

## Ce que tu vois

Astuce forfait : 1 pour un seul appareil, 4 pour la famille ; le NAT compte comme une MAC.

Astuce site : préfère régler **Appareils simultanés** sur chaque forfait.

**Sessions** propriétaire : une ligne par utilisateur hotspot, pas par téléphone intérieur. **Expulser** sur cette ligne coupe chaque appareil qui utilise le même identifiant — famille ou maison NAT pareil. Attends ~15 secondes pour `spaihub-commands`.

## Quoi faire

Propriétaires : mets 1 sur le walk-in, 2–4 sur la famille, enregistre les forfaits, ne compte pas sur le repli. Tarife le partage ; n’installe pas de TTL. Teste deux téléphones sur ton SSID (pas derrière un répéteur bon marché) après avoir monté le nombre. Contributeurs : si deux téléphones échouent sur un forfait 1 appareil, c’est le produit, pas un uplink cassé.

## Quoi ne pas dire

- Ne dis pas qu’appareils simultanés « voit à travers » un répéteur bon marché.
- Ne dis pas que 0 en repli = illimité.
- Ne dis pas aux abonnés le reste de Go du plafond d’usage comme une allocation de partage. Le plafond d’usage, c’est des octets cachés, pas des MAC en plus.
- Ne dis pas à un contributeur que le **Plafond** Mbps de ses **Liaisons** est la même chose qu’appareils simultanés. L’un est le langage metering d’uplink ; l’autre, ce sont les logins hotspot.
