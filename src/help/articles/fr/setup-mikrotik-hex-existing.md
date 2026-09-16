---
id: own.tut.hex-existing
slug: setup-mikrotik-hex-existing
title: "Hex physique — hotspot existant (script 1 puis 2)"
description: "Ton MikroTik montre déjà une page de login. Superpose SpaiHub avec le script 1, puis connecte avec le script 2, sans tout casser sur le WAN."
role: ["owner"]
section: tutorials
intents: ["hex", "script", "existing hotspot", "physical mikrotik", "setup script"]
buttons: ["Script de setup", "Hotspot existant"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.script-1-vs-2", "tip.login-html", "own.tut.online-momo"]
updatedAt: 2026-09-16
minutes: 16
---

Ce job est pour un **MikroTik physique** (Hex, hAP, et cousins) qui **donne déjà** des IP et **montre déjà** une page de login hotspot. SpaiHub ne reconstruit pas ton WAN. Tu superposes SpaiHub en deux collages : **script 1** (overlay hotspot) puis **script 2** (**Connecter à SpaiHub**).

**Script 1** vs **script 2** en une phrase : 1 = walled garden, PAP, `login.html` / `status.html`. 2 = planificateurs qui parlent à SpaiHub. Le heartbeat tout seul **n’accorde pas** le WiFi après MoMo. Split complet : [Script 1 vs script 2](/fr/help/script-1-vs-script-2).

Si tu n’as **pas** déjà un hotspot invité, utilise [Hex physique — créer un hotspot invité](/fr/help/setup-mikrotik-hex-guest) à la place.

## Ce que tu auras

Le même WAN que ce matin, plus le HTML captif SpaiHub, plus trois planificateurs : **spaihub-heartbeat** (1 minute), **spaihub-commands** (15 secondes), **spaihub-hotspot-active** (2 minutes). Le statut tableau de bord doit atteindre **En ligne** (heartbeat dans les 2 minutes). Ensuite tu peux [tester MoMo](/fr/help/test-momo-online).

RouterOS n’a **pas** de propriété `login-url`. C’est pour ça que le script 1 télécharge des fichiers HTML. Voir [Pas de login-url sur RouterOS](/fr/help/no-login-url).

## Avant de commencer

- Propriétaire **Se connecter**, un site, et une ligne routeur : **Sites** → **Routeurs** → **Ajouter un routeur** → **MikroTik physique**. Nomme-le pour que le technicien ne mélange pas deux Hex.
- Au moins un forfait actif pour que le portail ne soit pas vide.
- WinBox ou un terminal sur le Hex. Tu dois coller dans **cette** boîte, pas celle du voisin.
- Confirme que le hotspot assigne déjà des IP et qu’une page de login apparaît quand un téléphone rejoint le SSID.
- Le Hex doit joindre SpaiHub en **HTTPS (TCP 443)** sortant. Un walled garden qui bloque l’hôte API restera **Hors ligne** pour toujours.
- Sauvegarde la config si ce Hex tient aussi le VLAN bureau de la boutique. Le script 1 sur **Hotspot existant** c’est un overlay, pas un wipe WAN — sauvegarde quand même si tu es nerveux.

Ne saute pas le script 2 parce que « la page est déjà jolie ». Joli, c’est le script 1. Le WiFi payé, c’est le script 2.

## Étapes

1. **Sites** → déplie le site → **Routeurs** → sur la ligne Hex appuie sur **Script de setup**. La feuille dit deux collages. Tu peux encore **Prévisualiser le portail** à tout moment.
2. **Chemin du script 1** : choisis **Hotspot existant**. Indice à l’écran : le hotspot doit déjà donner des IP et une page de login ; le script 1 installe seulement SpaiHub (walled garden, PAP, HTML captif).
3. Copie **1. Setup hotspot (une fois)** et colle-le dans le terminal MikroTik. Attends qu’il finisse sans erreur. Il installe le walled garden, PAP, et télécharge `login.html` / `status.html`. Il ne **crée pas** `10.10.10.0/24` et il ne **wipe pas** le WAN.
4. Copie **2. Connecter à SpaiHub** (script 2) et colle-le ensuite. Ça installe les trois planificateurs. Le heartbeat marque **En ligne**. **spaihub-commands** (15 s) tire GRANT/KICK. **spaihub-hotspot-active** (2 min) rapporte qui est vraiment sur la boîte.
5. Reste sur le tableau de bord jusqu’à ce que **Dernier contact** soit récent et le statut **En ligne** (≤ 2 minutes depuis le heartbeat). **Dégradé** c’est 2–5 minutes. **Hors ligne** c’est jamais ou > 5 minutes.
6. Appuie sur **Prévisualiser le portail** et confirme la page invité. Puis lance un paiement live pas cher : [Confirmer En ligne et un paiement MoMo test](/fr/help/test-momo-online).

Recoller le **script 2** plus tard ne doit **pas** expulser en masse les utilisateurs payants. Ça rafraîchit le polling. Voir [Recoller le script de connexion sans expulser](/fr/help/repaste-connection-script). Relance le script 1 seulement quand la page captive elle-même est fausse.

![Screenshot](about:blank)
_Emplacement capture : Script de setup avec Hotspot existant sélectionné (staging)._

## Ce que tu dois voir

- Terminal : scripts ajoutés, planificateurs listés. Sur le Hex : `/system scheduler print` montre **spaihub-heartbeat**, **spaihub-commands**, **spaihub-hotspot-active**.
- Tableau de bord : plus **Jamais (normal sans MikroTik)**.
- SSID invité toujours ton ancien SSID ; page de login maintenant HTML SpaiHub.
- Après MoMo : identifiant = téléphone 9 chiffres, PIN 6 chiffres, **Connecter au WiFi maintenant** (~22 s de préparation). **Sessions** doit montrer **Sur le routeur**.

Si tu n’as que le heartbeat, la ligne peut passer au vert pendant que les grants n’atterrissent jamais. Vert n’est pas « le WiFi marche ».

## Si ça échoue

**Dernier contact encore Jamais.** Le script 2 n’a pas tourné, HTTPS 443 est bloqué, ou tu as collé sur le mauvais routeur. Vérifie le DNS WAN et que le Hex n’est pas dans un VLAN lab sans internet.

**En ligne mais les payeurs restent captifs.** Planificateur commands manquant. Confirme **spaihub-commands**. Recolle le script 2 seulement. Script personnel : [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi). Ne **prends pas** un second MoMo.

**Page de login encore le défaut MikroTik.** Le script 1 n’a pas téléchargé le HTML, ou tu touches un autre profil hotspot. Colle le script 1 encore sur **Hotspot existant**. Souviens-toi : pas de bouton `login-url` à tordre.

**J’ai collé Créer un hotspot invité par erreur.** Ce chemin peut ajouter `10.10.10.0/24` sur le LAN. Si tu avais déjà un hotspot qui marche, reste sur **Hotspot existant**. Si tu voulais construire un réseau invité, change d’article : [créer un hotspot invité](/fr/help/setup-mikrotik-hex-guest).

**Déconnexion de masse après un collage.** Le script 2 ne doit pas expulser en masse. Si les gens sont tombés, cherche un reboot, un changement DHCP, ou le script 1 sur la mauvaise interface — pas « SpaiHub déteste mes clients ».

**Hors ligne bloque Payer.** Attendu. Le portail désactive MoMo jusqu’à la reconnexion. Répare 443 et le script 2, puis teste.

Tu peux **Retirer** la ligne routeur si ce Hex ne reviendra jamais ; les invités n’atteindront plus le portail par cet appareil.
