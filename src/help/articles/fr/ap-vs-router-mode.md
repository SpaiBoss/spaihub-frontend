---
id: tip.ap-vs-router
slug: ap-vs-router-mode
title: "Mode AP vs mode routeur sur les répéteurs bon marché"
description: "Le mode AP ou bridge transmet la MAC de chaque téléphone. Le mode routeur met tout le monde en NAT derrière une MAC WAN. Beaucoup de répéteurs bon marché (Pixlink, Tenda et similaires) ne tiennent qu’en mode routeur — découragez ces boîtes, ou tarifez la zone comme un client."
role: ["owner"]
section: pro-tips
intents: ["mode ap vs routeur", "répéteur bon marché", "mode bridge", "pixlink", "tenda"]
buttons: ["Sessions", "Appareils simultanés", "Sur le routeur"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.pixlink-nat", "tip.anti-tether-off"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

**Mode AP** (access-point / bridge / « répéteur pur ») : le répéteur est une radio bête. Les téléphones gardent leur propre MAC. Le Hex voit chaque appareil.

**Mode routeur** (WISP, AP+Router, « routeur ») : le répéteur est une petite boîte NAT. Le Hex voit **une MAC WAN**. Chaque téléphone derrière ressemble à cette boîte.

**MAC WAN** = l’adresse sur le câble ou la liaison Wi‑Fi vers ton hotspot, pas les adresses LAN des téléphones dans la maison.

**Hex** = ton MikroTik à la boutique. **Répéteur bon marché** = les répéteurs et travel routers du marché (Pixlink, Tenda, no-name). Ce sont des exemples de la même classe — pas un objet SpaiHub.

## Pourquoi c’est important

À Douala, un répéteur à 8 000 XAF se vend comme « juste pour étendre le Wi‑Fi ». Le menu est en général **AP** versus **Router**. AP, c’est ce que tu veux si tu vends des forfaits par téléphone. Router, c’est ce sur quoi ces boîtes retombent souvent : en AP, **les chipsets bon marché flappent**, perdent le DHCP, ou redémarrent quand cinq téléphones se joignent. Pixlink est une marque qui se comporte comme ça ; beaucoup d’autres aussi.

Incident dans un couloir de New Bell : le propriétaire a mis le répéteur en AP, la couverture mourait chaque soir, les locataires gueulaient, il est revenu en routeur « pour que le Wi‑Fi tienne ». Le lendemain **Sessions** montrait une MAC **Sur le routeur** pendant que tout l’étage streamait. Il croyait **Appareils simultanés** « cassé ». Ça comptait les MAC correctement — il n’y en avait qu’une.

SpaiHub n’inventera pas des téléphones qu’il ne voit pas. L’anti-tether (TTL) reste désactivé : couper TTL=63 cassait des téléphones normaux qui ne partageaient pas. N’essaie pas de « corriger AP vs routeur » avec de la magie firewall.

**Décourage les répéteurs bon marché sur le hotspot.** Un vrai AP qui bridge vraiment, c’est l’outil de couverture. Une boîte NAT, c’est toute une maison sur un bon.

## Ce que tu vois

Sur la page du répéteur lui-même (pas SpaiHub) :

- **AP / Bridge / Repeater** — bon pour le comptage par appareil s’il tient.
- **Router / WISP / AP+Router** — un client vers le Hex.

Sur SpaiHub :

- **Sites** → **Sessions** : une ligne par utilisateur hotspot que le Hex rapporte.
- **Sur le routeur** avec une MAC après qu’une maison entière a payé une fois = NAT en mode routeur (ou hotspot téléphone).
- Plusieurs MAC pour le même identifiant = ils rejoignent vraiment ton SSID séparément (forfait famille ou PIN partagé), ils ne se cachent pas derrière le NAT.

Mauvais diagnostic : « le firmware du Hex est vieux », « le script 1 a dupliqué les utilisateurs », « le plafond d’usage ne marche pas parce qu’ils sont encore en ligne ». S’ils sont encore dans la fenêtre de navigation et sous le plafond caché, le partage NAT est autorisé par la physique. Le plafond est partagé avec quiconque utilise le même login.

## Quoi faire

Ce soir :

1. Étiquette les prises : **pas de routeurs personnels ni de répéteurs bon marché.** Un téléphone en hotspot vers ton SSID, c’est aussi un mini-routeur.
2. S’il te faut de la couverture dans une cour, achète un vrai AP qui **bridge** (style Ubiquiti, ou un MikroTik cAP) et mets-le en mode AP. Ne te bats pas avec un Pixlink, Tenda ou no-name à 8 000 XAF en AP s’il ne survit qu’en mode routeur.
3. Là où tu dois laisser un répéteur bon marché en mode routeur, traite cet étage comme **un client**. Vends un forfait au prix famille ou un forfait au temps avec plafond d’usage caché, pas un walk-in 1 appareil à 200 XAF que tu croies exclusif.
4. Garde les forfaits pas chers à **Appareils simultanés** **1**. Ça limite encore seulement les MAC que le Hex voit.
5. Laisse l’anti-tether désactivé. Si un vieux script a laissé des commentaires `spaihub-anti-tether` dans le firewall, recolle **Script de setup** → **2. Connecter à SpaiHub** — les scripts actuels enlèvent ces règles et ne les remettent pas.

Ne promets pas qu’une mise à jour firmware va « découper » un répéteur en mode routeur en lignes par téléphone. Ça ne le fera pas. Voir [Répéteur bon marché en mode routeur](/fr/help/pixlink-nat).

## Quoi ne pas dire

- Ne dis pas à un locataire que SpaiHub « a bloqué son Pixlink ». Tu n’as pas bloqué une marque. Le NAT les a cachés derrière la boîte qu’ils ont utilisée.
- Ne promets pas le reste de Go du plafond d’usage sur la page abonné.
- Ne dis pas que le TTL anti-tether revient. Ça cassait les téléphones ; ça reste désactivé.
- Ne prétends pas que le mode AP est toujours stable sur les répéteurs bon marché. Beaucoup ne tiennent qu’en mode routeur — tarife ça honnêtement, et préfère de vrais AP.
