---
id: tip.walled-garden
slug: walled-garden-https
title: "Le Hex a besoin de HTTPS sortant vers SpaiHub"
description: "Avant login, les téléphones et le Hex doivent joindre le portail, l’API et les hôtes Campay en HTTPS. Autorise la sortie TCP 443. Le script 1 installe le walled garden. Ne publie pas d’URL secrètes live."
role: ["owner"]
section: pro-tips
intents: ["walled garden", "HTTPS 443", "hôtes campay", "fetch heartbeat"]
buttons: ["Script de setup", "Hotspot existant", "Payer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "glossary.heartbeat"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

**Walled garden** = la liste d’autorisation hotspot pour le trafic **avant** qu’un abonné soit logué. Le script 1 ajoute des entrées (commentées `spaihub-…`) pour l’hôte **portail**, l’hôte **API**, les hôtes **Campay**, et le statut certificats (Let’s Encrypt OCSP). Les abonnés en ont besoin pour ouvrir **Payer en MoMo**. Le Hex a besoin de l’hôte API pour le heartbeat et le fetch des commandes.

**HTTPS / TCP 443** est le chemin sortant. Les pare-feu cloud, les boîtes FAI, et les profils « sécurité » qui bloquent 443 feront échouer le `/tool fetch` de `login.html` du script 1 et feront taire `spaihub-heartbeat`.

**Egress** = le Hex initie des connexions sortantes. Tu n’as pas besoin de publier des ports entrants pour le polling SpaiHub. Ne liste pas d’URL API live avec tokens routeur dans un groupe WhatsApp.

RouterOS n’a toujours **pas de login-url**. Le fetch HTML, c’est comme ça que la page captive existe.

## Pourquoi c’est important

Incident : un Hex derrière une ONU Fibre « smart » qui filtrait le HTTPS inconnu. Winbox local marchait. **Dernier contact** restait Jamais. Le technicien a ajouté des IP Facebook au hasard dans le walled garden depuis un blog. Toujours mort. La pièce manquante était **443 sortant vers SpaiHub et Campay**, pas plus de domaines sociaux.

Deuxième incident : un hotspot existant avait déjà un walled garden serré. Le script 1 a été sauté parce que « on a déjà une page de login ». Les téléphones ne pouvaient pas charger les forfaits ni Campay. MoMo n’a jamais démarré. Ils ont accusé Campay. Payer n’est jamais sorti du garden.

Mauvais diagnostic : « ouvre tous les ports. » Mauvais diagnostic : « colle le token routeur dans l’ONU. » Ne partage jamais les tokens. Mauvais diagnostic : « l’anti-tether bloque 443. » L’anti-tether reste désactivé ; les scripts actuels enlèvent ces règles.

## Ce que tu vois

**Script de setup** → astuce **Hotspot existant** : le script 1 installe SpaiHub (walled garden, PAP, HTML captif).

Les prérequis CHR disent que la VM doit joindre l’API SpaiHub en HTTPS (port 443 sortant) et que le security group cloud doit autoriser la sortie.

Symptômes quand 443/garden est faux :

- Login MikroTik d’origine pour toujours (fetch HTML échoué).
- Le portail charge dans **Prévisualiser le portail** (ton laptop n’est pas dans le garden) mais les téléphones sur le SSID ne peuvent pas charger **Payer**.
- Heartbeat manquant → **Hors ligne** → Payer désactivé sur les vrais clients aussi.
- Le spinner Campay ne devient jamais un succès **Vérifier le paiement** parce que le téléphone ne joint pas les hôtes Campay.

N’attends pas de l’Aide qu’elle imprime les hostnames de production comme une feuille secrète à copier. Ils sont dans **Script de setup** pour ce routeur.

## Quoi faire

Ce soir :

1. Depuis le Hex, confirme que le HTTPS sortant marche (les lignes fetch des scripts 1/2 sont le vrai test).
2. Colle **1. Setup hotspot (une fois)** pour que les lignes garden existent, puis **2. Connecter à SpaiHub**.
3. Sur la VM cloud (CHR), autorise **TCP 443 egress** vers internet. N’invente pas de DNAT entrant « pour SpaiHub ».
4. Teste avec un téléphone sur le SSID invité, pas seulement la prévisualisation.
5. Si tu utilises Campay live, garde les hôtes Campay que le script 1 ajoute déjà. Ne supprime pas les lignes `spaihub-campay*` pour « simplifier ».

## Quoi ne pas dire

- Ne publie pas d’URL secrètes live, de tokens routeur, ou d’astuces pour contourner NAT/plafond d’usage.
- Ne dis pas à un abonné d’« ouvrir le port 443 sur son répéteur ». Le Hex a besoin d’egress ; leur répéteur en mode routeur est un autre problème (une MAC).
- Ne promets pas le reste de Go du plafond d’usage pendant que le portail ne peut même pas charger.
- Ne dis pas que le walled garden remplace le script 2. Le garden te laisse parler ; les commandes grantent.
