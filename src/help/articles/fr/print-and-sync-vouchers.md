---
id: own.tut.vouchers
slug: print-and-sync-vouchers
title: "Imprimer des bons et les synchroniser"
description: "Crée un stock prépayé SPAI-XXXX-XXXX, imprime des feuilles A4, synchronise optionnellement les codes inutilisés vers MikroTik, et révoque ce qu’il faut. Les bons ne créditent pas le portefeuille."
role: ["owner"]
section: tutorials
intents: ["voucher", "pdf", "sync", "print", "prepaid codes"]
buttons: ["Générer des bons", "Imprimer PDF", "Synchroniser les inutilisés vers le routeur"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.voucher-not-wallet", "tip.sync-vouchers"]
updatedAt: 2026-09-17
minutes: 12
---

Un **bon**, c’est un code d’accès prépayé que tu vends cash au comptoir — `SPAI-XXXX-XXXX` — puis l’invité le saisit sous **J’ai un bon**. Tu as déjà les XAF dans la main. **Les utilisations de bons ne créditent pas le portefeuille.** Seules les ventes MoMo réussies le font, après la commission plateforme. Si tu fixais **Portefeuille** après une soirée bons chargée et qu’il n’a pas bougé, c’est correct. Voir [Les bons ne créditent pas le portefeuille](/fr/help/vouchers-do-not-credit-wallet).

Ce job c’est générer → imprimer → optionnellement **Synchroniser les inutilisés vers le routeur**. La sync c’est pour les utilisateurs Hotspot sur le Hex pour qu’un code marche même quand tu tiens aux users on-box. Attends environ **15 secondes** après la sync, puis vérifie les **utilisateurs Hotspot** MikroTik. Détails : [Sync des bons, attendre 15 s](/fr/help/sync-unused-vouchers).

## Ce que tu auras

Un lot de codes inutilisés (1–500), un PDF A4 avec traits de coupe, et — si tu as synchronisé — ces codes inutilisés en file sur le routeur. Les codes inutilisés compromis peuvent être **Révoquer**.

## Avant de commencer

- Un site avec au moins un forfait **actif**. Le formulaire le dira s’il n’y a pas de forfait actif.
- Une imprimante ou un PDF que tu peux emmener à la papeterie. La marque sur les tickets vient de **Paramètres** → **Marque du portail** (logo, nom, accent).
- Routeur **En ligne** si tu comptes synchroniser. Sync sans planificateur commands, c’est un haussement d’épaules.
- Une liste de prix cash qui colle au forfait. N’imprime pas des tickets 1 heure pour les vendre comme 1 Go.
- Papier : filtre **Inutilisés** avant d’imprimer du stock neuf pour ne pas réimprimer des codes utilisés.

## Étapes

1. Ouvre **Bons** (raccourci téléphone : **Codes**). État vide : **Pas encore de bons**.
2. Appuie sur **Créer des bons** (bouton de page). Remplis site, forfait, **Quantité** (1–500 codes uniques), **Libellé du lot** optionnel (ex. `Promo mars`), **Fixer une date limite d’utilisation** optionnel.
3. Appuie sur **Générer des bons**. Attends **Bons créés**. Les codes ressemblent à `SPAI-XXXX-XXXX`. Tu peux **Copier tous les codes** puis **Terminé**.
4. De retour sur la liste, filtre **Inutilisés** (et le site). Appuie sur **Imprimer PDF**. Choisis **Bons par page A4** (2, 4, **6 recommandé**, 8, 10, 12). Chaque ticket contient marque, site, forfait, code, PIN WiFi, consignes d’utilisation. Appuie sur **Télécharger le PDF**.
5. Pour pousser les codes inutilisés vers le Hex : sélectionne un site, appuie sur **Synchroniser les inutilisés vers le routeur**. Chemin toast : **Synchronisation en file** — attends ~15 s que **spaihub-commands** importe, puis vérifie les utilisateurs Hotspot. Libellé court sur petit écran : **Sync vers le routeur**.
6. Si une feuille est volée ou un code a fuité sur WhatsApp, **Révoquer** les codes inutilisés. L’historique utilisé reste de l’historique.

Ne génère pas 500 codes « pour créditer Portefeuille ». Le portefeuille ne bougera pas. Un lot de 50 pour samedi au corridor est une meilleure première impression que 500 que tu perdras dans un tiroir. Indice quantité sur le formulaire : générez 1 à 500 codes uniques d’un coup.

Chaque ticket porte un PIN WiFi en plus du code `SPAI-XXXX-XXXX`. L’invité utilise encore **J’ai un bon** sur le portail — il ne **Se connecter** pas à ton tableau de bord propriétaire avec ce code. La connexion propriétaire reste l’**e-mail**. Si la marque a l’air générique sur le PDF, enregistre d’abord [la marque du portail](/fr/help/brand-the-portal), puis imprime encore. Le crédit pied de page reste **Propulsé par www.spaitrace.com** sauf accord white-label réel.

![Screenshot](about:blank)
_Emplacement capture : formulaire Générer des bons et mise en page Imprimer PDF (staging)._

## Ce que tu dois voir

- Colonnes de liste : code, site, forfait, lot, statut **Inutilisé** / **Utilisé** / **Expiré** / **Révoqué**.
- Onglet portail invité **J’ai un bon**, placeholder `SPAI-XXXX-XXXX`, **PIN** **PIN à 6 chiffres**, **Utiliser le bon**.
- **Transactions** peut montrer des lignes bons pour tes livres. **Vous gardez** s’affiche encore, mais **Portefeuille** / **Disponible au retrait** ne monte pas avec le cash des bons. Tu as déjà encaissé le cash.
- Widgets bons **Tableau de bord** : inutilisés, utilisés, expirés, taux d’utilisation.

**Révoquer** n’est pas **Expulser**. Expulser termine une session live. Révoquer arrête un code inutilisé.

## Si ça échoue

**Ce site n’a pas de forfait actif.** Crées-en un d’abord sous **Sites**, ou **Activer** un SKU désactivé sur ce site.

**Export PDF impossible.** Réessaie ; filtre moins de 500 ; vérifie la taille du logo de marque (512 Ko) si les tickets ont l’air bizarres.

**Sync échouée / Choisissez d’abord un site.** Prends le site, confirme **En ligne** et **spaihub-commands**. Attends 15 s avant de déclarer le Hex vide. Voir [sync des bons](/fr/help/sync-unused-vouchers).

**L’invité dit code invalide.** Le statut peut être utilisé, expiré, révoqué, ou mauvais forfait/site. Ne génère pas un « remplacement » que tu essaies aussi de traiter comme un crédit portefeuille MoMo.

**Le personnel a mélangé MoMo et bon dans la même dispute.** MoMo → portefeuille après commission. Bon → cash dans le tiroir. Forme ça une fois.

**Forfaits au temps imprimés, les invités demandent les Go restants.** Les bons au temps montrent encore data illimitée sur le portail. Ne lis pas les Go de plafond d’usage caché.

**La sync a dit en file mais utilisateurs Hotspot vides.** Attends les ~15 secondes pleines, confirme **En ligne**, confirme **spaihub-commands**. Synchroniser pendant **Hors ligne** ne met en file que de l’espoir. Recolle le script 2 si commands manque — ça ne doit pas expulser en masse. Puis sync encore.

**Codes sur papier, invités encore sur Payer en MoMo.** Oriente-les vers l’onglet **J’ai un bon**. MoMo c’est l’autre produit ; il crédite **Portefeuille** après commission. Mélanger les deux dans une phrase, c’est comme ça que le comptable se fâche.

Quand le cash-out MoMo est le but, utilise [Premier retrait MoMo](/fr/help/first-withdrawal), pas plus de feuilles PDF. Le papier c’est pour le tiroir. Le portefeuille c’est pour Campay.
