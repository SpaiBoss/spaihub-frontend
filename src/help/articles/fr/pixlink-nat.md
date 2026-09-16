---
id: tip.pixlink-nat
slug: pixlink-nat
title: "Répéteur bon marché en mode routeur : un bon pour toute la maison"
description: "Les répéteurs et travel routers bon marché ne tiennent souvent qu’en mode routeur. Ça met tous les téléphones en NAT derrière une MAC WAN : un code d’accès couvre toute la maison."
role: ["owner"]
section: pro-tips
intents: ["répéteur bon marché", "pixlink", "tenda", "mode routeur", "un bon toute la maison", "MAC WAN", "NAT"]
buttons: ["Sessions", "Sur le routeur", "Appareils simultanés", "Expulser"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.ap-vs-router", "tip.one-mac-nat", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

Un **répéteur bon marché** (aussi travel router, « booster Wi‑Fi ») est n’importe quelle boîte pas chère qu’un voisin branche dans une prise pour étirer ton hotspot. **Pixlink, Tenda et les marques du même rayon sont des exemples** — pas une catégorie SpaiHub. La même physique s’applique à un téléphone utilisé en hotspot vers ton SSID.

Ce n’est **pas** un **site** SpaiHub. Un site, c’est ta boutique dans **Sites**.

**NAT** (network address translation), c’est ce qu’un appareil en **mode routeur** fait : chaque téléphone derrière emprunte une seule identité publique. En Wi‑Fi, cette identité est la **MAC WAN** du répéteur — l’adresse matérielle que le Hex voit vraiment.

**MAC** est une adresse matérielle Wi‑Fi. **Appareils simultanés** sur un forfait compte les MAC distinctes que le hotspot voit, pas « les gens dans la maison ».

**Bon** = un code cash (`SPAI-XXXX-XXXX` plus PIN). Le même piège NAT s’applique à un identifiant MoMo (chiffres du téléphone plus PIN).

## Pourquoi c’est important

Samedi à Bonabéri : tu as vendu une heure walk-in à 500 XAF. Dix minutes plus tard, WhatsApp dans la cour, deux télés et une PlayStation sont en ligne. **Sessions** montre une ligne, une MAC, **Sur le routeur**. Le personnel jure que le bon est « cassé » parce que « on n’en a vendu qu’un ». Rien n’est cassé. La maison a branché un répéteur bon marché, l’a laissé en **mode routeur**, et le Hex a accordé la MAC WAN. Tout le monde derrière cette boîte voyage sur le même login.

Ces boîtes se vendent comme « juste pour étendre le Wi‑Fi ». En mode **AP / bridge** elles transmettraient la MAC de chaque téléphone. Beaucoup de chipsets bon marché **échouent en mode AP** (flappent, perdent le DHCP, redémarrent dès que quelques téléphones se joignent) et ne tiennent **qu’en mode routeur**. Mode routeur = NAT. C’est **cette classe de matériel** à décourager sur ton hotspot — pas un logo.

C’est la physique, pas un bug SpaiHub. Les règles anti-tether TTL ne te sauveront pas. Elles sont restées **désactivées** après avoir coupé des téléphones ordinaires (Samsung, Tecno, iPhone) qui ne partageaient rien. Ne les rallume pas, et ne promets pas aux abonnés que SpaiHub « voit chaque téléphone dans la maison ».

Si tu vends un forfait 1 appareil pas cher et qu’une concession entière le partage en NAT, tu perds de l’argent. Si tu vends un forfait famille et qu’ils NAT encore, tu vois toujours **une** MAC — tu as facturé plus, c’est la correction honnête, mais tu ne peux toujours pas compter les téléphones derrière la boîte.

## Ce que tu vois

Dans **Sites** → **Sessions** :

- Une ligne **Appareil** (souvent le téléphone qui a payé, ou un code de bon).
- Statut **Sur le routeur** — le Hex a un hôte hotspot actif.
- Une seule MAC. L’astuce sur la page dit déjà qu’une seule MAC peut encore être un répéteur bon marché, un hotspot téléphone ou un routeur personnel qui partage avec plusieurs appareils.
- **Expulser** termine cet utilisateur hotspot. Toute la maison tombe ensemble. Ils reviennent s’ils se reconnectent avec le même identifiant et le même PIN avant la fin du forfait.

Tu **ne** verras **pas** la liste Tecno, iPhone et laptop derrière le répéteur. RouterOS n’a jamais reçu ces MAC.

Mauvais diagnostic qu’on entend chaque semaine : « le bon a été dupliqué », « MoMo a payé deux fois », « le plafond d’usage fuit des Go », « le script 2 est cassé ». Regarde **Sessions** d’abord. Une MAC + grosse conso = NAT, pas un paiement en double.

## Quoi faire

Ce soir, avant de discuter avec la concession :

1. Marche dans la boutique. Cherche un répéteur blanc pas cher (Pixlink, Tenda, no-name) avec deux noms Wi‑Fi (un « _EXT »). Si l’autocollant ou la page admin dit **router** / **WISP** / **AP+Router**, cette boîte fait du NAT.
2. Règle au mur : **pas de routeurs personnels ni de répéteurs bon marché** sur ce hotspot. Un hotspot téléphone utilisé comme second routeur, c’est le même problème.
3. Préfère un vrai point d’accès en mode **AP / bridge** pour que chaque téléphone montre sa propre MAC. Ne te bats pas avec un répéteur à 8 000 XAF en AP s’il ne survit qu’en mode routeur — [Mode AP vs mode routeur](/fr/help/ap-vs-router-mode).
4. Sur les forfaits walk-in pas chers, mets **Appareils simultanés** à **1**, garde **Plafond d’usage (caché aux abonnés)** coché (les nouveaux forfaits au temps partent à **2 Go**), et vends un forfait famille plus cher (2–4 appareils) pour les ménages qui veulent partager **sans** boîte NAT.
5. Si tu dois arrêter la maison ce soir : **Expulser** cette session. Ne rembourse pas « parce que plusieurs téléphones l’ont utilisé » sauf si la règle de ta boutique le dit — ils ont utilisé l’accès payé, via le NAT.

Ne promets pas que tu pourras « voir les téléphones derrière le NAT » après une mise à jour firmware. Tu ne peux pas. Tarife le partage que tu ne vois pas. Décourage les boîtes NAT bon marché ; ne vise pas un seul logo.

## Quoi ne pas dire

- Ne dis pas aux abonnés combien de Go il leur reste sur un forfait au temps. Ils voient une navigation illimitée jusqu’à la coupure, puis **Plafond d’usage atteint. Achetez un autre forfait pour continuer.**
- Ne dis pas que SpaiHub ou MikroTik peut lister chaque téléphone derrière un répéteur bon marché.
- Ne promets pas que le TTL / anti-tether va bloquer le partage. Ça reste désactivé ; ça cassait les téléphones.
- N’accuse pas le personnel d’« imprimer le même bon deux fois » quand **Sessions** montre une MAC.
- Ne dis pas à un locataire que tu as « bloqué son Pixlink ». Tu n’as pas bloqué une marque. Le NAT a caché chaque téléphone derrière la boîte qu’ils ont branchée.
