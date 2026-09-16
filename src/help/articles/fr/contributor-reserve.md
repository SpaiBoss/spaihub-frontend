---
id: tip.contributor-reserve
slug: contributor-reserve
title: "Disponible vs réservé aux contributeurs"
description: "Le Portefeuille propriétaire sépare Solde disponible et Réservé aux contributeurs. Les accruals OPEN contributeur vivent dans cette réserve. Le contributeur lui-même voit un seul solde, sans split réserve."
role: ["owner"]
section: pro-tips
intents: ["réservé aux contributeurs", "solde disponible", "accruals OPEN"]
buttons: ["Portefeuille", "Solde disponible", "Disponible au retrait", "Retirer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.wallet", "own.tut.withdraw"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Solde disponible** / **Disponible au retrait** = les XAF que tu peux envoyer vers MoMo avec **Retirer**. C’est le total portefeuille moins ce qui est réservé.

**Réservé aux contributeurs :** = des XAF tenus parce qu’un **contributeur** (quelqu’un dont l’uplink de rechange SpaiHub a attaché à un hotspot) a des **accruals OPEN** — des gains pas encore payés. Cette réserve finance leur futur **Retirer**, pas ta caisse.

**Solde contributeur** sur l’app contributeur est **un seul** chiffre. Ils ne voient pas Disponible vs Réservé. Ne leur dis pas de « vérifier le split réserve ». Ils ne peuvent pas.

Un **accrual OPEN** est de la compta pour les Go qu’ils ont déjà contribués au tarif convenu. Tu ne gères pas les accruals dans le **Portefeuille** propriétaire. Tu ne peux juste pas retirer la tranche réservée.

Le cash des bons n’a rien à voir. Les bons n’entrent jamais dans ce split.

## Pourquoi c’est important

Incident : un propriétaire dans un couloir à Yaoundé a vu **Total portefeuille** 80 000 XAF, a appuyé sur **Retirer** pour 80 000, a eu une erreur que des milliers de XAF sont réservés aux contributeurs. Il a cru qu’un retrait était **en file** (ou avait échoué) parce que Campay était down. C’était la réserve. **Max … XAF disponibles** sur la fenêtre, c’est le chiffre qui compte.

Mauvais diagnostic : « les contributeurs ont volé mes ventes MoMo. » Les ventes MoMo te créditent encore après la commission. La réserve est une retenue pour les paiements d’uplink, pas une deuxième ligne de commission silencieuse que tu inventes au comptoir.

Mauvais diagnostic : « je dois dire au contributeur de retirer pour que mon Disponible monte ce soir. » Leur retrait, quand il réussit, c’est comme ça que la réserve se libère. Tu ne le pousses pas depuis un outil admin caché dans cette Aide.

Si **Réservé aux contributeurs :** est 0, la ligne peut ne pas te stresser. Quand ce n’est pas 0, lis **Disponible au retrait** deux fois avant de promettre au téléphone de la boutique un payout du total portefeuille le même soir.

## Ce que tu vois

**Portefeuille** propriétaire :

- **Solde disponible**
- **Total portefeuille : … XAF**
- **Réservé aux contributeurs :** (quand non zéro)
- **Retirer** / **Retirer vers MoMo**
- Fenêtre **Demander un retrait** : **Montant (XAF)**, **Numéro de téléphone**, **Méthode de paiement**, **Max {{amount}} XAF disponibles**, **Valider le retrait**
- **Historique des retraits** — pas un tableau ledger comptable de chaque vente hotspot

**Portefeuille** contributeur : **Solde contributeur**, **Retirer**, historique. Un solde.

Si tu demandes plus que disponible : solde disponible insuffisant, XAF réservés cités dans l’erreur.

## Quoi faire

1. Retire seulement **Disponible au retrait**.
2. Si la réserve est grosse et que tu as besoin de cash, c’est un timing de payout contributeur, pas un bug de bons et pas un problème plafond d’usage abonné.
3. Explique au personnel : « le chiffre vert, c’est ce qu’on peut MoMo vers le téléphone de la boutique ce soir. »
4. Ne double-tape pas **Valider le retrait**. En file a la forme d’un succès, pas une raison de réessayer le même montant tout de suite.
5. Ne mélange jamais cette conversation avec le reste de Go abonné. Univers différents.

## Quoi ne pas dire

- Ne dis pas à un contributeur « ton argent est dans ma ligne Réservé, va le splitter. » Ils voient un solde.
- Ne dis rien aux abonnés sur la réserve contributeur.
- Ne promets pas le reste de Go du plafond d’usage comme si ça finançait la réserve.
- Ne documente pas les écrans admin de metering ici. L’Aide propriétaire s’arrête aux chiffres portefeuille de cette page.
