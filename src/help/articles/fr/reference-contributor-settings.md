---
id: con.ref.settings
slug: reference-contributor-settings
title: "Référence paramètres contributeur"
description: "Nom affiché, Téléphone MoMo, Enregistrer. L’e-mail est en lecture seule. Pas de changement de mot de passe sur cette page (utilisez Mot de passe oublié ?). Pas de cloche de notification."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-settings"]
buttons: ["Enregistrer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.account", "con.tut.withdraw"]
updatedAt: 2026-09-16
minutes: 10
---

## À quoi sert cette page

**Paramètres** pour un contributeur est un profil court : qui vous êtes et quel numéro camerounais doit recevoir le MoMo. Ouvrez **Paramètres** dans la navigation contributeur. Titre **Paramètres**. Sous-titre **Profil et numéro de paiement**.

Cette page **ne change pas** votre mot de passe. Utilisez **Mot de passe oublié ?** sur **Connexion contributeur** (**Réinitialiser le mot de passe contributeur** → **Envoyer le lien** → **Nouveau mot de passe**). Une fois connecté il n’y a pas de formulaire **Mot de passe actuel** ici.

**Cette version n’a pas de cloche ni de préférences de notification.** Quand les notifications arriveront, cet article devra être mis à jour dans le même changement que l’UI. Ne cherchez pas une cloche à côté d’**Aide**.

La langue est **EN** / **FR** dans l’en-tête marine (**Changer de langue**), pas une liste déroulante sur ce formulaire.

Vous n’êtes pas sur les **Paramètres** propriétaire. Il n’y a pas de **Marque du portail**, pas de logo 512 Ko, pas d’**Afficher le débit montant sur les forfaits**, pas de case verrouillée **Propulsé par www.spaitrace.com**.

## Vocabulaire

**E-mail** — l’adresse que vous avez utilisée sur **Créer un compte contributeur**. C’est l’identifiant de **Connexion**. Lecture seule ici.

**Nom affiché** — **Bienvenue, {nom}** sur Accueil et le nom d’en-tête. Obligatoire.

**Téléphone MoMo** — chiffres nationaux pour les paiements, placeholder **6XXXXXXXX**, réduit à 9 chiffres en tapant. **Portefeuille** préremplit la modale de retrait depuis cette valeur.

**Enregistrer** — PATCH nom + téléphone MoMo. Toast **Enregistré**.

## Tous les contrôles

### **E-mail**

Texte **E-mail : vous@domaine**. Pas une saisie. Vous ne pouvez pas faire tourner la connexion depuis cette page. Une mauvaise boîte est une conversation support après avoir lu [Créer un compte contributeur](/fr/help/create-contributor-account) — il n’y a pas de bouton changer-e-mail aujourd’hui.

### **Nom affiché**

Texte obligatoire. Ce n’est pas un SSID hotspot et pas le **Nom de marque sur le portail** propriétaire.

### **Téléphone MoMo**

Optionnel dans le formulaire (pas marqué obligatoire). Vide est autorisé jusqu’au retrait. Un numéro périmé est dangereux : la modale portefeuille enverra volontiers vers ce que vous tapez. Mettez à jour ici pour que le prochain **Retirer** s’ouvre correctement.

### **Enregistrer**

Occupé **Enregistrement...** (commun **Enregistrement...**). Toast de succès **Enregistré**. Échec **Enregistrement impossible** ou erreur API.

Pas d’**Annuler**. Quitter la page jette les modifications non sauvées.

### Mot de passe — pas sur cette page

Il n’y a pas de carte **Changer le mot de passe**. Parcours :

1. **Déconnexion**
2. **Connexion contributeur** → **Mot de passe oublié ?**
3. **Adresse e-mail** → **Envoyer le lien**
4. Mail → **Nouveau mot de passe** → **Réinitialiser**

### Chrome

**Basculeur de langue**, **Aide**, **Déconnexion**. **Pas de cloche.** **Pas de préférences de notification.**

## États vides et erreurs

Profil non chargé : squelette. Après une connexion normale les champs se remplissent.

**Téléphone MoMo** vide : **Enregistrer** marche encore ; **Portefeuille** demandera **Numéro de téléphone**.

Enregistrement raté : les champs restent tels que tapés jusqu’à ce que vous rechargez (recharger restaure les valeurs serveur).

Nom vide : arrêt navigateur de champ obligatoire.

## Ce que cette page ne fait pas

- **Pas de changement de mot de passe** ici.
- **Pas de cloche ni de préférences de notification** dans cette version.
- Pas de logo, d’accent, de texte d’accueil, ni de verrou white-label.
- Pas d’éditeurs **Plafond** / **Tarif**.
- Pas de Go restants d’usage raisonnable.
- Pas une console admin et pas les Paramètres propriétaire.

