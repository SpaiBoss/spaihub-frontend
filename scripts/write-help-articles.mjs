import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

console.error(
  'Refusing to run: Help articles in src/help/articles are hand-written reference docs. This script would overwrite them with stubs. Edit the markdown files directly (EN + FR).',
);
process.exit(1);

const root = join(dirname(fileURLToPath(import.meta.url)), '../src/help/articles');
mkdirSync(join(root, 'en'), { recursive: true });
mkdirSync(join(root, 'fr'), { recursive: true });

const articles = [
  {
    id: 'own.tut.account',
    slug: 'create-owner-account',
    section: 'tutorials',
    role: ['owner'],
    minutes: 4,
    related: ['own.ref.settings', 'own.tut.location'],
    intents: ['register', 'verify', 'login'],
    buttons: ['Create account', 'Sign in'],
    en: {
      title: 'Create your owner account',
      description: 'Register, verify email, and open the SpaiHub dashboard.',
      body: `## What you will have
An owner account, a verified email, and the dashboard at **Dashboard**.

## Before you start
A working email inbox. No MikroTik is required yet.

## Steps
1. Open **Start free** (or go to register).
2. Enter **Full name**, **Email address**, and a password of at least 8 characters.
3. Tap **Create account**.
4. Open the verification email and tap the link.
5. Return to **Sign in**, enter email and password, tap **Sign in**.

## What you should see
Account status **Active**. The dashboard loads revenue cards (they can be zero).

## If it fails
- No email: tap **Resend verification email** on the sign-in page.
- “Account is not active”: verify email, or ask SpaiHub if the account was suspended.

![Screenshot](about:blank)
_Screenshot slot: register form (staging, fake name)._`,
    },
    fr: {
      title: 'Créer votre compte propriétaire',
      description: 'Inscription, vérification e-mail, et ouverture du tableau de bord SpaiHub.',
      body: `## Ce que vous aurez
Un compte propriétaire, un e-mail vérifié, et le tableau de bord.

## Avant de commencer
Une boîte e-mail. Pas besoin de MikroTik.

## Étapes
1. Ouvrez **Commencer gratuitement**.
2. Saisissez **Nom complet**, **Adresse e-mail**, et un mot de passe d’au moins 8 caractères.
3. Appuyez sur **Créer le compte**.
4. Ouvrez l’e-mail de vérification et cliquez sur le lien.
5. Revenez à **Connexion**, saisissez e-mail et mot de passe, appuyez sur **Se connecter**.

## Ce que vous devez voir
Statut **Actif**. Le tableau de bord affiche les cartes (même à zéro).

## Si ça échoue
- Pas d’e-mail : **Renvoyer l’e-mail de vérification** sur la page de connexion.
- « Compte non actif » : vérifiez l’e-mail, ou contactez SpaiHub si le compte est suspendu.`,
    },
  },
  {
    id: 'own.tut.location',
    slug: 'add-location',
    section: 'tutorials',
    role: ['owner'],
    minutes: 3,
    related: ['own.tut.preview-portal', 'own.ref.locations'],
    intents: ['location', 'add site'],
    buttons: ['Add Location', 'Create'],
    en: {
      title: 'Add a location without a router',
      description: 'Create a hotspot site so you can add packages and preview the portal.',
      body: `## Steps
1. Open **Locations**.
2. Tap **Add Location**.
3. Enter a **Location name** (shop or neighbourhood, e.g. “Akwa corridor”) and **Address**.
4. Tap **Create**.
5. Expand the row to see **Routers**, **Packages**, **Sessions**, **Access policy**.

You can **Suspend** a location to stop new portal sales without deleting history.

Related: [Preview the captive portal](/help/preview-captive-portal).`,
    },
    fr: {
      title: 'Ajouter un site sans routeur',
      description: 'Créez un site hotspot pour ajouter des forfaits et prévisualiser le portail.',
      body: `## Étapes
1. Ouvrez **Sites**.
2. Appuyez sur **Ajouter un site**.
3. Entrez un **Nom du site** et une **Adresse**.
4. Appuyez sur **Créer**.
5. Dépliez la ligne pour voir **Routeurs**, **Forfaits**, **Sessions**, **Politique d’accès**.

**Suspendre** arrête les nouvelles ventes sans effacer l’historique.`,
    },
  },
  {
    id: 'own.tut.preview',
    slug: 'preview-captive-portal',
    section: 'tutorials',
    role: ['owner'],
    minutes: 3,
    related: ['own.tut.time-package', 'tip.preview-first'],
    intents: ['preview', 'portal'],
    buttons: ['Add Router', 'Preview portal'],
    en: {
      title: 'Preview the captive portal',
      description: 'Open the guest WiFi page before any MikroTik is online.',
      body: `## Steps
1. **Locations** → expand a location → **Routers**.
2. **Add Router** → name it → **Physical MikroTik** (or CHR) → **Add Router**.
3. Tap **Preview portal**. A new tab opens the same page guests will see.

**Last seen: Never** is normal until the connection script heartbeats.

Add at least one **active package** or the preview says no packages are available.`,
    },
    fr: {
      title: 'Prévisualiser le portail captif',
      description: 'Ouvrez la page WiFi invité avant qu’un MikroTik soit en ligne.',
      body: `## Étapes
1. **Sites** → déplier → **Routeurs**.
2. **Ajouter un routeur** → nommez-le → **MikroTik physique** (ou CHR).
3. **Prévisualiser le portail**.

**Dernier contact : Jamais** est normal tant que le script de connexion n’a pas envoyé de heartbeat.

Ajoutez au moins un **forfait actif**.`,
    },
  },
  {
    id: 'own.tut.time-package',
    slug: 'create-time-package',
    section: 'tutorials',
    role: ['owner'],
    minutes: 5,
    related: ['tip.fair-use-hidden', 'own.tut.family-package'],
    intents: ['package', 'fair use', 'time'],
    buttons: ['Add Package', 'Fair use data limit (hidden from subscribers)'],
    en: {
      title: 'Create a 1-hour time package with hidden fair use',
      description: 'Sell browse time. Optionally cap gigabytes without showing remaining data to buyers.',
      body: `## Steps
1. **Locations** → **Packages** → **Add Package**.
2. Name it (e.g. “1 Hour”).
3. **Package type** → **Time-based**.
4. Set **Browse duration** (1 hour).
5. Price in XAF.
6. **Upload speed** defaults to 1 MB/s — change only if you know your uplink.
7. **Simultaneous devices** → **1** for a cheap walk-in plan.
8. Enable **Fair use data limit (hidden from subscribers)** (e.g. 2 GB).
9. Save.

## What buyers see
The portal shows unlimited browse for the hour. It does **not** show remaining GB.

When the cap hits, MikroTik cuts the session and the login page can say **Fair use limit reached**.

Owners see the cap in the package **Details** column.`,
    },
    fr: {
      title: 'Créer un forfait 1 heure avec plafond caché',
      description: 'Vendez du temps. Plafonnez les Go sans afficher le reste aux acheteurs.',
      body: `## Étapes
1. **Sites** → **Forfaits** → **Ajouter un forfait**.
2. Nommez (ex. « 1 heure »).
3. Type **Au temps**.
4. **Durée de navigation** = 1 heure.
5. Prix en XAF.
6. **Débit montant** = 1 Mo/s par défaut.
7. **Appareils simultanés** = **1**.
8. Activez **Plafond d’usage (caché aux abonnés)** (ex. 2 Go).
9. Enregistrez.

Les acheteurs voient une navigation illimitée. Pas de Go restants. Quand le plafond tombe, le portail peut dire **Plafond d’usage atteint**.`,
    },
  },
  {
    id: 'own.tut.family-package',
    slug: 'create-family-package',
    section: 'tutorials',
    role: ['owner'],
    minutes: 4,
    related: ['tip.price-dont-ban', 'own.ref.access-policy'],
    intents: ['family', 'shared devices'],
    buttons: ['Simultaneous devices', 'Add Package'],
    en: {
      title: 'Create a family package (2–4 devices)',
      description: 'Charge more for plans that honestly share one access code.',
      body: `Set **Simultaneous devices** to 2–4 on a higher-priced package. The portal then shows **Disconnect this device** and **End session for all devices**.

Do not promise “we can see phones behind a home router.” A Pixlink in router mode still looks like **one MAC**. Price the family plan; keep cheap plans at 1 device.

See [Pixlink NAT](/help/pixlink-nat).`,
    },
    fr: {
      title: 'Créer un forfait famille (2–4 appareils)',
      description: 'Facturez plus pour un code d’accès vraiment partagé.',
      body: `Mettez **Appareils simultanés** à 2–4 sur un forfait plus cher. Le portail affiche **Déconnecter cet appareil** et **Terminer pour tous les appareils**.

Ne promettez pas de « voir les téléphones derrière un routeur ». Un Pixlink en mode routeur reste **une MAC**.`,
    },
  },
  {
    id: 'own.tut.data-package',
    slug: 'create-data-package',
    section: 'tutorials',
    role: ['owner'],
    minutes: 4,
    related: ['tip.speed-vs-quota', 'own.tut.time-package'],
    intents: ['data package', 'download'],
    buttons: ['Data-based', 'Download allowance'],
    en: {
      title: 'Create a data-based package',
      description: 'Sell a download allowance that must be used before it expires.',
      body: `Choose **Data-based**. Set **Download allowance** (visible to buyers) and **Must be used within** (hours or days).

This is not the same as **upload speed**. Speed is MB/s. Allowance is MB/GB quota.`,
    },
    fr: {
      title: 'Créer un forfait au volume',
      description: 'Vendez un volume à consommer avant expiration.',
      body: `Choisissez **Au volume**. Réglez **Volume de téléchargement** (visible) et **À consommer dans**.

Ce n’est pas le **débit montant**. Le débit est en Mo/s. Le volume est un quota.`,
    },
  },
  {
    id: 'own.tut.hex-existing',
    slug: 'setup-mikrotik-hex-existing',
    section: 'tutorials',
    role: ['owner'],
    minutes: 12,
    related: ['tip.script-1-vs-2', 'tip.login-html', 'own.tut.online-momo'],
    intents: ['hex', 'script', 'existing hotspot'],
    buttons: ['Setup script', 'Existing hotspot'],
    en: {
      title: 'Physical Hex — existing hotspot (Script 1 then 2)',
      description: 'Your MikroTik already shows a login page. Overlay SpaiHub without wiping WAN.',
      body: `## Before you start
Hotspot already assigns IPs. Router can reach the SpaiHub API on HTTPS (TCP 443).

## Steps
1. **Locations** → **Routers** → **Setup script**.
2. Script 1 path: **Existing hotspot**.
3. Copy Script 1 into the MikroTik terminal. It installs walled garden, PAP, and downloads \`login.html\` / \`status.html\`. RouterOS has **no** \`login-url\` property — that is why we install HTML files.
4. Copy **Script 2** (connection): heartbeat + **commands** scheduler.
5. Wait until status is **ONLINE**.

Do not skip Script 2. Heartbeat alone does not grant WiFi after MoMo.

Re-pasting Script 2 refreshes polling and should **not** mass-kick paying users.`,
    },
    fr: {
      title: 'Hex physique — hotspot existant (script 1 puis 2)',
      description: 'Votre MikroTik a déjà une page de login. Superposez SpaiHub sans toucher au WAN.',
      body: `## Étapes
1. **Sites** → **Routeurs** → **Script de setup**.
2. Chemin du script 1 : **Hotspot existant**.
3. Collez le script 1 dans le terminal (walled garden, PAP, \`login.html\` / \`status.html\`). RouterOS n’a **pas** de propriété \`login-url\`.
4. Collez le **script 2** (heartbeat + commandes).
5. Attendez **En ligne**.

Le heartbeat seul n’accorde pas le WiFi après MoMo. Recoller le script 2 ne devrait pas expulser tout le monde.`,
    },
  },
  {
    id: 'own.tut.hex-guest',
    slug: 'setup-mikrotik-hex-guest',
    section: 'tutorials',
    role: ['owner'],
    minutes: 12,
    related: ['own.tut.hex-existing', 'tip.walled-garden'],
    intents: ['guest hotspot', 'create guest'],
    buttons: ['Create guest hotspot'],
    en: {
      title: 'Physical Hex — create guest hotspot',
      description: 'Add a 10.10.10.0/24 guest network on LAN if you do not already have a hotspot.',
      body: `In **Setup script**, choose **Create guest hotspot**. Set LAN (often \`ether2\`) and WAN (\`ether1\`). Confirm names with \`/interface print\` first.

This path does not wipe WAN or wireless. Then paste Script 1 and Script 2 in order.`,
    },
    fr: {
      title: 'Hex physique — créer un hotspot invité',
      description: 'Ajoute un réseau invité 10.10.10.0/24 sur le LAN.',
      body: `Dans **Script de setup**, choisissez **Créer un hotspot invité**. Indiquez LAN (souvent \`ether2\`) et WAN (\`ether1\`). Vérifiez avec \`/interface print\`.

Cela ne touche pas au WAN. Puis scripts 1 et 2 dans l’ordre.`,
    },
  },
  {
    id: 'own.tut.chr',
    slug: 'setup-chr',
    section: 'tutorials',
    role: ['owner'],
    minutes: 15,
    related: ['tip.chr-order', 'own.tut.hex-existing'],
    intents: ['CHR', 'cloud router'],
    buttons: ['Add CHR & open wizard', 'Setup CHR'],
    en: {
      title: 'CHR from a blank VM (three scripts in order)',
      description: 'Cloud Hosted Router: bootstrap, hotspot, then connect. Do not skip or reorder.',
      body: `## Before you start
CHR license with Hotspot (Level 4+ or trial). Outbound HTTPS. CHR has no Wi‑Fi — plug an AP or switch on the LAN bridge port.

## Steps
1. **Add Router** → **MikroTik CHR** → **Add CHR & open wizard** (or **Setup CHR** later).
2. Confirm WAN/LAN names (defaults \`ether1\` / \`ether2\`).
3. Paste **Bootstrap** first (bridge, DHCP, hotspot, NAT).
4. Paste **SpaiHub hotspot**.
5. Paste **Connect to SpaiHub**.
6. The wizard polls every 10s and marks **ONLINE** when a heartbeat arrives (about 2 minutes).

Never reverse the order.`,
    },
    fr: {
      title: 'CHR depuis une VM vide (trois scripts dans l’ordre)',
      description: 'Bootstrap, hotspot, puis connexion. Ne sautez pas, ne réordonnez pas.',
      body: `Licence CHR avec Hotspot. HTTPS sortant. Pas de Wi‑Fi sur le CHR — branchez un AP sur le pont LAN.

1. **Ajouter un routeur** → **MikroTik CHR**.
2. Confirmez WAN/LAN (\`ether1\` / \`ether2\`).
3. **Bootstrap**, puis **hotspot SpaiHub**, puis **Connecter**.
4. Le statut passe **En ligne** après le heartbeat (~2 min).`,
    },
  },
  {
    id: 'own.tut.online-momo',
    slug: 'test-momo-online',
    section: 'tutorials',
    role: ['owner'],
    minutes: 8,
    related: ['tip.paid-no-wifi', 'tip.offline-blocks-pay'],
    intents: ['momo', 'test payment', 'online'],
    buttons: ['Preview portal', 'Pay'],
    en: {
      title: 'Confirm ONLINE and a test MoMo pay',
      description: 'Router green, then a real (or small) Campay payment on the portal.',
      body: `1. **Locations** → router **ONLINE** and a recent **Last seen**.
2. **Preview portal** (or join the guest SSID).
3. Choose a cheap package, enter a Cameroon MoMo number, tap **Pay … XAF**.
4. Approve on the phone.
5. Username (phone digits) and PIN appear. Tap **Connect**.
6. **Sessions** should show the phone, **On router**, and a MAC.

If the router is **OFFLINE**, the portal blocks MoMo until it reconnects.`,
    },
    fr: {
      title: 'Confirmer EN LIGNE et un paiement MoMo test',
      description: 'Routeur vert, puis un paiement Campay sur le portail.',
      body: `1. Routeur **En ligne** et un **Dernier contact** récent.
2. **Prévisualiser le portail**.
3. Forfait pas cher, numéro MoMo, **Payer**.
4. Validez sur le téléphone.
5. Identifiant + PIN, puis **Connecter**.
6. **Sessions** affiche le numéro et **Sur le routeur**.

Si le routeur est **Hors ligne**, le MoMo est bloqué.`,
    },
  },
  {
    id: 'own.tut.vouchers',
    slug: 'print-and-sync-vouchers',
    section: 'tutorials',
    role: ['owner'],
    minutes: 8,
    related: ['tip.voucher-not-wallet', 'tip.sync-vouchers'],
    intents: ['voucher', 'pdf', 'sync'],
    buttons: ['Create vouchers', 'Print PDF', 'Sync unused to router'],
    en: {
      title: 'Print vouchers and sync unused to the router',
      description: 'Cash stock: generate, print A4 sheets, optionally import unused codes to MikroTik.',
      body: `1. Open **Vouchers** → **Create vouchers**. Pick location and package, quantity, optional expiry.
2. Filter **UNUSED**, tap **Print PDF**, choose how many per A4 page.
3. To push unused codes to Hotspot users: select a location, tap **Sync unused to router**. Wait ~15 seconds, then check MikroTik **Hotspot users**.

**Voucher redemptions do not credit the wallet.** You already collected cash.

**Revoke** unused or compromised codes.`,
    },
    fr: {
      title: 'Imprimer des bons et les synchroniser',
      description: 'Stock cash : générer, PDF A4, importer les inutilisés vers MikroTik.',
      body: `1. **Bons** → **Créer des bons**.
2. Filtre **Inutilisé**, **Imprimer PDF**.
3. **Synchroniser les inutilisés vers le routeur**, attendre ~15 s, vérifier les utilisateurs hotspot.

Les bons **ne créditent pas** le portefeuille. **Révoquer** un code compromis.`,
    },
  },
  {
    id: 'own.tut.withdraw',
    slug: 'first-withdrawal',
    section: 'tutorials',
    role: ['owner'],
    minutes: 5,
    related: ['tip.withdraw-queued', 'tip.contributor-reserve'],
    intents: ['withdraw', 'wallet', 'momo'],
    buttons: ['Withdraw'],
    en: {
      title: 'First withdrawal to MoMo',
      description: 'Cash out owner credit. Auto send vs queued for admin.',
      body: `Open **Wallet**. **Available to withdraw** is wallet total minus **Reserved for contributors** (if any).

Tap **Withdraw**, amount, Cameroon number, MTN or Orange. Submit once (do not double-tap).

You may see **Withdrawal sent to your MoMo**, or a message that an admin will complete the transfer. Both are success paths — the second is not a failed request.

Only **successful MoMo sales** credit this wallet, after the live platform fee. Vouchers do not.`,
    },
    fr: {
      title: 'Premier retrait MoMo',
      description: 'Sortez le crédit propriétaire. Envoi auto ou file admin.',
      body: `**Portefeuille**. **Disponible au retrait** = total moins **Réservé aux contributeurs**.

**Retirer**, montant, numéro, MTN ou Orange. Une seule fois.

« Envoyé vers votre MoMo » ou « un admin terminera » sont deux succès. Seules les **ventes MoMo** créditent ce portefeuille, après la commission. Pas les bons.`,
    },
  },
  {
    id: 'own.tut.branding',
    slug: 'brand-the-portal',
    section: 'tutorials',
    role: ['owner'],
    minutes: 5,
    related: ['tip.logo-512', 'own.ref.settings'],
    intents: ['branding', 'logo'],
    buttons: ['Save'],
    en: {
      title: 'Brand the captive portal',
      description: 'Name, logo, accent, welcome text. Logo max 512 KB.',
      body: `**Settings** → portal branding. Upload PNG/JPEG ≤ 512 KB. Welcome text appears on the guest page.

**Show upload speed on the portal** is off by default (speed is an owner tool).

Platform credit stays unless you have a custom SpaiTrace white-label deal.`,
    },
    fr: {
      title: 'Marquer le portail captif',
      description: 'Nom, logo, couleur, texte d’accueil. Logo 512 Ko max.',
      body: `**Paramètres** → marque du portail. PNG/JPEG ≤ 512 Ko.

**Afficher le débit montant** est désactivé par défaut.

Le crédit plateforme reste sauf accord white-label SpaiTrace.`,
    },
  },
  {
    id: 'own.tut.kick-suspend',
    slug: 'kick-and-suspend',
    section: 'tutorials',
    role: ['owner'],
    minutes: 3,
    related: ['own.ref.sessions', 'own.ref.locations'],
    intents: ['kick', 'suspend'],
    buttons: ['Kick', 'Suspend'],
    en: {
      title: 'Kick a session or suspend a location',
      description: 'Cut one login now, or stop a whole site from selling.',
      body: `**Sessions** → **Kick** queues a MikroTik kick. Needs the **commands** scheduler.

**Suspend** on the location row stops new portal purchases. Existing sessions may still run until they expire or you kick them.`,
    },
    fr: {
      title: 'Expulser une session ou suspendre un site',
      description: 'Coupez un login, ou arrêtez les ventes d’un site.',
      body: `**Sessions** → **Expulser** (il faut le planificateur de commandes).

**Suspendre** le site arrête les nouveaux achats. Les sessions en cours peuvent continuer jusqu’à expiration.`,
    },
  },
  {
    id: 'own.tut.reports',
    slug: 'dashboard-wallet-transactions',
    section: 'tutorials',
    role: ['owner'],
    minutes: 4,
    related: ['own.ref.home', 'own.ref.wallet'],
    intents: ['csv', 'accounting', 'reports'],
    buttons: ['Export CSV'],
    en: {
      title: 'Dashboard vs wallet vs transactions',
      description: 'Where revenue lives, and how to export a CSV.',
      body: `**Dashboard** = today/month revenue, active sessions, charts, router health, accounting date range.

**Transactions** = each Campay/voucher row. Filter location, status, dates. **Export CSV**.

**Wallet** = what you can withdraw (MoMo sales after fee, minus contributor reserve).`,
    },
    fr: {
      title: 'Tableau de bord, portefeuille, transactions',
      description: 'Où est le revenu, et comment exporter un CSV.',
      body: `**Tableau de bord** = jour/mois, sessions, graphiques, santé routeurs.

**Transactions** = chaque ligne Campay/bon. **Exporter CSV**.

**Portefeuille** = ce que vous pouvez retirer.`,
    },
  },
  {
    id: 'own.tut.repaste-script2',
    slug: 'repaste-connection-script',
    section: 'tutorials',
    role: ['owner'],
    minutes: 4,
    related: ['tip.script-1-vs-2', 'own.tut.hex-existing'],
    intents: ['script 2', 'commands scheduler'],
    buttons: ['Setup script'],
    en: {
      title: 'Re-paste the connection script without kicking users',
      description: 'Script 2 (heartbeat + commands) refreshes polling. It should not mass-kick.',
      body: `If **Sessions** stay empty or grants never land, open **Setup script** and paste **Script 2** only.

Script 1 is hotspot overlay (walled garden, HTML). Re-run it only when the captive page is wrong.

The dashboard banner about the connection script can be dismissed after you paste.`,
    },
    fr: {
      title: 'Recoller le script de connexion sans expulser',
      description: 'Le script 2 rafraîchit le polling. Il ne devrait pas tout couper.',
      body: `Si **Sessions** reste vide, collez seulement le **script 2**.

Le script 1 est la superposition hotspot. Recollez-le si la page captive est fausse.`,
    },
  },
  {
    id: 'own.tut.paid-no-wifi',
    slug: 'paid-but-no-wifi',
    section: 'troubleshooting',
    role: ['owner'],
    minutes: 6,
    related: ['tip.paid-no-wifi', 'own.tut.repaste-script2'],
    intents: ['paid no wifi', 'orphan payment'],
    buttons: ['Check payment status', 'Setup script'],
    en: {
      title: 'Staff script: paid but no WiFi',
      description: 'What to check when Campay succeeded and the phone is still captive.',
      body: `1. Confirm router **ONLINE**. Offline blocks new MoMo.
2. On the portal: **Check payment status**. SpaiHub recovers orphan Campay SUCCESS and keeps pending payments across reloads.
3. Confirm **spaihub-commands** exists: \`/system scheduler print\`. Heartbeat alone is not enough.
4. Re-paste Script 2 if the scheduler is missing.
5. **Sessions** → if **On router**, the Hex has the login. If **Not seen**, the grant never imported.

Do not take a second payment until you have checked status.`,
    },
    fr: {
      title: 'Le client a payé mais pas de WiFi',
      description: 'Que vérifier quand Campay a réussi et le téléphone est encore captif.',
      body: `1. Routeur **En ligne**.
2. Portail : **Vérifier le paiement**.
3. \`/system scheduler print\` : **spaihub-commands** doit exister.
4. Recoller le script 2 si besoin.
5. **Sessions** : **Sur le routeur** vs **Non vu**.

Ne prenez pas un second paiement avant d’avoir vérifié le statut.`,
    },
  },
  {
    id: 'con.tut.account',
    slug: 'create-contributor-account',
    section: 'tutorials',
    role: ['contributor'],
    minutes: 4,
    related: ['con.tut.links', 'con.ref.home'],
    intents: ['contributor register'],
    buttons: ['Create account'],
    en: {
      title: 'Create a contributor account',
      description: 'Verify email, then wait for SpaiHub admin approval before you can sign in.',
      body: `Open **Create contributor account**, register, verify email. Status stays **Pending** until an admin activates you. You do **not** run the hotspot or sell to walk-in users.`,
    },
    fr: {
      title: 'Créer un compte contributeur',
      description: 'Vérifiez l’e-mail, puis attendez l’admin SpaiHub.',
      body: `Inscrivez-vous, vérifiez l’e-mail. Le statut reste **En attente** jusqu’à activation. Vous ne tenez **pas** le hotspot.`,
    },
  },
  {
    id: 'con.tut.links',
    slug: 'read-contributor-link',
    section: 'tutorials',
    role: ['contributor'],
    minutes: 4,
    related: ['con.tut.withdraw', 'con.ref.links'],
    intents: ['cap', 'rate', 'meter'],
    buttons: ['Links'],
    en: {
      title: 'Read a contributor link',
      description: 'Cap Mbps, XAF/GB, last meter. Your rate is on this page — we do not publish a typical public rate.',
      body: `**Links** shows location, interface name, **Cap**, **Rate (XAF/GB)**, last meter sample, status (**Active** / **Paused**).

Paused stores samples without credit. You never configure RouterOS — SpaiHub technicians do that.`,
    },
    fr: {
      title: 'Lire une liaison contributeur',
      description: 'Plafond Mbps, XAF/Go, dernier relevé. Votre tarif est sur cette page.',
      body: `**Liaisons** : site, interface, **Plafond**, **Tarif**, dernier relevé, statut. En pause : relevés sans crédit. Vous ne touchez pas à RouterOS.`,
    },
  },
  {
    id: 'con.tut.withdraw',
    slug: 'contributor-withdraw',
    section: 'tutorials',
    role: ['contributor'],
    minutes: 4,
    related: ['tip.withdraw-queued', 'con.ref.wallet'],
    intents: ['contributor wallet'],
    buttons: ['Withdraw'],
    en: {
      title: 'Withdraw contributor earnings to MoMo',
      description: 'Same MoMo flow as owners: send or queued for admin.',
      body: `**Wallet** → **Withdraw**. Use the MoMo phone from **Settings**. Success may be instant or queued for an admin — both are valid.`,
    },
    fr: {
      title: 'Retirer les gains contributeur en MoMo',
      description: 'Même flux que les propriétaires : envoi ou file admin.',
      body: `**Portefeuille** → **Retirer**. Le numéro vient des **Paramètres**. Instantané ou en file : les deux sont valides.`,
    },
  },
];

