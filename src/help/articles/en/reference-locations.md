---
id: own.ref.locations
slug: reference-locations
title: "Locations reference"
description: "Exhaustive screen map of Locations: add a site, routers (physical vs CHR), packages, sessions, access policy, every button and toast."
role: ["owner"]
section: reference
intents: ["reference", "reference-locations", "router", "package", "chr"]
buttons: ["Add Location", "Suspend", "Activate", "Edit location", "Add Router", "Setup script", "Setup CHR", "Preview portal", "Remove", "Add Package", "Deactivate", "Kick", "Save access policy", "Create", "Add CHR & open wizard"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.location", "own.tut.hex-existing", "own.tut.time-package", "own.ref.sessions", "own.ref.access-policy"]
updatedAt: 2026-09-16
minutes: 14
---

## What this page is

**Locations** is the shop floor of SpaiHub. A **location** is one hotspot site — a corridor, a car wash, a campus kiosk — with its own name, address, routers, packages, live sessions, and access-policy fallback. You create the site here, hang a MikroTik (or a cloud CHR) on it, price the internet, and preview the same page guests see when they join Wi‑Fi.

Open **Locations** in the sidebar (phone: **Sites**). Title **Locations**. Subtitle **Hotspots, routers, and packages.** The count line reads **1 location** or **N locations**.

You can add a location with **no** physical router. Packages and **Preview portal** work before any Hex is online. **Last Seen: Never (normal without MikroTik)** is the honest default.

This article maps every control that is on this page today, including the add/edit modals, Script 1 / Script 2 setup, and the CHR wizard that opens from a router row.

## Terms

**Location** — one selling site. Suspend it to stop new portal sales without deleting history.

**Physical MikroTik** — a Hex, hAP, or similar box in the shop. You paste two scripts in Winbox/terminal.

**CHR** (Cloud Hosted Router) — MikroTik RouterOS in a virtual machine. No built-in Wi‑Fi. You still attach an access point or switch on the LAN bridge. Rows show a **CHR** badge.

**Heartbeat** — the router checking in with SpaiHub. **Last Seen** is that time.

**Package** — what a guest buys. **Time-based** is browse duration (buyers see unlimited data; you may hide a fair-use cap). **Data-based** is a download allowance that must be used before expiry.

**Fair-use cap** — owner-only GB on a time package. The **Details** column shows it to **you**. Guests still see unlimited browse. When the router cuts them, the portal says **Fair use limit reached. Buy another package to continue.** Never tell a guest remaining fair-use GB.

**Access code** — the username + PIN pair after MoMo or voucher redeem. **Simultaneous devices** on the package is how many distinct Wi‑Fi MACs may share that pair.

**NAT / cheap extender** — a phone hotspot or cheap extender in **router mode** hides every device behind one WAN MAC. SpaiHub and MikroTik see **one** client. **On router** is not a headcount of phones in the house.

**Script 1** — hotspot overlay (walled garden, PAP, captive HTML). **Script 2** — connect to SpaiHub (heartbeat + `spaihub-commands`).

## Every control

### Empty state: **No locations yet**

If the list is empty:

- Title: **No locations yet**
- Body: **Add your first hotspot location to start deploying routers and selling internet packages.**
- **Add Location**
- **Read the guide** — opens the Help article for this step ([Add a location without a router](/help/add-location)).

You do not need a Hex in the shop to tap **Add Location**.

### **Add Location** (header and empty state)

Opens a modal titled **Add Location**.

- **Location name** — shop or neighbourhood, e.g. “Akwa corridor”.
- **Address** — street or landmark staff will recognise.
- **Create**

Toast **Location created**, or **Failed to create location**. The new row appears collapsed.

### Collapsed row

Each card shows:

- Location **name**
- **Address**
- **N/M routers online**
- **N active sessions**
- Badge **Active** or **Suspended**
- **Suspend** or **Activate**
- Chevron to expand/collapse

Tap the main area of the row to expand. Expanding loads routers, packages, and sessions. If that fails: toast **Failed to load location details**.

### **Suspend** / **Activate**

On the row, not inside a tab. **Suspend** sets the site inactive: the portal stops selling new packages. Existing paid sessions may run until they expire or you **Kick** them. Toast **Location suspended**. **Activate** brings sales back; toast **Location activated**. Failure: **Failed to update location status**.

Suspending is not **Remove** on a router and not **Deactivate** on a package.

### Expanded chrome: tabs and **Edit location**

Four tabs (phone short names in parentheses):

- **Routers** (**Routers**)
- **Packages** (**Plans**)
- **Sessions** (**Live**)
- **Access policy** (**Policy**)

**Edit location** (pencil) opens a modal with **Location name**, **Address**, and **Save changes**. Toast **Location updated** or **Failed to update location**.

### Tab **Routers** — empty

**No routers yet. Add one to get your captive portal link — no physical router needed to preview.**

**Add Router** is top-right of the table.

### **Add Router** modal

Title **Add Router**.

- **Router name**
- **Router type**
  - **Physical MikroTik** — hint **Hex / hAP — choose Existing or Create guest in Setup**. Help icon opens the Hex existing-network guide.
  - **MikroTik CHR** — hint **Cloud VM — guided setup wizard**. Help icon opens CHR Help.

Submit button:

- Physical: **Add Router**
- CHR: **Add CHR & open wizard**

Toast **Router added** or **Failed to add router**. Physical then opens **Router & captive portal setup**. CHR opens **MikroTik CHR onboarding**.

### Routers table columns

**Name**, **Status**, **Last Seen**, **Actions**.

**Name** plus, for cloud boxes, a **CHR** badge (cloud icon).

**Status** badge: **Online**, **Offline**, **Degraded**.

**Last Seen**: a timestamp, or **Never (normal without MikroTik)**. Preview-only routers stay Never. That is expected.

### **Setup script** (physical only)

Opens **Router & captive portal setup**. Intro: **Two pastes on the MikroTik terminal. Test the portal with Preview portal anytime.**

**Test without a router** shows the preview URL if the API returned one.

**Script 1 path**:

- **Existing hotspot** — **Hotspot must already assign IPs and show a login page. Script 1 only installs SpaiHub (walled garden, PAP, captive HTML).**
- **Create guest hotspot** — **Add-if-missing guest network on LAN (`10.10.10.0/24`). Does not wipe WAN or wireless. Set your guest port below.** Then **LAN (guest)** and **WAN** interface names (defaults `ether2` / `ether1`). Changing them reloads the script.

Script tabs:

- **1. Hotspot setup (once)** — Script 1
- **2. Connect to SpaiHub** — Script 2

Copy (clipboard icon) toasts **Copied to clipboard**. Loading text: **Loading script…**. Failure: **Failed to load setup scripts**.

Paste in the MikroTik terminal. Script 2 is what makes **On router** and **Kick** work. See [Setup MikroTik Hex on an existing network](/help/setup-mikrotik-hex-existing).

### **Setup CHR** (CHR rows)

Opens **MikroTik CHR onboarding**. Steps: **Prerequisites**, **Network layout**, **Bootstrap script**, **SpaiHub hotspot**, **Connect to SpaiHub**, **Verify connection**, **Complete**.

You confirm license (Hotspot, Level 4+), HTTPS egress, and that CHR has no Wi‑Fi. Default layout: WAN `ether1`, LAN `ether2`, hotspot bridge `192.168.88.0/24`. Buttons you will see include **Save & continue**, **Re-check scripts**, **Preview captive portal**, **Done**. Toasts: **Network settings saved**, **Failed to save network settings**, **Failed to load scripts**, **Copied to clipboard**. Verify waits for heartbeat (**Waiting for router heartbeat...** / **Router is online!**). Run the three scripts **in order**. Details: [Set up MikroTik CHR](/help/setup-chr).

### **Preview portal**

Opens a new tab on the guest captive page for that router token. **No live Hex is required.** **Last Seen: Never** is fine. You need at least one **Active** package or the guest page says no packages are available.

### **Remove**

Browser confirm: **Remove this router? Subscribers will no longer reach the portal through it.** Confirm, then toast **Router removed**. Failure: **Failed to remove router**. This does not delete the location or its packages.

### Tab **Packages** — empty

**No packages yet. Add one so subscribers can buy internet on your portal.** plus **Read the guide** (time-package tutorial).

### **Add Package**

Opens **Create Package** (or **Edit Package**). Intro: **Choose how subscribers pay for internet access at this location.**

Fields (this modal is part of Locations today):

- **Package name** (placeholder e.g. 1 Hour Browse, 2 GB Weekly)
- **Package type**: **Time-based** or **Data-based**
- **Price (XAF)**
- **Upload speed (MB/s)** — default 1 MB/s; max 100
- **Simultaneous devices** — 1–20 distinct Wi‑Fi MACs. Help text warns that phones behind a home router in NAT still count as one MAC.
- Time: **Browse duration**, optional **Fair use data limit (hidden from subscribers)**
- Data: **Download allowance**, **Must be used within** / **Expiry period**
- Preview line, then **Create package** (or save on edit)

Toasts: **Package created**, **Package updated**, **Failed to save package**. Validation toasts include **Package name is required**, **Price must be greater than 0**, **Upload speed must be greater than 0**, **Upload speed cannot exceed 100 MB/s**, **Simultaneous devices must be between 1 and 20**, plus duration/cap/allowance/expiry must be greater than 0.

### Packages table

Columns: **Name**, **Type**, **Details**, **Price**, **Status**, **Actions**.

**Type**: **Time-based** or **Data-based**.

**Details** (owners only) includes duration, upload speed, device count, and — for time packages with a cap — the **fair-use cap** in GB/MB. Guests never see remaining GB. Data packages show download allowance and expiry.

**Price** in XAF.

**Status**: **Active** or **Suspended** (deactivated).

**Edit** reopens the modal. **Deactivate** (active rows only) toast **Package deactivated** or **Failed to deactivate package**. Deactivated packages disappear from the portal and from new voucher generation.

Walkthroughs: [Create a time package](/help/create-time-package), [Create a family package](/help/create-family-package).

### Tab **Sessions**

This is the same live table documented in the [Sessions reference](/help/reference-sessions), filtered to this location.

Empty: **No active sessions at this location.** Hint: **After re-pasting the router connection script, live “On router” status appears here. One seen MAC can still be a NAT gateway.**

When rows exist, a hint: **“On router” means the login is in MikroTik active hosts. A single MAC may still be a cheap extender, phone hotspot, or personal router sharing with many devices.**

Columns: **Device** (phone + payment source **Voucher** or **Mobile Money**), **Package**, **Router**, **Status** (**On router** with optional MAC, or **Not seen**), **Ends**, **Kick**.

**Kick** toasts **Session ended — device should disconnect within 15 seconds** or **Failed to end session**. Needs Script 2 / `spaihub-commands`.

### Tab **Access policy**

Title **Access policy**. Intro: **Simultaneous devices are controlled on each package. This location setting is only a fallback for vouchers when a package limit is missing.**

Field **Devices per access code (fallback)** with a Help icon (**Open the Help article for this setting**) pointing at this policy reference. Hint: **0 = one device.** Prefer **Simultaneous devices** on each package (e.g. 4 for family). Counts distinct Wi‑Fi MACs — not phones behind NAT.

Tip box: **Tip: use 1-device packages with a fair-use data cap, and discourage personal Wi‑Fi extenders in router mode on this hotspot.**

**Save access policy** (or **Saving...**). Toast **Access policy saved — routers will apply changes on their next poll** or **Failed to save access policy**. Full map: [Access policy reference](/help/reference-access-policy).

## Empty & error states

**Failed to load locations** if the list API fails — you may see an empty-looking page plus that toast.

Row expand failure: **Failed to load location details** (tabs stay empty until you collapse and open again).

Every destructive or save action has a named toast listed above. **Remove** always asks the browser confirm first.

List load uses a grey pulse skeleton. Expand uses a smaller pulse inside the card.

## What this page does not do

- It does not print voucher PDFs or **Sync unused to router**. That is **Vouchers**.
- It does not export accounting CSV. That is **Dashboard**.
- It does not withdraw MoMo. That is **Wallet**.
- It does not change portal logo or accent. That is **Settings** → **Captive portal branding**.
- It does not show guests remaining fair-use GB. **Details** is owner-only.
- You cannot configure contributor uplinks or RouterOS for a contributor from here.
- There is no admin console on this page.

## Related jobs

- First site with no hardware: [Add a location without a router](/help/add-location).
- Paste on a Hex that already has a hotspot: [Setup MikroTik Hex on an existing network](/help/setup-mikrotik-hex-existing).
- Price a timed plan: [Create a time package](/help/create-time-package).
- Read **On router** / **Kick**: [Sessions reference](/help/reference-sessions).
- Fallback vs package devices: [Access policy reference](/help/reference-access-policy).