Les **Liaisons** restent en lecture seule. Vous ne posez pas un Mbps ici. **Enregistrer** n’écrit que le nom et le téléphone MoMo.

**Cette version n’a pas de cloche ni de préférences de notification.** Un retrait en file ne prévient pas ici. Ouvrez l’**Historique des retraits** du **Portefeuille**.

## Exemples concrets

**Après la première connexion.** L’e-mail montre l’adresse d’inscription. **Nom affiché** est ce que vous avez tapé comme **Nom complet**. **Téléphone MoMo** est vide. Appuyez sur **Enregistrer** après avoir ajouté `6XXXXXXXX` pour que **Portefeuille** → **Retirer** s’ouvre avec ce numéro.

**Renommer.** Changez **Nom affiché** vers le nom que la famille utilise sur les SMS MoMo, **Enregistrer**, toast **Enregistré**. **Bienvenue** sur **Accueil** se met à jour après le rafraîchissement du profil.

**Langue.** Vous travaillez en français dans la boutique. Utilisez l’en-tête **FR**, pas une liste Paramètres. Les libellés de ce formulaire suivent la langue du chrome.

**Mot de passe oublié alors que vous êtes connecté.** **Déconnexion** → **Mot de passe oublié ?** sur **Connexion contributeur**. Vous ne trouverez pas **Mot de passe actuel** sur cette page (les propriétaires ont cette carte ; vous non).

**À la recherche d’une cloche.** Il n’y en a pas. Les retraits en file ne notifient pas ici. Ouvrez l’historique **Portefeuille**.

**À la recherche de la marque.** Logo et aperçu **Payer en MoMo** appartiennent au *propriétaire* du hotspot, pas au contributeur qui alimente la liaison.

Si **Enregistrer** renvoie **Enregistrement impossible**, restez sur la page, vérifiez que le téléphone est des chiffres, réessayez une fois. Recharger jette la saisie non sauvée et remet le dernier nom/téléphone serveur.

## Toasts et libellés à retenir

**Enregistré** — nom et/ou téléphone écrits sur le serveur.

**Enregistrement impossible** — réessayez une fois ; n’enchaînez pas.

**Enregistrement...** — attendez.

**Déconnexion** dans le chrome termine la session ; ça n’enregistre pas le formulaire. Enregistrez d’abord.

**Aide** dans l’en-tête ouvre le centre d’aide, pas une boîte de notifications.

Les toasts mot de passe oublié vivent sur ces pages d’auth (**E-mail envoyé**, **La demande a échoué**), pas ici.

Si vous collez une URL de logo en pensant que c’est la marque propriétaire, vous êtes sur les mauvais Paramètres. Les Paramètres contributeur ont exactement : **E-mail** en lecture seule, **Nom affiché**, **Téléphone MoMo**, **Enregistrer**.

La saisie téléphone enlève les lettres en tapant. Les espaces ne sont pas stockés. Utilisez neuf chiffres nationaux, pas `+237`.

Le nom affiché est obligatoire. Le vider et appuyer sur **Enregistrer** devrait être bloqué par le navigateur avant un toast.

Les **Paramètres** propriétaire ont aussi **Statut du compte** en badge. Les vôtres non — l’activation est l’erreur de connexion **Votre compte attend la validation d’un administrateur.** jusqu’à ce que ce ne le soit plus.

Si deux appareils éditent **Nom affiché** à la fois, le dernier **Enregistrer** gagne. Il n’y a pas d’historique de versions sur cette page.

Gardez **Téléphone MoMo** aligné sur la SIM qui reçoit les paiements. Orange vs MTN n’est pas une liste Paramètres ; la modale de retrait infère depuis les chiffres.

Les icônes d’aide (cercle question) apparaissent sur les formulaires de site propriétaire, pas sur cette carte Paramètres contributeur. Le lien Aide dans l’en-tête est tout le centre d’aide.

Vous ne pouvez pas attacher un second e-mail. Vous ne pouvez pas activer la 2FA sur cette page (elle n’existe pas dans cette version). Vous ne pouvez pas poser une cloche de notification — dites-le à voix haute si un partenaire demande où sont les alertes.

## Tâches liées

- Comment la connexion e-mail a été créée : [Créer un compte contributeur](/fr/help/create-contributor-account).
- Utiliser le téléphone sur un paiement : [Retirer les gains contributeur en MoMo](/fr/help/contributor-withdraw).
- Carte de l’écran de paiement : [Référence portefeuille contributeur](/fr/help/reference-contributor-wallet).
