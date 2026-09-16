---
id: own.tut.branding
slug: brand-the-portal
title: "Marquer le portail captif"
description: "Règle le nom affiché, le texte d’accueil, l’accent, et un logo de 512 Ko ou moins pour que les invités du corridor voient ta boutique, pas un défaut vide."
role: ["owner"]
section: tutorials
intents: ["branding", "logo", "portal branding", "accent", "welcome text"]
buttons: ["Enregistrer la marque"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.logo-512", "own.ref.settings"]
updatedAt: 2026-09-16
minutes: 10
---

**Marque du portail**, c’est ce que les abonnés voient en rejoignant le WiFi : nom de boutique, ligne d’accueil, couleur, logo. Ce n’est pas le **Nom affiché** propriétaire utilisé seulement dans le tableau de bord, même si tu peux les garder proches. Tu changes la marque sous **Paramètres**. Liste complète des contrôles : [Référence paramètres](/fr/help/reference-settings).

Il n’y a **pas de cloche de notification** dans cette version. Ne cherche pas des préférences d’alerte. L’Aide décrit ce qui est à l’écran aujourd’hui.

**Propulsé par www.spaitrace.com** reste sur le portail captif. La case est toujours activée. Le retrait white-label c’est un accord sur mesure — cet article ne prétendra pas que tu peux le cacher avec un interrupteur.

## Ce que tu auras

Page invité et PDF de bons qui montrent ton **Nom de marque sur le portail**, logo optionnel, couleur d’accent, et **Texte d’accueil**. **Afficher le débit montant sur le portail** reste **désactivé** par défaut — le débit c’est un outil propriétaire, pas quelque chose à discuter dans la file.

## Avant de commencer

- **Se connecter** en propriétaire. **Paramètres** est dans la nav (pas une cloche).
- Un fichier logo si tu en veux un : **PNG, JPEG, ou WebP**, **512 Ko ou moins**. Servi via SpaiHub, pas un bucket public collé depuis Facebook. Si le fichier est une photo téléphone 4 Mo, compresse-le d’abord. Voir [Logo 512 Ko max](/fr/help/logo-512kb).
- Un accueil court dans la langue que ton corridor parle vraiment. Énergie placeholder : **Payez avec MoMo pour vous connecter**.
- Optionnel : [Prévisualiser le portail](/fr/help/preview-captive-portal) ouvert dans un autre onglet pour rafraîchir après enregistrement.

Les changements de mot de passe sont la même page **Paramètres** (**Mot de passe actuel**, **Nouveau mot de passe**, **Mettre à jour**) mais ce n’est pas la marque. Fais-les à part pour ne pas mélanger un logo échoué avec un toast mot de passe.

## Étapes

1. Ouvre **Paramètres**.
2. Si tu as besoin du nom tableau de bord tout de suite : **Nom affiché** / **Nom complet** → **Enregistrer le nom**. C’est ton profil, pas forcément le titre captif.
3. Descends jusqu’à **Marque du portail** (**Marque du portail captif**). Sous-titre : ce que voient les abonnés ; laisse vide pour les valeurs SpaiHub.
4. **Nom de marque sur le portail** — ex. `Mbingfibieh WiFi` ou `Akwa Corridor`. C’est ce que les tickets et l’en-tête invité doivent dire.
5. **Texte d’accueil** / **Message d’accueil** — une ligne honnête. Ne promets pas de Go restants sur les plans au temps.
6. **Couleur d’accent** — choisis quelque chose qui laisse **Payer {{amount}} XAF** lisible sous le soleil de midi.
7. **Logo** : **Téléverser une image**. Attends **Logo téléversé**. Si tu le remplaces, l’ancien fichier est parti. Tu peux le retirer (**Logo retiré**).
8. Laisse **Afficher le débit montant sur le portail** décoché sauf si tu veux vraiment que les invités voient **N Mo/s en envoi** sur les forfaits.
9. Laisse le crédit Propulsé par comme il est (toujours affiché).
10. Appuie sur **Enregistrer la marque**. Toast **Marque du portail enregistrée**.
11. **Sites** → routeur → **Prévisualiser le portail**. Confirme en-tête, accueil, logo, **Payer en MoMo**, **J’ai un bon**, et la ligne Propulsé par.

Imprime un PDF de bon d’échantillon si tu vends papier : l’aperçu de marque sur **Imprimer PDF** suit cet enregistrement.

![Screenshot](about:blank)
_Emplacement capture : Paramètres Marque du portail avec Enregistrer la marque (staging)._

## Ce que tu dois voir

- Titre captif = nom de marque, pas seulement un générique **Hotspot WiFi**.
- Les forfaits au temps toujours **Data illimitée** — la marque ne révèle pas le plafond d’usage caché.
- Les forfaits famille peuvent encore dire **Jusqu’à N appareils**.
- **Aperçu** sur la carte marque peut montrer un site exemple ; le **Prévisualiser le portail** live est la source de vérité pour une vraie ligne routeur.

**Statut du compte** **Actif** reste sur la même page. La connexion e-mail ne change pas.

## Si ça échoue

**Le logo doit faire 512 Ko ou moins.** Compresse. Mauvais type ? Utilise PNG, JPEG, ou WebP — pas un PDF de l’enseigne. [Logo 512 Ko max](/fr/help/logo-512kb).

**Impossible d’enregistrer la marque / Impossible de téléverser le logo.** Réessaie une fois ; vérifie le fichier ; ne colle pas une URL de tracking d’app sociale comme « URL du logo » sauf si tu sais que c’est une image https stable.

**Les invités voient encore l’ancien nom.** Rafraîchis fort la page captive, ou ils sont sur un HTML hotspot en cache. Le HTML script 1 redirige vers le portail ; la marque c’est le portail, pas un titre WinBox.

**J’ai coupé Propulsé par et ça est revenu.** C’est toujours affiché. Contacte SpaiTrace pour le white-label si c’est un vrai contrat, pas un interrupteur Aide.

**Afficher le débit montant a embrouillé les clients.** Recoupe. Vends la durée et (pour les SKU data) **Volume de téléchargement**. Les bagarres de débit commencent au comptoir.

**Cherché une cloche pour prévisualiser des captures.** Pas livré. Utilise **Prévisualiser le portail**.

Lié : [Référence paramètres](/fr/help/reference-settings). La prochaine vérif live pas chère reste [test MoMo](/fr/help/test-momo-online).

Un bon en-tête Akwa c’est le nom de boutique que les gens crient déjà, un accueil en français ou en anglais qui colle au corridor, et un logo vraiment sous 512 Ko. Les PDF de bons prennent la même marque. **Afficher le débit montant sur le portail** reste coupé pour que tu vendes du temps et (pour les SKU data) du volume, pas une dispute sur les mégaoctets par seconde au comptoir. Les changements de mot de passe restent sur **Paramètres** avec **Mettre à jour** — tap séparé, toast séparé.
