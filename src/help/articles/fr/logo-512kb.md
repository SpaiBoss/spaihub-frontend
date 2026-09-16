---
id: tip.logo-512
slug: logo-512kb
title: "Le logo doit faire 512 Ko ou moins"
description: "La marque du portail accepte des logos PNG ou JPEG de 512 Ko ou moins. Une photo boutique 2 Mo échouera. Compresse le fichier, puis Enregistrer la marque. Ce n’est pas un problème de script routeur."
role: ["owner"]
section: pro-tips
intents: ["logo 512 Ko", "marque du portail", "téléverser une image"]
buttons: ["Téléverser une image", "Enregistrer la marque", "Aperçu"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.branding", "own.ref.settings"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Marque du portail** vit sous **Paramètres** (compte + marque). Il n’y a **pas de cloche de notifications** sur Paramètres. Tu es ici pour le look de la page abonné, pas des alertes.

**Logo** = PNG ou JPEG, **512 Ko ou moins**. L’astuce du formulaire correspond à l’erreur **Le logo doit faire 512 Ko ou moins**.

**Téléverser une image** envoie le fichier. **Ou collez l’URL du logo (https://...)** est un champ alternatif. **Logo actuel**, **Logo téléversé**, **Logo retiré**.

**Enregistrer la marque** stocke nom, texte d’accueil, accent, interrupteur débit, et choix de logo. **Aperçu** sur cette page est un échantillon ; **Prévisualiser le portail** sur la ligne routeur est le vrai onglet abonné.

512 Ko, c’est environ un demi-mégaoctet. Une photo téléphone iPhone fait souvent 2–4 Mo. Ça échouera. Ce n’est pas « le Hex a rejeté la photo ».

## Pourquoi c’est important

Incident : un propriétaire à Akwa a exporté un PNG Photoshop à pleine résolution de façade, a appuyé sur **Téléverser une image**, a vu **Impossible de téléverser le logo** ou **Le logo doit faire 512 Ko ou moins**, puis a collé le script 2 « pour rafraîchir le portail ». Les scripts ne redimensionnent pas les JPEG. La page captive a gardé le vieux logo ou le défaut SpaiHub jusqu’à ce qu’un petit fichier atterrisse.

Mauvais diagnostic : « CHR ne peut pas montrer de logos. » CHR sert le même HTML portail. Mauvais diagnostic : « le walled garden bloque le logo donc on doit lister des URL secrètes en plus. » Ne commence pas à ajouter des hôtes au hasard. Corrige d’abord la taille du fichier ; la marque est stockée chez SpaiHub et servie sur le portail déjà walled.

Un logo énorme alourdit aussi la page captive sur un mauvais uplink Orange. Un petit fichier, c’est de la gentillesse pour le premier paquet.

## Ce que tu vois

**Paramètres** → **Marque du portail** / **Marque du portail captif** :

- **Nom de marque sur le portail**
- **Message d’accueil**
- **Couleur d’accent**
- **Logo** — PNG ou JPEG, 512 Ko maximum
- **Téléverser une image** / **Téléversement...**
- **Afficher le débit montant sur le portail** (désactivé par défaut)
- **Enregistrer la marque** → **Marque du portail enregistrée**

Le PDF de bons utilise la même marque : **Les tickets utiliseront [nom] avec votre logo**. Si le téléversement a échoué, les tickets restent texte seulement ou ancienne image.

## Quoi faire

Ce soir :

1. Sur un ordinateur, exporte PNG ou JPEG sous 512 Ko (réduis les pixels ; 400–800 px de large, ça suffit sur une page captive téléphone).
2. **Téléverser une image**. Si tu vois **Le logo doit faire 512 Ko ou moins**, compresse encore — ne réessaie pas le fichier 3 Mo.
3. **Enregistrer la marque**. Ouvre **Prévisualiser le portail** sur la ligne routeur du site (pas seulement l’échantillon Paramètres).
4. Si un collage d’URL échoue, préfère le téléversement. Ne colle pas de liens file-share au hasard qui expirent.
5. Ne recolle pas le script 1 sauf si la *redirection login.html* est fausse. Le logo vit dans la marque, pas dans un login-url manquant (RouterOS n’en a pas).

## Quoi ne pas dire

- Ne dis pas à un technicien que le logo a échoué parce que le TTL anti-tether « a mangé les images ». L’anti-tether reste désactivé et n’a jamais fait ça.
- Ne promets pas aux abonnés le reste de Go du plafond d’usage sur le splash marqué.
- Ne demande pas à l’Aide de lister des URL CDN live avec tokens.
- Ne dis pas que Paramètres te notifiera quand un logo échoue — il n’y a pas de cloche.
