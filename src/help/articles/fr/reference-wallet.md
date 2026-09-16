---
id: own.ref.wallet
slug: reference-wallet
title: "Référence portefeuille"
description: "Solde disponible vs réservé, Retirer vers MoMo (minimum 100 XAF), toasts en file vs envoyé, colonnes Historique des retraits. Pas de tableau ledger sur cet écran aujourd’hui."
role: ["owner"]
section: reference
intents: ["reference", "reference-wallet", "withdraw", "momo"]
buttons: ["Retirer vers MoMo", "Valider le retrait"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.withdraw", "tip.contributor-reserve", "tip.withdraw-queued"]
updatedAt: 2026-09-16
minutes: 11
---

## À quoi sert cette page

**Portefeuille** est l’endroit où vous encaissez le crédit propriétaire vers le Mobile Money camerounais. Ouvrez **Portefeuille** dans la barre latérale (téléphone : **Caisse**). Titre **Portefeuille**. Sous-titre **Solde et retraits.**

Cet écran aujourd’hui montre :

1. Un héros de solde : **Solde disponible** ou **Disponible au retrait**, optionnellement **Total portefeuille** et **Réservé aux contributeurs**, puis **Retirer vers MoMo**, plus une note de commission.
2. **Historique des retraits** — seulement les lignes de retrait.

Il n’y a **pas de tableau ledger** sur cet écran aujourd’hui. Vous n’y trouverez pas une liste courante de chaque vente MoMo, bon, ou ligne de commission. Les ventes sont sur **Transactions** et **Tableau de bord**. Le cash des bons n’entre jamais dans ce portefeuille.

## Vocabulaire

**Solde disponible** — ce que vous pouvez demander maintenant, quand aucune réserve contributeurs n’est retenue.

**Disponible au retrait** — la même idée, affichée quand **Réservé aux contributeurs** est supérieur à zéro. C’est le total portefeuille moins cette réserve.

**Total portefeuille** — le chiffre portefeuille propriétaire complet avant soustraction de la réserve. Affiché seulement si réserve > 0.

**Réservé aux contributeurs** — XAF que **SpaiHub** retient pour que les contributeurs de liaison montante puissent être payés pour les Go relevés. Vous ne pouvez pas retirer la tranche réservée. L’icône d’aide à côté du montant ouvre [Disponible vs réservé contributeurs](/fr/help/contributor-reserve). Si vous n’avez pas de liaisons contributeurs sur vos sites, vous voyez en général seulement **Solde disponible**.

**Commission plateforme** — pourcentage pris sur les **ventes MoMo réussies** avant crédit. Le pourcentage en vigueur est imprimé sur la page. Le stock de bons n’ajoute pas de solde (vous avez déjà encaissé le cash).

**En file** — Campay n’a pas pu terminer automatiquement ; un opérateur termine le transfert MoMo. C’est un **chemin de succès**, pas une demande ratée.

**Envoyé** — Campay a accepté le paiement vers votre numéro.

**Minimum 100 XAF** — vous ne pouvez pas valider un montant plus petit.

## Tous les contrôles

### Héros de solde

Grand nombre XAF. Libellé **Solde disponible** ou **Disponible au retrait**.

Si une réserve existe :

- **Total portefeuille : N XAF**
- **Réservé aux contributeurs :** **N XAF** plus icône d’aide

Ce n’est pas un graphique et pas une liste de ventes.

### Note de commission

Sous le bouton :

**Les ventes MoMo créditent votre portefeuille après la commission (X %). Les bons vendus hors ligne n’ajoutent pas de solde.**

Le pourcentage est la config publique en vigueur, pas une estimation. Si un invité a payé 500 XAF MoMo, vous ne retirez pas 500. S’ils ont utilisé un bon, ce portefeuille ne bouge pas.

### **Retirer vers MoMo**

Ouvre la modale **Demander un retrait**. Ne double-cliquez pas ; SpaiHub envoie une clé d’idempotence pour qu’une intention reste une demande.

### Champ de modale **Montant (XAF)**

Nombre, min 100, max disponible. Indication **Minimum 100 XAF**. Si une réserve existe, aussi **Max N XAF disponibles**.

### Champ de modale **Numéro de téléphone**

Chiffres nationaux camerounais, placeholder **6XXXXXXXX**, max 9 chiffres. En tapant, **Détecté : MTN** ou **Détecté : Orange** peut apparaître et verrouiller **Méthode de paiement**.

### Champ de modale **Méthode de paiement**

- **MTN MoMo**
- **Orange Money**

Désactivé quand le numéro a déjà détecté un opérateur.

### Note auto

**Les retraits sont envoyés automatiquement vers votre numéro MoMo via Campay.**

Quand la demande est en cours : spinner **Envoi du retrait vers votre MoMo — veuillez patienter…** et le bouton de validation **Traitement du retrait…**. Vous ne pouvez pas fermer la modale pendant l’envoi.

### **Valider le retrait**

Résultats (toasts) :

- **Retrait envoyé vers votre MoMo** — l’argent devrait apparaître sur le combiné.
- **Retrait en file. Un admin terminera le transfert MoMo sous peu.** ou **Retrait mis en file de traitement** — encore un succès. Voir [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued).
- **Retrait impossible** (ou l’erreur serveur) — essayez une fois ; n’enchaînez pas.

La modale se ferme ensuite et **Historique des retraits** se recharge.

### **Historique des retraits**

Titre **Historique des retraits**. Ce n’est **pas** un ledger de ventes.

Colonnes bureau :

- **Date**
- **Montant**
- **Méthode** (**MTN MoMo** ou **Orange Money**)
- **Numéro de téléphone**
- **Statut**

Si SpaiHub a stocké une **note admin** sur la ligne, elle apparaît sous le statut (petit texte gris). C’est un message sur ce paiement, pas un centre de notifications général.

Téléphone : montant, statut, méthode · téléphone, date, note optionnelle.

Pagination sous le tableau (20 par page).

Vide : **Pas encore de retrait**.

Les badges de statut utilisent les libellés partagés (**Réussi**, **Échoué**, **En attente**, et ainsi de suite selon le statut de la ligne).

## États vides et erreurs

Échec de chargement de page : **Impossible de charger le portefeuille** plus **Réessayer**.

Pendant le chargement : un bloc squelette.

Un historique vide est normal sur une boutique neuve. Cela **ne veut pas dire** que les ventes MoMo ont échoué — vérifiez **Transactions** et **Tableau de bord**.

Un montant ou un téléphone invalide revient comme **Retrait impossible** ou la chaîne d’erreur API. Corrigez le numéro et validez une fois.

### Comment cette page se relie à **Tableau de bord** et **Transactions**

**Solde portefeuille** sur **Tableau de bord** est une carte coup d’œil. Ce n’est pas toujours le même chiffre que **Disponible au retrait** quand une réserve est retenue. **Revenu du jour** inclut la valeur faciale des bons qui **n’atterrit jamais** ici.

**Transactions** liste chaque ligne de paiement Campay/bon. C’est le plus proche d’un journal de ventes. **Portefeuille** liste seulement les **paiements sortants**. Si un invité vient de payer 1 000 XAF MoMo, cherchez SUCCESS sur **Transactions** ; cette page ne bouge qu’après que le crédit (moins commission) est déjà dans le portefeuille et que vous (ou un retrait précédent) changez le solde.

### Statut sur une ligne d’historique

Les badges utilisent les mêmes mots de statut que le reste de l’app (**Réussi**, **Échoué**, **En attente**, …). Une demande en file peut rester en attente jusqu’à ce que les opérations finissent Campay. Cette ligne est votre reçu. Il n’y a toujours **pas** de cloche de notification sur **Paramètres** quand ça bascule.

Si une **note admin** apparaît sous **Statut**, lisez-la comme une note sur *ce retrait* (par exemple un indice de nouvel essai). Ce n’est pas une boîte de réception boutique.

## Ce que cette page ne fait pas

- **Pas de tableau ledger** des ventes, commissions, ou événements de bons sur cet écran aujourd’hui. N’en cherchez pas. Ne demandez pas au personnel d’« ouvrir le ledger sur Portefeuille ».
- Pas de crédit de bons. Le stock papier est **Bons**.
- Pas de compteurs Go contributeur. Les contributeurs ont leur propre **Portefeuille** avec un seul **Solde contributeur**.
- Pas de cloche de notification. Le statut de paiement est le tableau d’historique et le toast au moment de valider.
- Ne montre pas les Go restants d’usage raisonnable (sans rapport avec l’encaissement). Les invités ne voient jamais les Go restants sur le portail non plus.
- Pas une console admin. « Un admin terminera » dans le toast en file veut dire que les opérations SpaiHub finiront Campay — vous n’avez pas de bouton extra ici.
- Pas d’**Exporter CSV** sur cette page (cette barre est sur **Tableau de bord**). Pas d’**Expulser**. Pas de marque.

Cette version n’a pas de cloche ni de préférences de notification. Un retrait **Réussi** ou **En attente** ne sonne nulle part dans **Paramètres**. Regardez **Historique des retraits** et le SMS du combiné.

Si le personnel dit « ouvre le grand livre », répondez : cet écran a **Solde disponible** / **Disponible au retrait**, **Retirer vers MoMo**, et **Historique des retraits** seulement. Les ventes sont **Transactions**. Les bons sont **Bons**. Le graphique est **Tableau de bord**.

Un contributeur qui alimente votre site ne voit pas **Réservé aux contributeurs**. Cette ligne est propriétaire. Lui a un **Solde** unique. Vous ne pouvez pas retirer la tranche réservée ; elle paie des gens comme lui.

## Tâches liées

- Premier encaissement : [Premier retrait MoMo](/fr/help/first-withdrawal).
- Pourquoi disponible ≠ total : [Disponible vs réservé contributeurs](/fr/help/contributor-reserve).
- En file c’est OK : [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued).
- Où vivent les graphiques de revenu : [Référence tableau de bord](/fr/help/reference-dashboard).
