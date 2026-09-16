---
id: own.tut.repaste-script2
slug: repaste-connection-script
title: "Recoller le script de connexion sans expulser"
description: "Colle le script 2 seulement pour rafraîchir le heartbeat et le polling commands. Ça ne doit pas expulser en masse les utilisateurs payants. Laisse le script 1 sauf si la page captive est fausse."
role: ["owner"]
section: tutorials
intents: ["script 2", "commands scheduler", "repaste", "heartbeat", "connection script"]
buttons: ["Script de setup"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["tip.script-1-vs-2", "own.tut.hex-existing"]
updatedAt: 2026-09-16
minutes: 10
---

Quand **Sessions** reste vide, les kicks n’atterrissent jamais, ou MoMo réussit mais le WiFi non, le trou habituel c’est le **script 2** — **Connecter à SpaiHub** — pas un nouvel overlay hotspot. Le script 2 installe **spaihub-heartbeat** (1 minute), **spaihub-commands** (15 secondes), et **spaihub-hotspot-active** (2 minutes). Le heartbeat peint **En ligne**. Commands tire GRANT et KICK. Active rapporte qui est sur la boîte.

Recoller le script 2 **rafraîchit le polling** et ne doit **pas expulser en masse** les utilisateurs payants. C’est le but de ce job. Ne reboote pas le Hex « pour la chance » aux heures de pointe ; un reboot **fait** tomber les gens.

Le script 1 c’est l’overlay : walled garden, PAP, `login.html` / `status.html`. Relance le script 1 seulement quand la **page** captive est fausse. Split : [Script 1 vs script 2](/fr/help/script-1-vs-script-2). Walkthrough physique : [Hex hotspot existant](/fr/help/setup-mikrotik-hex-existing). CHR utilise l’étape **Connecter à SpaiHub** de l’assistant, pas cette feuille à deux collages.

## Ce que tu auras

Planificateurs de retour sur le MikroTik, un **Dernier contact** frais, **En ligne** dans les deux minutes si 443 marche, et des grants/kicks qui atterrissent encore. Les gens qui ont déjà payé doivent rester sauf si autre chose reboote la boîte.

## Avant de commencer

- WinBox/terminal sur le **bon** routeur. Coller le script 2 sur le Hex bureau pendant que le Hex invité est malade n’aide personne.
- Tableau de bord **Sites** → **Script de setup** de ce routeur.
- Sache que tu as besoin de HTTPS 443 sortant. Le script 2 ne peut pas téléphoner depuis un WAN walled-off.
- S’il y a des invités dans la boutique, dis-leur que tu rafraîchis le lien, pas que tu reset le WiFi.
- Lis la bannière tableau de bord si elle est là : **Mettez à jour le script de connexion du routeur** — relance le script de connexion depuis Sites → ton routeur → Setup. Après avoir collé, tu peux **Masquer** la bannière.

Ne prends pas un second MoMo de quelqu’un qui a déjà payé. Si c’est le cas, garde [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi) ouvert. Le script 2 c’est comme ça que les grants commencent à atterrir ; ce n’est pas un bouton remboursement et ce n’est pas un reset WAN.

Si le **login.html** captif est encore le défaut MikroTik, c’est le script 1, un autre collage. Cet article suppose que la page invité a déjà l’air SpaiHub (**Payer en MoMo**, **J’ai un bon**) et que seul le chemin radio/grant est malade.

## Étapes

1. **Sites** → **Routeurs** → **Script de setup**.
2. Laisse **Chemin du script 1** comme il est déjà (**Hotspot existant** ou **Créer un hotspot invité**). Tu ne **refais pas** le DHCP invité dans ce job.
3. Copie **seulement** **2. Connecter à SpaiHub**. Colle dans le terminal. Laisse-le retirer/ré-ajouter les trois scripts et planificateurs **spaihub-*** (c’est comme ça que le script généré les rafraîchit).
4. Sur le Hex : `/system scheduler print` et confirme **spaihub-heartbeat**, **spaihub-commands**, **spaihub-hotspot-active**.
5. Attends jusqu’à environ deux minutes. **Dernier contact** tableau de bord doit bouger. Statut **En ligne** (≤ 2 min). **Dégradé** (2–5) attends. **Hors ligne** veut dire 443 ou collage échoué.
6. **Masquer** la bannière de script de connexion si elle est encore là après un bon collage.
7. Teste un **Expulser** sur une session que tu contrôles, ou un MoMo pas cher sur ton propre numéro. Les inconnus payants ne doivent pas être tombés en vague.

Propriétaires CHR : ouvre **Setup CHR**, saute à **Connecter à SpaiHub**, colle ce bloc seulement si l’amorçage et le hotspot ont déjà tourné. Ne colle pas le Script d’amorçage encore sur une VM live.

![Screenshot](about:blank)
_Emplacement capture : panneau Script de setup avec Connecter à SpaiHub mis en avant (staging)._

## Ce que tu dois voir

- Intervalles planificateur : 1 min / 15 s / 2 min.
- **Sessions** commence à montrer **Sur le routeur** pour les logins live après qu’**spaihub-hotspot-active** a un cycle (jusqu’à ~2 minutes, souvent plus vite avec commands).
- Les nouveaux paiements grantent sans reboot.
- Pas de ruée captive-portail de masse.

**Dernier contact Jamais (normal sans MikroTik)** doit être parti après un vrai heartbeat.

## Si ça échoue

**Encore Hors ligne.** DNS WAN, 443, mauvais routeur, ou erreurs de collage. Répare la joignabilité avant de coller une quatrième fois.

**En ligne, encore pas de grants.** Confirme **spaihub-commands** par **nom**. Vert heartbeat-only c’est le piège classique. Voir la procédure du comptoir [Le client a payé mais pas de WiFi](/fr/help/paid-but-no-wifi).

**J’ai aussi collé le script 1 et le DHCP a changé.** Alors tu as quitté cet article. Le script 1 sur **Créer un hotspot invité** c’est un autre job. Restaure si le WAN est mort.

**Les gens se sont déconnectés.** Cherche reboot, clignotement courant, ou tu as lancé l’amorçage sur CHR. Le script 2 tout seul ne doit pas expulser en masse. S’il l’a fait, collecte le scheduler print et continue le support — ne refacture pas les invités.

**Bannière Masquer, problème reste.** Cacher l’UI ≠ réparer. Colle le script 2.

**Prévisualiser le portail a toujours marché.** La preview n’a pas besoin de heartbeat. Le grant live si. N’utilise pas une jolie preview comme preuve que le script 2 est sain.

**Scheduler print montre heartbeat mais pas commands.** Colle le script 2 encore. Ne « répare » pas ça avec un reboot à 20 h 30. Après que commands existe, un **Expulser** sur ta propre session test doit tomber en ~15 secondes — c’est une preuve plus saine qu’un autre MoMo d’inconnu.

**CHR vs Hex.** Physique : **Script de setup** → bloc 2. Cloud : **Setup CHR** → **Connecter à SpaiHub**. Mélanger l’amorçage dans un CHR live c’est comme ça que tu déconnectes en masse. Rappel d’ordre : [Ordre des scripts CHR](/fr/help/chr-script-order).

**Bannière Masquer, encore Dégradé.** Attends un heartbeat ≤ 2 minutes. **Dégradé** c’est 2–5. **Hors ligne** c’est jamais ou > 5. Le statut c’est le temps, pas une humeur. Répare 443 si Dernier contact ne bouge pas.
