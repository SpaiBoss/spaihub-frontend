---
id: own.ref.portal
slug: reference-portal-preview
title: "Portail captif (ce que voient les invités)"
description: "Carte propriétaire de la page invité : Payer en MoMo, J’ai un bon, Vérifier le paiement, Connecter au WiFi maintenant, déconnexion famille, bannière plafond d’usage (pas de Go restants), routeur hors ligne, Réessayer, Ouvrir dans le navigateur."
role: ["owner"]
section: reference
intents: ["reference", "reference-portal-preview", "momo", "voucher redeem"]
buttons: ["Payer en MoMo", "J’ai un bon", "Vérifier le paiement", "Annuler et recommencer", "Connecter au WiFi maintenant", "Déconnecter cet appareil", "Terminer pour tous les appareils", "Réessayer", "Ouvrir dans le navigateur"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.preview", "own.tut.paid-no-wifi", "tip.fair-use-message"]
updatedAt: 2026-09-16
minutes: 13
---

## À quoi sert cette page

Cet article est une **carte propriétaire du portail captif invité** — la page téléphone que les clients voient sur votre hotspot (et l’onglet qui s’ouvre depuis **Sites** → **Prévisualiser le portail**). Vous ne « configurez » pas cette page ici ; vous la marquez dans **Paramètres** et vous vendez des forfaits dans **Sites**. Le personnel doit connaître chaque bouton qu’un client peut toucher pour pouvoir le guider dans la boutique.

**Prévisualiser le portail n’a pas besoin d’un Hex en direct.** **Dernier contact : Jamais** est normal. La prévisualisation utilise l’URL du jeton routeur. **Connecter au WiFi maintenant** ne marche que quand le téléphone a ouvert cette page depuis le login captif MikroTik (`link-login`). Depuis une prévisualisation bureau vous voyez encore forfaits, MoMo et bons ; on peut vous dire de saisir **Identifiant** et **PIN** sur le login hotspot à la place.

Les invités ne voient jamais les gigaoctets restants d’usage raisonnable. Après qu’un plafond caché les coupe, ils voient **Plafond d’usage atteint. Achetez un autre forfait pour continuer.**

## Vocabulaire

**Portail captif** — la page que le téléphone ouvre avant que l’internet soit libre. La page **SpaiHub**, avec votre marque.

**Identifiant** — pour Mobile Money, les **chiffres du téléphone** que l’invité a tapés. C’est l’identifiant hotspot. Le PIN est le secret.

**PIN** — six chiffres. Après MoMo, affiché comme **PIN WiFi**. Pour les bons, imprimé sur le ticket ; tapé sur **J’ai un bon**.

**Campay** — l’invite MoMo sur le téléphone du client (MTN ou Orange).

**Forfait famille** — forfait **Appareils simultanés** supérieur à 1. Texte du portail : **Forfait famille — jusqu’à N appareils peuvent partager ce code.** Boutons extra : **Déconnecter cet appareil** / **Terminer pour tous les appareils**.

**Plafond d’usage** (forfaits au temps) — plafond caché au propriétaire. Les acheteurs voient encore **Data illimitée pendant cette période**. Les forfaits au volume montrent plutôt **Volume : …**.

**Routeur hors ligne** — heartbeat parti. **Routeur hors ligne — le Mobile Money est indisponible jusqu’à la reconnexion.** L’utilisation d’un bon peut encore être tentée ; le paiement MoMo est bloqué.

## Tous les contrôles

### Chrome

En-tête : votre logo ou nom de marque, **Changer de langue** (**EN** / **FR**). Pied : **Propulsé par www.spaitrace.com**.

### Échecs de chargement

**Chargement du portail…** pendant la récupération.

Si le chargement est trop lent ou échoue : **Le portail met trop de temps. Réessayez ou ouvrez dans le navigateur.** Boutons **Réessayer** et **Ouvrir dans le navigateur**.

**Routeur introuvable ou indisponible** — mauvais jeton ou routeur non publié.

### Pas de forfaits

**Aucun forfait internet n’est encore disponible ici. Revenez plus tard ou demandez au personnel.** Ajoutez un forfait **Actif** sous **Sites**.

### Bannière **Plafond d’usage atteint**

Encadré ambre : **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** **Fermer** cache la bannière pour cette visite. Il n’y a pas de chiffre de Go restants. Voir [Message d’usage, jamais les Go restants](/fr/help/fair-use-guest-message).

### Bannières routeur

**Routeur hors ligne — le Mobile Money est indisponible jusqu’à la reconnexion.**

Ou **Connexion routeur dégradée — les paiements peuvent tarder.**

### Liste de forfaits (écran d’achat)

Nom du site, texte d’accueil (depuis la marque ou **Payez en Mobile Money pour vous connecter tout de suite**). Les forfaits au temps se résument **… de navigation · Data illimitée**. Les forfaits au volume montrent volume + expiration. **Jusqu’à N appareils** si partagé. Mo/s d’envoi seulement si vous avez activé **Afficher le débit montant sur les forfaits**.

L’invité appuie sur un forfait, puis un onglet.

### Onglet **Payer en MoMo**

Champ téléphone placeholder **6XX XXX XXX**. Indication : **Paiement Campay — votre numéro devient l’identifiant WiFi. Un PIN s’affiche après paiement ; puis appuyez sur Connecter.** Ligne opérateur **MTN Mobile Money détecté** / **Orange Mobile Money détecté**.

Principal **Payer N XAF** (occupé **Traitement...**). Erreurs **Paiement échoué**, **Choisissez un forfait**, **Paiement échoué. Réessayez.**

### Attente MoMo

**Validez le MoMo sur votre téléphone**

**Votre identifiant WiFi et votre PIN s’affichent ici dès que Campay confirme.**

**L’identifiant sera 6XXXXXXXX**

**Vérifier le paiement** (occupé **Vérification...**) — le personnel doit s’en servir si Campay a réussi mais que la page tourne encore. Récupère un SUCCESS orphelin. Tutoriel : [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi).

**Annuler et recommencer** (occupé **Annulation...**). Échec **Impossible d’annuler le paiement. Réessayez.**

**Vous pouvez fermer cette page et revenir — on reprendra où vous vous êtes arrêté.**

Texte de délai : **Toujours en attente du MoMo. Appuyez sur « Vérifier le paiement » si vous avez déjà payé.**

### Onglet **J’ai un bon**

**Code du bon** placeholder **SPAI-XXXX-XXXX**.

**PIN** placeholder **PIN à 6 chiffres**.

**Utiliser le bon** (occupé **Validation...**). Erreur **Code de bon invalide** (ou texte serveur). Il faut le code et six chiffres de PIN.

### Accès prêt

**Accès prêt**, nom du forfait, **Notez identifiant et PIN, puis connectez-vous au WiFi quand le routeur est prêt.**

Compte à rebours **Temps restant** (puis **Expiré** / **Session expirée. Choisissez un forfait pour renouveler.**).

Phrase famille si partagé.

Forfait au temps : **Data illimitée pendant cette période** (même si vous avez posé un plafond caché). Forfait au volume : **Volume : N Go**.

### **Identifiants WiFi — notez-les**

**Identifiant** et **PIN** (libellé **PIN** dans le panneau d’identifiants ; nom de champ **PIN WiFi** ailleurs).

Si l’URL de login MikroTik existe :

- Bouton compte à rebours **Préparation du routeur… Ns (appuyez pour essayer)** puis **Connecter au WiFi maintenant**.
- Pendant la préparation : **Vos identifiants restent ici. Attendez l’import sur le routeur, puis connectez-vous.**
- Après : **Si ça échoue, attendez quelques secondes et réessayez.**

Si vous avez ouvert la prévisualisation dans un navigateur normal sans `link-login` captif :

**Ouvrez ce portail depuis la page captive WiFi pour que Connecter soit disponible, ou saisissez ces identifiants sur le hotspot.**

### **Déconnexion** un appareil

**Déconnexion** (occupé **Déconnexion...**). Échec **Impossible de se déconnecter. Réessayez.**

### Famille **Déconnecter cet appareil** / **Terminer pour tous les appareils**

**Déconnecter cet appareil** (occupé **Déconnexion...**) — ce téléphone seulement. Échec **Impossible de déconnecter cet appareil. Réessayez.**

**Terminer pour tous les appareils** (occupé **Fin de session...**) — tout le code d’accès.

## États vides et erreurs

Couverts ci-dessus : pas de forfaits, routeur manquant, délai de chargement avec **Réessayer** / **Ouvrir dans le navigateur**, échecs payer / bon / annuler / déconnecter en toasts ou lignes rouges sur la carte.

**Session expirée** ramène l’invité à la liste de forfaits.

Prévisualiser sans matériel ne connectera pas magiquement un ordinateur portable au SSID boutique. Servez-vous-en pour vérifier marque, prix, et textes.

## Ce que cette page ne fait pas

- Elle ne montre pas les Go restants d’usage raisonnable. Jamais. Les propriétaires voient les plafonds sur **Sites** → **Forfaits** → **Détails**.
- Elle ne laisse pas les invités choisir MTN vs Orange dans une liste — le numéro est détecté.
- Elle n’imprime pas de bons. **Bons** dans l’app propriétaire.
- Elle n’affiche pas votre **Portefeuille**.
- **Prévisualiser le portail** n’est pas un test de débit et n’exige pas le statut **En ligne**.

Ne dites jamais à un invité « il te reste N Go ». Après coupure, la bannière est **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** **Fermer** cache la bannière pour cette visite ; ça ne rend pas de data.

Cette version n’a pas de cloche ni de préférences de notification côté propriétaire. Un paiement coincé se résout avec **Vérifier le paiement**, pas avec une alerte dans **Paramètres**.

**Prévisualiser le portail** depuis **Sites** est l’outil personnel. La vraie page captive a **Connecter au WiFi maintenant** seulement depuis `link-login`. Expliquez ça au personnel avant qu’ils déclarent le bouton cassé depuis le bureau.

## Tâches liées

- Ouvrir la prévisualisation depuis Sites : [Prévisualiser le portail captif](/fr/help/preview-captive-portal).
- Prévisualiser avec **Jamais vu** : [Prévisualiser sans matériel](/fr/help/preview-without-hardware).
- Payé, encore captif : [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi).
- L’identifiant est le téléphone : [L’identifiant MoMo est le numéro](/fr/help/username-is-phone).
