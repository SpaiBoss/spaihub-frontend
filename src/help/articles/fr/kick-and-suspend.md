---
id: own.tut.kick-suspend
slug: kick-and-suspend
title: "Expulser une session ou suspendre un site"
description: "Coupe un login en environ 15 secondes, ou suspends tout le site pour arrêter les nouvelles ventes et expulser tout le monde. Il faut le planificateur commands."
role: ["owner"]
section: tutorials
intents: ["kick", "suspend", "activate", "ban", "end session"]
buttons: ["Expulser", "Suspendre"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.ref.sessions", "own.ref.locations"]
updatedAt: 2026-09-16
minutes: 10
---

Deux marteaux différents. **Expulser** c’est une session live — le téléphone qui hog le Hex à 21 h. **Suspendre** c’est tout le **site** : les nouveaux achats portail s’arrêtent, et les sessions live sont expulsées. Utilise **Suspendre** quand la boutique ferme, le routeur est dans le sac de réparation, ou tu dois geler un site sans supprimer l’historique.

**Activer** rallume le site. **Désactiver** sur un **forfait** c’est encore un autre marteau — ça cache un SKU, pas la boutique.

Expulser n’est pas de la magie instantanée du cloud vers la radio. SpaiHub met un kick MikroTik en file. Le planificateur **spaihub-commands** (script 2, toutes les **15 secondes**) doit tourner. Texte du toast : **Session terminée — déconnexion sous 15 secondes**.

Lis les tableaux : [Référence sessions](/fr/help/reference-sessions) et [Référence sites](/fr/help/reference-locations).

## Ce que tu auras

Soit une ligne partie de **Sessions**, soit un site marqué suspendu pour que le corridor ne puisse pas acheter jusqu’à **Activer**. L’historique Transactions reste. Le portefeuille ne rembourse personne — Expulser c’est l’accès, pas un reverse Campay.

## Avant de commencer

- Le routeur doit être **En ligne** pour qu’un kick atterrisse. **Hors ligne** veut dire que tu cries dans une radio morte.
- Confirme que **spaihub-commands** existe si les kicks « ne font rien ». S’il manque, [recoller le script 2](/fr/help/repaste-connection-script) — ne doit pas expulser en masse les payeurs juste en collant.
- Sache **Sur le routeur** vs **Non vu**. **Sur le routeur** veut dire que le login est dans les hôtes actifs MikroTik. **Non vu** veut dire que SpaiHub a une idée de session que le Hex n’a pas montrée. Expulser une ligne **Non vu** peut encore mettre une commande en file ; si la MAC n’était jamais là, l’invité n’était jamais en ligne.
- Une MAC peut être une passerelle NAT (répéteur bon marché, hotspot téléphone). Expulser cette MAC fait tomber tout le monde derrière. Ça peut être ce que tu veux.

Ne **Suspendre** pas parce qu’un enfant a acheté un plan 1 heure. **Expulser** cette session. **Suspendre** c’est l’interrupteur « boutique fermée / Hex dans le sac ». Ça expulse **toutes** les sessions live de ce site et arrête **Payer en MoMo** et les nouvelles utilisations de bons là. **Activer** c’est comme ça que tu rouvres. Tu gardes l’historique **Transactions** dans les deux cas — ce n’est pas une suppression.

Sur téléphone, **Sessions** c’est le raccourci **Live** sous le site déplié. **Expulser** est encore le bouton de ligne. Il n’y a pas de cloche qui liste des « MAC bannies ». Les MAC téléphone randomisées ressembleront à un nouvel appareil demain ; c’est un réglage téléphone, pas une vengeance SpaiHub.

## Étapes — expulser une session

1. **Sites** → déplie le site → **Sessions** (raccourci : **Live**). Texte vide : **Aucune session active sur ce site.**
2. Trouve la ligne : appareil/téléphone, forfait, routeur, fin, **Sur le routeur** ou **Non vu**, MAC.
3. Appuie sur **Expulser**. Attends environ 15 secondes.
4. Le téléphone doit revenir à la page captive. S’ils ont payé un plan au temps, ils peuvent racheter — Expulser n’est pas un ban à vie.

## Étapes — suspendre le site

1. Ligne de liste **Sites** (pas seulement l’onglet). Appuie sur **Suspendre**.
2. Confirme que le site montre suspendu. Les nouveaux **Payer en MoMo** / utilisation de bon pour ce site doivent s’arrêter. Les gens live se font expulser.
3. Quand la boutique rouvre ou le Hex est de retour, appuie sur **Activer**. Chemins toast : **Site suspendu** / **Site activé**.

**Modifier le site** change seulement **Nom du site** et **Adresse**. Ça n’expulse pas.

![Screenshot](about:blank)
_Emplacement capture : Sessions Expulser et site Suspendre (staging)._

## Ce que tu dois voir

- Après Expulser : la ligne disparaît ou l’appareil tombe ; toast environ 15 secondes.
- Après Suspendre : statut du site **Suspendu** ; **Sessions actives** sur **Tableau de bord** pour ce site baissent.
- **Transactions** liste encore le MoMo et les bons d’aujourd’hui. Tu n’effaces pas l’histoire XAF de la soirée.
- Plans famille : **Terminer pour tous les appareils** sur le portail c’est le cousin côté invité d’un kick-all pour ce code. Propriétaire **Expulser** c’est par ligne de session.

## Si ça échoue

**Expulser ne fait rien.** Planificateur commands manquant ou routeur **Hors ligne**. Colle le script 2. Ne reboote pas le Hex en premier réflexe aux heures de pointe — ça, ça expulse en masse.

**Je voulais arrêter un forfait.** **Désactiver** sur **Forfaits**, pas **Suspendre** le site.

**Suspendu mais des gens encore en ligne.** Attends le poll de commande (~15 s) et les sessions en vol. Si encore là, vérifie que tu as suspendu le **bon** site — les mélanges Akwa vs Bastos sont courants.

**Non vu pour toujours.** Grant jamais importé, ou script heartbeat/active périmé. Voir [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi) s’ils ont payé. **Sur le routeur** c’est le drapeau live sain.

**Expulsé une MAC NAT et toute la maison a crié.** Attendu. Vends des [forfaits famille](/fr/help/create-family-package) et explique le mode routeur des répéteurs bon marché. Tu ne peux pas Expulser « juste le neveu » derrière le NAT.

**Cherché une cloche liste de bans.** Pas dans cette version. Expulser + Suspendre + désactiver forfait sont les outils.

**Activer ne fait rien.** Tu es peut-être déjà actif, ou tu as tapé sur le mauvais site. Confirme le libellé de ligne. Si le portail refuse encore de payer, vérifie routeur **Hors ligne** — c’est un autre bloc que suspendre.

**J’ai suspendu pour « reset le plafond d’usage ».** Mauvais outil. Le plafond d’usage sur les plans au temps c’est le plafond caché du forfait ; les invités voient encore data illimitée. Quand ils tapent le plafond ils rachètent. Ne cite pas les Go restants, et ne gèle pas tout le corridor.

Quand le site est sain encore, [teste MoMo](/fr/help/test-momo-online) sur un SKU pas cher avant de faire confiance à l’heure de pointe. Si les kicks n’ont jamais atterri, colle le script 2 d’abord : [recoller le script de connexion](/fr/help/repaste-connection-script).
