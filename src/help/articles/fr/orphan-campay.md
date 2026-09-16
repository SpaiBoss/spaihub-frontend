---
id: tip.paid-no-wifi
slug: orphan-campay
title: "Le paiement a réussi, le WiFi non"
description: "Campay peut montrer SUCCESS pendant que le grant local est encore FAILED. Vérifier le paiement récupère ça. Les paiements en attente survivent au rechargement. Ne facture pas l’acheteur deux fois."
role: ["owner"]
section: pro-tips
intents: ["campay orphelin", "payé pas de wifi", "vérifier le paiement", "SUCCESS FAILED"]
buttons: ["Vérifier le paiement", "Payer", "Connecter", "Script de setup"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.paid-no-wifi", "glossary.commands"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

**Campay** est le rail MoMo derrière **Payer … XAF**. L’acheteur approuve sur le téléphone. Campay peut rapporter **SUCCESS** même si SpaiHub a ensuite échoué à créer l’utilisateur hotspot (routeur hors ligne en vol, planificateur commands manquant, timeout).

Un **paiement orphelin**, c’est ce cerveau fendu : l’argent a bougé, le Wi‑Fi non. Le bouton portail **Vérifier le paiement** est comment le téléphone demande à SpaiHub de réconcilier Campay et finir le grant.

**En attente** = Campay n’a pas fini. Le portail garde ça au rechargement : **Vous pouvez fermer cette page et revenir — on reprendra où vous vous êtes arrêté.** et **Toujours en attente du MoMo. Appuyez sur « Vérifier le paiement » si vous avez déjà payé.**

**FAILED** sur le grant local n’est pas la même chose que Campay a échoué. Le personnel mélange ces mots au comptoir. Demande quel écran.

## Pourquoi c’est important

Samedi 21 h, Bonamoussadi : le SMS de débit MTN est arrivé, la page captive a dit **Paiement échoué** ou est restée sur **Validez le MoMo sur votre téléphone**, le Wi‑Fi encore verrouillé. L’acheteur est en colère devant le groupe. Le mauvais geste : **Payer** encore. Tu peux double-facturer. Le bon geste : **Vérifier le paiement**, puis script 2 si **Sessions** ne devient jamais **Sur le routeur**.

Mauvais diagnostic : « Campay a volé l’argent. » Souvent Campay a réussi et `spaihub-commands` manquait, donc le GRANT n’a jamais importé. Mauvais diagnostic : « dis-leur de payer Orange à la place. » Même portail, même planificateur commands.

Le heartbeat **En ligne** est obligatoire pour *démarrer* un nouveau MoMo. Il ne finit pas un grant tout seul.

## Ce que tu vois

Sur le portail :

- **Validez le MoMo sur votre téléphone** pendant l’attente.
- **Vérifier le paiement** / **Vérification...**
- **Annuler et recommencer** — ne t’en sers pas comme second paiement. Annuler, c’est pour abandonner un en attente coincé, pas pour réessayer un succès.
- Après succès : **Accès prêt**, **Identifiant**, **PIN WiFi**, **Connecter**.
- **Routeur hors ligne — le Mobile Money est indisponible jusqu’à la reconnexion.** si tu n’aurais pas dû démarrer Payer du tout.

Sur **Sessions** : téléphone, forfait, **Sur le routeur** vs **Non vu**. **Non vu** après un succès Campay = le grant n’a jamais importé ou le téléphone ne s’est jamais connecté.

**Transactions** propriétaire montrera la vente MoMo quand SpaiHub l’a enregistrée. Le cash des bons, c’est une autre histoire.

## Quoi faire

Ce soir, au comptoir :

1. Regarde le statut du routeur. Si **Hors ligne**, ne prends pas un autre MoMo. Répare le heartbeat d’abord.
2. Sur le **même téléphone** qui a payé, ouvre la page captive (ou **Prévisualiser le portail** seulement si c’est le même routeur et qu’il est en ligne — le vrai SSID est mieux).
3. Appuie sur **Vérifier le paiement**. Attends. L’identifiant doit être les **chiffres du téléphone** MoMo, pas l’e-mail propriétaire.
4. Si les identifiants apparaissent, appuie sur **Connecter**. Attends **Préparation du routeur…** plutôt que de payer encore.
5. Si les identifiants apparaissent mais **Sessions** reste **Non vu**, colle **2. Connecter à SpaiHub**. Attends 15 s. Confirme `spaihub-commands`.
6. L’en attente survit au rechargement. S’ils attendent encore le PIN MoMo, ils doivent approuver sur le téléphone, pas payer un second forfait.

N’invente pas une histoire de remboursement tant que le statut n’est pas vérifié. Ne prends pas du cash « parce que MoMo a échoué » si le SMS de débit est déjà arrivé — vérifie le statut d’abord.

## Quoi ne pas dire

- Ne dis pas « paie encore, le premier a expiré » tant que **Vérifier le paiement** et Campay n’ont pas vraiment échoué.
- Ne leur dis pas le reste de Go du plafond d’usage comme bavardage de compensation.
- Ne promets pas que tu peux inverser un MoMo depuis l’app propriétaire SpaiHub. Tu vends de l’accès ; tu ne gères pas l’admin Campay ici.
- N’accuse pas l’onglet bon. Cet incident, c’est MoMo.
