---
id: own.ref.vouchers
slug: reference-vouchers
title: "Référence bons"
description: "Générer des codes prépayés, filtrer Inutilisés/Utilisés/Expirés/Révoqués, copier, révoquer, Synchroniser les inutilisés vers le routeur, PDF 2–12 par page, CSV, libellé de lot, date limite d’utilisation."
role: ["owner"]
section: reference
intents: ["reference", "reference-vouchers", "pdf", "sync"]
buttons: ["Générer des bons", "Synchroniser les inutilisés vers le routeur", "PDF", "CSV", "Copier", "Révoquer", "Copier tous les codes", "Télécharger le PDF"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.vouchers", "tip.voucher-not-wallet"]
updatedAt: 2026-09-16
minutes: 12
---

## À quoi sert cette page

**Bons** est le bureau du stock papier. Vous générez des codes prépayés, imprimez des feuilles A4, copiez un code vers WhatsApp, révoquez un code fuité, exportez un CSV pour vos archives, et optionnellement **Synchroniser les inutilisés vers le routeur** pour que le Hex ait déjà les utilisateurs Hotspot avant qu’un invité tape le code.

Ouvrez **Bons** dans la barre latérale (téléphone : **Codes**). Titre **Bons**. Sous-titre **Codes d’accès prépayés.**

Un bon **n’est pas** du Mobile Money. L’invité vous a déjà payé en cash (ou vous offrez une promo). Utiliser un code **ne crédite pas le Portefeuille**. Seules les ventes MoMo réussies (après la commission plateforme) le font.

Les codes ressemblent à **SPAI-XXXX-XXXX**. L’invité a aussi besoin du **PIN à 6 chiffres** imprimé sur le ticket (**PIN WiFi**). Sur le portail captif ils ouvrent **J’ai un bon**, tapent le code et le PIN, puis **Utiliser le bon**.

## Vocabulaire

**Inutilisés** — générés, pas utilisés, pas révoqués, pas au-delà de la date limite d’utilisation.

**Utilisés** — saisis sur le portail ; une session existe.

**Expirés** — le délai d’utilisation fixé à la génération est passé sans usage.

**Révoqués** — vous avez appuyé sur **Révoquer** sur un code inutilisé. Il ne peut plus être utilisé.

**Libellé du lot** — étiquette optionnelle telle que « Promo mars » pour reconnaître un tirage dans le tableau.

**Date limite d’utilisation** — combien de temps le *code* reste valable à utiliser. Séparé de la durée de navigation du forfait ou de l’expiration du volume après utilisation.

**Synchroniser les inutilisés vers le routeur** — mettre les codes inutilisés en file sur la liste utilisateurs Hotspot MikroTik. Attendez ~15 secondes pour `spaihub-commands`, puis vérifiez **Hotspot users** dans Winbox.

**PIN** — six chiffres. Imprimé sur les tickets PDF. Requis sur **J’ai un bon**. Différent du PIN Wi‑Fi affiché après un paiement MoMo (ce PIN est créé au paiement).

## Tous les contrôles

### Cartes de stats

Quatre comptes pour tout votre compte (pas seulement le filtre courant) : **Inutilisés**, **Utilisés**, **Expirés**, **Révoqués**. Servez-vous-en comme inventaire, puis filtrez le tableau pour n’imprimer que **Inutilisés**.

### Filtre **Tous les sites**

Liste déroulante de vos sites. **Synchroniser les inutilisés vers le routeur** reste désactivé jusqu’à ce que vous choisissiez un vrai site (infobulle **Choisissez d’abord un site** / **Mettre les bons inutilisés en file sur le MikroTik**).

### Filtre **Tous les statuts**

Options : **Inutilisés**, **Utilisés**, **Expirés**, **Révoqués**. Filtrez sur **Inutilisés** avant **PDF** pour ne pas réimprimer des codes morts.

### **Générer des bons**

Bouton d’en-tête et action d’état vide. Titre de modale **Générer des bons**. Description : **Créez des codes prépayés que les abonnés peuvent saisir sur le portail captif.**

Champs :

- **Site** — obligatoire. Placeholder **Choisir un site**.
- **Forfait** — obligatoire. Placeholder **Choisir un forfait**. Seulement les forfaits **Actif**. Si le site n’en a aucun : **Ce site n’a pas de forfait actif. Créez-en un d’abord dans Sites.**
- **Quantité** — 1–500. Indication : **Générez 1 à 500 codes uniques d’un coup.**
- **Libellé du lot (optionnel)** — placeholder **ex. Promo mars, Événement 2026**.
- Case **Fixer une date limite d’utilisation**. Quand elle est cochée : nombre + **minutes** / **heures** / **jours**. Indication : **Les codes doivent être utilisés avant la fin de ce délai.**
- **Annuler** et **Générer des bons** (occupé : **Génération...**)

Erreurs dans la modale : **Choisissez un site**, **Choisissez un forfait**, **API des bons introuvable. Relancez le serveur puis réessayez.**, **Impossible de joindre l’API. Vérifiez que le serveur tourne sur le port 4000.**, **Impossible de créer les bons**, ou le message serveur.

Vue de succès titre **Bons créés** avec **N code prêt à distribuer** / **N codes prêts à distribuer**. Liste les lignes **SPAI-XXXX-XXXX**. **Copier tous les codes** les copie séparés par des sauts de ligne. **Terminé** ferme.

Un toast sur la page après un lot réussi n’est pas requis ; la modale est la confirmation. Le tableau se recharge.

### **Sync vers le routeur** (nom complet **Synchroniser les inutilisés vers le routeur**)

Bouton secondaire. Désactivé sans site. Libellé occupé **Sync...**.

Succès : **Synchronisation en file** (ou le message serveur). Si des codes ont été mis en file : **Attendez ~15 s que spaihub-commands importe, puis vérifiez les utilisateurs Hotspot**.

Échec : **Impossible de synchroniser les bons vers le routeur**. Sans site : **Choisissez un site**.

La sync n’imprime pas de papier et ne crédite pas le Portefeuille.

### **PDF** (complet **Imprimer PDF**)

Ouvre **Exporter un PDF prêt à imprimer**. Description : **Feuilles A4 à votre marque, avec traits de coupe et PIN WiFi.**

**Aperçu de la marque** explique que les tickets utiliseront votre nom de marque, logo optionnel, accent optionnel. Texte du lien : **Personnalisez la marque dans Paramètres → Marque du portail.**

**Bons inclus** suit les filtres actuels du tableau (statut + site), jusqu’à 500 par PDF. Astuce : **Astuce : filtrez sur Inutilisés avant d’imprimer des codes neufs.**

**Bons par page A4** :

- **2 par page** — Grands tickets — idéal à distribuer
- **4 par page** — Grille 2 × 2
- **6 par page** — Grille 2 × 3 (recommandé)
- **8 par page** — Grille 2 × 4
- **10 par page** — Grille 2 × 5
- **12 par page** — Grille 3 × 4 — le plus compact

**Chaque ticket contient** : **Votre logo ou nom de marque · site · forfait · code · PIN WiFi · consignes d’utilisation**. Le pied peut afficher **Propulsé par www.spaitrace.com**.

**Télécharger le PDF** (occupé **Génération du PDF...**). Toast **PDF prêt à imprimer** ou **Export PDF impossible**.

### **CSV**

Télécharge `vouchers.csv` pour les filtres site/statut courants. Toast **CSV exporté** ou **Export CSV impossible**. C’est le stock de bons, pas l’export comptable du Tableau de bord.

### Tableau / cartes téléphone

Colonnes bureau : **Code**, **Site**, **Forfait** (nom + résumé propriétaire, y compris le plafond d’usage **pour vous**), **Lot**, **Statut**, **Expire**, **Utilisé**, **Actions**.

Cartes téléphone : code, statut, forfait, site · lot, puis **Copier** et parfois **Révoquer**.

**Copier** toaste **Code copié**. Copie la chaîne **SPAI-XXXX-XXXX**, pas le PIN (le PIN est sur le PDF).

**Révoquer** apparaît seulement pour **Inutilisés**. Toast **Bon révoqué** ou **Impossible de révoquer le bon**. Les codes utilisés ne peuvent pas être révoqués depuis ce bouton.

La pagination est sous le tableau.

## États vides et erreurs

Vide : **Pas encore de bons** / **Générez des codes prépayés que les abonnés pourront saisir sur le portail captif.** plus **Générer des bons**.

Carte d’échec de chargement : **Impossible de charger les bons** avec le texte d’erreur et **Réessayer**. Toast **Impossible de charger les sites** si les sites échouent pour les listes déroulantes.

**Chargement des bons...** pendant le rafraîchissement de la liste.

## Ce que cette page ne fait pas

- Elle **ne crédite pas** le **Portefeuille**. Le cash a déjà changé de mains. Voir [Les bons ne créditent pas le portefeuille](/fr/help/vouchers-do-not-credit-wallet).
- Elle ne lance pas une invite Campay. Ça, c’est **Payer en MoMo** sur le portail invité.
- Elle ne montre pas aux invités les Go restants d’usage raisonnable. Les **Détails** propriétaire du forfait peuvent montrer un plafond ; les tickets imprimés suivent les règles du portail (les forfaits au temps restent illimités pour les acheteurs).
- Elle n’expulse pas une session en direct. **Sites** → **Sessions** → **Expulser**.
- Pas de console admin, pas de metering technicien.

Le **Portefeuille** n’a **pas de tableau ledger** des ventes de bons. L’**Historique des retraits** liste seulement les retraits. Le stock papier se gère ici. Un caissier qui cherche « le grand livre sur Portefeuille » après avoir vendu des bons au comptoir doit regarder **Bons** et **Tableau de bord** (**Bons du mois**), pas un ledger qui n’existe pas.

Cette version n’a pas de cloche ni de préférences de notification. Un bon **Utilisé** n’allume pas d’alerte dans **Paramètres**. Filtrez le tableau.

Ne dites jamais à un invité les Go restants d’après la colonne **Forfait**. Ce résumé de plafond est pour **vous**. Sur le portail, après coupure, ils voient **Plafond d’usage atteint. Achetez un autre forfait pour continuer.**

## Tâches liées

- Parcours imprimer et synchroniser : [Imprimer des bons et les synchroniser](/fr/help/print-and-sync-vouchers).
- Attendre 15 s après sync : [Sync des bons, attendre 15 s](/fr/help/sync-unused-vouchers).
- L’invité tape **SPAI-XXXX-XXXX** : [Portail captif (ce que voient les invités)](/fr/help/reference-portal-preview).
