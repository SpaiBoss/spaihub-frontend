---
id: own.tut.chr
slug: setup-chr
title: "CHR depuis une VM vide (trois scripts dans l’ordre)"
description: "Cloud Hosted Router : Prérequis, Plan réseau, Script d’amorçage, Hotspot SpaiHub, Connecter, Vérifier. Ne saute pas et n’inverse pas l’ordre."
role: ["owner"]
section: tutorials
intents: ["CHR", "cloud router", "wizard", "bootstrap", "virtual router"]
buttons: ["Ajouter le CHR et ouvrir l’assistant", "Setup CHR"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.chr-order", "own.tut.hex-existing"]
updatedAt: 2026-09-16
minutes: 16
---

**CHR** veut dire MikroTik **Cloud Hosted Router** : RouterOS dans une machine virtuelle. Il n’a **pas de Wi‑Fi intégré**. Tu branches encore un point d’accès ou un switch sur le pont LAN pour que les téléphones de la cité rejoignent un SSID. SpaiHub te guide avec un assistant. L’ordre n’est pas une suggestion. Voir [Ordre des scripts CHR](/fr/help/chr-script-order).

Étapes de l’assistant à l’écran : **Prérequis** → **Plan réseau** → **Script d’amorçage** → **Hotspot SpaiHub** → **Connecter à SpaiHub** → **Vérifier la connexion**.

Ce n’est pas le **Script de setup** Hex physique (deux collages). L’overlay Hex c’est [hotspot existant](/fr/help/setup-mikrotik-hex-existing). Ne mélange pas les collages.

## Ce que tu auras

Une ligne CHR sur le site, interfaces nommées correctement (défauts **ether1** WAN / **ether2** LAN), hotspot + NAT depuis l’amorçage, HTML SpaiHub depuis le script hotspot, heartbeat + commands depuis **Connecter à SpaiHub**, et **En ligne** après un heartbeat (souvent environ 1–2 minutes). Un AP sur le LAN pour que les humains puissent rejoindre.

## Avant de commencer

- Licence CHR qui inclut **Hotspot** : **niveau 4+** (ou un essai qui inclut vraiment Hotspot). Niveau 1 sans Hotspot gâchera ton samedi.
- La VM peut joindre internet en **HTTPS 443** sortant. Les security groups cloud qui autorisent « tout en entrée » mais bloquent la sortie resteront **Hors ligne**.
- Confirme `/interface print` dans le CHR. Défauts dans l’assistant : WAN sur **ether1**, LAN/AP sur **ether2**, pont hotspot souvent documenté en `192.168.88.0/24` à l’étape réseau. Si l’ordre des NIC cloud est inversé, change les noms **avant** l’amorçage.
- Un AP ou un switch sur le port pont LAN. CHR n’émettra pas de Wi‑Fi depuis l’hyperviseur.
- Un site dans SpaiHub et au moins un forfait pour tester plus tard.
- Sauvegarde si cette VM n’est pas vide. L’avertissement à l’écran : lance les scripts dans l’ordre sur un CHR neuf, ou sauvegarde d’abord.

N’inverse jamais Amorçage → hotspot → connecter. Ne saute jamais l’amorçage parce que « j’ai déjà fait un pont dans une vidéo YouTube ».

## Étapes

1. **Sites** → **Routeurs** → **Ajouter un routeur** → **MikroTik CHR**. Appuie sur **Ajouter le CHR et ouvrir l’assistant**. Si la ligne existe déjà, appuie sur **Setup CHR**.
2. **Prérequis.** Confirme licence Hotspot, HTTPS 443 sortant, egress autorisé, et que tu comprends qu’il n’y a pas de Wi‑Fi intégré. Continue.
3. **Plan réseau.** Défauts : **ether1** WAN, **ether2** LAN. Règle **Interface WAN**, **Interface LAN**, pont, nom du hotspot, CIDR, passerelle, plage DHCP si tu dois. **Enregistrer et continuer**. Vérifie les noms avec `/interface print` sur la VM, pas de mémoire.
4. **Script d’amorçage.** Colle **d’abord** ça dans le terminal CHR. Ça crée pont, DHCP, hotspot, et NAT. Attends le succès.
5. **Hotspot SpaiHub.** Colle **après** l’amorçage. Walled garden, profils SpaiHub, téléchargement de `hotspot/login.html`. RouterOS n’a pas de `login-url`.
6. **Connecter à SpaiHub.** Colle **en dernier**. Heartbeat + polling des commandes pour que les grants atterrissent après MoMo. Même idée que le script 2 Hex : heartbeat c’est la présence ; commands c’est GRANT/KICK.
7. **Vérifier la connexion.** L’assistant poll environ toutes les 10 secondes et marque **En ligne** quand un heartbeat arrive (environ 1–2 minutes). S’il attend, utilise **Revoir les scripts**. Quand **Le routeur est en ligne !**, ajoute des forfaits si besoin et **Prévisualiser le portail captif**.

![Screenshot](about:blank)
_Emplacement capture : assistant CHR Plan réseau avec ether1 WAN / ether2 LAN (staging)._

## Ce que tu dois voir

- Planificateurs **spaihub-heartbeat** et **spaihub-commands** (et hotspot-active sur le script de connexion).
- Tableau de bord **Dernier contact** frais, statut **En ligne** (≤ 2 min), pas **Dégradé** (2–5) ni **Hors ligne**.
- **Prévisualiser le portail** montre **Payer en MoMo**. Les téléphones live ont besoin de l’AP sur le LAN, pas seulement un navigateur sur l’hyperviseur.
- **Propulsé par www.spaitrace.com** sur la page captive.

Après ça : [tester MoMo](/fr/help/test-momo-online). Recolle connecter si le polling meurt ; ça ne doit pas expulser en masse.

## Si ça échoue

**Pas encore en ligne.** L’assistant vérifie : les trois scripts collés sans erreur ; les planificateurs existent ; le CHR joint SpaiHub en HTTPS ; le walled garden contient les hôtes portail et API du script de connexion.

**Fonction Hotspot manquante.** La licence n’est pas niveau 4+. L’amorçage ne te sauvera pas. Répare la licence, ne réordonne pas les scripts.

**Les téléphones n’ont pas de SSID.** CHR n’a pas de radio. Câble l’AP au LAN. Mettre l’AP sur le WAN saute le hotspot.

**J’ai collé Connecter d’abord.** Tu as sauté l’overlay. Repars de l’amorçage sur une VM connue-bonne (ou restaurée). L’ordre c’est tout le produit : [Ordre des scripts CHR](/fr/help/chr-script-order).

**En ligne, payer marche en preview, les téléphones restent captifs sur l’AP.** Planificateur commands, ou téléphones pas sur le pont hotspot. Même chemin personnel que Hex : [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi). Pas de second MoMo.

**Mauvais noms de NIC.** Les histoires cloud « eth0 » n’écrasent pas `/interface print`. Change **Plan réseau**, ne force pas ether1 si le WAN est ether2.

**Hex physique dans le rack.** Mauvais article. Utilise **Script de setup**, pas **Setup CHR**.

Une fois **En ligne**, ajoute ou confirme les forfaits, **Prévisualiser le portail captif**, puis un paiement live pas cher. Un CHR sans AP sur le LAN, c’est une VM que toi seul peux admirer. La cité a encore besoin d’un SSID. Si les grants échouent après un bel assistant, tu es dans le même chemin personnel que Hex : planificateur commands, [recoller connecter](/fr/help/repaste-connection-script), pas de second MoMo. Garde l’ordre des scripts pour la vie de la VM — [Ordre des scripts CHR](/fr/help/chr-script-order).
