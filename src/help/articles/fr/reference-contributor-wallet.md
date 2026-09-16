---
id: con.ref.wallet
slug: reference-contributor-wallet
title: "Référence portefeuille contributeur"
description: "Un seul Solde contributeur (pas de découpage réserve), Retirer, colonnes d’historique, minimum 100 XAF, toasts en file vs envoyé."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-wallet", "withdraw"]
buttons: ["Retirer", "Demander le retrait"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.withdraw", "tip.withdraw-queued"]
updatedAt: 2026-09-16
minutes: 11
---

## À quoi sert cette page

**Portefeuille** est l’endroit où un contributeur encaisse les gains de liaison crédités vers MTN MoMo ou Orange Money. Ouvrez **Portefeuille** dans la navigation contributeur (ou **Accueil** → **Retirer →**).

Cet écran aujourd’hui :

1. Un nombre héros : **Solde contributeur** (XAF) et **Retirer**.
2. **Historique des retraits** avec pagination.

Il n’y a **pas de découpage Disponible vs Réservé** sur le portefeuille contributeur. Les propriétaires voient **Réservé aux contributeurs** sur *leur* **Portefeuille** parce qu’une partie de leur crédit MoMo est marquée pour payer des gens comme vous. Vous ne voyez qu’un **seul** **Solde contributeur**.

Il n’y a **pas de tableau ledger** des relevés, ventes propriétaire, ou événements de bons. **Liaisons** a **Dernier relevé**. **Accueil** a **Aujourd’hui** / **Ce mois** Go + XAF. Cette page liste les **paiements sortants**.

## Vocabulaire

**Solde contributeur** — XAF que vous pouvez demander à partir des relevés **Actif** crédités, moins les retraits déjà pris (et ce que le serveur retient encore en attente). **En pause** stocke des échantillons **sans** augmenter ce nombre.

**Minimum 100 XAF** — le champ montant utilise un minimum HTML de 100. Vous ne pouvez pas valider légalement 50 XAF via ce formulaire.

**En file** — l’envoi Campay automatique n’a pas pu terminer ; **SpaiHub** termine le transfert. Le toast **Retrait en file** est un **chemin de succès**.

**Envoyé** — toast **Retrait envoyé vers votre MoMo**.

**Numéro de téléphone** — MSISDN pour ce paiement. Prérempli depuis **Paramètres** → **Téléphone MoMo** quand vous en avez enregistré un.

**Idempotence** — appuyer une fois sur **Demander le retrait** crée une clé pour qu’un double essai réseau ne veuille pas dire deux paiements. Appuyez quand même une fois ; attendez le toast.

## Tous les contrôles

### Héros **Solde contributeur**

Libellé gris **Solde contributeur**. Grand **N XAF**. Pas de sous-titre **Total portefeuille**. Pas d’icône d’aide pour la réserve contributeurs (cette astuce est sur l’écran propriétaire).

### **Retirer**

Ouvre **Retirer les gains**. Vous ne pouvez pas ouvrir cette modale depuis **Liaisons**.

### **Montant (XAF)**

Nombre, min 100, max = solde actuel, obligatoire. Désactivé pendant **Traitement…**.

### **Numéro de téléphone**

Placeholder **6XXXXXXXX**, chiffres seulement, max 9. En tapant, SpaiHub peut détecter MTN vs Orange en interne. Contrairement à la modale propriétaire, ce formulaire contributeur **n’affiche pas** de liste **Méthode de paiement** ni de ligne **Détecté : MTN**. Gardez le numéro un vrai portefeuille MoMo.

### En cours

Spinner **Traitement…**. Bouton aussi **Traitement…**. Attendez. Ne fermez pas et ne renvoyez pas parce que le SMS du téléphone est lent.

### **Demander le retrait**

Toasts :

- **Retrait envoyé vers votre MoMo**
- **Retrait en file** (ou un plus long message admin en attente depuis l’API)
- **Retrait impossible** (ou erreur API)

En file : [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued). Vérifiez **Historique des retraits** et votre SMS. Il n’y a **pas de cloche de notification** sur les **Paramètres** contributeur quand « en file » passe à « envoyé ».

Après succès la modale se ferme, le montant se vide, le téléphone peut rester, le tableau se recharge.

### **Historique des retraits**

Titre **Historique des retraits**.

Colonnes :

- **Date**
- **Montant**
- **Téléphone**
- **Statut** (badge)

Pas de colonne **Méthode** et pas de ligne **note admin** sur cette UI contributeur aujourd’hui.

Vide : **Aucun retrait**.

Pagination sous le tableau (taille de page 20).

## États vides et erreurs

Échec de chargement : **Impossible de charger le portefeuille** / **Impossible de charger le portefeuille** avec **Réessayer**.

Chargement : squelette.

Historique vide + solde non nul = vous n’avez pas encore encaissé. Historique vide + solde zéro + liaisons **En pause** = attendu.

Le navigateur bloquera les montants sous 100. Gagnez d’abord des Go crédités sur **Actif**.

Si le téléphone Paramètres est vide, le téléphone de la modale commence vide sauf si vous en avez tapé un plus tôt dans la session. Enregistrez **Téléphone MoMo** pour éviter d’envoyer vers un numéro mal tapé.

## Ce que cette page ne fait pas

- **Pas de découpage réserve.** Un seul **Solde contributeur**.
- Pas de ledger de relevés et pas d’**Exporter CSV**.
- Pas de changement de mot de passe et pas de marque.
- **Pas de cloche de notification.**
- Ne paie pas les échantillons **En pause**.
- Ne montre pas les Go restants d’usage raisonnable.
- Pas un portefeuille propriétaire et pas une console admin. Vous ne pouvez pas « réessayer en admin ».

**Pas de tableau ledger** des ventes. Si un collègue propriétaire dit « vérifie le grand livre », répondez : le **Portefeuille** contributeur de cette version a **Solde contributeur**, **Retirer**, et **Historique des retraits** seulement — pas de ledger de ventes, pas de ligne réserve, pas d’**Exporter CSV**.

**Cette version n’a pas de cloche ni de préférences de notification.** Un toast **Retrait en file** n’allume rien dans **Paramètres**. Regardez l’historique et le SMS.

## Exemples concrets

**Premier encaissement.** **Téléphone MoMo** dans Paramètres est `67xxxxxxx` (allure MTN). Solde **12 500 XAF**. **Retirer**, montant `10000`, téléphone prérempli, **Demander le retrait**. Toast **Retrait envoyé vers votre MoMo**. L’historique montre Date, 10 000, le téléphone, **Réussi**. Le héros fait maintenant ~2 500 XAF. Vous n’avez pas vu **Réservé aux contributeurs** parce que cette ligne est propriétaire seulement.

**En file.** Même parcours, toast **Retrait en file**. Historique **En attente**. Ne renvoyez pas 10 000. Attendez le SMS ou un badge **Réussi** plus tard. Il n’y a toujours pas de cloche sur **Paramètres**.

**Semaine en pause.** Liaisons **En pause**, relevés qui bougent, Portefeuille **0**. **Retirer** ne peut pas inventer de l’argent. Relancer n’est pas un contrôle contributeur.

**Mauvais numéro dans la modale.** Vous avez tapé les chiffres d’un ami. SpaiHub enverra vers ce MSISDN si Campay l’accepte. Corrigez **Téléphone MoMo** sur **Paramètres** pour la prochaine fois ; cette page ne reverse pas un paiement envoyé.

**Sous le plancher.** Solde **80 XAF**. Le minimum du champ montant est 100. Gagnez d’abord des Go crédités sur **Actif**.

Les collègues propriétaires peuvent parler d’**Exporter CSV** et de **Transactions**. Ces boutons ne sont pas sur votre Portefeuille. Votre reçu est **Historique des retraits** seulement.

## Toasts et libellés à retenir

Sur cette page : pas de toast de succès rien que pour l’ouvrir. Les échecs sont la carte vide **Impossible de charger le portefeuille**.

Dans la modale : **Traitement…** n’est pas un échec.

Après validation : **Retrait envoyé vers votre MoMo**, **Retrait en file**, **Retrait impossible**.

Chaîne vide d’historique : **Aucun retrait**.

Le personnel propriétaire peut dire « vérifie le ledger ». Réponse : le **Portefeuille** contributeur de cette version a **Solde contributeur**, **Retirer**, et **Historique des retraits** seulement.

La langue du SMS Campay suit l’opérateur, pas le basculeur chrome **EN**/**FR**.

Si deux personnes partagent une connexion contributeur, elles partagent un solde. Préférez un **Téléphone MoMo** dans **Paramètres** pour que le défaut de la modale ne soit pas une surprise.

Rappel du minimum : 100 XAF est un plancher de formulaire. 99 XAF crédités sont de l’argent réel qui ne peut toujours pas sortir via **Demander le retrait** tant que vous n’avez pas franchi 100.

Le bouton propriétaire est **Valider le retrait** (autre écran). Le vôtre est **Demander le retrait**. Le bouton d’ouverture propriétaire est **Retirer vers MoMo**. Le vôtre est **Retirer**, et depuis Accueil **Retirer →**.

## Tâches liées

- Étapes : [Retirer les gains contributeur en MoMo](/fr/help/contributor-withdraw).
- Téléphone par défaut : [Référence paramètres contributeur](/fr/help/reference-contributor-settings).
- Sens de « en file » : [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued).
