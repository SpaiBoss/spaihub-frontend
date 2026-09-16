---
id: con.ref.links
slug: reference-contributor-links
title: "Référence liaisons contributeur"
description: "Tableau Liaisons en lecture seule : Site, Interface, Plafond Mbps, Tarif XAF/Go, Dernier relevé, Statut Actif/En pause/En attente/Désactivé. Relevés en pause sans crédit."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-links", "cap", "rate"]
buttons: []
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.links", "con.tut.withdraw"]
updatedAt: 2026-09-16
minutes: 11
---

## À quoi sert cette page

**Liaisons** est un tableau **en lecture seule** des liaisons physiques que **SpaiHub** a configurées pour vous. Vous ne pouvez pas ajouter une ligne, changer le **Plafond**, modifier le **Tarif**, mettre la liaison en pause vous-même, ni ouvrir Winbox depuis ici.

Ouvrez **Liaisons** dans la navigation contributeur. Titre **Liaisons**. Sous-titre **Liaisons physiques configurées par SpaiHub**.

Si Accueil disait **Pas encore de liaison**, cette page est le même fait sous forme de tableau avec une seule cellule vide jusqu’à ce qu’un technicien pose une liaison vers un hotspot proche.

Ce n’est pas l’onglet **Sessions** propriétaire. Vous ne verrez pas de téléphones invités, **Sur le routeur**, ni **Expulser**. Vous ne verrez pas les Go restants d’usage raisonnable (les invités ne les voient pas non plus). Vous voyez le tuyau de réserve vers la boutique.

## Vocabulaire

**Site** — le hotspot propriétaire que votre capacité de réserve alimente. Un nom seulement. Vous n’ouvrez pas la page **Sites** de ce propriétaire.

**Interface** — le nom d’interface RouterOS en texte mono — l’ethernet, le VLAN, ou similaire que le technicien a choisi. Vous ne le renommez pas.

**Plafond** — **N Mbps**. Plafond que SpaiHub a posé pour cette liaison. Pas le **Débit montant (Mo/s)** d’un forfait invité.

**Tarif** — **N XAF/Go**. Ce que vous gagnez par gigaoctet **crédité**. **SpaiHub ne publie pas de tarif public typique.** Ignorez les rumeurs de « ce que les contributeurs ont d’habitude ». Votre contrat est cette cellule.

**Dernier relevé** — dernier échantillon : **N o · date/heure** (octets bruts et quand). Tiret cadratin si rien n’a encore été échantillonné. Accueil montre ensuite le volume crédité en Go.

**Statut** :

- **Actif** — les échantillons peuvent créditer **Solde contributeur**.
- **En pause** — SpaiHub **stocke encore les relevés sans crédit**. La liaison n’est pas supprimée ; **Portefeuille** ne monte pas pour ces Go tant que le statut n’est pas **Actif** à nouveau.
- **En attente** — pas encore en service.
- **Désactivé** — coupé.

Seuls les techniciens SpaiHub changent le statut. Il n’y a pas de bouton **Pause** sur votre tableau.

**Relevé** — un instantané de compteur d’octets sur cette interface. Ce n’est pas Campay, pas un bon, pas un PIN invité.

## Tous les contrôles

Il n’y a **aucun bouton d’action** sur cette page : pas d’**Ajouter**, **Modifier**, **Enregistrer**, **Synchroniser les inutilisés vers le routeur**, **Expulser**, **Retirer**. **Retirer** vit sur **Portefeuille**. **Enregistrer** vit sur **Paramètres**.

### Colonne **Site**

Nom du hotspot, ou un tiret cadratin s’il manque. Un contributeur peut avoir plus d’une ligne si SpaiHub a posé plus d’une liaison.

### Colonne **Interface**

`interfaceName` dans une petite police mono. Un technicien la reconnaîtrait dans `/interface print`. Vous n’exécutez pas cette commande. Si le nom a l’air d’un charabia, lisez d’abord cet article, puis utilisez Aide **Discuter sur WhatsApp** si vous êtes encore coincé — ne devinez pas RouterOS.

### Colonne **Plafond**

**N Mbps**. Si des invités se plaignent que le Wi‑Fi est lent, ce sont les forfaits du propriétaire et la radio boutique — pas un curseur ici.

### Colonne **Tarif**

**N XAF/Go**. **Aujourd’hui** / **Ce mois** XAF sur Accueil ne doivent bouger que pour les Go **crédités** sur des lignes **Actif**. Le calcul de tête est correct ; cette cellule est le prix.

### Colonne **Dernier relevé**

