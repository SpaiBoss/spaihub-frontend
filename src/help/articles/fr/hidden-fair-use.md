---
id: tip.fair-use-hidden
slug: hidden-fair-use
title: "Plafond d’usage caché sur les forfaits au temps"
description: "Les forfaits au temps vendent de la durée de navigation. Tu peux cacher un plafond en Go aux acheteurs. Les abonnés voient Data illimitée. Après la coupure : Plafond d’usage atteint — jamais le reste en gigaoctets."
role: ["owner"]
section: pro-tips
intents: ["plafond d’usage caché", "plafond forfait au temps", "data illimitée", "plafond d’usage"]
buttons: ["Ajouter un forfait", "Plafond d’usage (caché aux abonnés)", "Créer le forfait", "Détails"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-message", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

Un **forfait au temps** (**Au temps**) vend une **Durée de navigation** — une heure, une nuit, un jour. L’acheteur paie une horloge, pas un tas visible de gigaoctets.

**Plafond d’usage** = un plafond caché optionnel en Go sur cette horloge. Tu le règles. MikroTik coupe quand même la session quand le plafond est atteint. La page abonné ne doit pas montrer un compteur de Go restants.

**Au volume**, c’est autre chose : le **Volume de téléchargement** *est* le produit. Les acheteurs *doivent* voir cette allocation. Ne mélange pas les deux quand tu expliques une coupure.

**Data illimitée** sur le portail veut dire « on ne te montre pas un produit data », pas « le tuyau ne peut jamais s’arrêter ».

## Pourquoi c’est important

À Akwa, un forfait 1 heure à 300 XAF, c’est du walk-in. Sans plafond, une maison TikTok derrière un répéteur bon marché peut brûler ton uplink avant la fin de l’heure. Avec un plafond caché, tu vends encore du temps, tu as l’air généreux, et le routeur arrête l’abus.

Les nouveaux forfaits au temps dans **Ajouter un forfait** ont **Plafond d’usage (caché aux abonnés)** **coché** par défaut, à **2 Go**. Tu peux monter, descendre, ou décocher. Décoché = pas de limite d’octets pour cette période de navigation (les limites de débit s’appliquent encore).

L’incident qu’on répète : un acheteur demande au comptoir « il me reste combien de Go ? » Le personnel jette un œil à la colonne **Détails** propriétaire et lit le chiffre à voix haute. Mauvaise surface. Les abonnés ne doivent jamais entendre le reste de Go du plafond d’usage. S’ils touchent le plafond, la page de login et la bannière du portail disent **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** C’est toute l’histoire abonné.

Mauvais diagnostic : « le portail ment parce qu’il dit Data illimitée. » Ce n’est pas un mensonge vis-à-vis du contrat acheteur : ils ont acheté du temps. Le plafond est ton frein anti-abus, partagé avec quiconque utilise le même identifiant (y compris hotspot / NAT).

## Ce que tu vois

Quand tu crées ou modifies un forfait :

- Case **Plafond d’usage (caché aux abonnés)**.
- Astuce : les acheteurs voient une navigation illimitée ; MikroTik coupe quand le plafond est atteint.
- Case cochée : « Appliqué sur le routeur contre les abus (partagé avec tous ceux qui utilisent le même login, y compris le partage de connexion / NAT). Les abonnés voient toujours des données illimitées. SpaiHub n’utilise pas de règles anti-tether. »
- Case décochée : « Laissez décoché pour des données illimitées pendant la durée de navigation. »

Sur **Forfaits**, la colonne **Détails** est pour **toi**. Elle peut mentionner un plafond d’usage. Ce chiffre est propriétaire seulement.

Sur le portail abonné, les forfaits au temps montrent **Illimité** / **Data illimitée pendant cette période** / « navigation · Data illimitée ». Ils ne montrent pas de Go restants. **Afficher le débit montant sur le portail** est un interrupteur de marque à part, désactivé par défaut.

Après la coupure, le login captif peut rebondir avec une raison plafond d’usage, et la bannière du portail est **Plafond d’usage atteint. Achetez un autre forfait pour continuer.**

## Quoi faire

1. **Sites** → **Forfaits** → **Ajouter un forfait** → **Au temps**.
2. Règle **Durée de navigation** et le prix en XAF.
3. Laisse **Plafond d’usage (caché aux abonnés)** coché sauf si tu veux vraiment aucun plafond d’octets (café avec gros uplink, ou une nuit promo que tu acceptes).
4. 2 Go est le point de départ par défaut pour un nouveau forfait au temps — change-le si ton uplink ou ton prix est différent. N’annonce pas le chiffre au comptoir.
5. Forme le personnel : si un abonné demande « il reste combien de data ? », réponds avec le temps restant s’il est encore en session, ou vends un autre forfait après **Plafond d’usage atteint**. Ne lis jamais les Go restants dans **Détails**.
6. Si toute une maison NAT à travers une MAC, le plafond caché est partagé. C’est voulu. Tarife les forfaits famille à part ; ne « interdis pas le partage » avec du TTL.

## Quoi ne pas dire

- Ne dis jamais à un abonné le reste de Go du plafond d’usage, même si tu vois le plafond que tu as configuré.
- N’imprime pas les Go cachés sur les tickets de bons comme si c’était un produit data. Les tickets au temps vendent de la navigation.
- Ne promets pas que le plafond est par téléphone derrière un répéteur bon marché. C’est par login, sur la MAC que le Hex voit.
- Ne dis pas que l’anti-tether va les arrêter avant le plafond d’usage. L’anti-tether reste désactivé.
