---
id: tip.script-1-vs-2
slug: script-1-vs-script-2
title: "Script 1 vs script 2"
description: "Le script 1 superpose le hotspot (walled garden, PAP, HTML de login). Le script 2 lance le heartbeat, les commandes toutes les 15 s, et hotspot-active. Grants et expulsions ont besoin du script 2. Ne le saute pas."
role: ["owner"]
section: pro-tips
intents: ["script 1", "script 2", "script de connexion", "spaihub-commands"]
buttons: ["Script de setup", "Hotspot existant", "Créer un hotspot invité"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "own.tut.repaste-script2"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

**Script 1** = **1. Setup hotspot (une fois)** sur **Script de setup**. Le chemin est **Hotspot existant** (superposition) ou **Créer un hotspot invité** (ajouter un LAN invité s’il manque). Il installe walled garden, PAP, profils, et télécharge le `login.html` captif. Ce n’est pas le moteur de grant.

**Script 2** = **2. Connecter à SpaiHub**. Il installe `spaihub-heartbeat` (environ toutes les 1 minute), `spaihub-commands` (toutes les **15 secondes**, GRANT/KICK), et `spaihub-hotspot-active` (dit à SpaiHub qui est vraiment en ligne pour que **Sessions** puisse montrer **Sur le routeur**).

Un **GRANT** est la commande en file qui crée l’utilisateur hotspot après MoMo ou après **Synchroniser les inutilisés vers le routeur**. Un **KICK** enlève l’utilisateur quand tu appuies sur **Expulser** ou quand la session doit finir.

**Heartbeat** répond seulement « ce routeur est vivant ? » Le heartbeat ne suffit pas à donner le Wi‑Fi après paiement.

## Pourquoi c’est important

Incident : Campay a dit SUCCESS, le portail a montré identifiant (chiffres du téléphone) et PIN, l’acheteur a appuyé sur **Connecter**, et le téléphone est resté captif. **Sites** montrait le routeur **En ligne** (le heartbeat marchait). **Sessions** restait **Non vu** ou vide. `/system scheduler print` n’avait que `spaihub-heartbeat` — le script 2 n’a jamais été fini, ou une vieille bannière a été ignorée. Le personnel a pris un second MoMo « pour réessayer ». Ne fais pas ça. Récupère avec **Vérifier le paiement** et colle le script 2.

Mauvais diagnostic : « le script 1 a échoué parce que le statut est En ligne. » En ligne = heartbeat. Les grants ont besoin des commandes.

Le tableau de bord peut montrer **Mettez à jour le script de connexion du routeur** — relance le script de connexion depuis **Sites** → ton routeur → **Setup**. Cette bannière concerne la fiabilité du script 2 (ack des commandes). Masque-la après avoir collé.

Recoller le script 2 rafraîchit le polling et ne devrait **pas** expulser en masse les utilisateurs qui ont payé. Recoller le script 1, c’est pour une mauvaise page captive, pas pour un grant manqué.

## Ce que tu vois

Sur **Script de setup** :

- **Chemin du script 1** : **Hotspot existant** ou **Créer un hotspot invité**.
- Blocs à copier : setup hotspot vs connecter.

Sur le Hex (terminal propriétaire/technicien, pas une conversation abonné) :

- Planificateurs : `spaihub-heartbeat`, `spaihub-commands`, `spaihub-hotspot-active`.
- Planificateur commands manquant = le MoMo payé n’importera pas les utilisateurs.

Sur **Sessions** : **Sur le routeur** après que hotspot-active a rapporté l’utilisateur. **Non vu** = le grant n’a jamais atterri ou le téléphone ne s’est jamais connecté.

## Quoi faire

Ce soir, si les gens paient et ne naviguent pas :

1. Confirme **En ligne** ou au moins pas **Hors ligne** (hors ligne bloque aussi les nouveaux MoMo).
2. Sur le téléphone : **Vérifier le paiement**. Ne facture pas deux fois.
3. Colle **2. Connecter à SpaiHub** seulement si les planificateurs manquent ou si les grants n’arrivent jamais.
4. Attends ~15 secondes (intervalle des commandes), puis regarde **Sessions**.
5. Reprends le script 1 seulement si la page captive est encore le MikroTik d’origine ou si le HTML marque / plafond d’usage est périmé.

CHR a un autre ordre à trois scripts (amorçage → hotspot → connecter). Ne mélange pas les libellés Hex script 1/2 avec les noms de l’assistant CHR.

## Quoi ne pas dire

- Ne dis pas à un acheteur « le routeur est en ligne donc ton Wi‑Fi doit marcher. » En ligne ≠ grant.
- Ne prends pas un second paiement parce que le script 2 manquait.
- Ne promets pas le reste de Go du plafond d’usage pendant que tu débogues les scripts.
- Ne colle pas le script 1 par-dessus une superposition qui marche « au cas où » en heure de pointe sauf si la page de login est fausse.
