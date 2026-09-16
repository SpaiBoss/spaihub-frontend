---
id: own.tut.withdraw
slug: first-withdrawal
title: "Premier retrait MoMo"
description: "Sors le crédit portefeuille propriétaire vers MTN MoMo ou Orange Money. Envoi auto et file admin sont tous les deux des chemins de succès."
role: ["owner"]
section: tutorials
intents: ["withdraw", "wallet", "momo", "payout", "orange money"]
buttons: ["Retirer vers MoMo", "Valider le retrait"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.withdraw-queued", "tip.contributor-reserve"]
updatedAt: 2026-09-16
minutes: 10
---

**Portefeuille**, c’est là où les ventes portail **MoMo** réussies atterrissent après la commission plateforme live. Ce n’est pas le tiroir cash métallique et ce n’est pas le stock de bons. Si la soirée n’était que des tickets papier, **Disponible au retrait** restera immobile. C’est voulu.

**Disponible au retrait** = total portefeuille moins **Réservé aux contributeurs** (si tu as des deals de liaison montante contributeur). Les XAF réservés financent les paiements contributeur ; tu ne peux pas les tirer comme cash propriétaire. Voir [Disponible vs réservé contributeurs](/fr/help/contributor-reserve).

L’envoi minimum c’est **100 XAF**. Méthodes : **MTN MoMo** ou **Orange Money**. Valide **une fois**.

## Ce que tu auras

Soit **Retrait envoyé vers votre MoMo**, soit un message en file qu’un admin terminera le transfert sous peu. **Les deux sont un succès.** En file n’est pas une demande échouée. Voir [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued).

La page montre **Historique des retraits** — date, montant, statut — pas un grand livre comptable de chaque vente. Les ventes vivent sur **Transactions**. Les cartes tableau de bord sont un instantané.

## Avant de commencer

- Au moins une vente MoMo réussie (après commission) pour que le solde ne soit pas zéro. Lance [test MoMo](/fr/help/test-momo-online) si tu es encore à vide.
- Un numéro camerounais qui peut recevoir l’opérateur que tu choisis. L’opérateur détecté doit coller au portefeuille qui sonne vraiment.
- **Disponible au retrait** ≥ 100 XAF. Si le total a l’air gros mais le disponible est petit, lis la ligne **Réservé aux contributeurs**.
- Dix minutes calmes. Le double-tap, c’est comme ça que tu te disputes avec toi-même.

Il n’y a pas de cloche de notification dans **Paramètres** pour « payout fait ». Regarde **Historique des retraits** et le SMS MoMo. Si tu viens d’un weekend chargé en bons, lis la note de commission deux fois avant d’accuser la page de vol.

**MTN MoMo** vs **Orange Money** doit coller au numéro. Un numéro 67x MTN avec Orange comme méthode, c’est comme ça que les payouts s’assoient dans la mauvaise file. Le formulaire peut montrer **Détecté : MTN MoMo** ou Orange — crois-le. Minimum **100 XAF** c’est un plancher dur, pas une suggestion de la cité.

## Étapes

1. Ouvre **Portefeuille** (raccourci téléphone : **Caisse**).
2. Lis **Disponible au retrait**, **Total portefeuille**, et **Réservé aux contributeurs**. La note de commission sur la page : les ventes MoMo créditent après la commission plateforme ; les bons vendus hors ligne n’ajoutent pas de solde portefeuille.
3. Appuie sur **Retirer vers MoMo** (tu peux aussi voir **Retirer** selon la mise en page). Titre **Demander un retrait**.
4. **Montant (XAF)** — au moins 100, au plus le disponible. **Numéro MoMo**. **Méthode** : **MTN MoMo** ou **Orange Money**. L’opérateur détecté doit avoir du sens.
5. Appuie sur **Valider le retrait** une fois. Attends **Envoi du retrait vers votre MoMo — veuillez patienter…** / **Traitement du retrait…**.
6. Lis le toast résultat. **Retrait envoyé vers votre MoMo** veut dire que Campay a payé. **Retrait en file. Un admin terminera le transfert MoMo sous peu.** (ou **Retrait mis en file de traitement**) veut dire qu’un humain le finira. Ne soumets pas encore pour le même montant.

Vérifie **Historique des retraits**. Ton SMS MoMo c’est la preuve de rue.

![Screenshot](about:blank)
_Emplacement capture : Portefeuille Disponible au retrait et Demander un retrait (staging)._

## Ce que tu dois voir

- Ligne d’historique avec montant et un statut non-échoué sur les chemins de succès.
- Notification MoMo sur le téléphone (selon l’opérateur).
- **Tableau de bord** **Solde portefeuille** baisse après un payout envoyé.
- **Transactions** inchangé — cette page c’est les ventes, pas cette liste de payouts.

Si tu attendais que les soirées bons apparaissent ici, relis [les bons ne créditent pas le portefeuille](/fr/help/vouchers-do-not-credit-wallet).

## Si ça échoue

**Minimum 100 XAF.** Collecte un peu plus de volume MoMo ou attends. N’invente pas un envoi 50 XAF.

**Disponible à 0 mais Transactions a l’air chargé.** Ces lignes peuvent être des bons, des paiements échoués, ou de l’argent encore réservé. Filtre **Transactions** par source dans ta tête : MoMo vs bon. Vérifie la ligne réservé.

**En file longtemps.** Toujours chemin de succès. Ne double-soumets pas. Si le montant n’arrive jamais et l’historique reste en file, contacte le support SpaiHub avec la ligne d’historique — pas un second **Valider le retrait** pour le même cash-out.

**Retrait impossible.** Lis le toast. Répare numéro/opérateur, confirme le disponible, réessaie **une fois** seulement si rien n’est en attente dans l’historique.

**Envoyé au mauvais numéro.** Traite-le comme n’importe quel mauvais envoi MoMo : tu l’as tapé. Utilise le numéro de la boutique la prochaine fois.

**Partenaires contributeurs fâchés.** Tu ne peux pas retirer leur réserve. Ces XAF ne sont pas à toi pour Orange. Voir [réserve contributeurs](/fr/help/contributor-reserve).

**Tu veux un CSV des ventes.** C’est **Transactions** → **Exporter CSV**, pas l’historique Portefeuille. Voir [Tableau de bord, portefeuille, transactions](/fr/help/dashboard-wallet-transactions).

**En file vs envoyé.** **Retrait envoyé vers votre MoMo** veut dire que le chemin Campay auto a tiré. En file veut dire qu’une personne finira l’envoi Orange/MTN. Les deux appartiennent à **Historique des retraits** comme des lignes en forme de succès. Rafraîchis la page ; n’enfonce pas **Valider le retrait**. Si tu as des contributeurs, explique-toi une fois : les XAF réservés c’est leur carburant, pas ta bière du samedi.

**Tableau de bord Solde portefeuille encore haut.** Soit le payout est en file, soit la page est périmée, soit tu regardes **Total portefeuille** dans ta tête au lieu de **Disponible au retrait**. Recharge **Portefeuille**. L’historique est le juge.
