---
id: tip.sync-vouchers
slug: sync-unused-vouchers
title: "Synchroniser les bons inutilisés, attendre 15 s"
description: "Synchroniser les inutilisés vers le routeur met des GRANT en file. Attends environ 15 secondes que spaihub-commands importe, puis vérifie les utilisateurs Hotspot. Synchronisation en file n’est pas de la magie instantanée et ne crédite pas le portefeuille."
role: ["owner"]
section: pro-tips
intents: ["synchroniser bons inutilisés", "15 secondes", "utilisateurs hotspot"]
buttons: ["Synchroniser les inutilisés vers le routeur", "Sync vers le routeur", "Créer des bons"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.vouchers", "glossary.commands"]
updatedAt: 2026-09-16
minutes: 5
---

## Termes

**Synchroniser les inutilisés vers le routeur** (court **Sync vers le routeur**) met chaque bon **Inutilisé** du site choisi en file comme commandes MikroTik **GRANT**, pour qu’un téléphone puisse se connecter avec le code imprimé et le PIN même sans ouvrir d’abord le flux cloud **Utiliser le bon**.

**spaihub-commands** tourne toutes les **15 secondes**. Le toast après une bonne sync : **Synchronisation en file** et **Attendez ~15 s que spaihub-commands importe, puis vérifiez les utilisateurs Hotspot**.

**Utilisateurs Hotspot** = la liste MikroTik des identifiants. Les identifiants de bons sont les codes **SPAI-XXXX-XXXX**, pas le téléphone de l’acheteur et pas ton e-mail propriétaire.

Si le planificateur commands manque, la sync se met en file dans le cloud et rien n’apparaît sur le Hex. C’est un problème script 2, pas un problème PDF.

## Pourquoi c’est important

Soirée événement à Akwa : tu imprimes les tickets à 16 h, les abonnés arrivent à 18 h, le groupe est bruyant, le portail captif est lent. Si les codes inutilisés ont été synchronisés, un acheteur peut taper code + PIN sur le login hotspot et passer. Si tu n’as jamais synchronisé et que le portail ne peut pas finir **Utiliser le bon**, tu as du papier qui n’ouvre pas l’air.

Incident : le propriétaire a appuyé sur **Synchroniser les inutilisés vers le routeur**, a ouvert Winbox tout de suite, n’a vu aucun utilisateur, a appuyé cinq fois de plus, puis a dit que SpaiHub avait dupliqué les tickets. La première file attendait encore le poll de 15 s. Les appuis en plus re-mettent en file ; ils n’impriment pas de papier en plus. Attends.

Mauvais diagnostic : « la sync crédite le portefeuille. » Non. Mauvais diagnostic : « les codes utilisés doivent aussi synchroniser. » Le bouton, c’est inutilisés seulement.

Un troisième échec : routeur **Hors ligne**. Tu peux encore appuyer sur **Synchroniser les inutilisés vers le routeur** dans le cloud ; le toast peut même dire **Synchronisation en file**. Rien n’importe tant que heartbeat et commands ne vivent pas encore. N’imprime pas le lot à nouveau. Attends **En ligne**, attends 15 secondes, puis regarde les utilisateurs Hotspot. Si tu as déjà vendu ces papiers, les abonnés peuvent encore **Utiliser le bon** sur le portail une fois Payer/utiliser possible — la sync est le raccourci login hors ligne, pas le seul chemin.

## Ce que tu vois

Page **Bons** : filtre site (obligatoire pour la sync), **Synchroniser les inutilisés vers le routeur**, **Sync...**

Toasts :

- **Synchronisation en file** + texte attendre ~15 s.
- **Impossible de synchroniser les bons vers le routeur**
- **Choisissez un site** si tu as oublié le filtre.

Sur le Hex après un poll réussi : utilisateurs hotspot nommés comme `SPAI-AB12-CD34` avec commentaire `spaihub`.

**Sessions** se remplit encore quand quelqu’un se connecte vraiment (**Sur le routeur**). Synchroniser les inutilisés ne crée pas de fausses sessions live.

## Quoi faire

1. **Créer des bons** pour le site et le forfait.
2. Filtre ce **site**, appuie une fois sur **Synchroniser les inutilisés vers le routeur**.
3. Attends au moins 15 secondes. Confirme que `spaihub-commands` existe. Puis vérifie les utilisateurs Hotspot.
4. Si rien n’importe : routeur **En ligne** ? Script 2 collé ? TCP 443 ? Répare ça, appuie une fois de plus sur sync.
5. **Révoquer** les tickets perdus, puis n’attends pas que ces identifiants marchent encore après le prochain cycle kick/grant.

Sans danger à lancer n’importe quand pour le stock inutilisé — ça re-met GRANT en file. Préfère une fois par lot, puis une pause de 15 s, puis Winbox. Si **Impossible de synchroniser les bons vers le routeur**, corrige le filtre site et la joignabilité API avant de générer un second lot « parce que le premier n’a pas collé ».

## Quoi ne pas dire

- Ne dis pas à un abonné d’« attendre la sync du portefeuille ». Mauvais système.
- Ne promets pas le reste de Go du plafond d’usage sur le talon du ticket.
- Ne dis pas qu’appuyer plus vite que 15 s « pousse plus fort ».
- Ne prétends pas que la sync contourne le NAT. Un répéteur bon marché en mode routeur est encore une MAC après qu’ils se connectent.
