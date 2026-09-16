---
id: tip.access-fallback
slug: access-policy-fallback
title: "La politique du site est un repli"
description: "Appareils par code d’accès sur Politique d’accès n’est qu’un repli quand un forfait n’a pas de limite d’appareils simultanés. 0 veut dire un appareil. Appareils simultanés sur le forfait gagne toujours."
role: ["owner"]
section: pro-tips
intents: ["politique d’accès", "appareils par code d’accès", "repli", "appareils simultanés gagne"]
buttons: ["Politique d’accès", "Appareils par code d’accès (repli)", "Enregistrer la politique", "Appareils simultanés"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.access-policy", "own.tut.family-package"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Politique d’accès** est l’onglet site **Politique d’accès** (court **Politique**). Ce n’est pas un second catalogue de produits.

**Appareils par code d’accès (repli)** est le nombre utilisé seulement quand un bon (ou grant) n’a pas de limite shared-user au niveau forfait. Texte d’intro : les appareils simultanés se règlent sur chaque forfait. Ce réglage de site n’est qu’un repli pour les bons sans limite de forfait.

**0 = un appareil.** C’est l’astuce, pas une faute de frappe. Zéro ne veut pas dire « téléphones illimités ». Des appareils simultanés illimités, ce n’est pas ce que cette case fait.

**Appareils simultanés** sur **Ajouter un forfait** / **Modifier le forfait** **gagne**. Les forfaits famille vivent là (2–4), pas comme un override silencieux à l’échelle du site que tu espères battre le forfait.

On compte les **MAC** Wi‑Fi distinctes, pas les téléphones derrière un routeur domestique en NAT/mode routeur.

## Pourquoi c’est important

Incident : le propriétaire a mis le repli site à 4, a laissé les forfaits 1 heure pas chers à **Appareils simultanés** **1**, et a annoncé « toute la boutique est famille maintenant ». Les acheteurs du forfait 300 XAF avaient encore 1 MAC. Le forfait a gagné. Ils ont dit que SpaiHub était cassé.

Incident inverse : de vieux bons imprimés avant que shared-device existe sur le forfait. Le repli est pour ces codes. Monter le repli à 4 ne réécrit pas chaque forfait live.

Mauvais diagnostic : « Enregistrer la politique, c’est ce qui active la détection NAT. » Non. Le NAT reste une MAC. L’astuce du site dit même : forfaits 1 appareil avec plafond d’usage caché, et découragez les répéteurs Wi‑Fi en mode routeur.

Toast **Politique d’accès enregistrée — les routeurs l’appliqueront au prochain poll** veut dire que le script 2 doit être vivant. Enregistrer la politique sur un Hex **Hors ligne** fichier le nombre dans SpaiHub ; la boîte l’applique plus tard. Ne dis pas à la cour « la famille est activée » la seconde où tu appuies sur enregistrer.

## Ce que tu vois

**Sites** → **Politique d’accès** :

- Intro contrôle forfait vs repli bon.
- **Appareils par code d’accès (repli)**
- Astuce : 0 = un appareil. Préférez **Appareils simultanés** sur chaque forfait (ex. 4 pour la famille). On compte les MAC, pas les téléphones NAT.
- Astuce forfaits 1 appareil + plafond d’usage + pas de routeurs personnels.
- **Enregistrer la politique**

Toast : **Politique d’accès enregistrée — les routeurs l’appliqueront au prochain poll** (cycle commands/heartbeat, pas instantané sur une boîte morte). **Échec de l’enregistrement de la politique** en cas d’erreur.

Site vide sans forfaits : toujours pas une raison d’utiliser le repli comme seul contrôle famille. Ajoute des forfaits.

## Quoi faire

1. Règle **Appareils simultanés** sur chaque nouveau forfait. Pas cher = 1. Famille = 2–4. Prix en XAF en conséquence.
2. Laisse le repli à 0 ou 1 sauf si tu sais que tu as de vieux bons sans limite de forfait.
3. Appuie une fois sur **Enregistrer la politique** ; attends que le routeur polle. N’enregistre pas pendant **Hors ligne** en attendant un changement Hex instantané.
4. N’utilise pas un repli 4 comme contournement « interdire le NAT ». Ça ne voit pas les téléphones intérieurs.
5. Après enregistrement, teste avec deux téléphones sur un forfait famille (tous les deux sur ton SSID, pas derrière un répéteur bon marché).

## Quoi ne pas dire

- Ne dis pas que le nombre du site override les forfaits famille. Le forfait gagne.
- Ne dis pas aux abonnés le reste de Go du plafond d’usage comme si la politique était un plafond data. La politique, c’est le nombre d’appareils, et un plafond Go caché est à part.
- Ne promets pas que 0 veut dire illimité. 0 = un appareil.