const tips = [
  ['tip.pixlink-nat', 'pixlink-nat', 'Pixlink NAT: one voucher for the whole house', 'Un Pixlink en mode routeur = un bon pour toute la maison', 'A cheap extender in **router mode** NATs everyone behind one WAN MAC. SpaiHub and MikroTik see **one client**. That is physics, not a broken voucher.\n\n**Do:** prefer a real AP in **bridge** mode; sell 1-device plans + hidden fair-use; house rule against personal routers.\n\n**Don’t:** promise we can see phones behind NAT. TTL anti-tether stays **off** — it broke normal phones.'],
  ['tip.ap-vs-router', 'ap-vs-router-mode', 'AP mode vs router mode on cheap extenders', 'Mode AP vs mode routeur sur les répéteurs', 'Many Pixlink units flap in AP mode and only stay up in router mode. Then NAT hiding is the cost. Use a proper access point in bridge if you need per-phone MACs.'],
  ['tip.fair-use-hidden', 'hidden-fair-use', 'Hidden fair-use cap on time packages', 'Plafond d’usage caché', 'Owners set GB. Buyers see unlimited browse. After cutoff they get **Fair use limit reached** — never remaining GB on the guest page. `do_not_say`: remaining quota to guests.'],
  ['tip.anti-tether-off', 'anti-tether-stays-off', 'Anti-tether (TTL) stays off', 'L’anti-tether TTL reste coupé', 'TTL=63 drops broke ordinary phones. Sharing is priced (1 vs family devices) and capped, not banned with firewall magic.'],
  ['tip.price-dont-ban', 'price-dont-ban-sharing', 'Price sharing, do not pretend to ban it', 'Tarifez le partage, ne promettez pas de l’interdire', 'Credential sharing is real. Cheap plans: 1 device. Family plans: 2–4. Username is often the phone digits — the PIN is the secret.'],
  ['tip.speed-vs-quota', 'speed-vs-data-cap', 'Upload speed is not a data cap', 'Le débit n’est pas un quota', 'MB/s = rate. `limit-bytes-total` = quota. Mixing them is the most common RouterOS confusion we hit.'],
  ['tip.mac-random', 'mac-randomization', 'Phones randomize MAC addresses', 'Les téléphones randomisent la MAC', 'Do not treat MAC as a person. Portal also uses a browser device id (cleared with site data).'],
  ['tip.login-html', 'no-login-url', 'RouterOS has no login-url', 'Pas de login-url sur RouterOS', 'SpaiHub installs `hotspot/login.html` and `status.html` downloaded from the API.'],
  ['tip.script-1-vs-2', 'script-1-vs-script-2', 'Script 1 vs Script 2', 'Script 1 vs script 2', '1 = hotspot overlay. 2 = heartbeat + **commands**. Grants need 2.'],
  ['tip.chr-order', 'chr-script-order', 'CHR scripts must stay in order', 'Ordre des scripts CHR', 'Bootstrap → hotspot → connect. ether1 WAN / ether2 LAN unless you changed them.'],
  ['tip.preview-first', 'preview-without-hardware', 'Preview before hardware', 'Prévisualiser sans matériel', '**Preview portal** works with Last seen Never.'],
  ['tip.paid-no-wifi', 'orphan-campay', 'Payment succeeded, WiFi did not', 'Paiement OK, pas de WiFi', 'Orphan Campay recovery + pending across reload. Commands scheduler must run. See the staff tutorial.'],
  ['tip.offline-blocks-pay', 'router-offline-blocks-momo', 'Offline router blocks MoMo', 'Routeur hors ligne = pas de MoMo', 'The portal disables Pay while status is OFFLINE.'],
  ['tip.voucher-not-wallet', 'vouchers-do-not-credit-wallet', 'Vouchers do not credit the wallet', 'Les bons ne créditent pas le portefeuille', 'Prepaid cash stock. Only MoMo sales (minus fee) land in Wallet.'],
  ['tip.sync-vouchers', 'sync-unused-vouchers', 'Sync unused vouchers, wait 15s', 'Sync des bons, attendre 15 s', 'Then check Hotspot users on the Hex.'],
  ['tip.username-is-phone', 'username-is-phone', 'MoMo username is the phone digits', 'L’identifiant MoMo est le numéro', 'PIN is the secret. Family plans share the same pair up to the device limit.'],
  ['tip.one-mac-nat', 'one-mac-can-be-nat', 'One MAC on Sessions can be a NAT gateway', 'Une MAC peut être une passerelle NAT', '“On router” is honest. It is not a headcount of phones in the house.'],
  ['tip.access-fallback', 'access-policy-fallback', 'Location policy is a fallback', 'La politique de site est un repli', 'Set **Simultaneous devices** on each package. Location “devices per access code” is for old vouchers missing a package limit. 0 = one device.'],
  ['tip.contributor-reserve', 'contributor-reserve', 'Available vs reserved for contributors', 'Disponible vs réservé contributeurs', 'Wallet shows reserved XAF you cannot withdraw — it funds contributor GB payouts.'],
  ['tip.withdraw-queued', 'withdrawal-queued', 'Queued withdrawal is not a failure', 'Retrait en file n’est pas un échec', 'Admin completes MoMo when auto-disburse cannot.'],
  ['tip.logo-512', 'logo-512kb', 'Logo must be 512 KB or smaller', 'Logo 512 Ko max', 'Served through the API, not a public bucket URL.'],
  ['tip.fair-use-message', 'fair-use-guest-message', 'Fair-use message, never remaining GB', 'Message d’usage, jamais les Go restants', 'After cutoff: login page / portal banner. Hidden remaining is owner-only.'],
  ['tip.walled-garden', 'walled-garden-https', 'Hex needs HTTPS out to SpaiHub', 'Le Hex doit sortir en HTTPS', 'Walled garden includes the API host. Cloud firewalls must allow TCP 443 egress.'],
  ['tip.shared-creds', 'credential-sharing', 'Username + PIN can be shared', 'Identifiant + PIN peuvent être partagés', 'That is why cheap plans use 1 simultaneous device.'],
];

