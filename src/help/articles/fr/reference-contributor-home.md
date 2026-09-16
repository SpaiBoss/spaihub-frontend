---
id: con.ref.home
slug: reference-contributor-home
title: "Référence accueil contributeur"
description: "Accueil contributeur : Bienvenue, Solde, Retirer →, Aujourd’hui et Ce mois Go + XAF, Vos liaisons, texte vide de liaison."
role: ["contributor"]
section: reference
intents: ["reference", "reference-contributor-home"]
buttons: ["Retirer →", "Voir toutes les liaisons →"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["con.tut.account", "con.tut.links"]
updatedAt: 2026-09-16
minutes: 10
---

## À quoi sert cette page

**Accueil** est le premier écran après une connexion **contributeur SpaiHub** — quelqu’un qui vend de la bande passante inutilisée vers un hotspot proche. Vous ne tenez **pas** la boutique, ne vendez pas de bons, ne collez pas de scripts MikroTik, et ne dessinez pas le portail captif. Les techniciens SpaiHub posent une liaison physique ; cette page montre si cette liaison existe, combien de Go ont été relevés, et ce que vous pouvez retirer.

Ouvrez **Accueil** dans la navigation contributeur. L’en-tête marine affiche **SpaiHub** et un badge **Contributeur** pour que vous sachiez que vous n’êtes pas dans le tableau de bord propriétaire. Sous-titre de la page : **Aperçu de votre contribution de bande passante**.

Vous n’êtes pas propriétaire. Le **Tableau de bord** propriétaire (**Revenu du jour**, routeurs, bons, **Exporter CSV**) est une autre connexion. Si vous vouliez vendre du Wi‑Fi aux passants, utilisez **Connexion propriétaire** sur l’écran de connexion contributeur — n’attendez pas sur cet Accueil des outils hotspot qui n’apparaîtront jamais.

Si vous venez de vérifier l’e-mail et que **Se connecter** dit encore **Votre compte attend la validation d’un administrateur.**, vous ne verrez pas encore cette page. Le statut reste **En attente** jusqu’à ce que SpaiHub vous active. Ce n’est pas un Accueil cassé ; vous n’êtes pas dedans.

## Vocabulaire

**Contributeur** — une personne payée en XAF par Go crédité pour de la capacité de réserve sur une interface que SpaiHub a configurée.

**Liaison** — une liaison montante physique : un nom de site, une **Interface** RouterOS, un **Plafond** en Mbps, un **Tarif** en XAF/Go, un dernier relevé, un badge de statut.

**Solde** — votre **Solde contributeur** en XAF, le même seau que **Portefeuille**. Les contributeurs ne voient **pas** le découpage propriétaire **Disponible au retrait** vs **Réservé aux contributeurs**. Cette réserve est de l’argent que le *propriétaire* ne peut pas retirer parce qu’elle paie des gens comme vous.

**Aujourd’hui** / **Ce mois** — Go et XAF que SpaiHub vous attribue pour ces périodes. Les liaisons **En pause** stockent encore des relevés **sans** ajouter de XAF.

**Active(s)** (compte sur **Vos liaisons**) — combien de vos lignes sont en statut **Actif**, pas combien d’invités sont sur le hotspot.

**En attente** (compte) — vous après vérification, avant activation. Différent d’un statut de liaison **En attente**.

## Tous les contrôles

### **Bienvenue, {nom}**

Le titre utilise **Nom affiché** depuis **Paramètres**. En dessous : **Aperçu de votre contribution de bande passante**. Il n’y a pas de crayon sur Accueil — changez le nom sous **Paramètres** → **Enregistrer**.

### Carte **Solde**

Libellé **Solde**. Grand **N XAF** avec séparateurs de milliers. Ce n’est pas des Go et pas le revenu boutique propriétaire.

Si c’est 0 après une semaine d’une liaison **Actif**, lisez **Liaisons** (**Dernier relevé**, **Statut**) avant de conclure que Campay a échoué. Les relevés en pause ne remplissent pas cette carte.

### **Retirer →**

Lien texte, pas une modale. Il mène au **Portefeuille** contributeur. Sur cette page vous appuyez sur **Retirer**. Accueil ne demande jamais de numéro de téléphone.

### Carte **Aujourd’hui**

Libellé **Aujourd’hui**. Grand **N,NN Go** (deux décimales). En dessous, **N XAF** pour le montant crédité du jour. Un jour calme affiche **0,00 Go** et **0 XAF**. Ça peut être honnête (pas de trafic) ou **En pause** (trafic sans paye).

### Carte **Ce mois**

Libellé **Ce mois**. La même paire pour le mois calendaire. Servez-vous-en pour « ai-je assez gagné pour atteindre le plancher de retrait **100 XAF** ? » pas pour des livres fiscaux — il n’y a pas d’export CSV sur l’Accueil contributeur.

### Bloc **Vos liaisons**

Titre **Vos liaisons**. À droite : **N active(s)**.

Chaque ligne :

- **Nom** du site (ou le libellé générique **Site** si un nom manque)
- Ligne mono **interface · plafond Mbps · tarif XAF/Go**
- Badge de statut : **Actif**, **En pause**, **En attente**, ou **Désactivé**

Appuyer sur une ligne **n’ouvre pas** une page de détail. Utilisez **Voir toutes les liaisons →** pour **Dernier relevé**.

### **Voir toutes les liaisons →**

Lien de pied vers **Liaisons**. Toujours affiché, même quand la liste est vide.

### En-tête et navigation (sur chaque page contributeur)

**SpaiHub**, **Contributeur**, **EN** / **FR** (**Changer de langue**), **Aide**, votre nom (grands écrans), **Déconnexion**. Onglets de nav : **Accueil**, **Liaisons**, **Portefeuille**, **Paramètres**.

**Il n’y a pas de cloche de notification.** Les changements de solde et les retraits en file ne sonnent pas de cloche sur cet Accueil.

## États vides et erreurs

Pas de liaisons — c’est l’état vide important :

- **Pas encore de liaison**
- **SpaiHub posera une liaison physique vers un hotspot proche et l’affichera ici.**

Lisez ça deux fois. Vous n’ajoutez pas un site. Vous ne collez pas le script 2. Vous n’inventez pas un tarif. Quand un technicien pose la liaison, la ligne apparaît sur Accueil et **Liaisons**.

Échec de chargement : **Impossible de charger le tableau de bord** avec la description **Chargement impossible** (ou l’erreur API). Il n’y a pas de bouton **Réessayer** sur cet état vide — rouvrez **Accueil** ou **Déconnexion** / **Connexion**.

Chargement : squelette gris, pas de faux zéros.

## Ce que cette page ne fait pas

- Pas d’**Ajouter un site**, **Ajouter un routeur**, **Générer des bons**, **Prévisualiser le portail**, ou **Expulser**.
- Pas de terminal RouterOS et pas d’assistant CHR.
- Pas de tarif public typique XAF/Go. Votre tarif est sur la ligne de liaison quand une liaison existe.
- Pas de Go restants d’usage raisonnable — c’est une règle hotspot invité/propriétaire. Vous relevez des Go de liaison montante.
- Pas de liste de ventes MoMo propriétaire et pas d’**Exporter CSV**.
- Pas de préférences de notification. Pas de console admin.

Les **Liaisons** sont en **lecture seule**. Accueil n’ajoute pas de ligne. Si **Pas encore de liaison** reste une semaine, vous n’avez pas raté l’inscription ; le tuyau n’est pas encore posé.

**Cette version n’a pas de cloche ni de préférences de notification.** Un solde qui passe 100 XAF n’allume rien dans **Paramètres**. Ouvrez **Portefeuille** quand le héros le justifie.

## Une semaine normale sur cet écran

Lundi : **Pas encore de liaison** et la phrase de pose. Vous n’avez pas raté l’inscription.

Mercredi : une ligne apparaît, badge **En attente** ou **Actif**, **Solde** encore 0. **Aujourd’hui** peut rester **0,00 Go** jusqu’au trafic et au crédit.

Vendredi : **Ce mois** montre Go + XAF, **N active(s)** vaut 1, **Retirer →** vaut le coup seulement si le héros sur **Portefeuille** fait au moins **100 XAF**. Si le badge est **En pause**, ignorez la tentation de traiter le mouvement du **Dernier relevé** comme une paye.

Si **Bienvenue** montre le mauvais nom, c’est **Paramètres**, pas un bug d’Accueil.

Ne confondez pas **Solde** ici avec **Solde portefeuille** propriétaire. Un propriétaire voit **Réservé aux contributeurs** sur *son* **Portefeuille**. Vous voyez un seul **Solde**.

**N active(s)** compte les badges **Actif**, pas les sessions invité. Une boutique pleine avec liaison **En pause** peut encore afficher **0 active(s)**.

## Tâches liées

- S’inscrire, vérifier, attendre **En attente** : [Créer un compte contributeur](/fr/help/create-contributor-account).
- Lire plafond, tarif, pause : [Lire une liaison contributeur](/fr/help/read-contributor-link) et [Référence liaisons contributeur](/fr/help/reference-contributor-links).
- Encaisser quand le solde ≥ 100 XAF : [Retirer les gains contributeur en MoMo](/fr/help/contributor-withdraw).
