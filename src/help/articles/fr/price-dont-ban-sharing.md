---
id: tip.price-dont-ban
slug: price-dont-ban-sharing
title: "Tarife le partage, ne prétends pas l’interdire"
description: "Identifiant plus PIN peuvent se partager. Les forfaits pas chers doivent être 1 appareil. Les forfaits famille doivent coûter plus. Ne promets pas une interdiction que tu ne peux pas faire respecter derrière le NAT."
role: ["owner"]
section: pro-tips
intents: ["tarifer le partage", "forfait famille", "ne pas interdire le tethering"]
buttons: ["Appareils simultanés", "Ajouter un forfait", "Déconnecter cet appareil", "Terminer pour tous les appareils"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.family-package", "tip.shared-creds"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Code d’accès** ici = l’**Identifiant** hotspot plus le **PIN WiFi** affiché après MoMo ou imprimé sur un bon. Quiconque a les deux peut essayer de se connecter.

**Appareils simultanés** = combien de MAC Wi‑Fi distinctes peuvent utiliser cet identifiant et ce PIN en même temps (1–20). Les téléphones derrière un routeur domestique en mode routeur/NAT comptent encore comme **une** MAC.

Un **forfait famille** n’est pas un type de produit SpaiHub spécial. C’est un forfait au temps ou au volume ordinaire avec **Appareils simultanés** à 2–4 et un prix XAF plus élevé.

**Interdire** voudrait dire que le réseau peut refuser le partage. SpaiHub ne prétend pas le faire avec du TTL. Le partage est tarifé.

## Pourquoi c’est important

Au marché Deido, une heure à 200 XAF avec un PIN écrit sur le ticket sera WhatsAppée à trois cousins avant la fin de l’heure. C’est le Cameroun, pas un défaut. Si tu cries « le partage est interdit » puis tu vends le forfait le moins cher dans la rue, tu formes les gens à se cacher derrière un répéteur bon marché.

La boutique honnête : walk-in 1 appareil, famille 2–4 appareils, plafond d’usage caché sur le temps pour qu’un login partagé ne télécharge pas tout l’uplink. Tu ne peux toujours pas voir les téléphones derrière le NAT. Tu ne dois toujours pas promettre une interdiction.

Mauvais diagnostic : « il nous faut l’anti-tether pour que les forfaits famille ne se fassent pas avoir. » Les forfaits famille supposent le partage. Les forfaits pas chers supposent une MAC. Le NAT triche le compteur de MAC, pas la case famille. Tarife le risque ; n’invente pas une histoire firewall.

## Ce que tu vois

Dans **Ajouter un forfait** :

- **Appareils simultanés** avec l’astuce : combien de MAC Wi‑Fi distinctes peuvent utiliser le même identifiant et le même PIN. Mets 1 pour un appareil, ou 4 pour un forfait famille. Le NAT compte encore comme une MAC.

Sur le portail abonné, quand le forfait autorise plus d’un appareil :

- **Forfait famille — jusqu’à N appareils peuvent partager ce code.**
- **Déconnecter cet appareil** et **Terminer pour tous les appareils**.

Sur un forfait 1 appareil, ces contrôles famille ne sont pas l’histoire. Le PIN reste le secret. L’identifiant MoMo, c’est en général les chiffres du téléphone — facile à dire à un ami. Le PIN, c’est ce que tu as vraiment vendu.

## Quoi faire

1. Mets deux produits au tableau : « 1 téléphone » et « maison / 4 appareils » avec un vrai écart de prix en XAF.
2. **Sites** → **Forfaits** → **Ajouter un forfait**. Règle **Appareils simultanés** sur le forfait — ne compte pas sur le repli **Politique d’accès** sauf pour de vieux bons sans limite de forfait.
3. Garde **Plafond d’usage (caché aux abonnés)** sur les forfaits au temps pour qu’un PIN partagé ne streame pas ta fibre à mort. Ne dis pas aux abonnés les Go restants.
4. Si quelqu’un revend ton PIN à la grille, **Expulser** et **Révoquer** les bons inutilisés ; change l’histoire au comptoir, pas avec du TTL.
5. Si une vente « 1 appareil » est clairement une maison NAT, **Expulser** si c’est ta règle de maison, puis propose le prix famille. Ne rembourse pas tout en laissant le PIN vivant.

## Quoi ne pas dire

- Ne dis pas « SpaiHub bloque le partage. » Identifiant + PIN peuvent se partager. Tu limites les MAC que tu vois.
- Ne promets pas que tu vas attraper chaque répéteur bon marché. Une MAC WAN a l’air légitime.
- Ne lis pas le reste de Go du plafond d’usage aux cousins qui partagent un PIN.
- Ne leur dis pas que l’anti-tether est « activé pour les tricheurs ». Ça reste désactivé parce que ça cassait les téléphones.
