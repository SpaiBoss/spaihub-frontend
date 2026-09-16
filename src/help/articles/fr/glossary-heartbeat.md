---
id: glossary.heartbeat
slug: glossary-heartbeat
title: "Heartbeat"
description: "Le heartbeat est le check-in du routeur une fois par minute. En ligne = dernier contact dans les 2 minutes, Dégradé 2–5 minutes, Hors ligne plus de 5 minutes ou jamais. Le heartbeat n’est pas le planificateur commands qui grant le WiFi."
role: ["owner", "contributor"]
section: glossary
intents: ["heartbeat", "EN LIGNE HORS LIGNE DÉGRADÉ", "dernier contact"]
buttons: ["Script de setup", "Payer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.offline-blocks-pay", "glossary.commands"]
updatedAt: 2026-09-16
minutes: 4
---

## Termes

**Heartbeat** = le planificateur `spaihub-heartbeat` (environ **1 minute**). Le Hex ou CHR POST « je suis vivant » à SpaiHub. **Dernier contact** est l’horodatage de ce check-in.

Fenêtres de statut :

- **En ligne** — dernier contact **≤ environ 2 minutes**
- **Dégradé** — dernier contact **environ 2–5 minutes**
- **Hors ligne** — dernier contact **> environ 5 minutes**, ou **jamais** (y compris une ligne routeur prévisualisation seulement)

Libellés traduits : **En ligne**, **Hors ligne**, **Dégradé**.

**Hors ligne désactive Payer** sur le portail. **Dégradé** avertit que les paiements peuvent tarder ; Payer peut encore être tenté et peut encore échouer côté serveur.

Heartbeat ≠ **spaihub-commands**. Des boîtes vivantes peuvent encore échouer à GRANT si commands manque.

Les contributeurs ne collent pas les scripts heartbeat. Une boutique **Hors ligne** veut encore dire que les acheteurs ne peuvent pas MoMo là.

## Pourquoi c’est important

« Le routeur est allumé, je vois les lumières » n’est pas **En ligne**. Lumières ONU sans egress 443 = Jamais vu. Script 1 sans script 2 = peut-être pas de heartbeat.

Mauvais diagnostic : « Dégradé veut dire qu’on devrait prendre deux paiements MoMo pour être sûrs. » Ne double-facture jamais. Mauvais diagnostic : « le heartbeat grant le Wi‑Fi. » Non.

**Dernier contact : Jamais (normal sans MikroTik)** est attendu sur une ligne que tu as ajoutée seulement pour **Prévisualiser le portail**. Le même Jamais sur une boutique qui était verte à midi, c’est un problème 443, courant, ou script 2. Ne traite pas ces deux Jamais comme le même incident.

## Ce que tu vois

**Sites** → **Routeurs** : **Statut**, **Dernier contact**. **Jamais (normal sans MikroTik)** sur une ligne créée pour prévisualiser.

**Tableau de bord** → **État des routeurs**. Portail : le texte hors ligne bloque Payer ; le texte dégradé avertit. Un contributeur qui regarde une boutique sans ventes doit demander si **Payer** est bloqué, pas si Campay « doit » un second débit.

Assistant CHR : **En attente du heartbeat du routeur...** puis **Le routeur est en ligne !**

## Quoi faire

Propriétaires : si Payer est bloqué, rétablis courant, WAN, HTTPS 443, puis colle **2. Connecter à SpaiHub**. Attends **En ligne** (vu dans les deux minutes) avant un MoMo test. Si le portail dit dégradé, tu peux essayer Payer mais reste là pour **Vérifier le paiement** — n’assume pas le succès. Contributeurs : si la boutique ne peut pas vendre, tes **Liaisons** peuvent encore s’afficher ; ne promets pas aux acheteurs que tu peux override Payer.

## Quoi ne pas dire

- Ne dis pas qu’En ligne prouve que les grants du script 2 existent. Vérifie aussi commands.
- Ne dis pas aux abonnés le reste de Go du plafond d’usage pendant que tu attends Dernier contact.
- Ne publie pas l’URL heartbeat ni le token routeur.
- Ne dis pas que les contributeurs contrôlent le heartbeat dans **Paramètres**.