**{octets} o · {date locale}** ou **—**. Les grands comptes d’octets sont normaux. Ce n’est pas une barre de quota restant.

**En pause + horodatage frais** = le compteur marche, la paye non. C’est la pause conçue.

**Actif + tiret** = pas encore échantillonné (pose neuve, ou le relevé n’a pas rapporté).

**Actif + vieil horodatage** = les échantillons ont peut-être cessé. Vous ne pouvez toujours pas réparer RouterOS depuis cette page.

### Colonne **Statut**

Badge seulement : **Actif**, **En pause**, **En attente**, **Désactivé** (couleurs SpaiHub partagées).

### Chrome d’en-tête

Basculeur de langue, **Aide**, **Déconnexion**. **Pas de cloche de notification** quand le statut passe de **En attente** à **Actif**.

## États vides et erreurs

Vide : une ligne de tableau sur six colonnes, centrée **Pas encore de liaison**.

Erreur de chargement : **Impossible de charger les liaisons** avec **Chargement impossible** (ou texte API). Pas de bouton **Réessayer** sur cet état vide.

Chargement : squelette.

Pas de recherche, pas de filtres, pas de pagination sur ce tableau aujourd’hui. Si vous avez une liaison, vous voyez une ligne.

## Ce que cette page ne fait pas

- **Lecture seule.** Vous ne configurez jamais RouterOS, walled garden, script 1, script 2, ou CHR.
- Vous ne réglez pas **Appareils simultanés**, ne générez pas **SPAI-XXXX-XXXX**, et ne marquez pas le portail.
- Pas de tarif public typique et pas de note « XAF/Go suggéré » sur cet écran.
- Pas de Go restants d’usage raisonnable pour les invités hotspot.
- Pas de contrôle de retrait.
- Pas une console admin. Le statut n’est pas une liste déroulante en libre-service.

Les liaisons sont **en lecture seule**. Si un partenaire demande « change le plafond », la réponse est : pas depuis cet écran. Un technicien SpaiHub pose et règle. Vous lisez **Plafond**, **Tarif XAF/Go**, **Dernier relevé**.

Ne dites jamais à un passant « il te reste N Go » d’après **Dernier relevé**. Ces octets sont le compteur de liaison, pas un quota invité. Les invités ne voient jamais les Go restants d’usage raisonnable.

**Cette version n’a pas de cloche ni de préférences de notification.** Un passage **En attente** → **Actif** ne sonne pas. Rouvrez **Liaisons**.

## Exemples concrets

**Pose neuve.** Site « Couloir Akwa », interface `ether3`, **Plafond** 20 Mbps, **Tarif** 15 XAF/Go, **Dernier relevé** **—**, **En attente**. Ne faites rien. Ne collez pas de scripts. N’écrivez pas sur WhatsApp pour un « tarif typique ».

**En train de gagner.** Même ligne, **Actif**, dernier relevé `123456789 o ·` une heure de ce matin. **Aujourd’hui** sur **Accueil** devrait pouvoir bouger. **Portefeuille** peut encore être sous 100 XAF — c’est un plancher, pas une liaison cassée.

**En pause exprès.** Le dernier relevé continue d’augmenter, **Statut** **En pause**, **Solde** figé. Les échantillons sont stockés sans crédit. Vous ne pouvez pas relancer depuis ce tableau.

**Deux lignes.** Une **Actif**, une **Désactivé**. Seuls le tarif et les relevés actifs doivent faire grandir **Solde contributeur**. La ligne désactivée est de la documentation, pas un bouton supprimer.

**Relevé Actif périmé.** Horodatage de la semaine dernière alors que la boutique est pleine. Vous n’avez toujours pas de contrôle RouterOS. Lisez cet article, puis Aide si vous êtes coincé — ne devinez pas `/interface print` comme si vous étiez le technicien.

Comparez Accueil vs Liaisons : Accueil omet **Dernier relevé**. Si vous avez besoin de « le compteur a-t-il tic-tac ? », ce tableau est l’écran.

Le **Tarif** est en XAF par **Go**. Le **Plafond** est en **Mbps**. Ne les mélangez pas. La vitesse du tuyau n’est pas le prix d’un gigaoctet.

## Tâches liées

- Parcours en langage simple : [Lire une liaison contributeur](/fr/help/read-contributor-link).
- Encaisser les XAF crédités : [Retirer les gains contributeur en MoMo](/fr/help/contributor-withdraw).
- Cartes Go + XAF : [Référence accueil contributeur](/fr/help/reference-contributor-home).
