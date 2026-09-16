---
id: tip.offline-blocks-pay
slug: router-offline-blocks-momo
title: "Un routeur hors ligne bloque MoMo"
description: "Hors ligne désactive Payer sur le portail. Dégradé avertit seulement ; le paiement peut encore échouer côté serveur. Le heartbeat doit atterrir au moins toutes les deux minutes pour En ligne."
role: ["owner"]
section: pro-tips
intents: ["routeur hors ligne", "bloque momo", "DÉGRADÉ", "Payer désactivé"]
buttons: ["Payer", "Prévisualiser le portail", "Script de setup"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["glossary.heartbeat", "own.tut.online-momo"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Heartbeat** = le Hex ou CHR qui appelle SpaiHub environ une fois par minute (`spaihub-heartbeat`). Le statut vient de **Dernier contact** :

- **En ligne** — vu dans les **2 minutes** environ.
- **Dégradé** — dernier contact entre **2 et 5 minutes** environ.
- **Hors ligne** — dernier contact il y a **plus de 5 minutes**, ou **jamais**.

**Payer** est le bouton portail **Payer … XAF**. Quand le routeur est **Hors ligne**, MoMo est désactivé : **Routeur hors ligne — le Mobile Money est indisponible jusqu’à la reconnexion.**

**Dégradé** montre **Connexion routeur dégradée — les paiements peuvent tarder.** Payer peut encore être appuyable. Le serveur peut encore refuser ou le grant peut encore échouer. Dégradé est un avertissement, pas un feu vert.

## Pourquoi c’est important

Pendant une coupure Eneo à New Bell, le Hex a redémarré. Le heartbeat s’est arrêté. Les acheteurs voyaient encore les forfaits (le portail est dans le cloud) et ont essayé de payer. Les vieilles histoires firmware disent « MoMo va se mettre en file. » SpaiHub ne prendra pas un paiement walk-in qu’il ne peut pas granter. **Hors ligne désactive Payer.** C’est de la gentillesse : tu ne crées pas un Campay SUCCESS orphelin pendant que la boîte est morte.

Mauvais diagnostic : « Campay est down parce que Payer est grisé. » Regarde **Sites** **Statut** / **Dernier contact** du routeur d’abord. Mauvais diagnostic : « Dégradé veut dire qu’on ne doit prendre que des bons cash. » Tu peux encore essayer MoMo, mais préviens que ça peut échouer ; aie des bons inutilisés en secours si la boîte est vraiment en train de mourir.

Utiliser un bon a aussi besoin que le routeur importe les utilisateurs si tu comptes sur les utilisateurs hotspot. Une boîte hors ligne n’aidera pas un code imprimé jamais synchronisé et qui ne peut pas GRANT.

## Ce que tu vois

**Sites** → table **Routeurs** : **Nom**, **Statut**, **Dernier contact**, **Script de setup**.

**Tableau de bord** → **État des routeurs**. **Jamais vu** sur une ligne prévisualisation seulement est normal. **Jamais vu** sur une boutique qui était verte, c’est un problème script 2 / HTTPS / courant.

Texte portail :

- Hors ligne : Payer indisponible jusqu’à la reconnexion.
- Dégradé : les paiements peuvent tarder.

**Sessions** n’aura pas de nouvelles lignes **Sur le routeur** d’une boîte qui ne peut pas poller les commandes.

## Quoi faire

Ce soir :

1. Si Payer est bloqué, n’envoie pas les acheteurs vers un autre prix de forfait comme si Campay était le problème.
2. Courant, WAN, DNS, sortie TCP **443**. Puis colle **2. Connecter à SpaiHub** si les planificateurs ont disparu après le reboot.
3. Attends **En ligne** (heartbeat dans les deux minutes), puis un **Payer** test sur un forfait pas cher.
4. Si le statut est **Dégradé**, tu peux tenter Payer, mais reste à côté de l’acheteur. Si ça échoue, **Vérifier le paiement** — ne double-facture pas. Attends-toi à des grants lents ou qui échouent jusqu’à **En ligne**.
5. Garde une petite pile de bons inutilisés pour les vraies nuits hors ligne — en sachant que le cash des bons ne crédite pas le **Portefeuille**.

## Quoi ne pas dire

- Ne dis pas « paie quand même, on grantera plus tard » pendant **Hors ligne**. Le bouton est désactivé pour une raison.
- Ne promets pas que Dégradé est inoffensif. Le serveur peut encore faire échouer le paiement.
- Ne dis pas aux abonnés le reste de Go du plafond d’usage pendant que tu attends le heartbeat.
- N’accuse pas le format d’identifiant MoMo pour un bouton Payer désactivé.
