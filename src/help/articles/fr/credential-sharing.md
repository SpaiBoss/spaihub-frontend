---
id: tip.shared-creds
slug: credential-sharing
title: "Identifiant + PIN peuvent se partager"
description: "Quiconque a l’identifiant hotspot et le PIN WiFi peut essayer de se connecter. Les forfaits pas chers doivent autoriser une MAC. Les forfaits famille doivent coûter plus. Un répéteur bon marché en mode routeur ressemble encore à un appareil."
role: ["owner"]
section: pro-tips
intents: ["partage d’identifiants", "identifiant PIN", "partager le login"]
buttons: ["Appareils simultanés", "Déconnecter cet appareil", "Terminer pour tous les appareils", "Expulser"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.price-dont-ban", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

Les **identifiants** sur le réseau abonné sont **Identifiant** + **PIN WiFi**. Pour MoMo, l’identifiant est les **chiffres du téléphone**. Pour les tickets, l’identifiant est **SPAI-XXXX-XXXX**. Chaque paire peut se lire à voix haute, se capturer, ou s’envoyer sur WhatsApp.

**Appareils simultanés** = combien de MAC peuvent utiliser cette paire en même temps. Ce n’est pas une promesse que le PIN ne peut pas être transmis.

**Déconnecter cet appareil** / **Terminer pour tous les appareils** apparaissent sur les forfaits famille pour que l’acheteur puisse expulser un cousin sans appeler la boutique. **Expulser** sur **Sessions** propriétaire termine l’utilisateur hotspot de ton côté.

Le partage est autorisé par la physique. Tu le **tarifes**. Tu ne l’**interdis** pas avec du TTL (l’anti-tether reste désactivé).

## Pourquoi c’est important

À une grille de lycée, un PIN MoMo à 500 XAF a servi trois Android jusqu’à ce que la limite 1 appareil rebondisse le quatrième — sauf s’ils ont branché un répéteur bon marché, auquel cas trois Android sont devenus **une MAC** et la limite n’a jamais rebondi. Les deux phrases peuvent être vraies le même soir.

Mauvais diagnostic : « s’ils ont partagé le PIN, Sessions montrerait trois lignes, donc on est safe. » Pas derrière le NAT. Mauvais diagnostic : « change l’e-mail propriétaire pour qu’ils ne puissent pas partager. » L’e-mail n’est pas l’identifiant hotspot.

Les forfaits pas chers utilisent **1** appareil simultané *parce que* les PIN voyagent. C’est toute la raison.

Les identifiants MoMo sont des chiffres de téléphone — faciles à crier dans une cour. Les identifiants de bons sont `SPAI-` plus un PIN sur papier — faciles à photographier. Ni l’un ni l’autre n’est l’e-mail propriétaire. Enseigner à la caisse ces trois identités, c’est comme ça que tu arrêtes « réinitialise le Gmail, le Wi‑Fi est partagé ».

## Ce que tu vois

Après MoMo : **Notez identifiant et PIN, puis connectez-vous au WiFi quand le routeur est prêt.** Après **Utiliser le bon** : la même paire sur le PDF ticket (**code · PIN WiFi**).

Texte famille portail : **Forfait famille — jusqu’à N appareils peuvent partager ce code.**

Quand une seconde MAC rejoint un forfait 1 appareil, MikroTik shared-users refuse. L’acheteur croit que le Wi‑Fi est « plein ». C’est le forfait que tu as vendu.

Toast **Expulser** : déconnexion sous ~15 secondes. Les utilisateurs partagés tombent tous s’ils étaient le même utilisateur hotspot.

## Quoi faire

1. Imprime sur les tickets : « N’envoie pas ce PIN si tu as acheté un forfait 1 téléphone. »
2. Vends un forfait famille avec **Appareils simultanés** 2–4 et un prix XAF plus élevé quand le partage est le produit.
3. Si un PIN circule à la grille, **Expulser**, et **Révoquer** les jumeaux inutilisés du même lot si besoin.
4. N’installe pas de règles drop TTL pour « punir le partage ». Elles cassaient les téléphones ordinaires.
5. S’ils NAT, traite-le comme un client : plafond d’usage caché sur les forfaits au temps, règle de maison contre les répéteurs, prix famille s’ils veulent plusieurs MAC *sur ton SSID*.
6. Après qu’un PIN partagé a brûlé le plafond caché, le message abonné est encore **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** — pas un split de Go restants entre cousins.

## Quoi ne pas dire

- Ne dis pas « le PIN ne marche que sur le téléphone qui a payé. » Ça marche pour quiconque l’a, jusqu’à la limite de MAC que tu as réglée, et le NAT écrase les MAC.
- Ne dis pas aux cousins le reste de Go du plafond d’usage pour qu’ils puissent « partager équitablement ».
- Ne promets pas que Paramètres peut effacer à distance une capture WhatsApp.
- Ne mélange pas la réinitialisation du mot de passe propriétaire avec le partage de PIN abonné.
