---
id: own.tut.family-package
slug: create-family-package
title: "Créer un forfait famille (2–4 appareils)"
description: "Facture plus cher les plans qui partagent honnêtement un identifiant et un PIN sur quelques MAC WiFi — pas une promesse de voir les téléphones derrière un routeur domestique."
role: ["owner"]
section: tutorials
intents: ["family", "shared devices", "simultaneous devices", "house plan"]
buttons: ["Appareils simultanés", "Ajouter un forfait"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.price-dont-ban", "own.ref.access-policy"]
updatedAt: 2026-09-16
minutes: 10
---

Les familles et les petites boutiques partageront un code. SpaiHub ne listera pas magiquement chaque téléphone derrière un répéteur bon marché. Une **MAC**, c’est l’identité WiFi que le Hex voit. Si un répéteur pas cher est en **mode routeur**, toute la maison est **une MAC**. C’est la physique. Ton job, c’est de **tarifer** le partage, pas de prétendre l’interdire. Voir [Tarifez le partage, ne promettez pas de l’interdire](/fr/help/price-dont-ban-sharing) et [Référence politique d’accès](/fr/help/reference-access-policy).

Un **forfait famille**, c’est juste un forfait au temps ou au volume normal avec **Appareils simultanés** à **2–4** (plage autorisée **1–20**) et un **Prix (XAF)** plus élevé. Le portail montre alors **Forfait famille — jusqu’à N appareils peuvent partager ce code.**, plus **Déconnecter cet appareil** et **Terminer pour tous les appareils**.

## Ce que tu auras

Un SKU plus cher sur **Forfaits** qui autorise quelques MAC WiFi distinctes sur le même identifiant et le même PIN. Les plans passage pas chers restent à **1**. Tu n’auras pas de caméra dans le salon de quelqu’un.

## Avant de commencer

- Un site avec au moins l’habitude des [forfaits au temps](/fr/help/create-time-package). Famille marche sur **Au temps** ou **Au volume**.
- Un écart de prix. Si le passage 1 heure est 200 XAF, la famille 1 heure ne doit pas être 200 XAF. La cité d’à côté a déjà appris cette leçon.
- Comprends : l’identifiant MoMo c’est le téléphone à 9 chiffres ; le PIN c’est 6 chiffres. Le PIN est le secret. Les gens le chuchoteront quand même. Tarife pour ça.
- Ne promets pas « on voit les téléphones derrière un routeur domestique ». Tu ne peux pas. Lis [Répéteur bon marché en mode routeur](/fr/help/pixlink-nat) quand tu as cinq minutes.

**Politique d’accès** sur le site n’est qu’un **repli** pour certains bons quand une limite de forfait manque. Préfère régler **Appareils simultanés** sur le forfait lui-même. **Enregistrer la politique** n’est pas le SKU famille.

## Étapes

1. **Sites** → **Forfaits** → **Ajouter un forfait**.
2. Nomme-le clairement : `Famille 1h` ou `Maison soir`. Les invités doivent comprendre qu’ils achètent du partage, pas un illimité secret.
3. Choisis **Au temps** (typique) ou **Au volume** si tu vends un **Volume de téléchargement** visible.
4. Règle **Durée de navigation** ou **À consommer dans** comme tu le ferais pour un plan un appareil.
5. Monte **Prix (XAF)** au-dessus du jumeau 1 appareil.
6. **Débit montant (Mo/s)** — toujours défaut **1** sauf si tu sais mieux. Quatre téléphones sur 1 Mo/s montant, c’est déjà un choix de politique.
7. Mets **Appareils simultanés** à **2**, **3**, ou **4**. Défaut **1**. Max **20** existe pour les salles bizarres ; 2–4 c’est le plan maison honnête.
8. Pour les plans au temps, garde **Plafond d’usage (caché aux abonnés)** activé (nouveaux forfaits défaut **2 Go**) pour qu’un login partagé ne mange pas le mois. Les invités voient encore data illimitée — ne cite pas les Go restants au comptoir.
9. **Créer le forfait**.

Sur le portail invité après paiement, ils partagent un identifiant/PIN jusqu’à ce nombre de MAC. Les appareils en trop attendent, ou quelqu’un appuie sur **Déconnecter cet appareil** / **Terminer pour tous les appareils**.

![Screenshot](about:blank)
_Emplacement capture : Appareils simultanés à 4 sur Ajouter un forfait (staging)._

## Ce que tu dois voir

- La colonne propriétaire **Détails** inclut le nombre d’appareils.
- **Prévisualiser le portail** peut montrer **Jusqu’à 4 appareils** (ou ton nombre).
- Après un login live : **Sessions** peut lister plus d’un téléphone **Sur le routeur** pour le même accès, jusqu’au plafond.
- **Expulser** marche encore par ligne de session — environ 15 secondes si **spaihub-commands** tourne.

## Si ça échoue

**Les appareils simultanés doivent être entre 1 et 20.** Tu as tapé 0 ou 21. Utilise 1–20.

**Toute la concession en ligne avec un bon.** Répéteur en **mode routeur** = une MAC WAN. SpaiHub compte ça comme un appareil même si douze personnes regardent Netflix. N’accuse pas le bon d’être « cassé ». Vends le SKU famille, garde les plans pas chers à 1, et préfère les points d’accès en mode **pont**. L’anti-tether TTL reste **coupé** dans SpaiHub — ça cassait les téléphones normaux.

**J’ai mis Politique d’accès à 4 mais le forfait pas cher est encore à 1.** **Appareils simultanés** du forfait gagne. Le repli du site est pour les limites de forfait manquantes sur certains bons seulement.

**Le personnel veut « interdire le partage ».** Tu peux expulser et tu peux tarifer. Tu ne peux pas voir le NAT. Forme le personnel avec [tarife, n’interdis pas](/fr/help/price-dont-ban-sharing).

**Plafond d’usage tapé avec quatre téléphones.** Attendu : le plafond caché est partagé sur le login. Ils achètent un autre forfait. Ne leur lis pas les Go restants.

Contrôles liés : [Référence politique d’accès](/fr/help/reference-access-policy). Pour un produit Go visible, voir [forfaits au volume](/fr/help/create-data-package).

Une boutique Douala qui ne vend que des heures 200 XAF / 1 appareil puis crie sur les familles fait le calcul à l’envers. Mets le SKU famille sur le portail avec un prix que tu peux défendre. Garde le SKU pas cher à **Appareils simultanés** **1**. Quand un répéteur bon marché débarque, tu as déjà une phrase : une MAC, un login, achetez **Famille**. Tu ne promets toujours pas une liste de téléphones derrière le NAT, et tu ne lis toujours pas les Go de plafond d’usage restants aux invités sur les plans au temps.
