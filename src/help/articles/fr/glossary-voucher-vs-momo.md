---
id: glossary.voucher-vs-momo
slug: glossary-voucher-vs-momo
title: "Bon vs MoMo"
description: "Les bons sont des tickets cash (SPAI-XXXX-XXXX plus PIN) qui ne créditent jamais le Portefeuille. MoMo, c’est Payer sur le portail ; l’identifiant WiFi est les chiffres du téléphone ; un MoMo réussi crédite le Solde disponible après la commission."
role: ["owner", "contributor"]
section: glossary
intents: ["bon vs momo", "cash vs campay", "code SPAI"]
buttons: ["Payer en MoMo", "J’ai un bon", "Utiliser le bon", "Créer des bons"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.voucher-not-wallet", "own.tut.vouchers"]
updatedAt: 2026-09-16
minutes: 4
---

## Termes

**MoMo** (MTN Mobile Money, Orange Money) est l’onglet portail **Payer en MoMo**. L’acheteur saisit un numéro Cameroun, appuie sur **Payer … XAF**, approuve sur le téléphone (Campay). L’**Identifiant** Wi‑Fi devient les **chiffres du téléphone**. Le PIN apparaît après succès. **Vérifier le paiement** récupère un SUCCESS orphelin. L’en attente survit au rechargement.

**Bon** est l’onglet **J’ai un bon** : code **SPAI-XXXX-XXXX**, **PIN à 6 chiffres**, **Utiliser le bon**. Les propriétaires génèrent le stock avec **Créer des bons**, **Imprimer PDF**, optionnellement **Synchroniser les inutilisés vers le routeur**.

**Portefeuille** : seul un **MoMo réussi** (après commission) monte le **Solde disponible** propriétaire. Le cash des bons reste dans la caisse. Les contributeurs sont payés depuis les accruals d’uplink, pas depuis le papier ticket.

Les deux produits peuvent partager les mêmes forfaits (temps/volume, appareils famille, plafond d’usage caché sur le temps). C’est le rail de paiement qui diffère.

## Pourquoi c’est important

Au comptoir, « il a payé » est ambigu. Payé MoMo ? Payé cash pour un ticket ? Le personnel qui mélange ça fait **Vérifier le paiement** sur un acheteur de bon, ou attend le **Portefeuille** après une vente de ticket.

Les contributeurs ne doivent pas s’attendre à ce qu’une soirée bons fasse bouger le **Solde contributeur**. Ce solde n’est pas le cash tickets de la boutique.

Mauvais diagnostic à la caisse : « le SMS Campay est arrivé, donc ce ticket `SPAI-` devrait aussi s’afficher dans **Transactions** comme Mobile Money. » Utiliser un ticket n’est pas Campay. Mauvais diagnostic : « l’identifiant MoMo est SPAI- parce qu’on imprime SPAI au mur. » L’identifiant MoMo, c’est les chiffres du téléphone. Garde les deux alphabets hors de la même ligne du tableau.

## Ce que tu vois

Portail : deux onglets. Écran d’attente MoMo vs champs bon. Un routeur hors ligne **désactive Payer** ; utiliser un bon a encore besoin d’un chemin de grant si la boîte ne peut pas importer les utilisateurs.

**Répartition des paiements** du **Tableau de bord** propriétaire : **Mobile Money** vs **Bons** comme stats business — toujours pas « XAF de bons tenus par SpaiHub ».

**Sessions** : lignes MoMo clés par téléphone ; lignes bons par code `SPAI-`.

## Quoi faire

1. Demande : « MoMo ou ticket ? »
2. MoMo coincé : **Vérifier le paiement**, ne facture pas deux fois.
3. Ticket coincé : format du code, PIN, **Synchroniser les inutilisés** + 15 s s’ils n’ont jamais utilisé dans le cloud.
4. Propriétaires : livre le cash des bons localement ; retire seulement le MoMo disponible.
5. Contributeurs : ignore les tickets de caisse quand tu lis ton portefeuille.
6. Si le routeur est **Hors ligne**, ne démarre pas un **Payer** MoMo. Les bons déjà synchronisés n’aident que si le Hex peut vraiment authentifier — une boîte morte n’authentifie personne.

## Quoi ne pas dire

- Ne dis pas que les bons créditent le **Portefeuille**.
- Ne dis pas que l’identifiant MoMo est l’e-mail propriétaire.
- Ne dis pas aux abonnés le reste de Go du plafond d’usage sur aucun des deux rails.
- Ne dis pas à un contributeur d’imprimer des bons. C’est une page **Bons** propriétaire.
