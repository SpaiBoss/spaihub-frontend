---
id: con.tut.account
slug: create-contributor-account
title: "Créer un compte contributeur"
description: "Inscrivez-vous avec un e-mail, vérifiez, puis attendez EN ATTENTE jusqu’à ce que SpaiHub vous active. Ce n’est pas un compte hotspot propriétaire. Connexion par e-mail."
role: ["contributor"]
section: tutorials
intents: ["contributor register", "verify", "pending", "sign in"]
buttons: ["Créer le compte", "Se connecter", "Renvoyer l’e-mail de vérification"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.links", "con.ref.home"]
updatedAt: 2026-09-16
minutes: 11
---

## À quoi sert cette page

Ce tutoriel amène une personne au Cameroun sur **SpaiHub** comme **contributeur** : vous vendrez de la bande passante inutilisée vers un hotspot proche que SpaiHub tient déjà. Vous ne deviendrez **pas** **propriétaire** de boutique. Les propriétaires vendent des forfaits aux passants, collent des scripts Hex, impriment **SPAI-XXXX-XXXX**, et ouvrent **Portefeuille** pour les ventes MoMo boutique. Les contributeurs attendent qu’un technicien pose une liaison physique, puis lisent **Liaisons** et retirent des XAF.

Écrans dans l’ordre :

1. **Créer un compte contributeur**
2. Boîte — e-mail de vérification
3. **Vérification e-mail contributeur**
4. **Connexion contributeur**
5. Après activation : **Accueil** (**Aperçu de votre contribution de bande passante**)

Après le clic sur le lien du mail, le statut reste **En attente** jusqu’à ce que SpaiHub vous active. **Se connecter** affiche alors **Votre compte attend la validation d’un administrateur.** Cette phrase est le produit, pas un bug. Vous ne pouvez pas vous auto-approuver. Vous n’avez pas de console admin.

L’identité de connexion est **Adresse e-mail**. Il n’y a pas d’identifiant séparé.

## Vocabulaire

**Contributeur** vs **Propriétaire** — deux comptes, deux URL. Sous-titre de connexion contributeur : **Tableau de bord de la liaison montante**. Propriétaire : **Accédez à votre tableau de bord**. Pied sur la connexion contributeur : **Opérateur hotspot ?** **Connexion propriétaire**.

**En attente** (compte) — existe, peut-être vérifié, tableau de bord bloqué.

**Créer le compte** — validation d’inscription (occupé **Création...**).

**Vérifiez** — page jeton **Vérification e-mail contributeur**. Le sous-titre après inscription est **Vérifiez, puis attendez l’approbation SpaiHub**.

## Tous les contrôles

### **Créer un compte contributeur**

Sous-titre **Vendez votre bande passante inutilisée à un hotspot SpaiHub proche**.

- **Nom complet** — plus tard **Nom affiché** / **Bienvenue, {nom}**
- **Adresse e-mail** — unique ; pris → **Cet e-mail est déjà inscrit**
- **Mot de passe** — ≥ 8 caractères (**Le mot de passe doit contenir au moins 8 caractères** si trop court)
- **Confirmer le mot de passe** — toast d’écart **Les mots de passe ne correspondent pas**
- **Créer le compte**

**Déjà inscrit ?** **Se connecter**

La langue préférée est celle **EN**/**FR** que vous aviez sur cette page.

Pas de champ MoMo ici. Ajoutez **Téléphone MoMo** sur les **Paramètres** contributeur après pouvoir vous connecter.

### **Vérifiez votre e-mail**

Titre **Vérifiez votre e-mail**. Sous-titre **Vérifiez, puis attendez l’approbation SpaiHub**.

**Cliquez sur le lien dans l’e-mail, puis un admin activera votre compte. Ensuite,** **Se connecter**.

Toast d’échec d’inscription : **Inscription impossible** ou texte API.

### **Vérification e-mail contributeur**

Jeton manquant : **Aucun jeton de vérification fourni**. Échec : **La vérification a échoué**. Succès : message serveur + **Aller à la connexion**.

### **Connexion contributeur**

- **Adresse e-mail**
- **Mot de passe**
- **Mot de passe oublié ?**
- **Se connecter** / **Connexion...**
- Toast de succès **Connecté** → **Accueil**

**Nouveau contributeur ?** **Créer un compte**

Une connexion non vérifiée révèle **Renvoyer l’e-mail de vérification** / **Envoi...**. E-mail vide : **Saisissez d’abord votre e-mail ci-dessus**.

### Réinitialisation du mot de passe (pas Paramètres)

**Mot de passe oublié ?** → **Réinitialiser le mot de passe contributeur** → **Envoyer le lien** → **E-mail envoyé**. Les **Paramètres** contributeur n’ont **pas** de **Mettre à jour** mot de passe ni de carte **Changer le mot de passe**.

## États vides et erreurs

| Message | Sens |
| --- | --- |
| **Vérifiez votre e-mail avant de vous connecter.** | Lien du mail ou **Renvoyer l’e-mail de vérification**. |
| **Votre compte attend la validation d’un administrateur.** | Vérifié, encore **En attente**. Attendez. |
| **Le compte n’est pas actif. Vérifiez votre e-mail ou contactez le support.** | Chemin inactif. |
| **E-mail ou mot de passe incorrect** | Mauvaise paire. |
| **Connexion impossible** | Générique. |

Après que vous *êtes* actif, un **Accueil** vide est **Pas encore de liaison** / **SpaiHub posera une liaison physique vers un hotspot proche et l’affichera ici.** L’inscription a marché. Le tuyau n’est pas encore posé.

## Ce que cette page ne fait pas

- Ne crée pas un hotspot propriétaire et n’affiche pas **Sites**.
- Ne vous laisse pas coller des scripts MikroTik ni régler **Tarif (XAF/Go)**.
- Ne montre pas les Go restants d’usage raisonnable.
- Pas de cloche de notification à l’inscription ni plus tard sur **Paramètres**.
- Vous n’approuvez pas **En attente** vous-même.

Les **Liaisons** seront en lecture seule. Vous n’ajoutez pas de ligne à l’inscription.

**Cette version n’a pas de cloche ni de préférences de notification.** L’activation n’allume pas une alerte. Réessayez **Connexion contributeur** plus tard.

## Étapes (parcours heureux)

1. Ouvrez **Créer un compte contributeur** (pas le **Créer un compte** propriétaire).
2. Remplissez **Nom complet**, **Adresse e-mail**, **Mot de passe**, **Confirmer le mot de passe**.
3. Appuyez une fois sur **Créer le compte**. Attendez **Vérifiez votre e-mail**.
4. Ouvrez le mail sur cette même adresse. Appuyez sur le lien. Lisez **Vérification e-mail contributeur**. Appuyez sur **Aller à la connexion**.
5. **Connexion contributeur** avec la même **Adresse e-mail**. Si vous voyez **Vérifiez votre e-mail avant de vous connecter.**, utilisez **Renvoyer l’e-mail de vérification**.
6. Si vous voyez **Votre compte attend la validation d’un administrateur.**, arrêtez. Vous êtes **En attente**. Attendez l’activation. Ne créez pas un compte propriétaire sauf si vous tenez un hotspot.
7. Après activation, **Se connecter** → toast **Connecté** → **Accueil**. Des liaisons vides conviennent : **SpaiHub posera une liaison physique vers un hotspot proche et l’affichera ici.**
8. Optionnel : **Paramètres** → **Téléphone MoMo** → **Enregistrer** pour que plus tard **Retirer** soit prérempli.

## Si ça échoue

Mauvais produit : vous vouliez **Sites** et des bons. Ça, c’est **Connexion** propriétaire.

Le mail n’arrive jamais : vérifiez les indésirables, **Renvoyer l’e-mail de vérification**, confirmez que vous avez tapé l’e-mail une fois.

**Cet e-mail est déjà inscrit** : **Se connecter** ou **Mot de passe oublié ?** — n’inventez pas un second Gmail sauf si vous avez vraiment deux personnes.

Écart de mot de passe : le toast est **Les mots de passe ne correspondent pas**. Corrigez **Confirmer le mot de passe**.

Page jeton **La vérification a échoué** : demandez un mail frais ; les vieux liens expirent.

Vous avez ouvert **Créer un compte** propriétaire par erreur. Le sous-titre propriétaire parle d’exploitation hotspot. Le contributeur dit **Vendez votre bande passante inutilisée à un hotspot SpaiHub proche**. Revenez et ouvrez **Créer un compte contributeur**.

Après **Vérifiez, puis attendez l’approbation SpaiHub**, ne créez pas un second compte « pour accélérer ». Un admin active ; vous ne pouvez pas vous auto-approuver.

## Ce que vous aurez

Une **Adresse e-mail** qui est votre connexion. Une boîte vérifiée. Puis une attente **En attente**. Puis **Accueil** avec **Solde**, **Aujourd’hui**, **Ce mois**, **Vos liaisons**. Puis, quand SpaiHub pose la liaison, une ligne **Liaisons** que vous pouvez lire. Puis, quand les XAF crédités ≥ 100, un **Portefeuille** que vous pouvez retirer.

Vous n’aurez pas **Ajouter un site**, **Générer des bons**, **Prévisualiser le portail**, **Expulser**, ni les Go restants d’usage raisonnable. Ça appartient aux propriétaires et aux invités du hotspot, pas à ce type de compte.

La locale préférée de la page d’inscription n’affecte que la langue que SpaiHub peut utiliser dans le mail/l’UI ; elle n’active pas **En attente**.

Si quelqu’un dans la boutique a déjà une connexion **propriétaire**, il lui faut encore une inscription **contributeur** séparée pour voir cet Accueil. Ne partagez pas le mot de passe propriétaire pour « vérifier les liaisons ».

Après activation, **Liaisons** est lecture seule. **Pas encore de liaison** veut dire attendre la pose, pas coller un script.

## Tâches liées

Quand **Accueil** s’ouvre : [Référence accueil contributeur](/fr/help/reference-contributor-home). Quand une ligne apparaît : [Lire une liaison contributeur](/fr/help/read-contributor-link).
