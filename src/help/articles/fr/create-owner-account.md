---
id: own.tut.account
slug: create-owner-account
title: "Créer votre compte propriétaire"
description: "Inscris-toi avec un e-mail, vérifie ta boîte, et ouvre le tableau de bord SpaiHub en tant que propriétaire Actif."
role: ["owner"]
section: tutorials
intents: ["register", "verify", "login", "create account", "sign in", "owner account"]
buttons: ["Créer le compte", "Se connecter"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.settings", "own.tut.location"]
updatedAt: 2026-09-16
minutes: 8
---

SpaiHub, c’est le produit d’exploitation hotspot pour vendre le WiFi au Cameroun — boutiques de corridor à Douala, spots de cité à Yaoundé, et partout entre les deux. Ce job crée le compte **propriétaire** : toi, la personne qui tient le site, fixe les prix en XAF, et retirera plus tard les ventes MoMo.

Un **propriétaire** n’est pas un contributeur. Un contributeur vend de la bande passante inutilisée et attend une approbation après la vérif. Toi, tu vérifies l’e-mail et tu deviens **Actif** tout seul. La connexion, c’est toujours l’**e-mail**, jamais un numéro de téléphone.

## Ce que tu auras

Un compte propriétaire vérifié, **Statut du compte** **Actif**, et le tableau de bord avec les six items de nav : **Tableau de bord**, **Sites**, **Bons**, **Transactions**, **Portefeuille**, **Paramètres**. Sur téléphone, les raccourcis sont **Accueil**, **Sites**, **Codes**, **Ventes**, **Caisse**. Les cartes comme **Revenu du jour** et **Solde portefeuille** peuvent être à zéro — c’est normal le premier jour.

Tu n’as pas encore besoin de MikroTik, de test Campay, ni de logo. Le job suivant, c’est [Ajouter un site sans routeur](/fr/help/add-location). Les détails du compte vivent plus tard dans [Référence paramètres](/fr/help/reference-settings).

## Avant de commencer

- Une boîte e-mail que tu peux ouvrir sur ce téléphone ou ce laptop. Gmail, Yahoo, ou l’adresse de la boutique, ça va — SpaiHub y enverra un lien de vérification.
- Un mot de passe d’au moins 8 caractères. Note-le quelque part de sûr ; tu te connectes avec **Adresse e-mail**, pas MTN MoMo ni Orange Money.
- Environ cinq minutes calmes. Si tu es au corridor avec des clients, attends que la ruée retombe.
- Pas de routeur, pas d’imprimante de bons, pas de fichier de marque. Ça vient après que ce compte existe.

N’essaie pas de t’inscrire comme contributeur si tu es l’opérateur hotspot. La vérif contributeur ne te rend pas **Actif** de la même façon.

## Étapes

1. Ouvre le site public et appuie sur **Commencer gratuitement**. C’est le chemin d’inscription. Si tu as déjà un compte, passe à **Se connecter**.
2. Sur **Créer un compte**, remplis **Nom complet** (le nom que le personnel et les contributeurs verront plus tard), **Adresse e-mail**, **Mot de passe**, et **Confirmer le mot de passe**. Le mot de passe doit faire au moins 8 caractères. Le compteur peut dire Correct, Bon, ou Fort — 8 caractères, c’est la règle dure.
3. Appuie sur **Créer le compte**. Tu dois atterrir sur **Vérifiez votre e-mail**.
4. Ouvre la boîte de cette adresse. Appuie sur le lien de vérification. Si le mail tarde, attends une minute et vérifie spam ou promotions.
5. Une fois le lien OK, reviens à **Connexion**. Saisis la même **Adresse e-mail** et le **Mot de passe**, puis appuie sur **Se connecter**.

C’est tout le job d’inscription. On ne te demande pas de numéro camerounais sur ce formulaire. Les numéros MoMo apparaissent plus tard quand un invité paie, ou quand tu [retires vers MoMo](/fr/help/first-withdrawal).

![Screenshot](about:blank)
_Emplacement capture : formulaire Créer un compte (staging, nom et e-mail fictifs)._

## Ce que tu dois voir

- Après **Créer le compte** : **Vérifiez votre e-mail** avec l’adresse que tu as saisie.
- Après le lien : un chemin de succès de vérification, puis **Connexion**.
- Après **Se connecter** : **Tableau de bord**. **Revenu du jour**, **Ce mois**, **Sessions actives**, et **Solde portefeuille** peuvent tous être à zéro. Les graphiques peuvent être vides. **État des routeurs** peut dire aucun routeur encore.
- Dans **Paramètres**, **Statut du compte** doit lire **Actif**. **Nom affiché** correspond à ce que tu as saisi comme **Nom complet**.

Si le tableau de bord affiche une bannière de script de connexion, tu peux l’ignorer jusqu’à ce que tu ajoutes un routeur. Il n’y a pas de cloche de notification dans cette version — ne cherche pas ça sous **Paramètres**.

## Si ça échoue

**Pas d’e-mail de vérification.** Reste sur **Connexion**, saisis la même **Adresse e-mail**, puis appuie sur **Renvoyer l’e-mail de vérification**. Vérifie le spam. Demande au WiFi de la boutique de ne pas bloquer le mail SpaiHub. Mauvaise adresse ? Inscris-toi encore avec la boîte que tu ouvres vraiment.

**Impossible de Se connecter / Le compte n’est pas actif.** Les propriétaires deviennent **Actif** seulement après le lien e-mail. Les contributeurs restent en attente jusqu’à ce qu’un humain les approuve — c’est un autre chemin produit. Si tu as vérifié et que tu n’entres toujours pas, attends une minute et réessaie **Se connecter**. Si le compte a été suspendu plus tard, contacte le support SpaiHub ; cet article d’Aide ne contournera pas une suspension.

**Mot de passe oublié.** Sur **Connexion**, appuie sur **Mot de passe oublié ?**, saisis **Adresse e-mail**, appuie sur **Envoyer le lien**. Utilise le dernier mail dans environ une heure, puis **Réinitialiser**.

**Tu as tapé un téléphone comme e-mail.** La connexion, c’est l’e-mail. `677xxxxxx` n’est pas un compte. Inscris-toi avec une vraie boîte, puis utilise MoMo seulement sur le portail invité et **Portefeuille**.

**Atterri sur la connexion contributeur.** Utilise **Connexion propriétaire** / **Commencer gratuitement** pour les opérateurs. Mélanger les deux comptes, c’est le classique du café à Douala.

Une fois **Actif**, ajoute un site : [Ajouter un site sans routeur](/fr/help/add-location). Tu peux encore prévisualiser la page invité sans Hex. Mot de passe et **Nom affiché** sont dans [Référence paramètres](/fr/help/reference-settings).

Sur téléphone après **Se connecter**, les raccourcis **Accueil**, **Sites**, **Codes**, **Ventes**, **Caisse** sont les mêmes six destinations que les mots du bureau. **Tableau de bord** peut afficher une bannière de script de connexion que tu **Masquer** seulement après avoir vraiment collé le script 2 plus tard. Rien ici ne demande encore MTN MoMo. E-mail pour entrer, e-mail pour sortir — c’est la porte propriétaire.
