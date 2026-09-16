---
id: own.tut.data-package
slug: create-data-package
title: "Créer un forfait au volume"
description: "Vends un volume de téléchargement visible à consommer avant expiration. Le débit c’est Mo/s ; le volume c’est Mo ou Go."
role: ["owner"]
section: tutorials
intents: ["data package", "download", "data-based", "quota", "allowance"]
buttons: ["Au volume", "Volume de téléchargement"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.speed-vs-quota", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 10
---

Un forfait **Au volume** vend un **Volume de téléchargement** — 1 Go pour la semaine, 500 Mo pour le parc de bus — qui **À consommer dans** un nombre d’heures ou de jours. Les acheteurs **voient** le volume sur le portail. C’est l’opposé du plafond d’usage caché d’un plan au temps.

Ne confonds pas avec **Débit montant (Mo/s)**. Le débit, c’est à quelle vitesse le tuyau se sent. Le volume, c’est combien ils peuvent tirer avant que MikroTik les arrête. Mélanger débit et quota, c’est la confusion RouterOS la plus courante dans les boutiques camerounaises. Lis [Le débit n’est pas un quota](/fr/help/speed-vs-data-cap).

Si tu voulais « une heure, ne montre pas les Go », reviens à [Créer un forfait 1 heure avec plafond caché](/fr/help/create-time-package).

## Ce que tu auras

Une ligne **Au volume** active. Le texte portail ressemble à **1 Go de téléchargement · expire dans 1 jour** (les nombres dépendent de toi). Les invités voient **Volume : …**. Ils n’ont **pas** de compteur restant caché côté personnel — le produit c’est le volume plus l’horloge d’expiration.

## Avant de commencer

- Un site sur **Sites**.
- Un prix en XAF qui colle aux cybercafés du coin. Les SKU data sont souvent au-dessus d’un plan 1 heure pas cher.
- Décide l’expiration : **À consommer dans** 1 jour c’est un pack trajet serré ; 7 jours c’est un hebdo. Les data non utilisées meurent quand l’horloge finit — dis-le au comptoir.
- **Appareils simultanés** défaut **1**. Monte seulement si tu vends un pack data famille exprès.
- Pas de Hex requis pour créer le SKU. L’utilisation live a encore besoin de **En ligne**.

## Étapes

1. **Sites** → **Forfaits** → **Ajouter un forfait**.
2. **Nom du forfait** — ex. `1 Go / 24h` pour que le portail soit honnête.
3. **Type de forfait** → **Au volume**. Description sur le formulaire : l’abonné a un volume à consommer avant expiration.
4. **Volume de téléchargement** — mets la valeur et **Mo** ou **Go**. Exemple : **1** **Go**. C’est visible aux acheteurs.
5. **À consommer dans** — valeur plus **minutes**, **heures**, ou **jours**. Exemple : **1** **jours**. Ça devient la borne de temps de la session sur le routeur.
6. **Prix (XAF)**.
7. **Débit montant (Mo/s)** — défaut **1**, max **100**. Laisse 1 sauf si tu as mesuré le WAN.
8. **Appareils simultanés** — **1** sauf si c’est un pack data maison (alors 2–4 et un prix plus élevé).
9. **Créer le forfait**.

Il n’y a pas de case « plafond d’usage » séparée sur Au volume : le volume **est** le plafond, et il est montré. C’est pour ça que le personnel peut dire « 1 Go, un jour » à voix haute. Ils ne doivent toujours pas inventer un théâtre de Go restants pour les plans **au temps** vendus sur le même portail — ceux-là restent **Data illimitée**.

Tarife en XAF comme un humain. Si la cité d’à côté vend 500 XAF pour un gigaoctet visible, ne casse pas les prix au point qu’un groupe WhatsApp vide ta liaison Orange à 14 h. **Débit montant (Mo/s)** défaut **1** c’est un frein ; le monter à 20 sans monter le volume, ça fait juste disparaître le pack plus vite. C’est la leçon [débit vs quota](/fr/help/speed-vs-data-cap) en langage boutique.

![Screenshot](about:blank)
_Emplacement capture : forfait Au volume avec Volume de téléchargement et À consommer dans (staging)._

## Ce que tu dois voir

- **Détails** propriétaire : volume plus expiration, pas « data illimitée ».
- **Prévisualiser le portail** : **{{cap}} de téléchargement · expire dans {{duration}}**. Après paiement, **Volume : {{cap}}**.
- Quand les octets sont partis, la session finit même s’il restait du temps sur l’horloge. Quand l’horloge finit, les octets restants sont partis.
- **Désactiver** arrête les nouvelles ventes de ce SKU.

Les forfaits au temps à côté peuvent encore dire **Data illimitée**. C’est un autre produit. Ne mélange pas les explications au comptoir.

## Si ça échoue

**Le volume de téléchargement doit être supérieur à 0** / **Le délai d’expiration doit être supérieur à 0.** Les deux champs ont besoin d’un nombre positif.

**Les invités croient avoir acheté du temps illimité.** Tu as vendu un quota. Le portail imprime déjà le volume. Le personnel doit répéter l’expiration, pas inventer un théâtre de Go restants.

**Débit montant 20 et ils « finissent le Go trop vite ».** Le débit n’est pas la taille. 20 Mo/s vide 1 Go plus vite. Si tu veux que le pack tienne l’après-midi, baisse le débit ou monte le volume — deux boutons différents. Voir [débit vs quota](/fr/help/speed-vs-data-cap).

**Le même login sur beaucoup de téléphones mange le Go.** Attendu. Le volume est partagé sur les identifiants. Utilise **Appareils simultanés** **1** pour le data passage, ou tarife un SKU data famille.

**Tu veux des Go cachés sur un plan au temps à la place.** C’est **Plafond d’usage (caché aux abonnés)** sur **Au temps**, activé par défaut à 2 Go pour les nouveaux forfaits. Ne lis jamais les Go de plafond d’usage restants aux invités.

**Le forfait est encore listé après Désactiver.** Il doit cesser d’apparaître pour les nouveaux achats portail. Les anciennes sessions continuent jusqu’à expiration ou jusqu’à **Expulser**.

**L’expiration a semblé « injuste ».** **À consommer dans** c’est l’horloge que tu as imprimée. Un pack 1 Go qui **À consommer dans** 3 heures c’est un SKU trajet ; 7 **jours** c’est un hebdo. Dis l’horloge au comptoir. SpaiHub n’étendra pas les octets restants parce que quelqu’un est allé au village.

**La preview montre encore Data illimitée.** Tu regardes un SKU voisin **Au temps**. Filtre avec tes yeux : les lignes data incluent **téléchargement** et **expire**. Ajoute les deux produits si tu veux ; ne les explique juste pas comme la même chose.
