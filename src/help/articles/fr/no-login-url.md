---
id: tip.login-html
slug: no-login-url
title: "RouterOS n’a pas de login-url"
description: "Le hotspot MikroTik n’a pas de propriété login-url. SpaiHub installe hotspot/login.html et status.html pour que les téléphones ouvrent le portail captif. Ne cherche pas un login-url manquant dans Winbox."
role: ["owner"]
section: pro-tips
intents: ["login-url", "login.html", "redirection portail captif", "RouterOS"]
buttons: ["Script de setup", "Hotspot existant", "Prévisualiser le portail"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "tip.script-1-vs-2"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**RouterOS** est le système MikroTik sur le Hex (ou CHR). **Hotspot** est la fonction qui intercepte les nouveaux téléphones et montre une page de login.

**login-url** est une propriété dont les gens se souviennent d’autres marques de portail captif, ou de vieux posts forum. **Le hotspot RouterOS n’a pas de réglage `login-url`.** Le chercher dans Winbox est une impasse.

**login.html** / **status.html** sont des fichiers dans le dossier hotspot du routeur. Le script 1 télécharge le `login.html` SpaiHub (et la page status liée) pour que le téléphone soit redirigé vers ton portail marqué au lieu du formulaire MikroTik d’origine.

**Walled garden** = la liste des hôtes qu’un téléphone peut joindre *avant* d’être logué (portail, API, Campay, vérifs de certificats). Le HTTPS sortant en TCP 443 doit marcher sinon le fetch de ces HTML et plus tard les heartbeats échouent.

## Pourquoi c’est important

Incident d’un atelier à Bepanda : un technicien a passé deux heures dans Winbox à chercher « login-url » parce qu’une vidéo YouTube d’un autre vendeur utilisait ce mot. Le Hex avait déjà un hotspot. Le script 1 n’avait pas été collé, donc les téléphones voyaient encore le login MikroTik gris. Il a conclu « SpaiHub est incompatible avec un hotspot existant ». C’était compatible. On superpose du HTML ; on ne bascule pas un interrupteur login-url qui n’existe pas.

Mauvais diagnostic : « change le login-by du profil hotspot » comme seule étape, ou colle un `login.html` au hasard d’un blog. Un mauvais HTML n’enverra pas les acheteurs vers tes forfaits, MoMo, ou **Vérifier le paiement**.

## Ce que tu vois

**Sites** → routeur → **Script de setup** :

- **1. Setup hotspot (une fois)** avec le chemin **Hotspot existant** ou **Créer un hotspot invité**.
- Les commentaires du script disent que RouterOS n’a pas de propriété login-url — la redirection est installée comme `hotspot/login.html`.

Après un collage réussi, `/file print` sur le routeur montre `hotspot/login.html`. Les téléphones qui tombent sur le portail captif doivent atterrir sur **Payer en MoMo** / **J’ai un bon**, pas seulement un écran générique utilisateur/mot de passe MikroTik.

**Prévisualiser le portail** depuis le tableau de bord ouvre la même page abonné dans un navigateur *sans* avoir besoin de ce fichier — la prévisualisation ne prouve pas que le HTML du Hex a été installé. Un vrai téléphone sur le SSID, oui.

Si le fetch du script 1 a échoué (pas de HTTPS), le routeur peut garder une vieille page de login. Le heartbeat peut encore arriver plus tard depuis le script 2. Ne traite pas **En ligne** comme une preuve que login.html est le tien.

## Quoi faire

1. Confirme que le hotspot assigne déjà des IP (**Hotspot existant**) ou utilise **Créer un hotspot invité** s’il te faut que SpaiHub ajoute un LAN invité.
2. Colle **1. Setup hotspot (une fois)** dans le terminal. Attends le fetch réussi.
3. Colle **2. Connecter à SpaiHub**. Le script 2 rafraîchit aussi `login.html` en cas de succès pour que le message plafond d’usage reste à jour.
4. Joins le SSID invité avec un téléphone. Tu dois voir ta marque, tes forfaits, **Payer … XAF**.
5. Si tu vois encore le login MikroTik d’origine, ne cherche pas login-url. Recolle le script 1 après avoir corrigé la sortie TCP 443 et le walled garden. Voir [Hex a besoin de HTTPS vers SpaiHub](/fr/help/walled-garden-https).

Ne publie pas et ne tape pas d’URL API live avec tokens dans les chats Aide. Le script sur **Script de setup** est généré pour ce routeur.

## Quoi ne pas dire

- Ne dis pas à un technicien « mets login-url vers le portail. » Il n’y a pas cette propriété.
- Ne promets pas le reste de Go du plafond d’usage sur la page de login. Le HTML installé peut montrer **Plafond d’usage atteint. Achetez un autre forfait pour continuer.** après la coupure — pas un compteur de Go.
- Ne dis pas que Prévisualiser seul veut dire que les téléphones vont captiver correctement. La prévisualisation saute le fichier Hex.
