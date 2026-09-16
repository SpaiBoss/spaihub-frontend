---
id: tip.username-is-phone
slug: username-is-phone
title: "L’identifiant MoMo, c’est les chiffres du téléphone"
description: "Après un achat MoMo, l’identifiant WiFi est les chiffres du téléphone de l’acheteur. La connexion compte propriétaire et contributeur reste l’e-mail. Les bons utilisent SPAI-XXXX-XXXX plus PIN. Ne mélange pas les trois."
role: ["owner"]
section: pro-tips
intents: ["identifiant téléphone", "identifiant hotspot", "connexion e-mail", "bon SPAI"]
buttons: ["Payer", "Connecter", "J’ai un bon", "Utiliser le bon"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.online-momo", "tip.shared-creds"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Connexion compte** (propriétaire ou contributeur) = **e-mail** plus mot de passe sur l’app SpaiHub. Cet e-mail n’est jamais l’identifiant hotspot abonné.

**Identifiant Wi‑Fi MoMo** = les **chiffres du téléphone** que l’acheteur a saisis sur **Payer en MoMo** (format Cameroun du type 6XX XXX XXX). Après succès Campay le portail montre **Identifiant** = ces chiffres et un **PIN WiFi**. Texte du portail : votre numéro devient l’identifiant WiFi.

**Identifiant bon** = le code **SPAI-XXXX-XXXX**. Le PIN est le **PIN** à 6 chiffres sur le ticket. Onglet **J’ai un bon** → **Utiliser le bon**.

**Connecter** envoie ces identifiants hotspot dans MikroTik. Ça ne connecte personne au tableau de bord propriétaire.

## Pourquoi c’est important

Incident dans un hotspot de supermarché à Douala : le personnel a dit à un acheteur MoMo de « se connecter avec le Gmail qu’on utilise pour SpaiHub ». La page captive a refusé. Ils ont remboursé. L’identifiant était sur l’écran de succès tout le temps — le numéro MTN.

Deuxième incident : un acheteur de bon a tapé son propre numéro 6XX dans **Code du bon**. Invalide. Les codes commencent par `SPAI-`.

Troisième : une famille a partagé l’identifiant chiffres de téléphone (facile à retenir) et a discuté que le PIN était « le PIN de la boutique ». Le PIN est par achat. Le partager est possible — c’est pour ça que les forfaits 1 appareil existent — mais ce n’est pas le mot de passe propriétaire.

Mauvais diagnostic : « Campay a échoué parce que l’identifiant est l’e-mail. » S’ils ont un PIN sur le portail, Campay a déjà réussi.

Orange vs MTN ne change pas la règle. Les chiffres qu’ils ont tapés dans **Payer en MoMo** sont l’identifiant, même si la SIM qui a approuvé Campay est un autre téléphone de la famille (les gens paient depuis le MoMo d’un parent). Écris l’identifiant que le portail a montré, pas « n’importe quel téléphone qui a sonné ». S’ils ont payé depuis 6XX A et s’attendaient à l’identifiant 6XX B, **Connecter** échouera. L’écran est la source de vérité.

## Ce que tu vois

Portail **Payer en MoMo** :

- **L’identifiant sera {{phone}}** pendant l’attente.
- Après succès : **Identifiant**, **PIN WiFi**, **Connecter**, **Notez identifiant et PIN**.

Portail **J’ai un bon** :

- Placeholder **SPAI-XXXX-XXXX**, **PIN à 6 chiffres**, **Utiliser le bon**.

Connexion app propriétaire : e-mail. **Paramètres** **Adresse e-mail** n’est pas un utilisateur hotspot.

**Sessions** **Appareil** montre souvent le téléphone pour les lignes MoMo, ou le code de bon pour les tickets.

## Quoi faire

1. Forme le comptoir avec trois lignes au mur : App = e-mail. Wi‑Fi MoMo = numéro de téléphone. Ticket = SPAI-… + PIN.
2. Après Payer, fais-leur capturer **Identifiant** et **PIN WiFi** avant de quitter la page captive.
3. S’ils perdent la page, le même téléphone + id appareil du portail peut reprendre ; s’ils effacent les données du site, ils utilisent encore chiffres du téléphone + PIN sur le login hotspot — pas l’e-mail.
4. Ne réinitialise pas le mot de passe propriétaire parce qu’un abonné « ne peut pas se connecter au Wi‑Fi ».
5. Si deux personnes partagent un identifiant MoMo, c’est du partage d’identifiants. Tarife-le ; ne prétends pas que l’identifiant contient secrètement la MAC.
6. Garde **Paramètres** **Adresse e-mail** pour te connecter au tableau de bord seulement. Ne l’écris jamais sur un talon de bon.

## Quoi ne pas dire

- Ne dis pas « ton Gmail c’est le Wi‑Fi ».
- Ne dis pas aux acheteurs MoMo de taper SPAI- sauf s’ils ont acheté un bon.
- Ne lis pas le reste de Go du plafond d’usage quand ils mélangent les types d’identifiant.
- Ne promets pas qu’un changement d’identifiant dans Paramètres va renommer les utilisateurs hotspot.
