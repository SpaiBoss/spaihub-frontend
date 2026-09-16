---
id: tip.anti-tether-off
slug: anti-tether-stays-off
title: "L’anti-tether (TTL) reste désactivé"
description: "SpaiHub n’installe pas de règles firewall anti-tether TTL. Les anciens drops TTL=63 cassaient les téléphones ordinaires. Tarife le partage et cache un plafond d’usage au lieu de prétendre interdire le hotspot."
role: ["owner"]
section: pro-tips
intents: ["anti tether", "TTL", "partage de connexion", "hotspot téléphone"]
buttons: ["Script de setup", "Appareils simultanés", "Plafond d’usage (caché aux abonnés)"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.price-dont-ban", "tip.fair-use-hidden"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Tethering** = un téléphone qui partage son Wi‑Fi (ou USB) avec d’autres appareils. Un **hotspot téléphone** utilisé comme second routeur vers ton SSID, c’est la même famille de problème qu’un répéteur bon marché en mode routeur : NAT, une MAC WAN.

**TTL** (time to live) = un nombre dans chaque paquet IP. Certains hotspots essaient de deviner « ce paquet a été transféré » en coupant les TTL inhabituels. Une règle amateur courante : **drop TTL=63**.

**Anti-tether** dans les vieux scripts SpaiHub = ces règles MikroTik mangle/filter avec le commentaire `spaihub-anti-tether`. Le **Script de setup** / **2. Connecter à SpaiHub** actuel **les enlève** et **ne les réinstalle jamais**.

## Pourquoi c’est important

On a essayé d’« arrêter le partage » avec le TTL. Ça n’arrêtait pas les répéteurs bon marché en mode routeur (ils ressemblent déjà à un client). Ça **cassait** des téléphones walk-in qui ne partageaient pas : Tecno, Samsung, certains iPhone, des applis VPN Android au hasard. Le portail captif s’ouvrait, MoMo payé, **Connecter** avait l’air bon, puis le téléphone ne naviguait pas. Le personnel remboursait. Voilà pourquoi l’anti-tether reste désactivé — des incidents, pas un slogan.

Le partage est un problème de prix et de plafond, pas de magie firewall. Un walk-in 1 appareil plus un plafond d’usage caché plus un forfait famille, c’est la politique de boutique qui survit samedi soir. Prétendre que tu as « interdit le tethering » entraîne les clients à discuter quand le téléphone du cousin marche encore derrière le NAT.

Mauvais diagnostic : « le TTL va régler la concession qui a acheté un bon. » Cette concession est une MAC. Le TTL n’a jamais vu les téléphones intérieurs. Si tu rajoutes TTL=63 à la main, tu vas passer la soirée à débloquer des clients qui ont payé.

## Ce que tu vois

Sur un Hex à jour, après le script 2 : les planificateurs `spaihub-heartbeat`, `spaihub-commands`, `spaihub-hotspot-active`. Tu ne devrais **pas** voir de nouveaux commentaires firewall `spaihub-anti-tether` qui s’ajoutent.

Sur le formulaire de forfait, quand le plafond d’usage est coché, l’astuce dit que SpaiHub n’utilise pas de règles firewall anti-tether. Cette phrase est volontaire.

Sur **Sessions**, une maison en hotspot ressemble encore à **Sur le routeur** + une MAC. **Expulser** coupe cette MAC. Ils peuvent se reconnecter avec le même identifiant et le même PIN jusqu’à la fin du forfait.

## Quoi faire

Ce soir :

1. Ne **colle pas** de règles drop TTL depuis un post Facebook « hotspot MikroTik ».
2. Si une vieille install a encore `spaihub-anti-tether` dans `/ip firewall`, colle encore **2. Connecter à SpaiHub**. Le script de connexion commence par enlever ces règles héritées.
3. Vends honnêtement : **Appareils simultanés** **1** sur les forfaits pas chers ; 2–4 sur les forfaits famille ; **Plafond d’usage (caché aux abonnés)** sur les forfaits au temps (défaut 2 Go, caché aux acheteurs).
4. Règle de maison : pas de routeurs personnels. Fais respecter avec **Expulser** et le personnel, pas avec le TTL.
5. Si un téléphone qui a payé ne navigue pas après login, suspecte un TTL restant ou un problème walled garden / HTTPS — pas « ils partagent donc on les coupe ».

## Quoi ne pas dire

- Ne dis pas aux abonnés « le tethering est impossible sur SpaiHub ». Ce n’est pas vrai. Le NAT marche encore. Tu as tarifé et plafonné.
- Ne promets pas un interrupteur TTL futur dans **Paramètres**. Paramètres a la marque du portail, pas un toggle anti-tether, et pas de cloche de notifications.
- Ne cite pas le reste de Go du plafond d’usage aux abonnés si tu les coupes pour abus.
- N’accuse pas le script 2 d’« autoriser le hotspot » — le script 2 est obligatoire pour les grants ; ce n’est pas un permis de tethering.
