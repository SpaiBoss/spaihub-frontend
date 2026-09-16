---
id: own.tut.preview
slug: preview-captive-portal
title: "Prévisualiser le portail captif"
description: "Ouvre la même page WiFi invité que les acheteurs verront, même si Dernier contact est Jamais et qu’aucun MikroTik n’est en ligne."
role: ["owner"]
section: tutorials
intents: ["preview", "portal", "captive portal", "preview portal", "no hardware"]
buttons: ["Ajouter un routeur", "Prévisualiser le portail"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.time-package", "tip.preview-first"]
updatedAt: 2026-09-16
minutes: 8
---

Le **portail captif**, c’est la page qu’un invité voit en rejoignant ton hotspot : **Payer en MoMo** ou **J’ai un bon**. SpaiHub te laisse ouvrir cette page depuis le tableau de bord avec **Prévisualiser le portail**. Tu n’attends pas un Hex au mur. **Dernier contact : Jamais (normal sans MikroTik)** est le libellé attendu jusqu’au heartbeat du script de connexion.

C’est le move calme Douala : dessine les prix et la marque sur un laptop au comptoir, puis colle les scripts quand le technicien arrive. Voir aussi [Prévisualiser sans matériel](/fr/help/preview-without-hardware).

## Ce que tu auras

Une **ligne** routeur sur le site (physique ou CHR — la ligne suffit). Un nouvel onglet navigateur avec la page invité de ce routeur. Tu peux appuyer sur les forfaits, lire **Data illimitée** sur les plans au temps, et confirmer ta **Marque du portail**. Tu ne peux pas terminer un grant MoMo live sur une boîte **Hors ligne**, et le portail le dira.

La prévisualisation ne remplace pas [Confirmer En ligne et un paiement MoMo test](/fr/help/test-momo-online). Elle prouve la page, pas le heartbeat.

## Avant de commencer

- Au moins un site. Si **Aucun site pour l’instant**, fais [Ajouter un site sans routeur](/fr/help/add-location).
- Au moins un forfait **actif** si tu veux que le catalogue montre des prix. Avec zéro forfait, la page invité dit **Aucun forfait internet n’est encore disponible ici. Revenez plus tard ou demandez au personnel.** Ajoute d’abord un [forfait au temps](/fr/help/create-time-package) si tu tiens à ce texte.
- Optionnel : **Paramètres** → **Marque du portail** pour que la preview montre ton nom au lieu des défauts.
- Un navigateur qui peut ouvrir un second onglet. Le téléphone va.

Tu n’as **pas** besoin du script 1, du script 2, de Campay, ni d’un SSID.

## Étapes

1. Ouvre **Sites**, déplie le site, ouvre **Routeurs**.
2. Si la liste est vide, appuie sur **Ajouter un routeur**. Remplis **Nom du routeur** (pour toi : « Hex Akwa », « CHR Bastos »). Choisis **Type de routeur** : **MikroTik physique** (Hex / hAP) ou **MikroTik CHR** (VM cloud). Pour une première preview, **MikroTik physique** suffit même si la boîte est encore dans le carton.
3. Appuie sur **Ajouter un routeur** (ou **Ajouter le CHR et ouvrir l’assistant** si tu as choisi CHR et veux l’assistant maintenant — tu peux encore prévisualiser plus tard avec **Prévisualiser le portail**).
4. Sur la ligne routeur, confirme que **Dernier contact** peut être **Jamais (normal sans MikroTik)**. Ce n’est pas cassé.
5. Appuie sur **Prévisualiser le portail**. Un nouvel onglet ouvre la page invité.

Sur cette page tu dois voir **Payer en MoMo** et **J’ai un bon**. Les forfaits au temps annoncent la durée de navigation et **Data illimitée** — ils ne montrent pas un numéro de gigaoctets restants. Les forfaits au volume montrent **Volume de téléchargement**. Les forfaits famille peuvent dire **Jusqu’à N appareils**.

Parcours les états vides : aucun forfait sélectionné, placeholder du champ bon `SPAI-XXXX-XXXX`, champ PIN **PIN à 6 chiffres**. Ne prélève pas le MoMo d’un client ici sauf si le routeur est **En ligne** et que tu veux vraiment un test réel.

![Screenshot](about:blank)
_Emplacement capture : ligne routeur avec Dernier contact Jamais et Prévisualiser le portail (staging)._

## Ce que tu dois voir

- Ligne routeur du tableau de bord : nom, statut **Hors ligne** ou jamais vu, actions **Script de setup** (physique) ou **Setup CHR** (CHR), **Prévisualiser le portail**, **Retirer**.
- Onglet invité : ton **Nom de marque sur le portail** si tu as enregistré la marque, sinon les défauts SpaiHub. Texte d’accueil du genre **Payez en Mobile Money pour vous connecter tout de suite**.
- **Propulsé par www.spaitrace.com** reste sur la page captive.
- Si le routeur est **Hors ligne**, **Payer {{amount}} XAF** est bloqué avec **Routeur hors ligne — le Mobile Money est indisponible jusqu’à la reconnexion.** La preview marche encore ; payer non. **Dégradé** avertit que les paiements peuvent tarder.

Sens du statut, pour plus tard : **En ligne** veut dire un heartbeat dans les 2 dernières minutes ; **Dégradé** c’est 2–5 minutes ; **Hors ligne** c’est jamais, ou plus de 5 minutes.

## Si ça échoue

**Prévisualiser le portail manquant.** Tu dois avoir une **ligne** routeur. **Ajouter un routeur** d’abord. Le site tout seul n’a pas de lien portail.

**Nouvel onglet vide ou « Routeur introuvable ».** Réessaie depuis la même ligne. Ne colle pas des URL au hasard de vieux chats. Si tu as **Retirer** le routeur, l’ancien lien preview meurt.

**Pas de forfaits sur la page.** Ajoute un forfait actif sous **Forfaits** → **Ajouter un forfait**. Les forfaits **Désactiver** ne se vendent pas.

**Ça a l’air sans marque.** **Paramètres** → **Marque du portail** → **Enregistrer la marque**. Règles logo : PNG, JPEG, ou WebP, 512 Ko ou moins. Voir [Marquer le portail captif](/fr/help/brand-the-portal).

**Je pensais que Preview mettrait les téléphones en ligne.** Non. Le heartbeat plus le planificateur **commands** accorde le WiFi. Preview, c’est la vitrine. Job matériel suivant : [Hex physique — hotspot existant (script 1 puis 2)](/fr/help/setup-mikrotik-hex-existing) ou [CHR](/fr/help/setup-chr), puis un [test MoMo](/fr/help/test-momo-online) pas cher.

**Payer en MoMo est grisé pendant que je prévisualise.** Si la ligne est **Hors ligne**, c’est correct. Tu peux encore lire les noms de forfaits, **J’ai un bon**, et la marque. Prélever un vrai MoMo dans cet état, c’est comme ça qu’on crée un paiement orphelin. Attends **En ligne**, ou reste en preview-only.

**Le texte invité dit Data illimitée.** C’est un forfait au temps qui fait son job. Les forfaits au volume montrent **Volume de téléchargement**. Ne « corrige » pas la page invité en citant un numéro de plafond d’usage caché depuis **Détails**.
