---
id: own.tut.online-momo
slug: test-momo-online
title: "Confirmer En ligne et un paiement MoMo test"
description: "Attends un heartbeat récent, puis termine un petit paiement MTN MoMo ou Orange Money sur le portail captif."
role: ["owner"]
section: tutorials
intents: ["momo", "test payment", "online", "campay", "orange money"]
buttons: ["Prévisualiser le portail", "Payer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.paid-no-wifi", "tip.offline-blocks-pay"]
updatedAt: 2026-09-16
minutes: 12
---

Tant que le routeur n’est pas **En ligne**, tu fais du lèche-vitrine. **En ligne** veut dire un **heartbeat** dans les **2** dernières minutes. **Dégradé** c’est **2–5** minutes — le portail avertit, et le backend peut aussi refuser le paiement. **Hors ligne** c’est jamais, ou plus de **5** minutes : le portail **bloque** MoMo. Ce n’est pas un bug ; ça arrête de facturer les gens quand le Hex ne peut pas accorder. Voir [Routeur hors ligne = pas de MoMo](/fr/help/router-offline-blocks-momo).

Ce job c’est un vrai paiement Campay (souvent petit) avec **MTN MoMo** ou **Orange Money**. Utilise un numéro que tu contrôles. N’expérimente pas sur un inconnu dans la file.

## Ce que tu auras

Un paiement **Réussi**, un identifiant **9 chiffres** (le téléphone), un PIN **6 chiffres**, une ligne de session, et — si **spaihub-commands** est sain — **Sur le routeur**. Tu gardes des XAF après la commission plateforme dans **Portefeuille** (les bons ne font jamais ça).

## Avant de commencer

- Script 2 (ou CHR **Connecter à SpaiHub**) collé. Heartbeat **et** commands. Le heartbeat tout seul n’accorde pas le WiFi.
- Au moins un forfait actif pas cher. Au temps 1 heure suffit. Les invités sur les plans au temps voient **Data illimitée**, pas les Go restants — ne raconte pas le plafond d’usage caché pendant le test.
- Un portefeuille MoMo camerounais avec un peu de solde. Le prix minimum du forfait c’est le tien ; prends le SKU le moins cher.
- Téléphone sur le SSID invité **ou** tableau de bord **Prévisualiser le portail**. La preview peut lancer l’UI de paiement ; **Connecter au WiFi maintenant** est fait pour le chemin captif sur le hotspot.
- Routeur pas **Hors ligne**. Si **Dégradé**, attends **En ligne** sauf si tu testes l’avertissement exprès.

## Étapes

1. **Sites** → **Routeurs**. Confirme le statut **En ligne** et un **Dernier contact** frais. Si **Jamais (normal sans MikroTik)**, tu n’es pas prêt.
2. Appuie sur **Prévisualiser le portail**, ou rejoins le WiFi invité et ouvre la page captive.
3. Reste sur **Payer en MoMo** (l’autre onglet c’est **J’ai un bon**). Sélectionne le forfait pas cher.
4. Saisis le numéro MoMo (placeholder du genre `6XX XXX XXX`). Tu dois voir MTN ou Orange détecté.
5. Appuie sur **Payer {{amount}} XAF** (le bouton imprime le prix). Approuve le push sur le téléphone. N’appuie pas payer deux fois.
6. Attends **Accès prêt**. L’identifiant c’est les chiffres du téléphone. Le PIN c’est 6 chiffres. Note-les. Appuie sur **Connecter au WiFi maintenant**. La préparation peut montrer environ **22 secondes** (`Préparation du routeur… 22 s`). Si connecter échoue, attends quelques secondes et appuie encore.
7. Ouvre **Sessions** sur le site. Tu veux le téléphone, le forfait, **Sur le routeur**, et une MAC.

Si la page reste sur **Validez le MoMo sur votre téléphone**, appuie sur **Vérifier le paiement**. Tu peux **Annuler et recommencer** seulement si tu es sûr que rien n’a été pris. Si l’argent a quitté le portefeuille et que le WiFi n’est pas là, **ne prélève pas un second MoMo**. Passe à [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi).

![Screenshot](about:blank)
_Emplacement capture : portail Payer montant XAF et ligne routeur En ligne (staging)._

## Ce que tu dois voir

- Indice portail : paiement Campay ; le numéro devient l’identifiant WiFi ; le PIN apparaît après paiement.
- **Transactions** : la ligne, **Vous gardez {{amount}} XAF**.
- **Portefeuille** : le solde bouge après la commission plateforme. C’est du MoMo, pas un bon.
- **Tableau de bord** : **Revenu du jour** et **Sessions actives** peuvent monter.
- Texte invité forfait au temps toujours **Data illimitée pendant cette période**.

Bannière **Dégradé** : **Connexion routeur dégradée — les paiements peuvent tarder.** Préfère attendre.

## Si ça échoue

**Bouton Payer mort / Routeur hors ligne.** Répare le script 2 et 443 d’abord. Ne prends pas du cash « on activera plus tard » sauf si tu veux dire un [bon](/fr/help/print-and-sync-vouchers).

**Le client a payé, encore captif.** [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi). **Vérifier le paiement**. Un Campay SUCCESS orphelin peut être récupéré. Confirme **spaihub-commands**. Recolle le script 2. **Sessions** **Non vu** veut dire que le grant n’a jamais été importé. Pas de second débit.

**Mauvais identifiant.** L’identifiant c’est le téléphone 9 chiffres, pas l’e-mail que tu utilises pour **Se connecter**. Le PIN est le secret.

**Le paiement preview a marché mais Connecter ne fait rien.** Ouvre le portail depuis la page captive WiFi pour que **Connecter** puisse parler au hotspot, ou saisis identifiant/PIN sur le login hotspot. La preview reste utile pour l’UI.

**Dégradé puis paiement échoué.** Attends **En ligne**, **Vérifier le paiement** avant de réessayer. Le double paiement, c’est comme ça que les disputes de corridor commencent.

**Tu voulais Orange, tu as tapé un numéro MTN.** L’opérateur est détecté depuis le numéro. Utilise le portefeuille qui sonne vraiment.

Une fois que ça marche, tu es en affaires. Imprime du stock ensuite si tu vends cash : [Imprimer des bons et les synchroniser](/fr/help/print-and-sync-vouchers).

Un test propre c’est un SKU pas cher sur **ton** numéro MTN ou Orange, routeur **En ligne**, **Vérifier le paiement** si le push est lent, puis **Sessions** **Sur le routeur**. Si le WiFi de la cité est chargé, ne teste pas sur un inconnu. S’ils ont déjà payé, tu suis la procédure du comptoir — toujours un Campay, jamais deux. **Portefeuille** doit bouger après la commission plateforme ; un test bon ne le ferait pas.
