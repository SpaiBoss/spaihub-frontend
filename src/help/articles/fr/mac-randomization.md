---
id: tip.mac-random
slug: mac-randomization
title: "Les téléphones randomisent les adresses MAC"
description: "Les téléphones modernes présentent souvent une MAC Wi‑Fi privée. Ne traite pas une MAC de Sessions comme une personne. Le portail stocke aussi un id navigateur qui disparaît si l’abonné efface les données du site."
role: ["owner"]
section: pro-tips
intents: ["randomisation MAC", "adresse Wi‑Fi privée", "id appareil"]
buttons: ["Sessions", "Sur le routeur", "Expulser", "Déconnecter cet appareil"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["glossary.shared", "own.ref.sessions"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

Une **adresse MAC** est l’identité matérielle Wi‑Fi que le Hex rapporte dans les hôtes hotspot actifs. **Sessions** montre cette MAC quand le routeur a vu le client.

**Randomisation MAC** (adresse Wi‑Fi privée) est un réglage OS. iPhone et Android inventent souvent une nouvelle MAC par SSID, ou même tournent. L’autocollant imprimé sur le téléphone n’est pas ce que tu vas voir.

Un **id appareil navigateur** est un id aléatoire que le portail captif garde dans le stockage navigateur du téléphone pour ce routeur. SpaiHub s’en sert pour reprendre **Vérifier le paiement**, **Déconnecter cet appareil** famille, et « est-ce le même navigateur ». Ce n’est **pas** la MAC. Effacer les données du site ou changer de navigateur crée un nouvel id appareil.

**Appareils simultanés** compte les MAC distinctes que le hotspot accepte pour un identifiant, pas « des humains uniques ».

## Pourquoi c’est important

Lundi à Bali : un étudiant a payé MoMo, a perdu la page captive, a ouvert Chrome au lieu du navigateur captif, et a ressemblé à un second appareil. Ou il a basculé « adresse Wi‑Fi privée », s’est réassocié, et **Sessions** a montré une nouvelle MAC pendant que l’ancienne ligne avait l’air périmée. Le personnel a dit « il a cloné le bon ». Non. Le téléphone a changé d’identité exprès.

Mauvais diagnostic : « cette MAC est toujours ce client, donc si je vois une nouvelle MAC ils ont volé le PIN. » Le PIN *peut* se partager — c’est un autre article — mais une nouvelle MAC, c’est aussi ce que font les téléphones honnêtes. Ne traite pas la MAC comme une carte d’identité.

Les MAC aléatoires interagissent aussi avec le NAT : une MAC WAN de répéteur est stable (la boîte ne randomise pas comme un téléphone). Une MAC stable + grosse conso, c’est souvent un répéteur, pas « un Tecno très fidèle ».

## Ce que tu vois

**Sites** → **Sessions** :

- **Appareil**, forfait, routeur, **Fin**, **Expulser**.
- **Sur le routeur** vs **Non vu** — si ce login est dans les hôtes actifs MikroTik maintenant.
- Une colonne MAC quand le Hex en a rapporté une. Des MAC vides ou qui changent, c’est normal autour du Wi‑Fi privé des téléphones.

**Sessions** vide après un bon paiement, c’est en général le script 2 / les commandes, pas la randomisation. La randomisation ne cache pas un client en ligne ; elle change juste l’adresse.

Le portail peut encore connaître l’acheteur par id appareil même quand la MAC a tourné. S’ils essuient les données du site captif, ils sont nouveaux pour le portail aussi. Ils ont encore identifiant + PIN.

## Quoi faire

Ce soir :

1. Si un abonné qui a payé « est devenu un nouveau téléphone », demande s’il a changé de navigateur, vidé le cache, ou a **Adresse Wi‑Fi privée** activée. Fais-le reconnecter au même SSID et rouvrir la page captive.
2. N’**Expulse** pas en punition pour un changement de MAC sauf si tu es sûr que c’est une seconde personne sur un forfait 1 appareil.
3. Pour les forfaits 1 appareil, une seconde MAC *simultanée* est la vraie limite. Une MAC de remplacement après que la première est partie peut être la même personne.
4. Pour les forfaits famille, des MAC en plus sont attendues. Utilise **Terminer pour tous les appareils** seulement quand l’acheteur veut tout le monde dehors.
5. N’inventorie jamais des gens à partir d’impressions de MAC. Ne promets pas à un abonné que tu peux « tracer son téléphone » depuis **Sessions**.

## Quoi ne pas dire

- Ne dis pas qu’une MAC est une personne.
- Ne dis pas aux abonnés le reste de Go du plafond d’usage pendant que tu « enquêtes sur la MAC ».
- Ne prétends pas que SpaiHub désactive le Wi‑Fi privé iPhone. On ne le fait pas.
- Ne mélange pas id appareil et MAC avec le personnel — horloges différentes, stockages différents.
