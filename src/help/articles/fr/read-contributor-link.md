---
id: con.tut.links
slug: read-contributor-link
title: "Lire une liaison contributeur"
description: "Comment lire Site, Interface, Plafond Mbps, Tarif XAF/Go, dernier relevé, et Actif vs En pause. Vous ne configurez pas RouterOS. Pas de tarif public typique."
role: ["contributor"]
section: tutorials
intents: ["cap", "rate", "meter", "paused"]
buttons: ["Liaisons", "Voir toutes les liaisons →"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.withdraw", "con.ref.links"]
updatedAt: 2026-09-16
minutes: 11
---

## À quoi sert cette page

Ce tutoriel explique comment **lire** une liaison contributeur une fois que **SpaiHub** l’a posée. Ce n’est pas comment construire un hotspot. Vous n’ouvrirez pas Winbox, ne collerez pas le script 1, et ne choisirez pas **MikroTik physique**.

Ouvrez **Liaisons** (titre **Liaisons**, sous-titre **Liaisons physiques configurées par SpaiHub**), ou depuis **Accueil** appuyez sur **Voir toutes les liaisons →**.

Le tableau est **en lecture seule**. Si le tableau dit **Pas encore de liaison**, le tutoriel s’arrête à « attendre ». Le texte vide d’Accueil est la même promesse : **SpaiHub posera une liaison physique vers un hotspot proche et l’affichera ici.**

**SpaiHub ne publie pas de tarif public typique.** Votre paye est la cellule **Tarif**, pas une rumeur Facebook.

## Vocabulaire

**Site** — nom de boutique dont le hotspot consomme votre capacité de réserve.

**Interface** — nom d’interface RouterOS (mono). Territoire technicien.

**Plafond** — plafond **N Mbps** pour cette liaison.

**Tarif** — **N XAF/Go** pour le volume **crédité**.

**Dernier relevé** — **{octets} o · {date}** ou **—**.

**Actif** — peut créditer **Portefeuille**.

**En pause** — échantillons stockés, **pas de crédit**.

**En attente** / **Désactivé** — ne paie pas.

## Tous les contrôles

### **Liaisons** / **Voir toutes les liaisons →**

Ce sont les seuls contrôles dont vous avez besoin. Il n’y a pas de **Modifier**, **Enregistrer**, **Ajouter**, ou **Expulser**.

### Parcourir une ligne

1. **Site** — confirmez que c’est le quartier attendu. Vous ne pouvez pas le retargeter.
2. **Interface** — traitez ça comme un ID. Ne renommez pas les ports.
3. **Plafond** — limite Mbps. Le « Wi‑Fi lent » invité, ce sont les forfaits du propriétaire, pas votre curseur (vous n’en avez pas).
4. **Tarif** — XAF par Go crédité. Exemple seulement : 4 Go crédités à 25 XAF/Go font 100 XAF vers le plancher de retrait. Votre cellule gagne sur tout exemple.
5. **Dernier relevé** — octets + heure. Un relevé **En pause** frais veut dire que le compteur marche et que vous n’êtes pas payé — par conception. Un relevé **Actif** périmé veut dire que les échantillons ont peut-être cessé — toujours pas un job RouterOS pour vous.
6. **Statut** — badge. Pas de liste déroulante.

### Les mêmes données sur **Accueil**

**Vos liaisons** montre le nom, **interface · plafond Mbps · tarif XAF/Go**, le badge, **N active(s)**. **Aujourd’hui** / **Ce mois** convertissent le volume crédité en Go + XAF. Les Go **En pause** ne doivent pas gonfler **Solde**.

## États vides et erreurs

**Pas encore de liaison** — attendez la pose. N’inscrivez pas un compte propriétaire sauf si vous tenez vraiment une boutique.

**Impossible de charger les liaisons** / **Chargement impossible** — rouvrez la page.

Squelette pendant le chargement — pas une boutique vide.

## Ce que cette page ne fait pas

- Vous ne configurez jamais RouterOS, walled garden, CHR, ou **Politique d’accès**.
- Vous n’imprimez pas de bons ni **Prévisualiser le portail**.
- Vous ne voyez pas les Go restants d’usage raisonnable (**Détails** propriétaire / bannière invité **Plafond d’usage atteint** seulement).
- Vous ne retirez pas ici (**Portefeuille** → **Retirer**).
- Pas de tarif public typique.

Lecture seule des liaisons : pas d’**Ajouter**, pas de curseur **Plafond**, pas d’éditeur **Tarif**. Si un partenaire dit « change le Mbps », ce n’est pas un contrôle contributeur.

Ne dites jamais à un passant les Go restants d’après **Dernier relevé**. Ces octets sont le compteur de liaison. Les invités ne voient jamais les Go restants d’usage raisonnable.

**Cette version n’a pas de cloche ni de préférences de notification.** Un badge **Actif** n’allume rien dans **Paramètres**. Rouvrez **Liaisons**.

## Étapes

1. Connectez-vous comme contributeur (e-mail + mot de passe). Si **En attente**, vous n’atteindrez pas **Liaisons**.
2. Ouvrez **Accueil**. Si **Pas encore de liaison**, le travail est d’attendre — la phrase de pose est la spec.
3. Quand une ligne existe, appuyez sur **Voir toutes les liaisons →** (ou nav **Liaisons**).
4. Lisez de gauche à droite : **Site**, **Interface**, **Plafond**, **Tarif**, **Dernier relevé**, **Statut**.
5. Copiez le **Tarif** mentalement. Il n’y a pas de tarif public typique à comparer.
6. Si **En pause**, attendez-vous à ce que **Portefeuille** ne bouge pas même si les octets du **Dernier relevé** augmentent.
7. Si **Actif** et que la date du **Dernier relevé** est aujourd’hui, **Aujourd’hui** Go/XAF sur **Accueil** est le résumé crédité.
8. Quand **Solde contributeur** ≥ 100 XAF, allez au tutoriel de retrait — pas à Winbox.

## Si ça échoue

Tableau vide après des semaines : vous ne pouvez toujours pas ajouter une liaison. Relisez le texte vide. Puis Aide.

Vous avez ouvert **Sites** propriétaire avec un autre compte : c’est une connexion propriétaire boutique. Les contributeurs ne collent pas **Script de setup**.

Vous voulez changer les Mbps : pas un contrôle contributeur.

Vous voulez les Go restants d’usage raisonnable invité : ce chiffre n’est jamais montré aux invités ; les propriétaires voient les plafonds sur **Forfaits** → **Détails**. Sans rapport avec ce tableau.

## Ce que vous aurez après une vraie pose

Une ligne de tableau que vous pouvez capturer : nom du site, interface, plafond Mbps, XAF/Go, dernier échantillon, badge. Cette capture est votre contrat. Les cartes Accueil ont alors un sens (**Aujourd’hui** Go vs **Solde** figé si **En pause**).

Vous n’aurez toujours pas de **tarif typique** publié à côté du tableau. Vous n’aurez toujours pas **Script de setup**. Vous ne verrez toujours pas les MAC invité **Sur le routeur** — ça, c’est **Sessions** propriétaire.

Si le propriétaire suspend le *site*, votre ligne de liaison peut continuer d’exister avec un statut posé par SpaiHub ; vous ne pouvez toujours pas **Activer** un site. Vos contrôles restent : lire **Liaisons**, **Enregistrer** Paramètres, **Retirer** Portefeuille.

Les octets du **Dernier relevé** ne sont pas un quota invité restant. Ne dites jamais à un client de passage « il te reste N Go » depuis ce tableau — les invités n’ont de toute façon jamais les Go restants d’usage raisonnable.

Énoncez les six colonnes dans l’ordre quand vous appelez Aide : Site, Interface, Plafond, Tarif, Dernier relevé, Statut. Cette phrase suffit à un technicien pour trouver la ligne. Ajouter des captures Winbox prises sans permission n’est pas requis et n’est pas une fonctionnalité contributeur.

**N active(s)** sur **Accueil** compte les badges **Actif**, pas les sessions invité. Une boutique pleine avec liaison **En pause** peut encore afficher **0 active(s)**.

Le tarif est en XAF par **Go**, le plafond est en **Mbps**. Ne les mélangez pas. La vitesse du tuyau n’est pas le prix d’un gigaoctet.

Prenez un carnet papier si vous voulez : date, octets du dernier relevé, statut. L’UI n’a pas d’export sur **Liaisons**. Capturez le tableau sur le téléphone au lieu de demander un CSV qui n’existe pas ici.

Si **Site** est un tiret cadratin, la pose est incomplète de votre point de vue — toujours pas un bouton **Ajouter un site**. Les sites propriétaires sont créés par les propriétaires.

Désactivé vs en pause : **Désactivé** est coupé ; **En pause** est « compter mais ne pas payer ». N’employez pas les mots indifféremment quand vous parlez à l’Aide.

Lecture seule encore une fois : vous ne collez pas le script 2, vous ne réglez pas le walled garden, vous n’ouvrez pas Winbox depuis **Liaisons**. Attendez, lisez, retirez quand le solde le permet.

## Tâches liées

Carte de chaque colonne : [Référence liaisons contributeur](/fr/help/reference-contributor-links). Quand **Solde contributeur** ≥ 100 XAF : [Retirer les gains contributeur en MoMo](/fr/help/contributor-withdraw).
