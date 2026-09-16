---
id: tip.chr-order
slug: chr-script-order
title: "Les scripts CHR doivent rester dans l’ordre"
description: "Le setup Cloud Hosted Router, c’est trois collages dans l’ordre : amorçage, hotspot SpaiHub, puis Connecter à SpaiHub. Sauter ou inverser laisse une VM sans DHCP, sans portail, ou un heartbeat sans grants."
role: ["owner"]
section: pro-tips
intents: ["ordre scripts CHR", "amorçage", "cloud hosted router"]
buttons: ["Ajouter le CHR et ouvrir l’assistant", "Setup CHR", "Enregistrer et continuer", "Prévisualiser le portail captif"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.chr", "glossary.chr"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

**CHR** (Cloud Hosted Router) = RouterOS MikroTik qui tourne comme **machine virtuelle** dans un cloud, pas un Hex plastique au comptoir. CHR n’a **pas de Wi‑Fi intégré**. Tu dois brancher un AP ou un switch sur le port pont LAN.

L’assistant CHR, c’est **trois scripts**, dans l’ordre :

1. **Script d’amorçage** — pont, DHCP, squelette hotspot, NAT. Colle en premier.
2. **Hotspot SpaiHub** — walled garden, profils, `hotspot/login.html`.
3. **Connecter à SpaiHub** — heartbeat + commandes + hotspot-active. Colle en dernier.

Ce n’est pas le même libellé que **Script 1** / **Script 2** du Hex physique, mais le dernier collage est la même idée que le script 2 : sans lui, les paiements ne grantent pas.

## Pourquoi c’est important

Incident : un propriétaire dans un datacenter à Douala a collé **Connecter à SpaiHub** en premier parce que l’onglet de l’assistant s’était chargé. Le heartbeat n’est jamais venu (pas de chemin qui marche), puis il a collé l’amorçage, puis s’est demandé pourquoi le HTML hotspot faisait 404. L’ordre n’est pas de la bureaucratie. L’amorçage crée le réseau dont les fetchs suivants ont besoin. Le HTML hotspot a besoin du hotspot. Connecter a besoin de HTTPS sortant et de quelque chose auquel accrocher les planificateurs.

Mauvais diagnostic : « la licence CHR est fausse parce que le statut reste Jamais vu. » Plus souvent : scripts inversés, noms WAN/LAN faux (`ether1` / `ether2` vs ce que `/interface print` montre), ou pare-feu cloud qui bloque la sortie **TCP 443**. L’essai CHR / niveau 4+ doit inclure Hotspot — cette partie est vraie, mais ce n’est pas la première chose à blâmer.

N’inverse jamais l’ordre. Ne saute pas l’amorçage sur une VM vide.

## Ce que tu vois

**Ajouter un routeur** → **MikroTik CHR** → **Ajouter le CHR et ouvrir l’assistant**, ou plus tard **Setup CHR**.

Étapes de l’assistant : **Prérequis**, **Plan réseau**, **Script d’amorçage**, **Hotspot SpaiHub**, **Connecter à SpaiHub**, **Vérifier la connexion**, **Terminé**.

- **En attente du heartbeat du routeur...** après les trois collages. Doit passer à **Le routeur est en ligne !** en 1 à 2 minutes.
- Checklist **Pas encore en ligne** : les trois scripts sans erreur ; les planificateurs `spaihub-heartbeat` et `spaihub-commands` existent ; le CHR joint SpaiHub en HTTPS ; le walled garden contient les hôtes portail et API du script hotspot.
- **Dernier contact : Jamais (normal sans MikroTik)** sur la ligne du site est normal *avant* que connecter marche — comme un routeur physique prévisualisation seulement.

Défauts : WAN `ether1`, LAN/AP `ether2`, pont hotspot autour de `192.168.88.0/24`. **Enregistrer et continuer** stocke les noms avant que tu colles.

## Quoi faire

Ce soir sur un CHR vide :

1. Confirme licence capable Hotspot, 443 sortant, security group qui autorise la sortie, AP sur le LAN.
2. Vérifie les noms d’interfaces avec `/interface print` avant de faire confiance aux défauts.
3. Colle **Script d’amorçage** → **Hotspot SpaiHub** → **Connecter à SpaiHub**. Pas de remix.
4. Attends **En ligne**. Puis ajoute des forfaits et **Prévisualiser le portail captif**.
5. Si tu as déjà inversé l’ordre, sauvegarde, recommence depuis l’amorçage plutôt que d’empiler des planificateurs au hasard.

Ne colle pas le script 1 Hex **Hotspot existant** sur un CHR vide en attendant un LAN. Un CHR vide a besoin de l’amorçage.

## Quoi ne pas dire

- Ne dis pas au vendeur d’AP que CHR « est un répéteur Wi‑Fi bon marché ». CHR est la VM routeur ; l’AP doit être en mode bridge/AP.
- Ne promets pas le reste de Go du plafond d’usage sur le portail CHR.
- Ne partage pas de tokens API cloud ni d’URL de scripts live dans un chat abonné.
- Ne dis pas que sauter Connecter va bien « parce que la prévisualisation marche ». La prévisualisation n’a jamais eu besoin de la VM.
