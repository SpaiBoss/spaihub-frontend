---
id: own.tut.location
slug: add-location
title: "Ajouter un site sans routeur"
description: "Crée un site hotspot pour ajouter des forfaits, une ligne routeur, et prévisualiser le portail captif avant qu’un MikroTik soit en ligne."
role: ["owner"]
section: tutorials
intents: ["location", "add site", "add location", "shop", "hotspot site"]
buttons: ["Ajouter un site", "Créer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.preview", "own.ref.locations"]
updatedAt: 2026-09-16
minutes: 8
---

Un **site** dans SpaiHub, c’est un hotspot — une boutique, un corridor, une cour de cité — pas une punaise GPS et pas le MikroTik lui-même. Tu crées le site d’abord, puis tu y accroches routeurs et forfaits. Tu n’as pas besoin de matériel sur le bureau pour finir ce job.

Pense-le comme le dossier « corridor Akwa » ou « night shop Bastos ». Les invités verront plus tard les forfaits de ce site. Tu peux encore [prévisualiser le portail captif](/fr/help/preview-captive-portal) avec **Dernier contact** **Jamais (normal sans MikroTik)**.

## Ce que tu auras

Une ligne de site sur **Sites**. Dépliée, tu verras quatre onglets : **Routeurs**, **Forfaits**, **Sessions**, **Politique d’accès**. Vide, c’est OK. Tu peux **Modifier le site**, **Suspendre**, ou **Activer** sans supprimer l’historique.

Sur téléphone, **Sites** est le raccourci **Sites** dans la barre. Même page.

## Avant de commencer

- Un compte propriétaire **Actif** et **Se connecter**. Si tu es encore sur **Vérifiez votre e-mail**, finis d’abord [Créer votre compte propriétaire](/fr/help/create-owner-account).
- Un nom que les gens de la boutique reconnaîtront. « Akwa 2 » vaut mieux que « Routeur 1 ».
- Une chaîne d’adresse. Pas besoin d’être cadastral — « Face Total, Bessengue » suffit pour toi et le personnel.
- Pas de MikroTik requis. Pas de forfait requis encore, même si le portail dira qu’il n’y a pas de forfait tant que tu n’en ajoutes pas.

Si **Sites** liste déjà des sites, tu peux quand même en ajouter un autre. Un propriétaire peut tenir plusieurs corridors. Un site, c’est moins cher à séparer maintenant que de démêler plus tard quand le MoMo d’Akwa et les bons du night shop partagent le même tas de **Transactions**.

Sur téléphone le raccourci nav est **Sites**. Le titre vide **Aucun site pour l’instant** c’est le même job — **Ajouter un site**, puis **Créer**. Tu ne cherches pas une cloche de notification. Cette page, c’est le dossier boutique.

## Étapes

1. Ouvre **Sites** (téléphone : **Sites**). Si c’est ton premier site, le titre vide est **Aucun site pour l’instant**. Le texte te dit d’ajouter un hotspot pour déployer des routeurs et vendre des forfaits.
2. Appuie sur **Ajouter un site**.
3. Remplis **Nom du site** (boutique ou quartier) et **Adresse**.
4. Appuie sur **Créer**. Tu dois avoir un toast du genre **Site créé**.
5. Trouve la nouvelle ligne. Déplie-la (appuie sur la ligne / le chevron). Confirme les quatre onglets : **Routeurs**, **Forfaits**, **Sessions**, **Politique d’accès**.

Tu peux appuyer sur **Modifier le site** à tout moment pour changer **Nom du site** ou **Adresse**, puis **Enregistrer**. Ça ne déplace pas les routeurs et n’efface pas les ventes.

**Suspendre** sur la ligne du site arrête les nouvelles ventes portail pour ce site et expulse les sessions live. Utilise-le quand la boutique ferme une semaine ou que le Hex est dans le carton de réparation. **Activer** relance la vente. Ne confonds pas **Suspendre** avec supprimer le site — l’historique sur **Transactions** reste.

![Screenshot](about:blank)
_Emplacement capture : état vide Sites et formulaire Ajouter un site (staging)._

## Ce que tu dois voir

- Le compteur de liste, par exemple **1 site**.
- Texte vide **Routeurs** : pas encore de routeur, et tu peux quand même obtenir un lien de portail captif sans boîtier physique.
- **Forfaits** vide : pas encore de forfait, ajoutes-en un pour que les abonnés puissent acheter.
- **Sessions** vide : **Aucune session active sur ce site.**
- **Politique d’accès** explique que **Appareils simultanés** se règlent sur chaque forfait ; cet onglet n’est qu’un repli pour certains bons.

Rien de tout ça n’est une erreur. Le matériel vient dans [Hex physique — hotspot existant (script 1 puis 2)](/fr/help/setup-mikrotik-hex-existing) ou [CHR depuis une VM vide (trois scripts dans l’ordre)](/fr/help/setup-chr). Les forfaits viennent dans [Créer un forfait 1 heure avec plafond caché](/fr/help/create-time-package).

Noms complets des commandes : [Référence sites](/fr/help/reference-locations).

## Si ça échoue

**Créer ne fait rien / Le nom est obligatoire.** **Nom du site** et **Adresse** ont tous les deux besoin d’une valeur. Ne colle pas seulement des espaces.

**J’ai ajouté un routeur par erreur.** Ce job n’exige pas **Ajouter un routeur**. Si tu en as déjà ajouté un, **Dernier contact** **Jamais (normal sans MikroTik)** est attendu jusqu’au heartbeat du script 2. Tu peux encore **Prévisualiser le portail**. **Retirer** supprime la ligne routeur et les invités n’atteindront plus le portail par cet appareil — fais-le seulement si tu le voulais.

**Mauvais nom de quartier.** **Modifier le site** → **Enregistrer**. Les invités voient la marque depuis **Paramètres** → **Marque du portail**, pas forcément ce nom interne.

**Suspendu et personne ne peut payer.** C’est le but de **Suspendre**. Appuie sur **Activer**. Si tu voulais seulement expulser un téléphone abusif, utilise **Expulser** sur **Sessions** — voir [Expulser une session ou suspendre un site](/fr/help/kick-and-suspend).

**Deux boutiques, un site.** Sépare-les : **Ajouter un site** encore. Forfaits, bons, et lignes MoMo se lisent plus facilement par site quand le corridor et le night shop ne sont pas mélangés.

**Politique d’accès** peut attendre. Les appareils simultanés appartiennent à chaque forfait (passage = 1, famille = 2–4). Le repli du site est seulement pour certains bons quand une limite de forfait manque. Ne t’arrête pas ici pour inventer une interdiction maison — [tarife le partage plutôt](/fr/help/price-dont-ban-sharing).

Après **Créer**, une heure saine ressemble à : ajouter un [forfait au temps](/fr/help/create-time-package) pas cher, **Ajouter un routeur**, puis [prévisualiser le portail captif](/fr/help/preview-captive-portal) avant que quelqu’un grimpe un poteau. Les scripts matériel viennent quand le Hex est vraiment sur le bureau. **Dernier contact** **Jamais (normal sans MikroTik)** sur cette ligne routeur, c’est encore un succès pour un après-midi preview-only.
