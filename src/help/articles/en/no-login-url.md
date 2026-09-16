---
id: tip.login-html
slug: no-login-url
title: "RouterOS has no login-url"
description: "MikroTik hotspot has no login-url property. SpaiHub installs hotspot/login.html and status.html so phones open the captive portal. Do not hunt a missing login-url in Winbox."
role: ["owner"]
section: pro-tips
intents: ["login-url", "login.html", "captive portal redirect", "RouterOS"]
buttons: ["Setup script", "Existing hotspot", "Preview portal"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "tip.script-1-vs-2"]
updatedAt: 2026-09-16
minutes: 5
---

## Terms

**RouterOS** is MikroTik’s operating system on the Hex (or CHR). **Hotspot** is the feature that intercepts new phones and shows a login page.

**login-url** is a property people remember from other captive-portal brands, or from old forum posts. **RouterOS hotspot does not have a `login-url` setting.** Searching for it in Winbox is a dead end.

**login.html** / **status.html** are files in the hotspot folder on the router. Script 1 downloads SpaiHub’s `login.html` (and related status page) so the phone is redirected into your branded portal instead of the stock MikroTik form.

**Walled garden** is the list of hosts a phone may reach *before* it is logged in (portal, API, Campay, certificate checks). HTTPS out on TCP 443 must work or the fetch of those HTML files and later heartbeats fail.

## Why it matters

Incident from a Bepanda workshop: a technician spent two hours in Winbox looking for “login-url” because a YouTube video for another vendor used that word. The Hex already had a hotspot. Script 1 had not been pasted, so phones still saw the grey MikroTik login. He concluded “SpaiHub is incompatible with existing hotspot.” It was compatible. We overlay HTML; we do not flip a login-url switch that does not exist.

Wrong diagnosis: “change the hotspot profile’s login-by” as the only step, or paste a random `login.html` from a blog. Wrong HTML will not send buyers to your packages, MoMo, or **Check payment status**.

## What you see

**Locations** → router → **Setup script**:

- **1. Hotspot setup (once)** with path **Existing hotspot** or **Create guest hotspot**.
- Script comments say RouterOS has no login-url property — redirect is installed as `hotspot/login.html`.

After a successful paste, `/file print` on the router shows `hotspot/login.html`. Phones that hit the captive portal should land on **Pay with MoMo** / **I have a voucher**, not a generic MikroTik user/password only screen.

**Preview portal** from the dashboard opens the same guest page in a browser *without* needing that file — preview does not prove the Hex HTML was installed. A real phone on the SSID does.

If Script 1 fetch failed (no HTTPS), the router may keep an old login page. Heartbeat might still come later from Script 2. Do not treat **ONLINE** as proof that login.html is yours.

## What to do

1. Confirm hotspot already assigns IPs (**Existing hotspot**) or use **Create guest hotspot** if you need SpaiHub to add a guest LAN.
2. Paste **1. Hotspot setup (once)** on the terminal. Wait for fetch success.
3. Paste **2. Connect to SpaiHub**. Script 2 also refreshes `login.html` on success so fair-use messaging stays current.
4. Join the guest SSID with a phone. You should see your brand, packages, **Pay … XAF**.
5. If you still see stock MikroTik login, do not search login-url. Re-paste Script 1 after you fix TCP 443 egress and walled garden. See the walled-garden tip.

Do not publish or type live API URLs with tokens into Help chats. The script on **Setup script** is generated for that router.

## What not to say

- Do not tell a technician “set login-url to the portal.” There is no such property.
- Do not promise remaining fair-use GB on the login page. The installed HTML can show **Fair use limit reached. Buy another package to continue.** after cutoff — not a GB counter.
- Do not say Preview alone means phones will captive-portal correctly. Preview skips the Hex file.