for (const [id, slug, enTitle, frTitle, enBody] of tips) {
  articles.push({
    id,
    slug,
    section: 'pro-tips',
    role: ['owner'],
    minutes: 3,
    related: [],
    intents: [slug.replace(/-/g, ' ')],
    buttons: [],
    en: { title: enTitle, description: enTitle, body: `## Why it matters\n\n${enBody}` },
    fr: { title: frTitle, description: frTitle, body: `## Pourquoi c’est important\n\n${enBody}` },
  });
}

const glossary = [
  ['glossary.location', 'glossary-location', 'Location', 'Site', 'A hotspot site you sell from. One location maps to routers, packages, and sessions.', 'Un site hotspot. Un site relie routeurs, forfaits et sessions.'],
  ['glossary.chr', 'glossary-chr', 'CHR', 'CHR', 'MikroTik Cloud Hosted Router — a VM with RouterOS, no built-in Wi‑Fi.', 'Cloud Hosted Router MikroTik — une VM RouterOS, sans Wi‑Fi intégré.'],
  ['glossary.voucher-vs-momo', 'glossary-voucher-vs-momo', 'Voucher vs MoMo', 'Bon vs MoMo', 'MoMo credits the wallet after fee. Vouchers are prepaid paper; they do not credit the wallet.', 'Le MoMo crédite le portefeuille. Les bons sont du stock cash ; ils ne créditent pas.'],
  ['glossary.fair-use', 'glossary-fair-use', 'Fair use', 'Usage raisonnable', 'Hidden GB cap on a time package. Guests are not shown remaining data.', 'Plafond Go caché sur un forfait temps. Les invités ne voient pas le reste.'],
  ['glossary.shared', 'glossary-shared-devices', 'Simultaneous devices', 'Appareils simultanés', 'How many Wi‑Fi MACs may use one access code. Not phones behind NAT.', 'Combien de MAC Wi‑Fi pour un code. Pas les téléphones derrière du NAT.'],
  ['glossary.heartbeat', 'glossary-heartbeat', 'Heartbeat', 'Heartbeat', 'Scheduler that marks the router ONLINE.', 'Planificateur qui passe le routeur En ligne.'],
  ['glossary.commands', 'glossary-commands-scheduler', 'Commands scheduler', 'Planificateur de commandes', 'Polls SpaiHub for GRANT/KICK. Required for paid WiFi to land.', 'Interroge SpaiHub pour GRANT/KICK. Obligatoire pour le WiFi payé.'],
];

