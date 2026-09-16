---
id: con.tut.withdraw
slug: contributor-withdraw
title: "Retirer les gains contributeur en MoMo"
description: "Encaissez le Solde contributeur (minimum 100 XAF). Toasts envoyé vs en file. Un seul solde — pas de découpage réserve propriétaire. Posez Téléphone MoMo dans Paramètres."
role: ["contributor"]
section: tutorials
intents: ["contributor wallet", "withdraw", "momo", "queued"]
buttons: ["Retirer", "Demander le retrait", "Enregistrer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.withdraw-queued", "con.ref.wallet"]
updatedAt: 2026-09-16
minutes: 11
---

## À quoi sert cette page

Ce tutoriel est la première fois qu’un **contributeur** transforme des XAF de liaison montante crédités en MTN MoMo ou Orange Money. La page est **Portefeuille**. Le libellé héros est **Solde contributeur** — un nombre, **pas** le découpage propriétaire **Disponible au retrait** / **Réservé aux contributeurs**.

Chemin A : nav **Portefeuille**. Chemin B : **Accueil** → **Retirer →** (toujours la page Portefeuille). Puis **Retirer** ouvre **Retirer les gains**.

Posez **Téléphone MoMo** sur **Paramètres** → **Enregistrer** avant d’encaisser pour que la modale soit préremplie.

Minimum **100 XAF**. Les liaisons **En pause** ne remplissent pas ce portefeuille.

## Vocabulaire

**Solde contributeur** — XAF retirables depuis les relevés **Actif** crédités.

**Retrait envoyé vers votre MoMo** — Campay a accepté l’envoi.

**Retrait en file** — succès, pas échec. Les opérations finissent le MoMo. [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued).

**Demander le retrait** — confirmer (occupé **Traitement…**). Appuyez une fois.

## Tous les contrôles

### Avant de commencer

1. **Liaisons** : statut **Actif**, **Dernier relevé** pas coincé pour toujours si vous attendez du crédit neuf.
2. **Paramètres** : **Téléphone MoMo** **6XXXXXXXX** → **Enregistrer** → toast **Enregistré**.
3. **Portefeuille** : héros ≥ **100 XAF**.

### **Retirer**

Ouvre la modale. Une clé d’idempotence est créée. Ne double-cliquez pas parce que le SMS est lent.

### **Montant (XAF)**

Min 100, max = solde.

### **Numéro de téléphone**

Placeholder **6XXXXXXXX**. Prérempli depuis Paramètres. Vous pouvez taper un autre numéro pour ce paiement. Cette modale n’a **pas** de liste **Méthode de paiement** (le Portefeuille propriétaire oui).

### **Demander le retrait**

Toasts :

- **Retrait envoyé vers votre MoMo**
- **Retrait en file**
- **Retrait impossible**

Puis colonnes **Historique des retraits** **Date**, **Montant**, **Téléphone**, **Statut**. Vide avant le premier paiement : **Aucun retrait**.

Erreur de chargement sur la page : **Impossible de charger le portefeuille** + **Réessayer**.

**Pas de cloche de notification** quand « en file » se termine. Surveillez l’historique et le SMS du combiné.

## États vides et erreurs

Solde zéro + **En pause** : attendu (relevés sans crédit).

Zéro + **Actif** + relevé frais : le crédit peut tarder. Attendez. N’ouvrez pas un second compte contributeur.

Sous 100 XAF : le champ montant n’acceptera pas une validation valide. Gagnez plus de Go crédités.

Toast d’échec : corrigez téléphone/montant, **un** nouvel essai. En file : **ne** renvoyez **pas** le même montant comme si le premier était mort.

## Ce que cette page ne fait pas

- Pas de découpage réserve et pas de ledger de ventes.
- Pas de changement de mot de passe (utilisez **Mot de passe oublié ?**).
- Pas de Go restants d’usage raisonnable.
- Pas le **Retirer vers MoMo** propriétaire (autre libellé, liste de méthode extra, lignes de réserve).
- Pas une console de nouvel essai admin.

**Pas de tableau ledger.** Votre journal à l’écran est **Historique des retraits** seulement.

**Cette version n’a pas de cloche ni de préférences de notification.** Un toast **Retrait en file** n’allume rien dans **Paramètres**.

Les **Liaisons** restent en lecture seule pendant que vous encaissez. Vous ne « dépausez » pas depuis **Portefeuille**.

## Étapes

