---
id: own.ref.sessions
slug: reference-sessions
title: "Référence sessions"
description: "Tableau des sessions en direct sur un site : téléphone, Bon vs Mobile Money, Sur le routeur vs Non vu, MAC, Expulser (environ 15 secondes)."
role: ["owner"]
section: reference
intents: ["reference", "reference-sessions", "kick", "on router"]
buttons: ["Expulser"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.kick-suspend", "tip.one-mac-nat"]
updatedAt: 2026-09-16
minutes: 10
---

## À quoi sert cette page

Il n’y a pas d’entrée **Sessions** séparée dans la barre latérale propriétaire. Les sessions en direct vivent sur **Sites**. Développez un site et ouvrez l’onglet **Sessions** (sur un téléphone l’onglet est **Live**).

Ce tableau est la caméra boutique du Wi‑Fi payé : qui a payé, avec quoi, sur quel routeur ils devraient être, si le Hex a vraiment le login, quand la navigation se termine, et un **Expulser** si vous devez les couper maintenant.

C’est un filtre **site** de `/api/owner/sessions` — vous ne voyez que la fenêtre payée active de ce site, pas l’historique des jours expirés.

Servez-vous de cette carte pour qu’un caissier ne devine pas ce que **Sur le routeur** veut dire, et pour que vous ne traitiez pas une MAC comme « un seul téléphone dans la maison ».

## Vocabulaire

**Session** — une fenêtre d’accès payée : début, fin, identifiant, PIN, forfait. Elle existe dans **SpaiHub** même avant que le Hex importe le login.

**Sur le routeur** — SpaiHub a vu cet identifiant dans les **hôtes actifs** MikroTik (le hotspot utilise vraiment l’accès). Une MAC peut être listée à côté.

**Non vu** — l’accès est dans SpaiHub, mais ce poll n’a pas vu le login sur le boîtier. Courant juste après paiement (attendre `spaihub-commands`, environ 15 secondes), si le script 2 manque, ou si l’invité n’a pas appuyé sur **Connecter au WiFi maintenant**.

**Expulser** — mettre une déconnexion en file sur le routeur. Le toast dit que l’appareil devrait tomber sous **15 secondes**. Le planificateur `spaihub-commands` doit exister.

**Source de paiement** — comment cette session a été achetée. SpaiHub affiche **Bon** ou **Mobile Money** sous le numéro de téléphone.

**MAC** — l’adresse client Wi‑Fi que le Hex rapporte. Une MAC peut être un **répéteur bon marché** (Pixlink, Tenda ou similaire) en **mode routeur / NAT**, ou un téléphone qui partage un hotspot. Beaucoup de personnes peuvent s’asseoir derrière cette seule MAC. SpaiHub ne ment pas ; le NAT cache le reste.

Colonne **Appareil** — libellée **Appareil**, mais la première ligne est le **téléphone de l’abonné** (chiffres d’identifiant MoMo, ou le téléphone lié à cette utilisation de bon). Ce n’est pas une marque d’appareil.

## Tous les contrôles

### Onglet **Sessions** / **Live**

Après avoir développé un site, appuyez sur **Sessions**. Pendant le chargement du développement vous voyez un bloc pulsé, pas un message vide.

### Texte vide

Quand personne n’est dans une fenêtre active :

- **Aucune session active sur ce site.**
- Indication : **Après avoir recollé le script de connexion, le statut « Sur le routeur » apparaît ici. Une seule MAC vue peut encore être une passerelle NAT.**

Vide peut vouloir dire un matin calme. Ça peut aussi vouloir dire que le script 2 n’a jamais tourné, donc les accès n’atterrissent jamais et vous ne voyez jamais **Sur le routeur**. Si des gens ont payé sur le portail et que ça reste vide, collez **2. Connecter à SpaiHub** depuis **Script de setup**. Tutoriel : [Expulser une session ou suspendre un site](/fr/help/kick-and-suspend).

### Indication NAT (quand des lignes existent)

Au-dessus du tableau :

**« Sur le routeur » signifie que le login est dans les hôtes actifs MikroTik. Une seule MAC peut rester un répéteur bon marché, un hotspot téléphone ou un routeur personnel qui partage avec plusieurs appareils.**

Lisez ça avant d’accuser une famille de « voler » parce que vous voyez une ligne. Voir [Une MAC peut être une passerelle NAT](/fr/help/one-mac-can-be-nat).

### Colonne **Appareil**

- Ligne en gras : chiffres de téléphone camerounais (l’**Identifiant** Wi‑Fi pour MoMo est ce numéro).
- Deuxième ligne : **Bon** ou **Mobile Money**.

Servez-vous-en quand un invité dit « j’ai payé ». Faites correspondre le numéro utilisé sur Campay. Les sessions bon montrent encore un téléphone si SpaiHub en a stocké un à l’utilisation ; la ligne source vous dit que c’était du stock papier, pas un crédit portefeuille MoMo.

### Colonne **Forfait**

Le **nom** du forfait acheté (par exemple « 1 heure »). Elle ne répète pas ici le **plafond d’usage** des **Détails** propriétaire. Les plafonds restent sur **Forfaits** → **Détails**.

### Colonne **Routeur**

**Nom** du routeur sur ce site, ou un tiret cadratin si aucun n’est attaché à la session. Si vous avez deux Hex dans un bâtiment, c’est ainsi que vous voyez quel boîtier doit tenir le login.

### Colonne **Statut** — **Sur le routeur** vs **Non vu**

**Sur le routeur** (vert) : le login est dans les hôtes actifs. Si l’API a envoyé une MAC, elle apparaît après un point : **Sur le routeur · AA:BB:…**

**Non vu** (gris) : pas dans le dernier instantané d’hôtes actifs.

Parcours honnête :

1. L’invité paie ou utilise un bon.
2. Le portail peut afficher **Préparation du routeur… Ns** puis **Connecter au WiFi maintenant**.
3. En environ 15 secondes d’un poll `spaihub-commands` sain, cette ligne devrait passer à **Sur le routeur**.
4. Si ça reste **Non vu** après une minute, vérifiez le routeur **En ligne** sur **Tableau de bord** / **Routeurs**, puis recollez le script 2.

Ne prenez pas un second paiement MoMo avant d’avoir vérifié **Vérifier le paiement** sur le portail et cette colonne.

### Colonne **Fin**

Horodatage local de **fin de session**. Quand il est passé, la ligne quitte ce tableau en direct. Les forfaits au temps finissent à l’horloge ; les forfaits au volume finissent aussi si le volume (ou un plafond d’usage d’un forfait au temps) est épuisé sur le routeur — les invités voient alors **Plafond d’usage atteint**, jamais un compteur de Go restants.

### **Expulser**

Contrôle rouge avec l’icône utilisateur coupé. Appuyez une fois.

Toast de succès : **Session terminée — déconnexion sous 15 secondes.**

Toast d’échec : **Impossible de terminer la session.**

**Expulser** ne rembourse pas le MoMo et ne révoque pas un code de bon. Ça termine cette fenêtre d’accès et demande au Hex de lâcher l’hôte. Si le script 2 est absent, le toast peut encore réussir dans SpaiHub alors que le téléphone reste en ligne jusqu’à expiration — collez le script de connexion.

Pour arrêter toute la boutique de vendre, utilisez **Suspendre** sur la ligne du site, pas **Expulser** sur chaque ligne. Voir [Expulser une session ou suspendre un site](/fr/help/kick-and-suspend).

## États vides et erreurs

Si le développement échoue : **Impossible de charger le détail du site** — l’onglet Sessions n’a rien d’utile jusqu’à ce que vous réessayiez de développer.

Les échecs **Expulser** restent sur la ligne ; rechargez en repliant et redéveloppant le site.

Il n’y a pas de pagination, de recherche, ni de filtre de dates sur cet onglet. Les sessions expirées ne sont pas listées ici. L’argent historique est **Transactions** et **Tableau de bord**.

Il n’y a pas de bouton « actualiser ». Redévelopper le site recharge les sessions.

## Ce que cette page ne fait pas

- Elle ne montre pas les Go restants d’usage raisonnable. Les propriétaires voient les plafonds sur **Forfaits** → **Détails**. Les invités ne voient jamais les Go restants.
- Elle ne liste pas le stock de bons ni **Révoquer**. Ça, c’est **Bons**.
- Elle ne change pas **Appareils simultanés**. Ça, c’est le formulaire de forfait ou le repli **Politique d’accès**.
- Elle ne prouve pas combien de téléphones sont derrière un répéteur bon marché. **Sur le routeur** + une MAC peut encore être toute une maison. [Répéteur bon marché en mode routeur](/fr/help/pixlink-nat).
- Ce n’est pas une capture de paquets réseau. Pas de graphique de débit, pas de journal DNS.
- Pas de console admin.

Cette version n’a pas de cloche ni de préférences de notification. Une session qui passe à **Non vu** n’allume pas d’alerte dans **Paramètres**. Relisez cet onglet et **État des routeurs** sur **Tableau de bord**.

Un matin vide n’est pas forcément une panne. Un couloir plein avec une seule ligne **Sur le routeur** n’est pas forcément de la triche : lisez l’indication NAT avant d’accuser. Si des gens ont payé et que le tableau reste vide, le script 2 manque plus souvent qu’un « zéro honnête ».

**Expulser** n’est pas **Suspendre**. Expulser coupe un login. Suspendre arrête les nouvelles ventes du site. Les sessions payées peuvent continuer jusqu’à **Fin** ou jusqu’à ce que vous les expulsiez.

## Tâches liées

- Quand expulser vs suspendre la boutique : [Expulser une session ou suspendre un site](/fr/help/kick-and-suspend).
- Pourquoi une MAC n’est pas une personne : [Une MAC peut être une passerelle NAT](/fr/help/one-mac-can-be-nat).
- Payé en MoMo, encore captif : [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi).
- Carte complète du site y compris cet onglet : [Référence sites](/fr/help/reference-locations).
