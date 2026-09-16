---
id: tip.preview-first
slug: preview-without-hardware
title: "Prévisualiser avant le matériel"
description: "Ajoute une ligne routeur et appuie sur Prévisualiser le portail avant qu’un Hex soit en ligne. Dernier contact Jamais est normal. Il te faut encore au moins un forfait actif. La prévisualisation n’est pas un grant MoMo réel."
role: ["owner"]
section: pro-tips
intents: ["prévisualiser le portail", "sans matériel", "tester sans routeur"]
buttons: ["Ajouter un routeur", "Prévisualiser le portail", "Ajouter un forfait", "Payer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.preview", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Prévisualiser le portail** ouvre la page Wi‑Fi abonné dans un nouvel onglet, avec la même marque et les mêmes forfaits que les acheteurs verront. Tu peux le faire **avant** qu’un Hex physique ou un CHR soit **En ligne**.

**Dernier contact : Jamais (normal sans MikroTik)** = pas encore de heartbeat. C’est attendu pour une ligne que tu as créée seulement pour dessiner la boutique.

Une **ligne routeur** dans **Sites** → **Routeurs** est un objet SpaiHub. Ce n’est pas le Hex plastique. **Ajouter un routeur** crée la ligne (et le lien de prévisualisation). Le matériel vient plus tard.

**Tester sans routeur** sur **Script de setup**, c’est la même idée : regarder le portail pendant que le Hex est encore dans le carton.

## Pourquoi c’est important

Les propriétaires à Cité des Palmiers attendaient un technicien avant même de nommer un forfait 1 heure. Puis le Hex arrivait à 19 h, les forfaits étaient vides, et le premier acheteur voyait **Aucun forfait internet n’est encore disponible ici.** La prévisualisation existe pour que tu te battes avec la marque et les prix l’après-midi, pas pendant le premier MoMo.

Mauvais diagnostic : « la prévisualisation a échoué donc le token est mauvais » quand l’onglet montre **Aucun forfait internet**. Ajoute un forfait. Mauvais diagnostic : « Dernier contact Jamais veut dire que j’ai mal créé le routeur. » Jamais est normal jusqu’au heartbeat du script 2 / connecter CHR.

La prévisualisation ne grantera pas d’utilisateurs hotspot sur un Hex éteint. Un **Payer … XAF** en prévisualisation contre un routeur **Hors ligne** est bloqué comme un vrai téléphone : **Routeur hors ligne — le Mobile Money est indisponible jusqu’à la reconnexion.** N’utilise pas la prévisualisation comme test Campay tant que le routeur n’est pas **En ligne**.

## Ce que tu vois

1. **Sites** → déplie un site → **Routeurs**.
2. Texte vide : **Pas encore de routeur. Ajoutez-en un pour obtenir le lien du portail — aucun matériel n’est requis pour prévisualiser.**
3. **Ajouter un routeur** → **Nom du routeur**, **MikroTik physique** ou **MikroTik CHR** → **Ajouter un routeur**.
4. **Prévisualiser le portail** sur cette ligne.
5. Intro **Script de setup** : teste le portail avec **Prévisualiser le portail** à tout moment.

Sur l’onglet prévisualisation : ton **Nom de marque sur le portail**, texte d’accueil, **Payer en MoMo**, **J’ai un bon**. Les forfaits au temps montrent **Data illimitée** pour la période de navigation. Le débit montant est caché sauf si tu as activé **Afficher le débit montant sur le portail**.

Si tu as activé le plafond d’usage caché, les abonnés ne doivent toujours pas voir les Go restants — ni en prévisualisation, ni en production.

## Quoi faire

Ce soir, même avec le Hex encore dans le carton :

1. **Ajouter un site** si besoin, puis **Ajouter un routeur**, puis **Ajouter un forfait** (forfait au temps avec plafond caché 2 Go par défaut, ça va).
2. Appuie sur **Prévisualiser le portail**. Vérifie le prix en XAF, l’orthographe, le logo (512 Ko ou moins).
3. Corrige la marque dans **Paramètres** → **Marque du portail** → **Enregistrer la marque**, puis prévisualise encore.
4. Quand le technicien arrive, colle les scripts ; attends **En ligne** ; puis un vrai téléphone sur le SSID est le vrai test, y compris **Connecter**.
5. Ne saute pas les forfaits parce que « on les ajoutera après le premier client. » Le premier client, c’est celui qui se plaint.

## Quoi ne pas dire

- Ne dis pas au personnel que la boutique est « live » parce que la prévisualisation s’est ouverte. Heartbeat et script 2 sont encore obligatoires pour les grants.
- Ne promets pas qu’un MoMo de prévisualisation va mettre une MAC dans **Sessions** pendant que le Hex est éteint.
- Ne lis pas le reste de Go du plafond d’usage depuis **Détails** propriétaire à un ami qui « prévisualise juste ».
