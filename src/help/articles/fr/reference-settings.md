---
id: own.ref.settings
slug: reference-settings
title: "Référence paramètres"
description: "Paramètres propriétaire : compte, mot de passe, marque du portail captif (logo 512 Ko, débit masqué, Propulsé par verrouillé). Pas de cloche de notification dans cette version. Le basculeur de langue est en haut à droite, à côté d’Aide."
role: ["owner"]
section: reference
intents: ["reference", "reference-settings", "branding", "password"]
buttons: ["Enregistrer le nom", "Changer le mot de passe", "Téléverser une image", "Retirer", "Enregistrer la marque"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.branding", "own.tut.account"]
updatedAt: 2026-09-16
minutes: 11
---

## À quoi sert cette page

**Paramètres** est votre compte propriétaire plus ce que les invités voient sur le portail captif. Ouvrez **Paramètres** dans la barre latérale (sur téléphone vous pouvez passer par le menu latéral ; ce n’est pas dans la barre du bas à cinq icônes). Titre **Paramètres**. Sous-titre **Compte et marque du portail.**

Cette page a trois cartes aujourd’hui :

1. **Compte** — e-mail, statut, **Nom affiché**
2. **Changer le mot de passe**
3. **Marque du portail** plus un **Aperçu** en direct

**Cette version n’a pas de cloche ni de préférences de notification.** Il n’y a pas de cloche dans l’en-tête, pas d’onglet « alertes », et pas de liste d’opt-in e-mail/SMS sur Paramètres. Quand les notifications arriveront, cet article devra être mis à jour dans le **même changement** que l’UI — l’Aide reste la source de vérité de ce qui est à l’écran.

**Langue** n’est pas un champ Paramètres. Le basculeur **EN** / **FR** est en haut à droite, à côté de **Aide** (même contrôle **Changer de langue**). Il change les libellés. Il ne change pas à lui seul la langue du portail invité — le portail a son propre basculeur.

## Vocabulaire

**Nom affiché** (compte) — votre nom d’opérateur dans le chrome du tableau de bord (initiale d’avatar + barre latérale). Différent du **Nom affiché** sous la marque, qui est le nom sur la page **invité**.

**Statut du compte** — badge tel que **Actif** ou **En attente**. Vous ne pouvez pas le changer sur ce formulaire.

**Portail captif** — la page téléphone quand quelqu’un rejoint le hotspot (ou quand vous appuyez sur **Prévisualiser le portail**).

**Couleur d’accent** — couleur d’en-tête / boutons sur cette page invité.

**Afficher le débit montant sur les forfaits** — désactivé par défaut. Les invités voient alors durée et volumes, pas les Mo/s.

**Propulsé par www.spaitrace.com** — toujours affiché sur le portail captif dans cette version. La case est verrouillée.

**512 Ko** — limite de taille du fichier logo (téléversement PNG, JPEG ou WebP).

## Tous les contrôles

### Carte **Compte**

Titre **Compte**. Ligne **Vos informations**.

**Adresse e-mail** — lecture seule. C’est l’adresse que vous utilisez sur **Connexion**. Vous ne changez pas d’e-mail ici.

**Statut du compte** — badge en lecture seule.

### **Nom affiché** / **Nom complet** / **Enregistrer le nom**

**Nom complet** est le champ texte. **Enregistrer le nom** (occupé **Enregistrement...**).

Toasts : **Profil mis à jour**, **Impossible de mettre à jour le profil**, ou **Le nom est obligatoire**.

Ce nom n’est pas automatiquement la marque du portail. Réglez **Nom affiché** sous la marque pour « Mbingfibieh WiFi ».

### Carte **Changer le mot de passe**

Indication **Au moins 8 caractères**.

- **Mot de passe actuel**
- **Nouveau mot de passe**
- **Confirmer le nouveau mot de passe**
- **Mettre à jour** (occupé **Mise à jour...**) — c’est le bouton de la carte **Changer le mot de passe**

Toasts : **Mot de passe mis à jour**, **Le nouveau mot de passe doit contenir au moins 8 caractères**, **Les nouveaux mots de passe ne correspondent pas**, **Impossible de changer le mot de passe**.

Après succès les trois champs se vident. Il n’y a pas de « mot de passe oublié » sur cette page connectée ; ce flux est l’écran de connexion **Mot de passe oublié ?**

### **Marque du portail**

Titre **Marque du portail captif**. Sous-titre **Ce que voient les abonnés à la connexion. Laissez vide pour les valeurs SpaiHub.**

### **Nom affiché** (marque)

Placeholder **ex. Mbingfibieh WiFi**. C’est le grand nom sur l’en-tête du portail quand vous n’avez pas de logo (et encore utilisé avec un logo selon la mise en page).

### **Message d’accueil**

Placeholder **Payez avec MoMo pour vous connecter**. Max 160 caractères. Apparaît sous le nom du site sur la page invité. Défaut si vide : **Payez avec Mobile Money pour vous connecter**.

### **Couleur d’accent**

Sélecteur de couleur plus un champ texte hex. Échantillon par défaut **#0F766E**. Pilote l’en-tête du portail et les boutons principaux dans **Aperçu**.

### **Logo**

**Téléverser une image** (occupé **Téléversement...**) accepte PNG, JPEG ou WebP. Au-delà de 512 Ko : toast **Le logo doit faire 512 Ko ou moins**. Succès **Logo téléversé**. Échec **Impossible de téléverser le logo**.

**Retirer** (commun **Retirer**) efface le fichier téléversé. Toasts **Logo retiré** / **Impossible de retirer le logo**.

Optionnel **Ou collez l’URL du logo (https://...)** pour une image distante.

**Logo actuel** en aperçu si un est défini.

### **Afficher le débit montant sur les forfaits**

Case, **désactivée** par défaut. Indication : **Désactivé par défaut. Les abonnés ne voient que la durée et le volume, sauf si vous l’activez.** Le débit est un outil propriétaire sur **Forfaits** → **Détails**. Laissez ça coupé sauf si vous voulez vraiment les Mo/s sur la liste invité.

### **Afficher « Propulsé par www.spaitrace.com »**

La case est **cochée et verrouillée**. Indication : **Toujours affiché sur le portail captif. Contactez-nous pour une option white-label.** Appuyer dessus montre un toast : **Retirer le crédit plateforme demande un accord sur mesure. Contactez-nous sur www.spaitrace.com.** L’enregistrement envoie encore le crédit comme activé.

### **Enregistrer la marque**

Occupé **Enregistrement...**. Toast **Marque du portail enregistrée** ou **Impossible d’enregistrer la marque**. Le téléversement a déjà enregistré le logo ; appuyez quand même sur **Enregistrer la marque** après des changements de nom, d’accueil, d’accent, ou de case débit.

### **Aperçu**

Carte **Aperçu** à droite (ou en dessous sur téléphone) : en-tête d’échantillon, **Hotspot WiFi**, **Site exemple**, texte d’accueil, et un faux bouton **Payer avec MoMo**. **Propulsé par www.spaitrace.com** en dessous. Ce n’est pas **Prévisualiser le portail** (ça ouvre la vraie page invité depuis **Sites**).

## États vides et erreurs

La carte marque pulse pendant le chargement de `/api/owner/branding`.

Les enregistrements profil ou mot de passe ratés vous gardent sur le formulaire avec un toast. Un téléversement de logo raté laisse le logo précédent.

Il n’y a pas d’illustration d’état vide — un nouveau propriétaire voit encore l’e-mail et des champs de marque vides.

## Ce que cette page ne fait pas

- **Pas de cloche ni de préférences de notification** dans cette version. Ne cherchez pas une cloche sur Paramètres. Quand ça arrivera, mettez à jour cet article dans le même PR que l’UI.
- Pas de champ langue (chrome **EN** / **FR** seulement).
- Pas de téléphone de paiement MoMo ici — ça, c’est la modale de retrait **Portefeuille** (et **Paramètres** contributeur pour les contributeurs).
- Pas de contrôles site, forfait, ou bons.
- Ne dit pas aux invités les Go restants d’usage raisonnable. La marque ne peut pas ajouter un compteur de quota.
- Pas une console admin.

**Cette version n’a pas de cloche ni de préférences de notification.** Un retrait en file, un routeur **Hors ligne**, ou un bon **Utilisé** n’allument rien ici. Le **Portefeuille** a **Historique des retraits**. **Tableau de bord** a **État des routeurs**. **Bons** a le tableau de stock.

Le contributeur a une page **Paramètres** plus courte (**Nom affiché**, **Téléphone MoMo**, **Enregistrer**) sans marque, sans **Changer le mot de passe**. Vous êtes sur le formulaire propriétaire. Ne cherchez pas **Liaisons** ici.

La langue du chrome ne traduit pas toute seule le portail invité. L’invité bascule **EN** / **FR** sur le portail. Votre **Message d’accueil** est le texte que vous avez tapé — rédigez-le dans la langue de la boutique.

## Tâches liées

- Parcours marque : [Marquer le portail captif](/fr/help/brand-the-portal).
- Taille du logo : [Logo 512 Ko max](/fr/help/logo-512kb).
- Créer la connexion propriétaire que vous utilisez : [Créer votre compte propriétaire](/fr/help/create-owner-account).
- Voir la vraie page invité : **Sites** → **Prévisualiser le portail**.
