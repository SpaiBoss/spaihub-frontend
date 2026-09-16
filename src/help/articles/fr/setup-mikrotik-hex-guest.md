---
id: own.tut.hex-guest
slug: setup-mikrotik-hex-guest
title: "Hex physique — créer un hotspot invité"
description: "Ajoute un réseau invité 10.10.10.0/24 sur le LAN quand le Hex n’a pas encore de hotspot. WAN et wifi ne sont pas wipés."
role: ["owner"]
section: tutorials
intents: ["guest hotspot", "create guest", "10.10.10", "hex from scratch"]
buttons: ["Créer un hotspot invité"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "tip.walled-garden"]
updatedAt: 2026-09-16
minutes: 15
---

Utilise ça quand le MikroTik physique **ne montre pas** déjà une page de login hotspot. **Créer un hotspot invité** ajoute un réseau invité sur le LAN en **10.10.10.0/24** s’il manque. Ça ne **wipe pas** le WAN. Ça ne **wipe pas** le wifi. Les PC bureau sur le WAN doivent garder internet pendant que tu construis le côté invité.

Si la boîte **assigne déjà** des IP hotspot et une page de login, stop. Utilise [Hex physique — hotspot existant (script 1 puis 2)](/fr/help/setup-mikrotik-hex-existing) pour ne pas empiler un second réseau invité par accident.

Le Hex a encore besoin de **HTTPS (TCP 443)** sortant vers SpaiHub. Le walled garden doit inclure l’hôte API. Les pare-feu cloud ou FAI qui bloquent 443 te laissent **Hors ligne**. Voir [Le Hex doit sortir en HTTPS](/fr/help/walled-garden-https).

## Ce que tu auras

Un LAN invité (idée par défaut : souvent **ether2**) avec `10.10.10.0/24`, un overlay hotspot (script 1), et **Connecter à SpaiHub** (script 2) avec **spaihub-heartbeat** (1 min), **spaihub-commands** (15 s), **spaihub-hotspot-active** (2 min). Les téléphones sur le SSID/port invité ont une page de login SpaiHub. Le WAN (**ether1** dans beaucoup de boutiques) reste la liaison montante.

## Avant de commencer

- **Ajouter un routeur** en **MikroTik physique** sur le bon site.
- Un forfait pour que le portail ne soit pas vide.
- Terminal/WinBox. Lance `/interface print` **avant** de deviner les noms. Certains Hex ont renommé les ports. Certaines boutiques mettent l’AP sur **ether3**. Les champs tableau de bord **LAN (invité)** et **WAN** doivent coller à la réalité.
- Sache quel câble est l’AP invité. Brancher l’AP dans le WAN, ça confond tout le monde à 22 h dans la cité.
- Sauvegarde si ce Hex est aussi le seul routeur de la boutique. Créer un hotspot invité c’est ajouter-si-manquant, pas un reset complet — sauvegarde quand même.
- 443 sortant. Pas de captive côté WAN qui bloque SpaiHub.

Le script 1 c’est l’overlay (walled garden, PAP, HTML). Le script 2 c’est la connexion. Même règle que l’article hotspot existant : ne saute pas le 2.

## Étapes

1. **Sites** → **Routeurs** → **Script de setup**.
2. **Chemin du script 1** → **Créer un hotspot invité**. Indice à l’écran : ajoute un réseau invité sur le LAN (`10.10.10.0/24`) s’il manque ; ne touche pas au WAN ni au wifi ; indique le port invité ci-dessous.
3. Règle **LAN (invité)** (souvent `ether2`) et **WAN** (souvent `ether1`). Confirme avec `/interface print`. Mauvais noms = DHCP invité sur la liaison montante. Ne « teste les deux » pas aux heures de pointe.
4. Copie **1. Setup hotspot (une fois)** et colle dans le terminal. Attends le succès. Ça crée l’overlay invité au besoin et installe le HTML SpaiHub. RouterOS n’a toujours **pas** de `login-url` ; les fichiers HTML sont le login.
5. Copie **2. Connecter à SpaiHub** et colle. Les planificateurs apparaissent.
6. Attends **En ligne**. **Dernier contact Jamais (normal sans MikroTik)** doit disparaître.
7. Connecte un téléphone test au SSID **invité** ou à l’AP sur le port LAN — pas le WAN bureau. Ouvre la page captive. **Prévisualiser le portail** marche encore depuis le tableau de bord même avant ça.

Puis un MoMo pas cher : [Confirmer En ligne et un paiement MoMo test](/fr/help/test-momo-online).

![Screenshot](about:blank)
_Emplacement capture : Créer un hotspot invité avec LAN ether2 et WAN ether1 (staging)._

## Ce que tu dois voir

- Clients invités en `10.10.10.0/24` (sauf si tu avais déjà un autre plan invité et que le script l’a laissé).
- WAN boutique encore debout. Si tout l’immeuble est mort, tu as collé sur la mauvaise interface — restaure la sauvegarde, ne continue pas à coller.
- `/system scheduler print` liste les trois jobs **spaihub-***.
- Portail : **Payer en MoMo** / **J’ai un bon**. Hors ligne bloque encore **Payer {{amount}} XAF**.

Recolle le script 2 si le polling meurt ; ça ne doit pas expulser en masse. Recolle le script 1 seulement si le HTML de login est faux.

## Si ça échoue

**Le WAN est mort.** Probablement noms LAN/WAN inversés. Débranche le câble AP invité, restaure la config, `/interface print`, recommence. Créer un hotspot invité n’est pas censé wipe le WAN ; un mauvais choix de port peut quand même casser une petite topo Hex.

**Pas de DHCP sur les téléphones.** AP pas sur le port LAN invité, ou téléphones encore sur un autre SSID. Créer un hotspot invité ne configure pas chaque package wifi du Cameroun — tu vises encore l’AP vers l’Ethernet invité.

**Hors ligne pour toujours.** 443 bloqué, DNS cassé, ou script 2 jamais collé. Le walled garden doit autoriser les hôtes SpaiHub du script. Voir [walled garden / HTTPS](/fr/help/walled-garden-https).

**J’avais déjà un hotspot et maintenant deux portails.** Tu voulais **Hotspot existant**. Lis [hotspot existant](/fr/help/setup-mikrotik-hex-existing) et ne lance pas Créer un hotspot invité sur une boîte qui login déjà.

**En ligne mais pas de grant après paiement.** **spaihub-commands** manquant. [Recolle le script 2](/fr/help/repaste-connection-script). Ne facture pas le client deux fois.

**Confusion CHR.** Cet article c’est Hex physique. Les VM cloud utilisent [CHR depuis une VM vide (trois scripts dans l’ordre)](/fr/help/setup-chr) — CHR n’a pas de Wi‑Fi ; tu accroches encore un AP sur le pont LAN.

Après Créer un hotspot invité, traite le script 2 aussi sacré que le script 1. Une jolie page de login avec **Dernier contact Jamais**, c’est seulement la moitié du job. Les téléphones en `10.10.10.0/24` ont encore besoin des commands pour importer un grant MoMo. Quand ça marche, lance [Confirmer En ligne et un paiement MoMo test](/fr/help/test-momo-online) sur un SKU pas cher avant samedi soir. Si tu rafraîchis le polling plus tard, colle le script 2 seulement : [recoller le script de connexion](/fr/help/repaste-connection-script).
