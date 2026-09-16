---
id: tip.one-mac-nat
slug: one-mac-can-be-nat
title: "Une MAC dans Sessions peut être une passerelle NAT"
description: "Sur le routeur veut dire que le Hex a ce login dans les hôtes actifs. Une seule MAC peut encore être un répéteur bon marché ou un hotspot téléphone qui cache plusieurs appareils. Sessions n’est pas un décompte de gens dans la maison."
role: ["owner"]
section: pro-tips
intents: ["une MAC NAT", "sur le routeur", "MAC sessions", "passerelle"]
buttons: ["Sessions", "Sur le routeur", "Non vu", "Expulser"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.pixlink-nat", "own.ref.sessions"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Sessions** = **Sites** → **Sessions** (court **Live**). Ça liste l’accès que SpaiHub croit actif pour ce site.

**Sur le routeur** = le login est dans **hotspot active** MikroTik tel que rapporté par `spaihub-hotspot-active`. Le Hex a actuellement cet utilisateur en ligne.

**Non vu** = SpaiHub a une session payée ou utilisée en logiciel, mais le routeur n’a pas rapporté cet utilisateur dans les hôtes actifs. Courant après un grant jamais importé, un téléphone qui n’a jamais **Connecté**, ou une boîte qui a arrêté de poller.

Une **passerelle NAT** ici = un répéteur bon marché en mode routeur, un travel router, ou un hotspot téléphone : beaucoup de gens, **une MAC WAN**.

## Pourquoi c’est important

L’astuce vide de Sessions le dit clairement : après avoir recollé le script de connexion, **Sur le routeur** live apparaît ici. **Une seule MAC vue peut encore être une passerelle NAT.** Les propriétaires sautent cette phrase et facturent le personnel pour « un seul utilisateur à l’écran » pendant que la cour est pleine.

Incident : **Expulser** sur cette seule ligne a coupé huit personnes. Le propriétaire a cru qu’Expulser était « buggé » et a remboursé. Expulser a fait exactement un utilisateur hotspot — la passerelle.

Mauvais diagnostic : « Sur le routeur est un mensonge parce que je compte 12 téléphones avec mes yeux. » Tes yeux voient des clients 2,4 GHz y compris ceux sur le LAN du répéteur. SpaiHub voit la MAC WAN.

**Sur le routeur** est honnête. Ce n’est pas un recensement.

Les téléphones randomisent aussi les MAC. Une MAC qui *change* sur un étudiant calme, ce n’est pas du NAT. Le NAT, c’est l’inverse : une MAC *stable* avec un trafic de cour. Apprends les deux avant d’**Expulser** la mauvaise personne. **Non vu** après un paiement réussi, c’est en général `spaihub-commands` manquant, pas une passerelle maline. Répare le script 2 d’abord ; chasse les routeurs personnels ensuite.

## Ce que tu vois

Colonnes : **Appareil**, **Forfait**, **Routeur**, **Fin**, **Expulser**, plus **Sur le routeur** / **Non vu**, et MAC quand elle est connue.

Astuces sur la page :

- **Sur le routeur** live après le script 2.
- Une seule MAC peut encore être un répéteur bon marché, un hotspot téléphone ou un routeur personnel qui partage avec plusieurs appareils.

Toast après **Expulser** : **Session terminée — déconnexion sous 15 secondes** (poll des commandes). Toute la maison NAT tombe ensemble.

Vide : **Aucune session active sur ce site.**

## Quoi faire

1. Si la cour est occupée et Sessions montre une MAC **Sur le routeur**, marche pour un répéteur avant d’accuser l’imprimante de bons.
2. Utilise **Expulser** comme outil de règle de maison contre une boîte NAT, en sachant que tu déconnectes tout le monde derrière.
3. Si **Non vu** après MoMo, répare **spaihub-commands**, pas l’histoire de MAC.
4. N’ajoute pas de TTL pour « découper » la MAC. L’anti-tether reste désactivé.
5. Vends des prix famille quand les gens veulent plusieurs téléphones **sur ton SSID**. Le NAT les écrasera encore en une MAC s’ils se cachent.
6. Après **Expulser**, attends le poll commands ~15 s. Si la même MAC revient tout de suite, ils ont encore le PIN — c’est du partage d’identifiants plus NAT, pas un bug Sessions. Change la règle de boutique ou le prix ; ne réinstalle pas le TTL.

## Quoi ne pas dire

- Ne dis pas à un client « je vois tous tes téléphones dans Sessions. » Tu ne les vois pas, s’ils ont NAT.
- Ne promets pas le reste de Go du plafond d’usage par téléphone derrière la passerelle. Le plafond est sur le login.
- Ne dis pas que Non vu veut dire qu’ils n’ont pas payé. Vérifie Campay / Utiliser le bon d’abord.
