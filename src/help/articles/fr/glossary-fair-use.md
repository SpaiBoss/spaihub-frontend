---
id: glossary.fair-use
slug: glossary-fair-use
title: "Plafond d’usage"
description: "Le plafond d’usage est un plafond caché en gigaoctets sur un forfait au temps. Les abonnés voient Data illimitée, puis Plafond d’usage atteint. Achetez un autre forfait pour continuer. Jamais le reste en Go sur la page abonné."
role: ["owner", "contributor"]
section: glossary
intents: ["plafond d’usage", "plafond caché", "data illimitée"]
buttons: ["Plafond d’usage (caché aux abonnés)"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.fair-use-hidden", "own.tut.time-package"]
updatedAt: 2026-09-16
minutes: 4
---

## Termes

**Plafond d’usage** sur SpaiHub = un **plafond d’octets caché optionnel** sur un forfait **Au temps**. Les propriétaires le règlent avec **Plafond d’usage (caché aux abonnés)**. Les nouveaux forfaits au temps partent **cochés** à **2 Go**.

Les abonnés **voient** : **Data illimitée** pendant la période de navigation. Ils **ne voient pas** les gigaoctets restants.

Quand MikroTik touche le plafond : **Plafond d’usage atteint. Achetez un autre forfait pour continuer.**

Le **Volume de téléchargement** **Au volume** est un produit quota *visible*. N’appelle pas ça « plafond d’usage caché ». Case différente, phrase abonné différente.

Le plafond est appliqué **par login** (partagé avec hotspot/NAT sur cet identifiant). Ce n’est pas par téléphone derrière un répéteur bon marché. SpaiHub n’utilise **pas** de TTL anti-tether pour l’appliquer.

## Pourquoi c’est important

Le temps, c’est ce que tu as vendu. Le plafond caché protège l’uplink d’une maison TikTok. Si n’importe qui à la boutique — propriétaire, personnel, contributeur debout à la caisse — lit les Go restants à voix haute, tu crées une dette que SpaiHub ne montrera pas.

Les contributeurs ne configurent pas la case. Ils ne doivent toujours pas inventer des Go restants quand un acheteur discute à côté de leur uplink.

Le plafond d’usage n’est pas non plus « temps illimité ». Quand la **Durée de navigation** finit, la session finit même si le plafond caché n’a jamais été touché. Deux horloges : l’heure que tu as vendue, et les gigaoctets silencieux. On dit aux abonnés l’heure (et **Temps restant** une fois connectés). On ne leur dit pas les Go restants.

## Ce que tu vois

Formulaire forfait propriétaire : case plafond d’usage, astuces on/off, montant en Mo/Go. La colonne **Détails** peut montrer le plafond aux propriétaires.

Portail : formulation illimitée ; puis la bannière de coupure. **Fermer** cache la bannière, n’ajoute pas de data.

Pas de cloche Paramètres quand le plafond tombe. Pas de barre de Go abonné.

## Quoi faire

Propriétaires : laisse le défaut coché sauf si tu acceptes des octets illimités pour toute la **Durée de navigation**. Forme la caisse : après la bannière, vends un autre forfait. Contributeurs : si tu entends une bagarre de Go restants, pointe le texte de la bannière, pas un chiffre.

Si la coupure est instantanée, suspecte un partage NAT ou un plafond trop bas — change le formulaire propriétaire, toujours sans annoncer les Go restants. Les nouveaux forfaits au temps cochent la case **on** à 2 Go ; décoche seulement quand tu veux des octets illimités pour cette période de navigation.

## Quoi ne pas dire

- Jamais le reste de Go du plafond d’usage aux abonnés. C’est toute l’entrée de glossaire.
- Ne dis pas que le plafond d’usage est un réglage de débit descendant. Le débit est en Mo/s ; ça, c’est un quota.
- Ne dis pas que le TTL est le plafond d’usage. Le TTL reste désactivé.
- Ne dis pas à un contributeur qu’il peut basculer le plafond caché dans ses **Paramètres**.