1. Confirmez que **Statut** sur **Liaisons** est **Actif**. **En pause** ne financera pas ce portefeuille.
2. **Paramètres** → **Téléphone MoMo** → **Enregistrer** (toast **Enregistré**).
3. Ouvrez **Portefeuille** (ou **Accueil** → **Retirer →**).
4. Lisez **Solde contributeur**. Si sous **100 XAF**, arrêtez — le champ montant ne prendra pas un encaissement valide.
5. Appuyez une fois sur **Retirer**. Titre de modale **Retirer les gains**.
6. **Montant (XAF)** entre 100 et le solde héros.
7. Confirmez **Numéro de téléphone** (`6XXXXXXXX`).
8. Appuyez une fois sur **Demander le retrait**. Attendez que **Traitement…** finisse.
9. Lisez le toast : **Retrait envoyé vers votre MoMo** ou **Retrait en file**. Les deux sont des chemins de succès.
10. Confirmez une nouvelle ligne sous **Historique des retraits**.

## Si ça échoue

**Impossible de charger le portefeuille** → **Réessayer**.

**Retrait impossible** → vérifiez min 100, max disponible, chiffres du téléphone. Un nouvel essai.

En file → ne dupliquez pas le montant. Voir [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued). Aucune cloche ne sonnera sur **Paramètres**.

Envoyé vers le mauvais numéro → empêchez le suivant via **Paramètres**. Ce tutoriel ne reverse pas Campay.

Vous attendiez **Disponible au retrait** propriétaire moins réserve : mauvais rôle. Les contributeurs ont un seul solde.

## Ce que vous aurez

Un coup MoMo sur le numéro que vous avez tapé, ou une ligne **en file** qui deviendra ce coup. **Historique des retraits** comme seul journal à l’écran. **Solde contributeur** réduit du montant (quand le serveur accepte la demande).

Vous n’aurez pas de phrase de commission plateforme sur cette page contributeur (cette note de commission est sur le Portefeuille **propriétaire** : ventes MoMo moins pourcentage). Votre tarif a déjà été appliqué quand les Go ont été crédités.

Vous n’aurez pas **Valider le retrait** (capitalisation / libellé propriétaire). Le vôtre est **Demander le retrait**.

Vous n’aurez pas de liste **MTN MoMo** / **Orange Money**. La détection est silencieuse.

Si **Retirer →** sur Accueil est plus facile sur un téléphone, utilisez-le — c’est la même page **Portefeuille**, pas un autre produit.

Ne retirez pas « pour tester » 100 XAF deux fois dans la panique. Lisez le toast et la ligne d’historique.

Pagination : si vous retirez souvent, les plus vieilles lignes passent à la page 2. Le héros montre toujours le solde actuel, pas la somme des lignes d’historique visibles.

**Retirer →** sur **Accueil** et nav **Portefeuille** sont le même écran. Il n’y a pas de troisième page « paiements ».

Si le SMS Campay dit que l’argent est arrivé mais que l’historique est encore **En attente**, attendez ; ne créez pas une seconde demande pour le même montant. En file est documenté comme succès.

Ne dites jamais aux invités hotspot les Go restants d’usage raisonnable pendant que vous attendez le SMS. Ce chiffre n’est pas sur votre Portefeuille et pas sur leur portail.

Avant de commencer, sachez que le **Portefeuille** propriétaire est un autre bâtiment : **Retirer vers MoMo**, **Valider le retrait**, note de commission, réserve optionnelle. Le vôtre est **Retirer**, **Demander le retrait**, un seul solde.

Après un toast envoyé, restez sur **Historique des retraits** jusqu’à ce que le badge soit clairement **Réussi** ou que vous ayez le SMS. Puis **Déconnexion** si vous êtes sur un téléphone partagé dans la boutique.

Si le téléphone **Paramètres** était vide et que vous n’avez tapé un numéro que dans la modale, ce numéro est pour cette demande. Enregistrez-le sur **Paramètres** pour que la prochaine modale ne soit pas vide.

Montant 100 sur un solde 100 est autorisé (le max est le solde). Montant 101 ne l’est pas.

Les liaisons restent en lecture seule. **Dernier relevé** qui bouge pendant **En pause** n’est pas une raison de **Demander le retrait** — le solde ne montera pas.

Le propriétaire peut parler d’**Historique des retraits** aussi. Le sien a **Méthode** et parfois une note admin. Le vôtre a **Date**, **Montant**, **Téléphone**, **Statut**. Pas de ledger de ventes de part et d’autre sur cet écran aujourd’hui.

## Tâches liées

Carte d’écran : [Référence portefeuille contributeur](/fr/help/reference-contributor-wallet). Téléphone : [Référence paramètres contributeur](/fr/help/reference-contributor-settings). En file : [Retrait en file n’est pas un échec](/fr/help/withdrawal-queued).
