---
id: own.ref.home
slug: reference-dashboard
title: "Référence tableau de bord"
description: "Carte de l’écran Tableau de bord propriétaire : cartes de stats, graphiques, santé des routeurs, Exporter CSV comptable, et la bannière du script de connexion."
role: ["owner"]
section: reference
intents: ["reference", "reference-dashboard", "csv", "router health"]
buttons: ["Exporter CSV", "Masquer"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.reports", "own.tut.repaste-script2"]
updatedAt: 2026-09-16
minutes: 10
---

## À quoi sert cette page

**Tableau de bord** est le premier écran après une connexion propriétaire **SpaiHub**. C’est le coup d’œil du matin : combien d’argent est entré, combien de personnes sont en ligne, si vos boîtiers MikroTik parlent à SpaiHub, et si le stock de bons bouge. Il ne vend pas d’internet, n’expulse pas un téléphone, et n’envoie pas de MoMo. Il **rapporte**.

Ouvrez-le depuis la barre latérale **Tableau de bord** (sur un téléphone, la barre du bas **Accueil**). Le titre de page est **Tableau de bord**. Le sous-titre est **Revenus, sessions et santé du réseau.**

Servez-vous de cet article comme d’un plan. Chaque carte et chaque graphique ci-dessous est sur cet écran aujourd’hui. Les noms de boutons suivent le français du tableau de bord. Passez le chrome en **FR** si le personnel travaille en français — les chiffres restent les mêmes.

## Vocabulaire

**Revenu** ici, c’est l’argent des ventes hotspot en francs CFA d’Afrique centrale (**XAF**). **Revenu du jour** et **Ce mois** sont les gains nets que SpaiHub attribue à vos boutiques pour ces périodes — pas le cash dans votre poche, et pas le même chiffre que **Solde portefeuille**.

**Portefeuille** est le seau de paiement des ventes **Mobile Money** réussies, après la commission plateforme en vigueur. Le stock de bons que vous avez vendu en cash au comptoir **n’arrive pas** ici. Le tableau de bord trace quand même la valeur faciale des bons pour que vous voyiez l’activité boutique.

**Sessions actives** sont les connexions payées qui n’ont pas encore expiré, sur tous vos sites. Ce n’est pas un décompte de téléphones dans la pièce. Une MAC sur le Hex peut être un répéteur bon marché ou un hotspot téléphone qui partage avec toute une maison.

**Dernier contact** est la dernière fois qu’un routeur a envoyé un heartbeat à SpaiHub. **Jamais vu** signifie aucun heartbeat encore. C’est normal si vous avez ajouté un routeur seulement pour **Prévisualiser le portail**, ou si vous n’avez pas collé le script de connexion.

**CSV comptable** est un fichier par plage de dates pour vos livres. Ce n’est pas un grand livre en direct sur cette page, et ce n’est pas la liste des retraits du **Portefeuille**.

**Script de connexion** (script 2) est le collage MikroTik qui démarre le heartbeat et le polling des commandes, pour que SpaiHub puisse accorder l’accès après paiement et honorer **Expulser**.

## Tous les contrôles

### Plage de dates comptable et **Exporter CSV**

En haut se trouvent deux sélecteurs de dates (du / au) et **Exporter CSV**. La plage par défaut est les 30 derniers jours jusqu’à aujourd’hui. Appuyez sur **Exporter CSV**. Pendant la construction du fichier, le bouton affiche **Export...**. En succès vous avez le toast **CSV téléchargé**. En échec : **Export CSV impossible**.

L’indication sur cette barre est **Exportez un CSV comptable pour vos livres.** Servez-vous-en pour le comptable, pas pour expulser un utilisateur ou vérifier un seul MoMo. Pour le parcours Tableau de bord vs Portefeuille vs Transactions, voir [Tableau de bord, portefeuille, transactions](/fr/help/dashboard-wallet-transactions).

### Bannière : **Mettez à jour le script de connexion du routeur**

Si vous avez déjà au moins un routeur, une bannière ambre peut apparaître :

- Titre : **Mettez à jour le script de connexion du routeur**
- Corps : **Relancez le script de connexion depuis Sites → votre routeur → Setup. Le nouveau script confirme les commandes avec SpaiHub pour que les accès et les expulsions soient fiables.**

**Masquer** cache la bannière sur ce navigateur (SpaiHub mémorise le choix dans le stockage local). Masquer **ne met pas à jour** le Hex. Vous ouvrez toujours **Sites**, développez le site, ouvrez **Script de setup** (physique) ou **Setup CHR**, et collez le script 2. Pas à pas : [Recoller le script de connexion sans expulser](/fr/help/repaste-connection-script).

La bannière n’apparaît pas quand vous avez zéro routeur.

### **Revenu du jour**

Grande carte. Montant en XAF. En dessous, un pourcentage **vs hier**. Si hier était à zéro et qu’aujourd’hui a des ventes, la tendance affiche 100 %. C’est l’entrée boutique du jour calendaire, pas le cash du portefeuille.

### **Ce mois**

Même idée pour le mois calendaire en cours, avec **vs mois dernier**. Comparez Akwa en mars à Akwa en février ici — ne le confondez pas avec **Depuis le début**.

### **Sessions actives**

Nombre de sessions encore dans leur fenêtre payée. On n’appuie sur rien — ce n’est pas un bouton. Pour voir téléphone, MAC, **Sur le routeur** / **Non vu**, et **Expulser**, développez un site et ouvrez l’onglet **Sessions**.

### **Solde portefeuille**

Total portefeuille affiché d’un coup d’œil. Le chiffre sur **Portefeuille** (**Disponible au retrait** après la réserve contributeurs) est celui que vous encaissez. Cette carte n’ouvre pas **Retirer vers MoMo**.

### **Depuis le début**

Carte plus petite. Somme du revenu hotspot enregistré depuis que vous êtes sur SpaiHub. Ce n’est pas « le cash que vous avez retiré ».

### **Abonnés aujourd’hui**

Combien d’abonnés payants distincts SpaiHub a comptés aujourd’hui. En dessous : **N paiements** (le nombre de transactions du jour). Deux paiements du même téléphone comptent toujours comme deux paiements ; les abonnés uniques sont l’autre chiffre.

### **MoMo du mois**

Face des ventes Mobile Money de ce mois calendaire. C’est le flux qui peut créditer **Portefeuille** après la commission plateforme.

### **Bons du mois**

Face des utilisations de bons ce mois. Utile pour les boutiques à stock papier. Cela **ne veut pas dire** que ce montant est assis dans **Portefeuille**.

### **Tendance des revenus**

Titre **Tendance des revenus**. Indication : **Gains nets journaliers — 30 derniers jours**. Badge **Live**. Le graphique en aire trace les **Gains nets** par jour. Survolez une date pour le montant XAF. Les jours vides restent à zéro ; le graphique se dessine quand même.

### **Répartition des paiements**

Titre **Répartition des paiements**. Indication : **30 derniers jours par source**. Donut plus légende : **Mobile Money** et **Bons**, chacun avec un total XAF. Vide : **Aucun revenu sur cette période**.

Cette répartition répond à « les gens paient-ils au téléphone ou avec des codes papier ? » Ce n’est pas un compte de résultat.

### **Revenu par site**

Titre **Revenu par site**. Indication : **Meilleurs sites — 30 derniers jours**. Barres horizontales, jusqu’à six sites. Vide : **Aucun revenu par site sur les 30 derniers jours**. Si vous tenez une seule boutique de couloir, vous devez voir ce nom ici après des ventes MoMo ou bons.

### **Performance des bons**

Titre **Performance des bons**. Indication : **Stock et utilisation**. Quatre tuiles :

- **Inutilisés** — codes imprimés ou générés pas encore utilisés
- **Utilisés** — saisis sur le portail captif
- **Expirés** — au-delà de la date limite d’utilisation fixée à la génération
- **Taux d’utilisation** — pourcentage utilisé

Un petit camembert peut apparaître quand il y a du stock. Vide : **Pas encore de données de bons**. Les codes révoqués se gèrent sur **Bons**, pas sur cette carte.

### **État des routeurs**

Titre **État des routeurs**. Indication : **Par site**. Chaque ligne : nom du routeur, nom du site, un badge de statut (**En ligne**, **Hors ligne**, **Dégradé**), et l’heure du dernier contact — ou **Jamais vu**.

**Jamais vu** n’est pas une boutique cassée. C’est le défaut jusqu’au heartbeat du script de connexion. Les routeurs uniquement pour prévisualisation restent **Jamais vu** pour toujours, et c’est correct.

Vide : **Aucun routeur configuré**. Ajoutez-les sous **Sites** → **Ajouter un routeur**.

### **Meilleurs forfaits du jour**

Barres horizontales du nom de forfait vs **Ventes**. Infobulle : **N ventes**. Vide : **Pas encore de ventes aujourd’hui**. Servez-vous-en pour voir si « 1 heure » ou « 2 Go / semaine » se vend vraiment ce matin.

## États vides et erreurs

Pendant le chargement de la page vous voyez des blocs squelette, pas des zéros.

Si `/api/owner/stats` (ou les appels graphiques / routeurs) échoue, tout le tableau de bord devient **Impossible de charger le tableau de bord** avec **Impossible de charger les données. Reconnectez-vous puis réessayez.** Déconnectez-vous et **Connexion** à nouveau avant de conclure que la boutique a fait zéro.

Si les stats principales chargent mais pas les analyses, vous voyez encore les quatre grandes cartes, et un toast **Certaines statistiques n’ont pas pu être chargées**. Répartition, barres par site et tuiles de bons s’affichent alors de façon sûre (zéros / **Aucun revenu sur cette période** / **Pas encore de données de bons**).

**Exporter CSV** peut échouer tout seul ; le reste du tableau de bord reste.

**Masquer** sur la bannière script est local à ce navigateur. Un autre téléphone ou un cache vidé montre la bannière à nouveau jusqu’à ce que vous la masquiez aussi là-bas.

## Ce que cette page ne fait pas

- Elle ne liste pas les lignes Campay une par une. Ça, c’est **Transactions**.
- Elle ne retire pas. Ça, c’est **Portefeuille** → **Retirer vers MoMo**.
- Elle ne génère pas de bons. Ça, c’est **Bons** → **Générer des bons**.
- Elle ne colle pas de scripts MikroTik. La bannière vous pointe seulement vers **Sites**.
- Elle ne montre pas aux invités combien de Go d’usage raisonnable il leur reste. Les invités ne voient jamais les Go restants. Les propriétaires voient les plafonds sur **Sites** → **Forfaits** → **Détails**.
- Ce n’est pas une console admin. Vous n’y trouverez pas d’outils technicien.

Le tableau de bord ne remplace pas le **Portefeuille** pour encaisser, ni **Sites** pour expulser, ni **Bons** pour imprimer. Un matin calme (zéros honnêtes) n’est pas la même chose qu’un échec de chargement (squelettes puis message d’erreur). Si **Sessions actives** semble trop bas alors que le couloir est plein, ouvrez **Sites** → **Sessions** et lisez **Sur le routeur** vs **Non vu** — une MAC peut cacher toute une maison derrière un répéteur bon marché.

**Solde portefeuille** ici est un coup d’œil. Quand une réserve contributeurs est retenue, le chiffre à encaisser est **Disponible au retrait** sur **Portefeuille**, pas forcément cette carte. **Revenu du jour** inclut la valeur faciale des bons qui **n’entre jamais** dans le portefeuille.

Cette version n’a pas de cloche ni de préférences de notification. Un CSV prêt, un routeur **Hors ligne**, ou un retrait en file n’allument pas une alerte sur **Paramètres**. Relisez les cartes, l’**Historique des retraits**, et **Transactions**.

## Tâches liées

- Lire les chiffres vs le cash vs le CSV : [Tableau de bord, portefeuille, transactions](/fr/help/dashboard-wallet-transactions).
- Après la bannière ambre, coller le script 2 : [Recoller le script de connexion sans expulser](/fr/help/repaste-connection-script).
- Si les routeurs restent **Jamais vu**, terminer **Script de setup** sur **Sites**.
- Si **Sessions actives** a l’air faux, ouvrez **Sites** → **Sessions** et lisez **Sur le routeur** vs **Non vu**.
