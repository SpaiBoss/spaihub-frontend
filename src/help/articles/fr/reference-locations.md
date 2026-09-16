---
id: own.ref.locations
slug: reference-locations
title: "Référence sites"
description: "Carte exhaustive de Sites : ajouter un site, routeurs (physique vs CHR), forfaits, sessions, politique d’accès, chaque bouton et toast."
role: ["owner"]
section: reference
intents: ["reference", "reference-locations", "router", "package", "chr"]
buttons: ["Ajouter un site", "Suspendre", "Activer", "Modifier le site", "Ajouter un routeur", "Script de setup", "Setup CHR", "Prévisualiser le portail", "Retirer", "Ajouter un forfait", "Désactiver", "Expulser", "Enregistrer la politique", "Créer", "Ajouter le CHR et ouvrir l’assistant"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.location", "own.tut.hex-existing", "own.tut.time-package", "own.ref.sessions", "own.ref.access-policy"]
updatedAt: 2026-09-16
minutes: 14
---

## À quoi sert cette page

**Sites** est le plancher boutique de **SpaiHub**. Un **site** est un hotspot — un couloir, un lavage auto, un kiosque campus — avec son nom, son adresse, ses routeurs, ses forfaits, ses sessions en direct, et le repli de politique d’accès. Vous créez le site ici, vous y accrochez un MikroTik (ou un CHR cloud), vous tarifez l’internet, et vous prévisualisez la même page que les invités voient en rejoignant le Wi‑Fi.

Ouvrez **Sites** dans la barre latérale (téléphone : **Sites**). Titre **Sites**. Sous-titre **Hotspots, routeurs et forfaits.** La ligne de compte lit **1 site** ou **N sites**.

Vous pouvez ajouter un site **sans** routeur physique. Les forfaits et **Prévisualiser le portail** fonctionnent avant qu’un Hex soit en ligne. **Dernier contact : Jamais (normal sans MikroTik)** est le défaut honnête.

Cet article cartographie chaque contrôle présent sur cette page aujourd’hui, y compris les modales d’ajout/modification, le setup script 1 / script 2, et l’assistant CHR qui s’ouvre depuis une ligne de routeur.

## Vocabulaire

**Site** — un lieu de vente. Suspendez-le pour arrêter les nouvelles ventes du portail sans effacer l’historique.

**MikroTik physique** — un Hex, hAP, ou boîtier similaire dans la boutique. Vous collez deux scripts dans Winbox / le terminal.

**CHR** (Cloud Hosted Router) — RouterOS MikroTik dans une machine virtuelle. Pas de Wi‑Fi intégré. Vous branchez encore un point d’accès ou un switch sur le pont LAN. Les lignes affichent un badge **CHR**.

**Heartbeat** — le routeur qui se signale à SpaiHub. **Dernier contact** est cette heure.

**Forfait** — ce qu’un invité achète. **Au temps** est une durée de navigation (les acheteurs voient des données illimitées ; vous pouvez cacher un plafond d’usage). **Au volume** est un volume de téléchargement à consommer avant expiration.

**Plafond d’usage** — Go visibles seulement au propriétaire sur un forfait au temps. La colonne **Détails** vous les montre **à vous**. Les invités voient encore une navigation illimitée. Quand le routeur les coupe, le portail dit **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** Ne dites jamais à un invité les Go restants.

**Code d’accès** — la paire identifiant + PIN après MoMo ou utilisation d’un bon. **Appareils simultanés** sur le forfait est le nombre de MAC Wi‑Fi distinctes qui peuvent partager cette paire.

**NAT / répéteur bon marché** — un hotspot téléphone ou un répéteur bon marché en **mode routeur** cache chaque appareil derrière une seule MAC WAN. SpaiHub et MikroTik voient **un** client. **Sur le routeur** n’est pas un décompte de téléphones dans la maison.

**Script 1** — overlay hotspot (walled garden, PAP, HTML captif). **Script 2** — connexion à SpaiHub (heartbeat + `spaihub-commands`).

## Tous les contrôles

### État vide : **Aucun site pour l’instant**

Si la liste est vide :

- Titre : **Aucun site pour l’instant**
- Corps : **Ajoutez votre premier hotspot pour déployer des routeurs et vendre des forfaits.**
- **Ajouter un site**
- **Lire le guide** — ouvre l’article d’aide de cette étape ([Ajouter un site sans routeur](/fr/help/add-location)).

Vous n’avez pas besoin d’un Hex dans la boutique pour appuyer sur **Ajouter un site**.

### **Ajouter un site** (en-tête et état vide)

Ouvre une modale titrée **Ajouter un site**.

- **Nom du site** — boutique ou quartier, p. ex. « Couloir Akwa ».
- **Adresse** — rue ou repère que le personnel reconnaîtra.
- **Créer**

Toast **Site créé**, ou **Impossible de créer le site**. La nouvelle ligne apparaît repliée.

### Ligne repliée

Chaque carte montre :

- **Nom** du site
- **Adresse**
- **N/M routeurs en ligne**
- **N sessions actives**
- Badge **Actif** ou **Suspendu**
- **Suspendre** ou **Activer**
- Chevron pour développer / replier

Appuyez sur la zone principale de la ligne pour développer. Développer charge routeurs, forfaits et sessions. Si ça échoue : toast **Impossible de charger le détail du site**.

### **Suspendre** / **Activer**

Sur la ligne, pas dans un onglet. **Suspendre** rend le site inactif : le portail arrête de vendre de nouveaux forfaits. Les sessions payées en cours peuvent tourner jusqu’à expiration ou jusqu’à **Expulser**. Toast **Site suspendu**. **Activer** ramène les ventes ; toast **Site activé**. Échec : **Impossible de changer le statut du site**.

Suspendre n’est pas **Retirer** un routeur, ni **Désactiver** un forfait.

### Chrome développé : onglets et **Modifier le site**

Quatre onglets (noms courts téléphone entre parenthèses) :

- **Routeurs** (**Routeurs**)
- **Forfaits** (**Plans**)
- **Sessions** (**Live**)
- **Politique d’accès** (**Politique**)

**Modifier le site** (crayon) ouvre une modale avec **Nom du site**, **Adresse**, et **Enregistrer**. Toast **Site mis à jour** ou **Impossible de mettre à jour le site**.

### Onglet **Routeurs** — vide

**Pas encore de routeur. Ajoutez-en un pour obtenir le lien du portail — aucun matériel n’est requis pour prévisualiser.**

**Ajouter un routeur** est en haut à droite du tableau.

### Modale **Ajouter un routeur**

Titre **Ajouter un routeur**.

- **Nom du routeur**
- **Type de routeur**
  - **MikroTik physique** — indication **Hex / hAP — Existing ou Create guest dans Setup**. L’icône d’aide ouvre le guide Hex sur réseau existant.
  - **MikroTik CHR** — indication **VM cloud — assistant guidé**. L’icône d’aide ouvre l’aide CHR.

Bouton de validation :

- Physique : **Ajouter un routeur**
- CHR : **Ajouter le CHR et ouvrir l’assistant**

Toast **Routeur ajouté** ou **Impossible d’ajouter le routeur**. Le physique ouvre ensuite **Setup routeur et portail captif**. Le CHR ouvre **Mise en service MikroTik CHR**.

### Colonnes du tableau Routeurs

**Nom**, **Statut**, **Dernier contact**, **Actions**.

**Nom** plus, pour les boîtes cloud, un badge **CHR** (icône nuage).

Badge **Statut** : **En ligne**, **Hors ligne**, **Dégradé**.

**Dernier contact** : un horodatage, ou **Jamais (normal sans MikroTik)**. Les routeurs uniquement pour prévisualisation restent à Jamais. C’est attendu.

### **Script de setup** (physique seulement)

Ouvre **Setup routeur et portail captif**. Intro : **Deux collages dans le terminal MikroTik. Testez le portail avec Prévisualiser le portail à tout moment.**

**Tester sans routeur** affiche l’URL de prévisualisation si l’API en a renvoyé une.

**Chemin du script 1** :

- **Hotspot existant** — **Le hotspot doit déjà donner des IP et une page de login. Le script 1 installe seulement SpaiHub (walled garden, PAP, HTML captif).**
- **Créer un hotspot invité** — **Ajoute un réseau invité sur le LAN (`10.10.10.0/24`) s’il manque. Ne touche pas au WAN ni au wifi. Indiquez le port invité ci-dessous.** Puis noms d’interfaces **LAN (invité)** et **WAN** (défauts `ether2` / `ether1`). Les changer recharge le script.

Onglets de scripts :

- **1. Setup hotspot (une fois)** — script 1
- **2. Connecter à SpaiHub** — script 2

Copier (icône presse-papiers) toaste **Copié**. Texte de chargement : **Chargement du script…**. Échec : **Impossible de charger les scripts**.

Collez dans le terminal MikroTik. Le script 2 est ce qui fait marcher **Sur le routeur** et **Expulser**. Voir [Hex physique — hotspot existant (script 1 puis 2)](/fr/help/setup-mikrotik-hex-existing).

### **Setup CHR** (lignes CHR)

Ouvre **Mise en service MikroTik CHR**. Étapes : **Prérequis**, **Plan réseau**, **Script d’amorçage**, **Hotspot SpaiHub**, **Connecter à SpaiHub**, **Vérifier la connexion**, **Terminé**.

Vous confirmez la licence (Hotspot, niveau 4+), la sortie HTTPS, et que le CHR n’a pas de Wi‑Fi. Plan par défaut : WAN `ether1`, LAN `ether2`, pont hotspot `192.168.88.0/24`. Boutons que vous verrez : **Enregistrer et continuer**, **Revoir les scripts**, **Prévisualiser le portail captif**, **Terminé**. Toasts : **Réglages réseau enregistrés**, **Impossible d’enregistrer les réglages réseau**, **Impossible de charger les scripts**, **Copié**. La vérification attend le heartbeat (**En attente du heartbeat du routeur...** / **Le routeur est en ligne !**). Lancez les trois scripts **dans l’ordre**. Détails : [CHR depuis une VM vide (trois scripts dans l’ordre)](/fr/help/setup-chr).

### **Prévisualiser le portail**

Ouvre un nouvel onglet sur la page captive invité pour le jeton de ce routeur. **Aucun Hex en direct n’est requis.** **Dernier contact : Jamais** convient. Il vous faut au moins un forfait **Actif**, sinon la page invité dit qu’aucun forfait n’est disponible.

### **Retirer**

Confirmation navigateur : **Retirer ce routeur ? Les abonnés n’atteindront plus le portail par cet appareil.** Confirmez, puis toast **Routeur retiré**. Échec : **Impossible de retirer le routeur**. Cela ne supprime pas le site ni ses forfaits.

### Onglet **Forfaits** — vide

**Pas encore de forfait. Ajoutez-en un pour que les abonnés achètent sur le portail.** plus **Lire le guide** (tutoriel forfait au temps).

### **Ajouter un forfait**

Ouvre **Créer un forfait** (ou **Modifier le forfait**). Intro : **Choisissez comment les abonnés paient l’accès internet sur ce site.**

Champs (cette modale fait partie de Sites aujourd’hui) :

- **Nom du forfait** (placeholder p. ex. 1 heure, 2 Go / semaine)
- **Type de forfait** : **Au temps** ou **Au volume**
- **Prix (XAF)**
- **Débit montant (Mo/s)** — défaut 1 Mo/s ; max 100
- **Appareils simultanés** — 1–20 MAC Wi‑Fi distinctes. Le texte d’aide prévient que les téléphones derrière un routeur domestique en NAT comptent encore comme une MAC.
- Au temps : **Durée de navigation**, optionnel **Plafond d’usage (caché aux abonnés)**
- Au volume : **Volume de téléchargement**, **À consommer dans** / **Délai d’expiration**
- Ligne d’aperçu, puis **Créer le forfait** (ou enregistrer à la modification)

Toasts : **Forfait créé**, **Forfait mis à jour**, **Impossible d’enregistrer le forfait**. Toasts de validation : **Le nom du forfait est obligatoire**, **Le prix doit être supérieur à 0**, **Le débit montant doit être supérieur à 0**, **Le débit montant ne peut pas dépasser 100 Mo/s**, **Les appareils simultanés doivent être entre 1 et 20**, plus durée / plafond / volume / expiration doivent être supérieurs à 0.

### Tableau des forfaits

Colonnes : **Nom**, **Type**, **Détails**, **Prix**, **Statut**, **Actions**.

**Type** : **Au temps** ou **Au volume**.

**Détails** (propriétaires seulement) inclut durée, débit montant, nombre d’appareils, et — pour les forfaits au temps avec plafond — le **plafond d’usage** en Go/Mo. Les invités ne voient jamais les Go restants. Les forfaits au volume montrent le volume et l’expiration.

**Prix** en XAF.

**Statut** : **Actif** ou **Suspendu** (désactivé).

**Modifier** rouvre la modale. **Désactiver** (lignes actives seulement) toast **Forfait désactivé** ou **Impossible de désactiver le forfait**. Les forfaits désactivés disparaissent du portail et de la génération de nouveaux bons.

Parcours : [Créer un forfait 1 heure avec plafond caché](/fr/help/create-time-package), [Créer un forfait famille (2–4 appareils)](/fr/help/create-family-package).

### Onglet **Sessions**

C’est le même tableau en direct documenté dans la [Référence sessions](/fr/help/reference-sessions), filtré sur ce site.

Vide : **Aucune session active sur ce site.** Indication : **Après avoir recollé le script de connexion, le statut « Sur le routeur » apparaît ici. Une seule MAC vue peut encore être une passerelle NAT.**

Quand des lignes existent, une indication : **« Sur le routeur » signifie que le login est dans les hôtes actifs MikroTik. Une seule MAC peut rester un répéteur bon marché, un hotspot téléphone ou un routeur personnel qui partage avec plusieurs appareils.**

Colonnes : **Appareil** (téléphone + source de paiement **Bon** ou **Mobile Money**), **Forfait**, **Routeur**, **Statut** (**Sur le routeur** avec MAC optionnelle, ou **Non vu**), **Fin**, **Expulser**.

**Expulser** toaste **Session terminée — déconnexion sous 15 secondes** ou **Impossible de terminer la session**. Il faut le script 2 / `spaihub-commands`.

### Onglet **Politique d’accès**

Titre **Politique d’accès**. Intro : **Les appareils simultanés se règlent sur chaque forfait. Ce réglage de site n’est qu’un repli pour les bons sans limite de forfait.**

Champ **Appareils par code d’accès (repli)** avec une icône d’aide (**Ouvrir l’article d’aide pour ce réglage**) qui pointe vers cette référence de politique. Indication : **0 = un appareil.** Préférez **Appareils simultanés** sur chaque forfait (p. ex. 4 pour la famille). On compte les MAC Wi‑Fi distinctes — pas les téléphones derrière NAT.

Encadré : **Astuce : forfaits 1 appareil avec plafond d’usage caché, et découragez les répéteurs Wi‑Fi en mode routeur sur ce hotspot.**

**Enregistrer la politique** (ou **Enregistrement...**). Toast **Politique d’accès enregistrée — les routeurs l’appliqueront au prochain poll** ou **Échec de l’enregistrement de la politique**. Carte complète : [Référence politique d’accès](/fr/help/reference-access-policy).

## États vides et erreurs

**Impossible de charger les sites** si l’API de liste échoue — vous pouvez voir une page d’apparence vide plus ce toast.

Échec du développement d’une ligne : **Impossible de charger le détail du site** (les onglets restent vides jusqu’à ce que vous repliiez et rouvriez).

Chaque action destructive ou d’enregistrement a un toast nommé ci-dessus. **Retirer** demande toujours d’abord la confirmation du navigateur.

Le chargement de liste utilise un squelette gris pulsé. Développer utilise un plus petit pulse dans la carte.

## Ce que cette page ne fait pas

- Elle n’imprime pas de PDF de bons ni **Synchroniser les inutilisés vers le routeur**. Ça, c’est **Bons**.
- Elle n’exporte pas de CSV comptable. Ça, c’est **Tableau de bord**.
- Elle ne retire pas de MoMo. Ça, c’est **Portefeuille**.
- Elle ne change pas le logo ou l’accent du portail. Ça, c’est **Paramètres** → **Marque du portail**.
- Elle ne montre pas aux invités les Go restants d’usage raisonnable. **Détails** est réservé au propriétaire.
- Vous ne configurez pas ici les liaisons contributeurs ni RouterOS pour un contributeur.
- Il n’y a pas de console admin sur cette page.

Vous n’ajoutez pas une liaison contributeur depuis **Sites**. Un contributeur lit **Liaisons** en lecture seule ; le technicien SpaiHub pose le tuyau. **Jamais (normal sans MikroTik)** n’est pas une panne : c’est le défaut tant que le script 2 n’a pas de heartbeat, et c’est correct pour un routeur de prévisualisation.

Cette version n’a pas de cloche ni de préférences de notification. Un site **Suspendu** ou un routeur **Hors ligne** n’allume pas d’alerte dans **Paramètres**. Relisez les badges sur cette page et **État des routeurs** sur **Tableau de bord**.

## Tâches liées

- Premier site sans matériel : [Ajouter un site sans routeur](/fr/help/add-location).
- Coller sur un Hex qui a déjà un hotspot : [Hex physique — hotspot existant (script 1 puis 2)](/fr/help/setup-mikrotik-hex-existing).
- Tarifer un forfait au temps : [Créer un forfait 1 heure avec plafond caché](/fr/help/create-time-package).
- Lire **Sur le routeur** / **Expulser** : [Référence sessions](/fr/help/reference-sessions).
- Repli vs appareils du forfait : [Référence politique d’accès](/fr/help/reference-access-policy).
