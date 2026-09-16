---
id: tip.walled-garden
slug: walled-garden-https
title: "Hex needs HTTPS out to SpaiHub"
description: "Before login, phones and the Hex must reach the portal, API, and Campay hosts on HTTPS. Allow TCP 443 egress. Script 1 installs the walled garden. Do not publish live secret URLs."
role: ["owner"]
section: pro-tips
intents: ["walled garden", "HTTPS 443", "campay hosts", "heartbeat fetch"]
buttons: ["Setup script", "Existing hotspot", "Pay"]
do_not_say: ["remaining fair-use GB to guests"]
related: ["own.tut.hex-existing", "glossary.heartbeat"]
updatedAt: 2026-09-16
minutes: 6
---

## Terms

**Walled garden** is the hotspot allow-list for traffic **before** a guest is logged in. Script 1 adds entries (commented `spaihub-…`) for the **portal** host, the **API** host, **Campay** hosts, and certificate status (Let’s Encrypt OCSP). Guests need that to open **Pay with MoMo**. The Hex needs the API host to heartbeat and fetch commands.

**HTTPS / TCP 443** is the outbound path. Cloud firewalls, ISP boxes, and “security” profiles that block 443 will make Script 1’s `/tool fetch` of `login.html` fail and will make `spaihub-heartbeat` silent.

**Egress** means the Hex initiates outbound connections. You do not need to publish inbound ports for SpaiHub polling. Do not list live API URLs with router tokens in a WhatsApp group.

RouterOS still has **no login-url**. HTML fetch is how the captive page exists.

## Why it matters

Incident: a Hex behind a “smart” Fibre ONU that filtered unknown HTTPS. Winbox local worked. **Last seen** stayed Never. Technician added random Facebook IPs to the walled garden from a blog. Still dead. The missing piece was **443 out to SpaiHub and Campay**, not more social domains.

Second incident: existing hotspot already had a tight walled garden. Script 1 was skipped because “we already have a login page.” Phones could not load packages or Campay. MoMo never started. They blamed Campay. Pay never left the garden.

Wrong diagnosis: “open every port.” Wrong diagnosis: “paste the router token into the ONU.” Never share tokens. Wrong diagnosis: “anti-tether blocks 443.” Anti-tether stays off; current scripts remove those rules.

## What you see

**Setup script** → **Existing hotspot** hint: Script 1 installs SpaiHub (walled garden, PAP, captive HTML).

CHR prerequisites say the VM must reach the SpaiHub API over HTTPS (outbound port 443) and the cloud security group must allow egress.

Symptoms when 443/garden is wrong:

- Stock MikroTik login forever (HTML fetch failed).
- Portal loads in **Preview portal** (your laptop is not in the garden) but phones on SSID cannot load **Pay**.
- Heartbeat missing → **OFFLINE** → Pay disabled on real clients too.
- Campay spinner never becomes **Check payment status** success because the phone cannot reach Campay hosts.

Do not expect Help to print the production hostnames as a copy-paste secret sheet. They are inside **Setup script** for that router.

## What to do

Tonight:

1. From the Hex, confirm outbound HTTPS works (the fetch lines in Script 1/2 are the real test).
2. Paste **1. Hotspot setup (once)** so garden lines exist, then **2. Connect to SpaiHub**.
3. On the cloud VM (CHR), allow **TCP 443 egress** to the internet. Do not invent inbound DNAT “for SpaiHub.”
4. Test with a phone on the guest SSID, not only preview.
5. If you use Campay live, keep the Campay hosts Script 1 already adds. Do not delete `spaihub-campay*` lines to “simplify.”

## What not to say

- Do not publish live secret URLs, router tokens, or bypass tricks for NAT/fair-use.
- Do not tell a guest to “open port 443 on their extender.” The Hex needs egress; their extender in router mode is a different (one MAC) problem.
- Do not promise remaining fair-use GB while the portal cannot even load.
- Do not say walled garden replaces Script 2. Garden lets you talk; commands grant.