for (const [id, slug, enTitle, frTitle, enBody, frBody] of glossary) {
  articles.push({
    id,
    slug,
    section: 'glossary',
    role: ['owner', 'contributor'],
    minutes: 2,
    related: [],
    intents: [enTitle.toLowerCase()],
    buttons: [],
    en: { title: enTitle, description: enBody, body: enBody },
    fr: { title: frTitle, description: frBody, body: frBody },
  });
}

const refs = [
  ['own.ref.home', 'reference-dashboard', 'Dashboard reference', 'Référence tableau de bord', 'owner', 'Stat cards (today, month, sessions, wallet), charts, router health, **Export CSV** date range, connection-script banner (**Dismiss**).'],
  ['own.ref.locations', 'reference-locations', 'Locations reference', 'Référence sites', 'owner', '**Add Location**, expand, **Suspend/Activate**, **Edit location**, tabs Routers / Packages / Sessions / Access policy.'],
  ['own.ref.sessions', 'reference-sessions', 'Sessions reference', 'Référence sessions', 'owner', 'Phone, payment source, package, router, On router vs Not seen, MAC, **Kick**.'],
  ['own.ref.access-policy', 'reference-access-policy', 'Access policy reference', 'Référence politique d’accès', 'owner', 'Devices per access code fallback, **Save access policy**. Package simultaneous devices wins.'],
  ['own.ref.vouchers', 'reference-vouchers', 'Vouchers reference', 'Référence bons', 'owner', 'Create, filters UNUSED/REDEEMED/EXPIRED/REVOKED, copy, revoke, sync, PDF.'],
  ['own.ref.wallet', 'reference-wallet', 'Wallet reference', 'Référence portefeuille', 'owner', 'Available vs reserved, ledger, **Withdraw**, queued admin retry.'],
  ['own.ref.settings', 'reference-settings', 'Settings reference', 'Référence paramètres', 'owner', 'Name, password, branding. Notification bell is not in this build — update this article when it ships.'],
  ['own.ref.portal', 'reference-portal-preview', 'Captive portal (what guests see)', 'Portail captif (ce que voient les invités)', 'owner', 'Pay with MoMo / I have a voucher, Check payment, Cancel, Connect, family disconnect, fair-use banner, router offline, Retry, Open in browser. Owner-facing explanation of the guest page.'],
  ['con.ref.home', 'reference-contributor-home', 'Contributor home reference', 'Référence accueil contributeur', 'contributor', 'Balance, today GB, month GB, link list.'],
  ['con.ref.links', 'reference-contributor-links', 'Contributor links reference', 'Référence liaisons contributeur', 'contributor', 'Location, interface, cap, rate, last meter, status.'],
  ['con.ref.wallet', 'reference-contributor-wallet', 'Contributor wallet reference', 'Référence portefeuille contributeur', 'contributor', 'Balance, withdraw, ledger.'],
  ['con.ref.settings', 'reference-contributor-settings', 'Contributor settings reference', 'Référence paramètres contributeur', 'contributor', 'Display name and MoMo phone.'],
];

