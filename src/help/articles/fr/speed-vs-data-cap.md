---
id: tip.speed-vs-quota
slug: speed-vs-data-cap
title: "Le débit montant n’est pas un plafond data"
description: "Le débit montant est un débit en Mo/s. Un plafond data est un quota en Mo ou Go. Le débit descendant est plateforme. Afficher le débit montant sur le portail est désactivé par défaut."
role: ["owner"]
section: pro-tips
intents: ["débit montant", "plafond data", "Mo/s vs Go", "limite de débit"]
buttons: ["Débit montant (Mo/s)", "Volume de téléchargement", "Plafond d’usage (caché aux abonnés)", "Afficher le débit montant sur le portail"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.data-package", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 6
---

## Termes

**Débit** = à quelle vitesse les bits bougent **maintenant**. Le **Débit montant (Mo/s)** du forfait SpaiHub est un débit. Défaut : **1 Mo/s** par abonné. Mo/s = mégaoctets par seconde, pas mégabits. Ne confonds pas avec le « M » que tu peux voir dans RouterOS (cette UI parle en mégabits).

**Quota** (plafond, volume) = combien on peut transférer **au total** avant que la session soit coupée. Sur un forfait **Au volume**, ce produit est **Volume de téléchargement**. Sur un forfait **Au temps**, un quota caché optionnel est **Plafond d’usage (caché aux abonnés)**.

**Débit descendant** (à quelle vitesse les abonnés tirent la vidéo) est **plateforme** pour les hotspots SpaiHub. Tu ne règles pas un débit descendant par forfait dans **Ajouter un forfait**. Tu règles le montant. Tu règles le quota ou le temps.

**Data illimitée** sur un forfait au temps, c’est le mot abonné pour « ce n’est pas un produit data visible ». Ce n’est pas une promesse de débit.

## Pourquoi c’est important

La confusion RouterOS la plus courante dans les ateliers à Douala : un propriétaire met **Débit montant (Mo/s)** à 2, puis dit au comptoir « ce forfait c’est 2 Go ». Les abonnés achètent, stream, et discutent quand l’heure finit avec « tu as dit 2 giga ». Mo/s ≠ Go. L’un ouvre le robinet. L’autre est la taille du seau.

Incident : un cybercafé à Makepe vendait « 5 MB » en tapant 5 dans **Débit montant (Mo/s)**. Le portail, avec **Afficher le débit montant sur le portail** désactivé (le défaut), ne montrait même pas ce chiffre. Les acheteurs voyaient un forfait au temps avec **Data illimitée**. Le personnel croyait que le portail cachait « 5 Go ». Il cachait un *débit* que tu as demandé de ne pas afficher, et il n’y avait aucun quota 5 Go.

Mauvais diagnostic : « augmente le débit montant pour que le plafond d’usage ne tombe pas. » Un montant plus rapide peut brûler un plafond caché *plus tôt*. Le débit n’est pas des gigaoctets en plus.

## Ce que tu vois

Dans **Ajouter un forfait** / **Modifier le forfait** :

- **Débit montant (Mo/s)** — « Débit montant maximum par abonné. Par défaut 1 Mo/s. »
- **Au temps** : **Durée de navigation** plus plafond d’usage caché optionnel (quota Go/Mo, pas montré aux acheteurs).
- **Au volume** : **Volume de téléchargement** (quota visible) et **À consommer dans**.

Dans **Paramètres** → **Marque du portail** :

- **Afficher le débit montant sur le portail** / **Afficher le débit montant sur les forfaits** — **Désactivé par défaut.** Astuce : les abonnés ne voient que la durée et le volume, sauf si tu l’actives.

Sur le portail, si tu allumes cet interrupteur, les forfaits peuvent montrer **N Mo/s en envoi**. Les forfaits au temps montrent encore **Data illimitée** pour la période de navigation. Les forfaits au volume montrent le volume de téléchargement. Ni l’un ni l’autre n’est « le reste de Go du plafond d’usage ».

**Détails** propriétaire peut inclure le plafond d’usage et le débit montant. C’est pour toi.

## Quoi faire

1. Décide le produit : horloge (**Au temps**) ou seau (**Au volume**). Écris-le au tableau dans ces mots, en XAF.
2. Laisse le montant à **1 Mo/s** sauf si tu as mesuré ton uplink et tu sais pourquoi un acheteur devrait envoyer plus vite (pas typique pour un hotspot de cité).
3. N’utilise pas le débit montant comme un « Go » marketing. Si tu vends des gigaoctets, crée un forfait **Au volume** avec **Volume de téléchargement**.
4. Garde **Afficher le débit montant sur le portail** désactivé sauf si tu veux vraiment que les abonnés discutent Mo/s versus « Orange lent ».
5. S’ils voient **Plafond d’usage atteint**, vends un autre forfait. N’augmente pas le débit montant comme « correction » et n’annonce pas les Go restants.

## Quoi ne pas dire

- Ne dis pas « 1 Mo/s veut dire 1 Go. »
- Ne dis pas aux abonnés le reste de Go du plafond d’usage sur un forfait au temps.
- Ne promets pas que tu peux régler le Mo/s descendant par forfait sur cet écran. Le débit descendant est plateforme.
- N’accuse pas le script 2 quand un forfait au volume se vide. Le quota a marché.
