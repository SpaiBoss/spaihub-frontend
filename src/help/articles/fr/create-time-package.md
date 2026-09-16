---
id: own.tut.time-package
slug: create-time-package
title: "Créer un forfait 1 heure avec plafond caché"
description: "Vends du temps de navigation en XAF avec un plafond gigaoctets côté propriétaire. Les invités voient data illimitée, jamais les Go restants."
role: ["owner"]
section: tutorials
intents: ["package", "fair use", "time", "time-based", "1 hour", "hidden cap"]
buttons: ["Ajouter un forfait", "Plafond d’usage (caché aux abonnés)"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-hidden", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 10
---

Un forfait **Au temps** vend une **Durée de navigation** — une heure au corridor, trois heures au night shop — pas un tas visible de gigaoctets. Optionnellement tu actives **Plafond d’usage (caché aux abonnés)** pour qu’un login ne vide pas toute la liaison montante pendant que l’horloge montre encore du temps.

**Plafond d’usage** ici, c’est un plafond côté propriétaire sur le MikroTik. Les acheteurs voient encore **Data illimitée** / **Data illimitée pendant cette période**. Tu ne dois pas citer les Go restants aux invités. Quand le plafond tape, la session coupe et la page de login peut dire **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** Détails : [Plafond d’usage caché](/fr/help/hidden-fair-use).

## Ce que tu auras

Un forfait actif sur le site, tarifé en XAF, type **Au temps**. Dans la colonne **Détails** toi (le propriétaire) tu vois le plafond d’usage. Sur **Prévisualiser le portail**, les invités voient la durée et data illimitée — pas le numéro du plafond.

Les nouveaux forfaits ont le plafond d’usage **activé** par défaut à **2 Go**. C’est le point de départ SpaiHub pour qu’un plan passage 1 heure ne devienne pas un dump de films. Tu peux décocher si tu veux vraiment des octets illimités pendant l’heure (risqué sur une petite liaison Orange/MTN).

## Avant de commencer

- Un site. [Ajouter un site](/fr/help/add-location) si la liste est **Aucun site pour l’instant**.
- Un prix que tu peux dire à voix haute : « 1 heure, 200 XAF » ou ce que la cité d’à côté facture. Le prix c’est **Prix (XAF)**.
- Connais ta liaison à peu près. **Débit montant (Mo/s)** défaut **1** et max **100**. Laisse 1 sauf si tu as mesuré.
- Décide les appareils : passage pas cher = **Appareils simultanés** **1**. Partage maison = [forfait famille](/fr/help/create-family-package).

Tu n’as pas besoin du Hex en ligne pour créer le forfait. Les invités ne peuvent pas acheter tant qu’un routeur n’est pas **En ligne**, mais le catalogue peut exister.

## Étapes

1. **Sites** → déplie le site → **Forfaits** → **Ajouter un forfait**.
2. **Nom du forfait** — quelque chose que le portail peut montrer, ex. `1 Heure` ou `Soirée 3h`.
3. **Type de forfait** → **Au temps** (l’abonné a internet pendant une durée de navigation ; plafond data optionnel).
4. **Durée de navigation** — pour ce tutoriel mets **1** **heures**. Tu pourras utiliser minutes ou jours plus tard.
5. **Prix (XAF)** — francs CFA entiers, pas besoin de virgules.
6. **Débit montant (Mo/s)** — laisse **1** sauf si tu connais la liaison. C’est un débit (à quelle vitesse), pas un quota (combien). Mélanger les deux, c’est la confusion RouterOS habituelle.
7. **Appareils simultanés** — **1** pour un plan passage pas cher (plage **1–20**, défaut **1**).
8. Laisse **Plafond d’usage (caché aux abonnés)** coché. Défaut **2 Go** est correct pour un premier SKU 1 heure. L’indice dit que les acheteurs voient une navigation illimitée ; MikroTik coupe quand même quand le plafond est atteint. Le plafond est partagé avec quiconque utilise le même login, y compris partage de connexion / NAT. SpaiHub n’utilise pas de règles pare-feu anti-tether.
9. Appuie sur **Créer le forfait**.

Pour vendre une vraie heure à octets illimités, décoche le plafond d’usage. Fais-le seulement si ton WAN peut encaisser.

![Screenshot](about:blank)
_Emplacement capture : Ajouter un forfait Au temps avec plafond d’usage 2 Go (staging)._

## Ce que tu dois voir

- Toast **Forfait créé**.
- Ligne : nom, **Au temps**, détails avec durée et un plafond d’usage en langage propriétaire, prix en XAF.
- **Prévisualiser le portail** : ligne de forfait du genre **1 heure de navigation · Data illimitée**. Page invité **Data illimitée pendant cette période**. Pas de compteur de Go restants pour eux.
- Après qu’une vraie session tape le plafond : MikroTik coupe l’utilisateur ; le portail/login peut montrer **Plafond d’usage atteint**.

**Désactiver** cache le forfait des nouvelles ventes sans inventer une suppression d’historique.

## Si ça échoue

**La durée de navigation doit être supérieure à 0.** Mets un nombre dans **Durée de navigation**. Zéro heure n’est pas un produit.

**Le prix doit être supérieur à 0.** Le WiFi gratuit n’est pas un SKU SpaiHub sur ce formulaire.

**Le débit montant ne peut pas dépasser 100 Mo/s.** Le plafond est 100. Défaut 1 est déjà largement assez pour WhatsApp téléphone.

**Les invités demandent « il reste combien de Go ? »** Ne réponds pas avec le numéro caché. Vends du temps. S’ils tapent le plafond d’usage, ils achètent un autre forfait. Le personnel qui parle des Go restants au comptoir entraîne les gens à discuter.

**Un login se partage sur quatre téléphones.** Ça, c’est **Appareils simultanés** et NAT, pas un plafond cassé. Tarife un [forfait famille](/fr/help/create-family-package) ou garde les plans pas chers à 1 appareil. Un répéteur bon marché en mode routeur ressemble encore à une seule MAC.

**Tu veux un produit Go visible à la place.** C’est [Créer un forfait au volume](/fr/help/create-data-package) — **Volume de téléchargement** est montré exprès.

Prochaine vérif sans matériel : [Prévisualiser le portail captif](/fr/help/preview-captive-portal). Prochaine vérif live : [test MoMo](/fr/help/test-momo-online) une fois le routeur **En ligne**.

Un SKU corridor 1 heure à 200–500 XAF avec plafond d’usage à 2 Go, c’est le premier produit habituel dans les boutiques de Douala et Yaoundé. Monte le plafond caché seulement si ton WAN est gras et que tu ne veux toujours pas dire un numéro restant aux invités. Décoche le plafond d’usage seulement si tu acceptes qu’un login mange la liaison pendant toute la **Durée de navigation**. **Désactiver** le SKU si tu dois le sortir du portail sans discours au comptoir.
