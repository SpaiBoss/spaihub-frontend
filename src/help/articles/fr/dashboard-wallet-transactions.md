---
id: own.tut.reports
slug: dashboard-wallet-transactions
title: "Tableau de bord, portefeuille, transactions"
description: "Lis Revenu du jour, exporte un CSV des ventes, et sors seulement ce que Disponible au retrait autorise. Trois écrans, trois jobs."
role: ["owner"]
section: tutorials
intents: ["csv", "accounting", "reports", "dashboard", "wallet", "transactions"]
buttons: ["Exporter CSV"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.home", "own.ref.wallet"]
updatedAt: 2026-09-16
minutes: 10
---

Les propriétaires mélangent ces trois pages, puis jurent que SpaiHub « a perdu de l’argent ». D’habitude les XAF sont sur un autre écran.

- **Tableau de bord** (**Accueil** sur téléphone) c’est le coup d’œil du matin : **Revenu du jour**, **Ce mois**, **Sessions actives**, **Solde portefeuille**, graphiques, **État des routeurs**, widgets bons.
- **Transactions** (**Ventes** sur téléphone) c’est chaque ligne Campay ou bon. Filtre, puis **Exporter CSV**. **Vous gardez {{amount}} XAF** c’est la part propriétaire sur une ligne.
- **Portefeuille** (**Caisse** sur téléphone) c’est ce que tu peux envoyer vers MoMo : **Disponible au retrait**, moins **Réservé aux contributeurs**. **Historique des retraits** c’est les payouts, pas un grand livre complet.

Libellés profonds : [Référence tableau de bord](/fr/help/reference-dashboard) et [Référence portefeuille](/fr/help/reference-wallet).

Le cash des bons que tu as déjà encaissé ne monte pas Portefeuille. Les ventes MoMo créditent après la commission plateforme. Les invités des plans au temps voient encore data illimitée — aucun de ces rapports n’est pour citer les Go restants à la porte.

## Ce que tu auras

Une image claire pour le comptable : instantané tableau de bord, un CSV sur le laptop, et un chemin de payout MoMo qui colle à **Disponible au retrait**. Tu n’auras pas de cloche de notification ; aucune n’est livrée.

## Avant de commencer

- Quelques ventes aident. Vide **Pas encore de transactions** / **Aucun revenu sur cette période** c’est honnête le premier jour.
- Un programme tableur si tu **Exporter CSV**.
- Sache quel site est lequel. « Tous les sites » va pour une seule boutique ; deux corridors doivent être filtrés.
- Une idée qui marche de MoMo vs bon. **Répartition des paiements** sur Tableau de bord existe parce que ces deux-là ne sont pas la même histoire cash. MoMo (après commission) peut être retiré. Les bons étaient déjà dans le tiroir.

## Étapes — lire le tableau de bord

1. Ouvre **Tableau de bord**.
2. Lis les quatre cartes : **Revenu du jour**, **Ce mois**, **Sessions actives**, **Solde portefeuille**. Les comparaisons **vs hier** / **vs mois dernier** peuvent être à zéro.
3. Graphiques : **Tendance des revenus** (net journalier, 30 derniers jours), **Répartition des paiements** (MoMo vs bons), **Revenu par site**, **Performance des bons** (inutilisés / utilisés / expirés / taux d’utilisation), **Meilleurs forfaits du jour**.
4. **État des routeurs** / **Par site**. **Jamais vu** c’est normal sans MikroTik. **En ligne** / **Dégradé** / **Hors ligne** suivent le heartbeat : ≤ 2 min / 2–5 / jamais ou > 5 min.
5. Si une bannière de script de connexion apparaît (**Mettez à jour le script de connexion du routeur**), finis le script 2 puis **Masquer**. Masquer cache la bannière ; ça ne colle pas le script pour toi.

## Étapes — exporter les ventes

1. Ouvre **Transactions**.
2. Filtre site, statut, dates au besoin. Les statuts incluent des libellés style réussi/échoué sur chaque paiement.
3. Confirme que les lignes montrent téléphone, forfait, montant, **Votre part**, **Vous gardez {{amount}} XAF**.
4. Appuie sur **Exporter CSV**. Toast **CSV téléchargé** / **CSV exporté**. Garde ce fichier pour les livres.

Le tableau de bord peut aussi indiquer d’exporter un CSV comptable ; **Transactions** c’est l’export au niveau ligne.

## Étapes — réconcilier le portefeuille

1. Ouvre **Portefeuille**.
2. Compare **Solde portefeuille** sur Tableau de bord avec **Disponible au retrait**. Le disponible peut être plus bas à cause de **Réservé aux contributeurs**.
3. Souviens-toi : **Historique des retraits** ≠ grand livre des transactions. Les payouts vivent ici ; les ventes vivent sur **Transactions**.
4. Le cash-out c’est [Premier retrait MoMo](/fr/help/first-withdrawal) — **Retirer vers MoMo**, **Valider le retrait**, min 100 XAF.

![Screenshot](about:blank)
_Emplacement capture : cartes Tableau de bord et Transactions Exporter CSV (staging)._

## Ce que tu dois voir

- Journée MoMo chargée : aujourd’hui Tableau de bord monte, lignes Transactions **Réussi**, disponible Portefeuille monte (après commission).
- Journée bons chargée : la répartition Tableau de bord bascule vers les bons, lignes Transactions bons, Portefeuille **ne** monte **pas**.
- Le CSV s’ouvre avec dates et XAF que tu peux donner à un comptable. Vous gardez XAF c’est la part propriétaire, pas le prix affiché invité si une commission s’applique.

## Si ça échoue

**CSV impossible / rien téléchargé.** Réessaie ; coupe les bloqueurs ; essaie un autre navigateur. Filtre une plage de dates plus petite.

**Aujourd’hui Tableau de bord ≠ somme de Transactions.** Fuseaux, filtres, paiements échoués, ou « aujourd’hui » vs une plage custom. Utilise le CSV pour la dispute, pas une capture d’une carte.

**Portefeuille vide, CSV plein.** Bons. Ou contributeurs réservés. Ou tu as déjà retiré. Lis [les bons ne créditent pas le portefeuille](/fr/help/vouchers-do-not-credit-wallet) et [réserve contributeurs](/fr/help/contributor-reserve).

**J’ai Masquer la bannière script et les grants sont morts.** Masquer cache seulement l’UI. Rouvre **Script de setup** et colle le script 2. Voir [recoller le script de connexion](/fr/help/repaste-connection-script).

**Cherché les Go restants par invité sur Tableau de bord.** Tu n’auras pas de compteur restant côté invité depuis l’Aide, et tu ne dois pas en inventer un au comptoir pour les plans au temps.

**Tu veux seulement la santé routeur.** **État des routeurs** sur Tableau de bord plus **Dernier contact** sur **Sites** → **Routeurs**. Expulser/suspendre sont d’autres jobs : [expulser et suspendre](/fr/help/kick-and-suspend).

**Ce mois a l’air gros, Disponible au retrait a l’air mince.** Commissions, réserve contributeurs, et l’argent que tu as déjà envoyé vers MoMo. Ouvre **Portefeuille** et lis **Réservé aux contributeurs** plus **Historique des retraits**. Puis ouvre **Transactions** et remarque les lignes bons. Les trois écrans sont d’accord quand tu arrêtes de les traiter comme un seul.

**Exporter CSV pendant une dispute avec le personnel.** Filtre d’abord le site et les dates de la soirée pour que le CSV soit l’argument, pas toute l’année. Vous gardez XAF c’est la colonne part propriétaire — c’est ce que le comptable doit réconcilier au MoMo lié au portefeuille, pas le prix affiché invité sur les plans au temps.

Aucune colonne de Go restants n’apparaîtra pour les invités sur les forfaits au temps. N’en ajoute pas une dans le tableur pour la montrer à la porte.
