---
id: tip.voucher-not-wallet
slug: vouchers-do-not-credit-wallet
title: "Les bons ne créditent pas le portefeuille"
description: "Les ventes de bons sont du cash que tu as déjà encaissé. Seules les ventes MoMo réussies créditent le Solde disponible après la commission. N’attends pas que le Portefeuille bouge quand tu imprimes des tickets."
role: ["owner"]
section: pro-tips
intents: ["bons portefeuille", "stock cash", "MoMo crédite le portefeuille"]
buttons: ["Créer des bons", "Portefeuille", "Solde disponible", "Retirer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.vouchers", "own.ref.wallet"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

Un **bon** est un code prépayé **SPAI-XXXX-XXXX** plus un **PIN WiFi**. Tu le génères sous **Bons**, tu l’imprimes, tu le vends cash (ou à crédit) au comptoir.

**Portefeuille** **Solde disponible** = l’argent MoMo que SpaiHub peut t’envoyer via **Retirer**. Astuce sur le portefeuille : les ventes MoMo créditent ton portefeuille après la commission. **Les bons vendus hors ligne n’ajoutent pas de solde.**

**Utiliser le bon** est le bouton abonné. Ça consomme le code et grant le Wi‑Fi. Ce n’est pas un paiement Campay et pas un rechargement de portefeuille.

**Réservé aux contributeurs** n’a rien à voir avec le cash des bons. Ce sont les accruals OPEN contributeur tenus sur le portefeuille propriétaire. Les contributeurs eux-mêmes voient un seul solde.

## Pourquoi c’est important

Incident d’un kiosque à Makepe : le propriétaire a imprimé 50 tickets, en a vendu 40 le week-end, a ouvert **Portefeuille**, a vu le même Disponible que vendredi, et a cru que SpaiHub « avait mangé l’argent des bons ». Le personnel a failli rembourser un acheteur MoMo pour « faire bouger le portefeuille ». Le portefeuille ne leur devait pas ces 40 tickets. Le cash est dans la caisse. C’est le produit.

Mauvais diagnostic : « Synchroniser les inutilisés vers le routeur va créditer le portefeuille quand ils viennent en ligne. » La sync met seulement le GRANT des codes inutilisés en file sur le Hex. Pas de XAF.

Mauvais diagnostic : « Si je **Révoque**, le portefeuille doit descendre. » Révoquer arrête un code. Ça ne défait pas le cash que tu as déjà tenu.

Si tu as besoin d’un règlement digital, vends **Payer en MoMo**. Si tu as besoin de float dans la caisse, vends des bons. Mélanger les deux dans ta tête crée de fausses disputes.

Un second schéma Douala : un contributeur debout à la boutique voit **Portefeuille** sur sa propre app, entend « on a vendu cinquante tickets », et s’attend à ce que son **Solde contributeur** saute. Les paiements contributeur sont des accruals d’uplink, pas du papier ticket. Ne les traîne pas dans une dispute bons-portefeuille.

## Ce que tu vois

**Bons** : **Créer des bons**, **Imprimer PDF**, **Synchroniser les inutilisés vers le routeur**, statuts **Inutilisés**, **Utilisés**, **Expirés**, **Révoqués**.

**Portefeuille** : **Solde disponible**, **Disponible au retrait**, **Total portefeuille**, **Réservé aux contributeurs** (s’il y en a), **Retirer**, **Historique des retraits**. Il n’y a pas de ligne ledger « ticket #12 +500 XAF ».

**Transactions** liste les paiements du portail. Les utilisations de bons ne sont pas des lignes MoMo qui montent Disponible.

**Répartition des paiements** du tableau de bord peut montrer le volume *business* bons vs MoMo pour tes yeux. Ça n’est toujours pas du cash que SpaiHub tient pour **Retirer**.

## Quoi faire

1. Mets le cash des bons dans ton livre de caisse, pas dans **Portefeuille**.
2. Après **Créer des bons**, **Imprimer PDF** depuis **Inutilisés**. N’attends pas que Disponible tic.
3. Utilise **Retirer** seulement contre le MoMo **Disponible au retrait**.
4. Si un acheteur a payé MoMo *et* que tu lui as aussi vendu un bon pour la même heure, c’est une erreur de boutique — SpaiHub ne fusionnera pas ça en une seule histoire de portefeuille.
5. Explique au comptoir : ticket = cash à la boutique ; Payer téléphone = portefeuille plus tard, moins la commission.
6. Si **Solde disponible** n’a pas bougé après une soirée cash chargée, regarde **Transactions** pour MoMo seulement — puis le livre de caisse, pas **Retirer**.

## Quoi ne pas dire

- Ne dis pas à un abonné « ton bon est dans mon portefeuille SpaiHub. » Ce n’est pas le cas.
- Ne promets pas le reste de Go du plafond d’usage sur un bon au temps. Mêmes règles de plafond caché.
- Ne dis pas qu’un retrait en file a échoué parce que les ventes de bons d’aujourd’hui « n’étaient pas arrivées ».
- N’invente pas un écran admin pour « pousser les XAF des bons ». Pas dans l’Aide propriétaire.
