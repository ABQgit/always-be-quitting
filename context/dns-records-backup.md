# DNS records — recovery reference

**Captured 2026-08-25/26 by direct DNS lookup, while nameservers were still GoDaddy's.** Kept because on 2026-08-26 the nameservers were switched to Vercel's, which dropped every record below — Vercel's nameservers only serve records created in Vercel.

**First remedy is always to revert the nameservers to GoDaddy** (`ns09.domaincontrol.com`, `ns10.domaincontrol.com`), because GoDaddy retains the zone when you delegate away. This file is the fallback if that zone is ever gone.

---

## The incident, for future reference

Changing nameservers is **not** part of the Vercel cutover. The cutover changes exactly two records — the apex `A` and the `www` `CNAME` — and leaves DNS hosted at GoDaddy. Moving nameservers hands the entire zone to Vercel and silently deletes everything not recreated there: email, sender authentication, and domain verifications.

Symptoms: inbound mail bounces, newsletters fail authentication, the contact form's Resend sending breaks, Search Console loses verification.

---

## Records as they were (restore these if the zone is lost)

### Nameservers
```
ns09.domaincontrol.com
ns10.domaincontrol.com
```

### Website (systeme.io — these are what the cutover REPLACES)
| Type | Name | Value |
|---|---|---|
| A | @ | `3.33.251.168` |
| A | @ | `15.197.225.128` |
| CNAME | www | `dgtb6mhv7ir6.cloudfront.net` |

### Email — Google Workspace ⚠️ CRITICAL
| Type | Name | Priority | Value |
|---|---|---|---|
| MX | @ | 1 | `aspmx.l.google.com` |
| MX | @ | 5 | `alt1.aspmx.l.google.com` |
| MX | @ | 5 | `alt2.aspmx.l.google.com` |
| MX | @ | 10 | `alt3.aspmx.l.google.com` |
| MX | @ | 10 | `alt4.aspmx.l.google.com` |

### Sender authentication ⚠️ CRITICAL
| Type | Name | Value |
|---|---|---|
| TXT | @ | `v=spf1 include:_spf.google.com include:systeme.io ~all` |
| TXT | `_dmarc` | `v=DMARC1; p=reject; pct=100; rua=mailto:jon@alwaysbequitting.com` |
| TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuf2zvDF4mGO5l7HxYdSDPV5yxm15FWx6ULy3Bm//7IFkwqKgwHTjavohLI+lWCDDj7Cr8t3MQp6okpHPcE3zBPPHkdxnRgeyXX8qtBqPR7w3e0y/G+hNnlZJVuwY0b4qeHrMkT7NArsP0uuiQfEAaH3DIwD422lh0XRGgXKDhwWH03XuTFpfEw6OTh7MFvlddhvILooKRoDhGcL+lfW0eZ4PEgmrXibpT0z1LShp/3YlJQmMz7E6R7BD64351pHaVHylZ8qbcBFDX/HbmYyjDmHZiKUyW9kwU860PJEw1+vxJmjvx80+CgEL/xLdy3d4JevUrJeXNTofMzDos85EMQIDAQAB` |

⚠️ **Only ONE `v=spf1` record may exist at `@`.** A second breaks authentication for Google *and* systeme.io simultaneously.

### Resend (contact form) ⚠️ CRITICAL
| Type | Name | Priority | Value |
|---|---|---|---|
| TXT | `resend._domainkey` | — | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyIT9AdObmvkmRrto1fGtIyLthDgjrPoqUbtpnGKaBXKvqE+UhWRiAQLhM1+1hyeuLc+6BPJcBB1b89sjSj59ZRYjMyX8rcZZxaHLA12KuYp0A4X4EmgIFyhxs5t+8suwu0C66WzRNKIBpXHcmUPPJSc6iwGRvFBQD34KR0/tP8QIDAQAB` |
| TXT | `send` | — | `v=spf1 include:dc-fd741b8612._spfm.send.alwaysbequitting.com ~all` |
| TXT | `dc-fd741b8612._spfm.send` | — | `v=spf1 include:amazonses.com ~all` |
| MX | `send` | 10 | `feedback-smtp.us-east-1.amazonses.com` |

### Verification
| Type | Name | Value |
|---|---|---|
| TXT | @ | `google-site-verification=bjb0k6gBFZo4R4ypH6p118h2Fh-sp6rQCZrbMSB3Y4w` |

---

## GoDaddy gotcha

**The Name field is relative** — GoDaddy appends the domain. Enter `send`, never `send.alwaysbequitting.com`, or you create `send.alwaysbequitting.com.alwaysbequitting.com` and it fails silently.

## Verifying a restore

Check each type with an uncached lookup — a cached answer will show the old state and mislead you:

```
https://dns.google/resolve?type=MX&name=alwaysbequitting.com&cd=1&do=1
https://dns.google/resolve?type=TXT&name=alwaysbequitting.com&cd=1&do=1
https://dns.google/resolve?type=NS&name=alwaysbequitting.com&cd=1&do=1
```

Then send a test message to `jon@alwaysbequitting.com` from an outside address and confirm it arrives.
