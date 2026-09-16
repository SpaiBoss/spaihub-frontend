---
id: glossary.commands
slug: glossary-commands-scheduler
title: "Planificateur commands"
description: "spaihub-commands polle toutes les 15 secondes pour GRANT et KICK. Le heartbeat ne suffit pas. MoMo payé, sync des bons, et Expulser attendent tous ce planificateur."
role: ["owner", "contributor"]
section: glossary
intents: ["planificateur commands", "GRANT KICK", "spaihub-commands", "15 secondes"]
buttons: ["Script de setup", "Vérifier le paiement", "Synchroniser les inutilisés vers le routeur", "Expulser"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.repaste-script2", "own.tut.paid-no-wifi"]
updatedAt: 2026-09-16
minutes: 4
---

## Termes

Le **planificateur commands** est `spaihub-commands` sur le Hex/CHR, intervalle **15 secondes**. Il est installé par Hex **2. Connecter à SpaiHub** et par le dernier script CHR **Connecter à SpaiHub**.

Il tire les **GRANT_ACCESS** en attente (créer utilisateur hotspot, PIN, temps, plafond d’octets optionnel, shared-users) et **KICK** (enlever utilisateur / hôte actif). Puis il accuse réception du lot.

**Heartbeat** (`spaihub-heartbeat`, ~1 min) met seulement à jour **En ligne**. **hotspot-active** (~2 min) rapporte qui est vraiment en ligne pour que **Sessions** puisse montrer **Sur le routeur**. Tu as besoin des commandes pour argent-vers-Wi‑Fi.

**Synchroniser les inutilisés vers le routeur** met des GRANT en file pour les codes **SPAI-** inutilisés. Toast : attends ~15 s, puis vérifie les utilisateurs Hotspot.

Toast **Expulser** : l’appareil devrait se déconnecter sous 15 secondes — ce chiffre *est* ce poll.

Les contributeurs ne lancent pas les planificateurs. Si les grants échouent, la boutique a l’air « cassée » à côté de leur uplink ; la correction est encore le script 2 du propriétaire.

## Pourquoi c’est important

L’orphelin classique : Campay **SUCCESS**, PIN portail visible, téléphone captif, routeur **En ligne**, **Sessions** **Non vu**. Le heartbeat vivait. Commands non. **Vérifier le paiement** réessaie la réconciliation ; sans `spaihub-commands`, l’utilisateur n’importe toujours jamais.

Mauvais diagnostic : « paie encore pour forcer le grant. » Ne facture pas deux fois. Mauvais diagnostic : « la prévisualisation qui marche veut dire que commands marche. » La prévisualisation est du HTML cloud.

Recoller le script 2 ne devrait pas expulser en masse les utilisateurs qui ont payé ; c’est la réparation habituelle quand le planificateur a disparu après un reboot. Recoller le script 1, c’est pour une mauvaise page captive. La dernière étape de l’assistant CHR est le même job que le script 2 Hex — ne la saute pas parce que l’amorçage « avait déjà l’air d’un routeur ».

## Ce que tu vois

Texte **Script de setup** et bannière tableau de bord pour relancer le script de **connexion** (ack commands). `/system scheduler print` doit lister `spaihub-commands`.

Symptômes d’absence : payé pas de Wi‑Fi, la sync ne crée jamais d’utilisateurs Hotspot, toast Expulser mais personne ne tombe.

## Quoi faire

Propriétaires : si les grants échouent, colle le script 2 seulement ; attends 15 s ; confirme **Sur le routeur**. Garde le script 1 pour superposition/HTML, pas comme marteau de grant. Après un succès Campay, **Vérifier le paiement** d’abord. Après **Synchroniser les inutilisés vers le routeur**, attends ces mêmes 15 secondes avant de déclarer les utilisateurs Hotspot vides. Contributeurs : envoie le propriétaire vers l’Aide ; ne prends pas un second MoMo « pour l’uplink ».

## Quoi ne pas dire

- Ne dis pas que le heartbeat suffit pour le Wi‑Fi payé.
- Ne dis pas aux abonnés le reste de Go du plafond d’usage pendant que tu attends un GRANT.
- Ne colle pas d’URL commands ni de tokens dans un chat abonné.
- Ne promets pas que le TTL GRANT plus vite. L’anti-tether reste désactivé et n’a rien à voir.
