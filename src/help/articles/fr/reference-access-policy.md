---
id: own.ref.access-policy
slug: reference-access-policy
title: "Référence politique d’accès"
description: "Repli de site Appareils par code d’accès (0 = un appareil), Enregistrer la politique, et pourquoi Appareils simultanés du forfait gagne. Caveat NAT et Astuce."
role: ["owner"]
section: reference
intents: ["reference", "reference-access-policy", "simultaneous devices", "fallback"]
buttons: ["Enregistrer la politique"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.access-fallback", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 10
---

## À quoi sert cette page

**Politique d’accès** est un onglet sur un **site** développé, pas une page de barre latérale. Ouvrez **Sites**, développez la boutique, appuyez sur **Politique d’accès** (téléphone : **Politique**).

Cet écran tient **un** nombre : **Appareils par code d’accès (repli)**. C’est le filet de sécurité pour un vieux stock de bons (ou tout accès) dont le forfait n’a pas de limite d’appareils simultanés enregistrée. Au quotidien, vous réglez **Appareils simultanés** sur chaque forfait quand vous appuyez sur **Ajouter un forfait** / **Modifier**. La valeur du forfait **gagne**.

Si vous êtes venu ici en espérant « bloquer le partage de connexion » ou compter les téléphones derrière un routeur domestique, arrêtez. Ce champ compte les **MAC Wi‑Fi distinctes** que le hotspot voit. Un répéteur bon marché en mode routeur est encore une MAC.

## Vocabulaire

**Code d’accès** — la paire identifiant + **PIN** qu’un invité utilise sur le hotspot. L’identifiant MoMo est les chiffres du téléphone. Les forfaits famille partagent une paire jusqu’à la limite d’appareils.

**Appareils simultanés** — champ du forfait, 1–20. Combien de MAC distinctes peuvent utiliser cette paire à la fois. Mettez **1** pour un forfait téléphone unique bon marché. Mettez **4** (par exemple) sur un forfait **famille** plus cher. Le portail captif affiche alors **Déconnecter cet appareil** et **Terminer pour tous les appareils**.

**Repli** — ce nombre de site, utilisé seulement quand une limite de forfait manque. Il n’écrase pas un forfait qui a déjà **Appareils simultanés**.

**0 = un appareil** — sur ce champ de repli, zéro veut dire une seule MAC, pas « illimité ». Ne le laissez pas à 0 en pensant avoir coupé le partage d’une façon spéciale ; vous avez transformé le repli en un appareil.

**Caveat NAT** — les téléphones derrière le propre routeur d’un client ou un répéteur bon marché en **mode routeur** partagent une MAC WAN. **SpaiHub** ne peut pas voir les téléphones dans cette maison. Tarifez le forfait famille ; gardez les forfaits bon marché à 1 appareil ; découragez les répéteurs personnels en mode routeur. Les règles pare-feu TTL « anti-tether » restent **coupées** dans SpaiHub — elles cassaient les téléphones normaux.

**Astuce d’aide** — la petite icône cercle-question à côté du libellé du champ. Nom pour lecteur d’écran : **Ouvrir l’article d’aide pour ce réglage**. Elle pointe ici.

**Poll** — après enregistrement, les routeurs prennent la politique au prochain poll de commandes, pas instantanément dans Winbox.

## Tous les contrôles

### Titre et intro

**Politique d’accès**

**Les appareils simultanés se règlent sur chaque forfait. Ce réglage de site n’est qu’un repli pour les bons sans limite de forfait.**

Lisez l’intro avant de changer le nombre. Si chaque forfait en direct a déjà **Appareils simultanés** (le formulaire envoie toujours 1–20 aujourd’hui), ce repli se déclenche rarement. Il compte encore pour de plus vieux lots de bons créés avant qu’une limite existe.

### **Appareils par code d’accès (repli)**

Saisie numérique, minimum **0**.

À côté du libellé : icône d’aide → cet article.

Sous le champ (le marquage d’aide utilise le gras dans l’app) :

**0 = un appareil. Préférez Appareils simultanés sur chaque forfait (ex. 4 pour la famille). On compte les MAC Wi‑Fi distinctes — pas les téléphones derrière un routeur domestique en NAT.**

Quoi taper :

- **0** — le repli est une MAC.
- **1** — aussi une MAC (même résultat pratique que 0 pour ce repli).
- **2–20** — seulement comme repli pour des accès sans limite de forfait. Préférez **4** sur le forfait **famille** lui-même pour que le texte du portail corresponde.

Ne mettez pas 20 ici « pour être tranquille » sur une boutique qui vend des passes d’une heure à 100 XAF. Vous ne verrez pas vingt téléphones s’ils sont en NAT ; vous autoriserez vingt **MAC**, y compris vingt téléphones séparés qui ont rejoint le SSID hotspot directement.

### Encadré astuce

Phrase encadrée grise :

**Astuce : forfaits 1 appareil avec plafond d’usage caché, et découragez les répéteurs Wi‑Fi en mode routeur sur ce hotspot.**

C’est la politique produit en une ligne : vendez un forfait au temps 1 appareil bon marché avec un plafond d’usage **caché** (les propriétaires voient les Go sur **Forfaits** → **Détails** ; les invités voient une navigation illimitée, puis **Plafond d’usage atteint**). Ne promettez pas de compter les téléphones derrière NAT. Ne dites pas aux invités les Go restants.

### **Enregistrer la politique**

Bouton principal. Pendant la requête : **Enregistrement...**

Toast de succès : **Politique d’accès enregistrée — les routeurs l’appliqueront au prochain poll**

Toast d’échec : **Échec de l’enregistrement de la politique**

Il n’y a pas d’Annuler séparé sur cet onglet. Fermer la ligne du site sans enregistrer jette les modifications non sauvées. Développez à nouveau pour voir le dernier nombre enregistré.

Enregistrer cet onglet **ne réécrit pas** **Appareils simultanés** sur les forfaits. Modifiez le forfait pour changer famille vs produits un appareil.

## États vides et erreurs

Si vous n’avez jamais développé avec succès, vous ne verrez pas ce formulaire — toast **Impossible de charger le détail du site**.

Le champ a toujours un nombre (défaut **0** depuis le site). Il n’y a pas d’illustration « politique vide ».

Un enregistrement raté laisse la saisie telle que tapée ; le serveur a encore l’ancienne valeur jusqu’à un enregistrement réussi.

Les routeurs **Jamais vu** n’appliqueront rien jusqu’au heartbeat du script 2. L’enregistrement réussit quand même dans SpaiHub.

## Ce que cette page ne fait pas

- Elle ne crée pas un forfait famille. Utilisez **Ajouter un forfait** et réglez **Appareils simultanés**. Tutoriel : [Créer un forfait famille (2–4 appareils)](/fr/help/create-family-package).
- Elle n’expulse pas une MAC. Ça, c’est **Sessions** → **Expulser**.
- Elle n’active pas de règles pare-feu anti-tether. Celles-ci restent coupées.
- Elle ne montre les Go restants d’usage raisonnable à personne. Les plafonds sont **Détails** propriétaire seulement.
- Elle ne liste pas quels bons n’ont pas de limite de forfait. Traitez le repli comme une assurance héritée.
- Ce n’est pas une console admin ni un écran contributeur.

Le contributeur ne voit pas cet onglet. Il lit **Liaisons** en lecture seule. Vous ne réglez pas un plafond Mbps de liaison ici — **Plafond** côté contributeur est un autre produit.

Cette version n’a pas de cloche ni de préférences de notification. Enregistrer la politique n’envoie pas d’alerte. Les routeurs l’appliquent au prochain poll. Relisez le toast et, si besoin, **État des routeurs** sur **Tableau de bord**.

Un forfait **1** appareil avec plafond caché, plus cette astuce sur les répéteurs, est la vraie réponse boutique. Le champ de repli n’est pas un « bloqueur de partage ». Tarifez le partage ; ne promettez pas de l’interdire.

Si le personnel demande « combien de Go il reste à ce client », la réponse est : les invités ne voient jamais ce chiffre. Vous voyez le plafond sur **Forfaits** → **Détails**. Cet onglet ne parle pas de Go.

## Tâches liées

- Pourquoi ce nombre est un repli : [La politique de site est un repli](/fr/help/access-policy-fallback).
- Vendre le partage honnêtement : [Créer un forfait famille (2–4 appareils)](/fr/help/create-family-package).
- NAT dans la vraie boutique : [Répéteur bon marché en mode routeur](/fr/help/pixlink-nat).
- Où vit l’onglet : [Référence sites](/fr/help/reference-locations).
