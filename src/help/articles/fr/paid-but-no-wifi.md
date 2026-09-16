---
id: own.tut.paid-no-wifi
slug: paid-but-no-wifi
title: "Le client a payé mais pas de WiFi"
description: "Campay a réussi et le téléphone est encore captif. Récupère le paiement. Ne prends pas un second MoMo. Vérifie commands, pas seulement le heartbeat."
role: ["owner"]
section: troubleshooting
intents: ["paid no wifi", "orphan payment", "campay", "staff script", "check payment status"]
buttons: ["Vérifier le paiement", "Script de setup"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.paid-no-wifi", "own.tut.repaste-script2"]
updatedAt: 2026-09-16
minutes: 12
---

C’est une **procédure du comptoir** pour le corridor quand quelqu’un te montre un SMS Orange Money ou MTN MoMo et que la page captive lui demande encore de payer. L’argent a bougé. Le WiFi non. Ta première phrase : **on ne prendra pas un second MoMo**. La deuxième : appuie sur **Vérifier le paiement**.

SpaiHub peut récupérer un **Campay SUCCESS orphelin** — l’opérateur a payé, l’onglet portail est mort, ou le téléphone a rechargé — et il peut garder un paiement **en attente** à travers les rechargements. L’invité peut fermer la page et revenir. C’est pour ça que tu ne « paies juste encore » jamais comme étape un. Astuce courte : [Paiement OK, pas de WiFi](/fr/help/orphan-campay).

## Ce que tu auras

Soit le paiement existant débloqué (identifiant = téléphone 9 chiffres, PIN 6 chiffres, **Connecter au WiFi maintenant**), soit un diagnostic clair : routeur **Hors ligne**, **spaihub-commands** manquant, ou **Sessions** coincé sur **Non vu**. Tu n’auras pas un second débit sur le portefeuille du client depuis cette boutique.

## Avant de commencer

- Reste calme. Les files Douala aux heures de pointe s’enflamment quand le personnel prend encore 200 XAF.
- Le SMS MoMo de l’invité ou la preuve Campay. Le même numéro qu’il a tapé sur le portail.
- Accès à **Sites** → **Routeurs** et **Sessions** de ce site.
- Terminal si tu dois inspecter les planificateurs : `/system scheduler print`.
- Sache heartbeat vs commands : **spaihub-heartbeat** (1 min) marque **En ligne**. **spaihub-commands** (15 s) importe GRANT/KICK. **spaihub-hotspot-active** (2 min) c’est qui est vraiment sur le Hex. Dernier contact vert sans commands = joli mensonge.

Si le routeur est **Hors ligne**, le nouveau MoMo est bloqué exprès. Cet invité peut encore avoir un ancien SUCCESS à récupérer — toujours pas de second paiement.

## Étapes — au comptoir (pas de second débit)

1. **N’appuie pas** sur **Payer {{amount}} XAF** encore. **Ne prends pas** du cash « pour un bon à la place » sauf si tu donnes un code de courtoisie **gratuit** que tu as généré. Facturer deux fois, c’est l’échec.
2. Sur le téléphone invité, ouvre le portail captif (même WiFi). Appuie sur **Vérifier le paiement**. Attends. Texte : **Toujours en attente du MoMo. Appuyez sur « Vérifier le paiement » si vous avez déjà payé.** Après SUCCESS : **Accès prêt**, identifiants, **Connecter au WiFi maintenant** (~22 s de préparation). Ils peuvent **Annuler et recommencer** seulement si tu es sûr que Campay n’a **pas** réussi — si le SMS dit payé, n’annule pas vers un nouveau débit.
3. Si l’onglet était perdu : ils peuvent rouvrir le portail depuis la page hotspot. La récupération pending et SUCCESS doit reprendre. L’identifiant sera ce téléphone. Le PIN est le secret ; s’ils ne l’ont jamais vu, la vérif de statut doit montrer **Identifiants WiFi — notez-les** encore après récupération.
4. Regarde **Sessions**. **Sur le routeur** = le Hex a le login dans les hôtes actifs. **Non vu** = SpaiHub connaît une session mais le grant n’a jamais été importé (ou le script active n’a pas rapporté). Une MAC peut encore être une boîte NAT — beaucoup d’humains, une ligne.

## Étapes — si la vérif de statut ne suffit pas

5. Confirme routeur **En ligne** (heartbeat ≤ 2 min). **Dégradé** (2–5) peut retarder ou refuser le paiement ; attends si tu peux. **Hors ligne** : répare WAN/443 et script 2 ; toujours pas de second MoMo.
6. Sur le MikroTik : `/system scheduler print`. Tu as besoin de **spaihub-commands**. Le heartbeat tout seul ne suffit pas. Si commands manque, **Sites** → **Script de setup** → colle **2. Connecter à SpaiHub** seulement. Recoller ne doit pas expulser en masse. Guide : [Recoller le script de connexion sans expulser](/fr/help/repaste-connection-script).
7. Attends un cycle commands (~15 s) plus un moment. L’invité appuie sur **Connecter** encore. Si connecter échoue, attends quelques secondes et appuie encore (indice portail).
8. Revérifie **Sessions**. **Sur le routeur** avec une MAC : la radio les a. S’ils sont encore captifs, ils ne sont peut-être pas sur ce SSID, ou un second appareil est confus avec les limites famille.
9. Propriétaire **Expulser** c’est le mauvais outil pour « réparer » un invité payé-pas-en-ligne. Expulser termine une session qui existe déjà. Tu veux l’import, pas le kick.

## Ce que tu dois voir quand c’est réparé

- Portail **Accès prêt** / **Connecter au WiFi maintenant**.
- **Transactions** montre déjà le premier SUCCESS et **Vous gardez {{amount}} XAF**. Il n’y a **pas** un second SUCCESS d’un paiement panique.
- **Sessions** : téléphone, forfait, **Sur le routeur**.
- Texte forfait au temps toujours **Data illimitée** — ne « compense » pas en lisant les Go de plafond d’usage caché.

![Screenshot](about:blank)
_Emplacement capture : Vérifier le paiement sur le portail et Sessions Sur le routeur (staging)._

## Si ça échoue

**SMS payé, Vérifier le paiement encore en attente.** Attends une minute, réessaie le statut, confirme qu’ils ont utilisé le **même** numéro que le portefeuille qui a sonné. Ne lance pas un second **Payer**. Escalade avec la transaction existante, pas une nouvelle.

**Deux lignes SUCCESS.** Quelqu’un a double-payé. Stop. Aide les premiers identifiants en ligne ; le second c’est une conversation support/remboursement — pas un autre clic produit dans cet article.

**Sur le routeur mais téléphone captif.** Mauvais SSID, cache navigateur, ou ils doivent utiliser identifiant/PIN sur le login hotspot. **Connecter** est disponible depuis la page captive WiFi ; les onglets preview-only sont plus faibles.

**Non vu après script 2.** Commands échoue encore, horloge/DNS sur Hex, ou ils ne touchent pas ce routeur. Confirme **Dernier contact**. CHR : l’AP doit être sur le LAN, pas le WAN.

**Hors ligne bloque le bouton.** Attendu. [Routeur hors ligne = pas de MoMo](/fr/help/router-offline-blocks-momo). Récupère SUCCESS s’il existe déjà ; n’invente pas un paiement cash « jusqu’à ce que le Hex se réveille » sauf si tu sors un vrai bon que tu ne factureras pas aussi comme MoMo.

**Plan famille, téléphone en trop.** Plafond appareils simultanés. **Déconnecter cet appareil** / **Terminer pour tous les appareils** sur le portail, ou ils achètent un [forfait famille](/fr/help/create-family-package). Pas un orphelin Campay.

**Le personnel veut des Go restants en geste commercial.** Non. Les plans au temps ne montrent pas les Go restants aux invités. Offre une reconnexion propre ou un bon que tu as vraiment généré.

Quand le site est calme, lance ton propre [test MoMo](/fr/help/test-momo-online) pas cher pour que le prochain inconnu ne soit pas l’expérience.