for (const [id, slug, enTitle, frTitle, role, body] of refs) {
  articles.push({
    id,
    slug,
    section: 'reference',
    role: [role],
    minutes: 4,
    related: [],
    intents: ['reference', slug],
    buttons: [],
    en: { title: enTitle, description: body, body: `## Controls\n\n${body}\n\nButton names match the English dashboard. Switch the UI to French to see the translated labels.` },
    fr: { title: frTitle, description: body, body: `## Contrôles\n\n${body}\n\nLes libellés suivent le tableau de bord dans la langue choisie.` },
  });
}

function dump(lang, a) {
  const loc = a[lang];
  const fm = `---
id: ${a.id}
slug: ${a.slug}
title: ${JSON.stringify(loc.title)}
description: ${JSON.stringify(loc.description)}
role: [${a.role.map((r) => JSON.stringify(r)).join(', ')}]
section: ${a.section}
intents: [${(a.intents || []).map((x) => JSON.stringify(x)).join(', ')}]
buttons: [${(a.buttons || []).map((x) => JSON.stringify(x)).join(', ')}]
do_not_say: ["remaining fair-use GB to guests"]
related: [${(a.related || []).map((x) => JSON.stringify(x)).join(', ')}]
updatedAt: 2026-09-16
minutes: ${a.minutes}
---

${loc.body}
`;
  writeFileSync(join(root, lang, `${a.slug}.md`), fm);
}

for (const a of articles) {
  dump('en', a);
  dump('fr', a);
}

console.log(`Wrote ${articles.length} articles x2`);
