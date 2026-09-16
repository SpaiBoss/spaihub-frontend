---
id: tip.fair-use-message
slug: fair-use-guest-message
title: "Message plafond d’usage, jamais le reste en Go"
description: "Quand un plafond caché de forfait au temps est atteint, les abonnés voient Plafond d’usage atteint. Achetez un autre forfait pour continuer. On ne doit jamais leur dire les gigaoctets restants. Data illimitée est le mot pendant la période de navigation."
role: ["owner"]
section: pro-tips
intents: ["message plafond d’usage abonné", "jamais le reste en Go", "formulation data illimitée"]
buttons: ["Plafond d’usage (caché aux abonnés)", "Fermer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-hidden", "own.ref.portal"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

Le **message plafond d’usage abonné** est exactement : **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** Il apparaît sur la bannière du portail (et peut apparaître via la raison de login captif) après que MikroTik a coupé un forfait au temps pour le plafond d’octets caché.

**Data illimitée** / **Data illimitée pendant cette période** / **navigation · Data illimitée** est ce que le portail montre *avant* la coupure sur un forfait au temps. Ce n’est pas un widget de Go restants.

**Fermer** ferme la bannière. Ça ne restaure pas de gigaoctets.

**Détails** propriétaire sur **Forfaits** peut montrer le plafond que tu as configuré. Cette surface est pour toi et pour le personnel formé à ne pas la lire à voix haute.

## Pourquoi c’est important

C’est l’article que tu imprimes à côté de la caisse. Tous les autres tips plafond d’usage existent pour que cette phrase reste la seule phrase abonné.

Incident : un acheteur à Cité Sic a touché le plafond, a demandé « il reste combien de méga ? », un cousin qui avait l’air contributeur a lu 0,4 Go depuis une capture **Détails** sur le téléphone propriétaire, et l’acheteur a exigé ce reste comme temps en plus. SpaiHub ne montrera pas le reste de Go du plafond d’usage sur la page abonné. Le personnel ne doit pas créer une seconde source de vérité avec la bouche.

Mauvais diagnostic : « la bannière est un bug parce que le forfait dit Data illimitée. » Illimité, c’est le marketing d’un produit *temps*. Le plafond caché est ton frein anti-abus. Après la coupure, le message est achetez un autre forfait — pas « il te reste 12 % ».

Mauvais diagnostic : « montre-leur le débit montant pour qu’ils comprennent le plafond d’usage. » **Afficher le débit montant sur le portail** est désactivé par défaut et c’est un débit, pas un quota.

## Ce que tu vois

Portail abonné pendant une session au temps saine :

- Durée / **Temps restant** une fois connecté.
- **Data illimitée pendant cette période**
- Ligne famille seulement si **Appareils simultanés** > 1
- Pas de barre de Go restants

Après la coupure :

- Bannière **Plafond d’usage atteint. Achetez un autre forfait pour continuer.**
- Ils choisissent un forfait encore (**Payer … XAF** ou bon)

Les forfaits au volume sont différents : ils montrent **Volume : …** comme produit. N’appelle pas ça non plus « reste plafond d’usage », et n’invente pas un compte à rebours abonné que SpaiHub ne dessine pas.

## Quoi faire

1. Garde la case cachée cochée pour les forfaits au temps walk-in (défaut 2 Go sur les nouveaux).
2. Scripte le comptoir en français / pidgin comme tu veux, mais le nombre de Go restants n’est pas dans le script.
3. Après la bannière, vends l’heure suivante ou un forfait au volume. **Vérifier le paiement** s’ils ont déjà payé et que la bannière les a embrouillés — ne double-facture pas.
4. S’ils touchent le plafond en 10 minutes, tu as une maison NAT ou un tout petit plafond — tarife ou monte le plafond caché *dans le formulaire propriétaire*, toujours sans annoncer les Go restants.
5. Recolle le script 2 si login.html est trop vieux et n’a pas la raison de redirection plafond d’usage — toujours pas de compteur de Go.

## Quoi ne pas dire

- Jamais le reste de Go du plafond d’usage aux abonnés. Pas « environ 1 giga », pas « presque fini », pas un clin d’œil à **Détails**.
- Ne dis pas que la bannière veut dire que Campay a échoué.
- Ne dis pas que l’anti-tether a causé la coupure. Le plafond d’usage est un plafond d’octets sur le login.
- Ne promets pas une notification Paramètres quand ils touchent le plafond. Paramètres n’a pas de cloche.
