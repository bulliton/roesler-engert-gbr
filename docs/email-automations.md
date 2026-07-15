# E-Mail-Automatisierung — Rösler & Engert

Strategischer Plan für transaktionale, nurture- und interne E-Mails im B2B-Schmuck- und Diamantgeschäft.

**Stack:** Resend (Versand + Audiences + Broadcasts) · Next.js API Routes · React Email (Produktion)

**Preview:** Öffnen Sie `/emails/preview.html` im Browser (lokal: `http://localhost:3000/emails/preview.html`).

---

## 1. Automatisierungs-Architektur

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         WEBSITE (Next.js)                                │
│  Contact Form │ Catalog Form │ Newsletter │ (Future: Shop, Webhooks)    │
└──────┬────────┴──────┬───────┴─────┬──────┴────────────────────────────┘
       │               │             │
       ▼               ▼             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                    API Routes (/api/leads/*)                              │
│  Validierung → sofortiger Versand → (optional) Lead-Speicherung          │
└──────┬───────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         RESEND                                            │
│  Transaktional │ Audiences │ Broadcasts │ Webhooks │ Scheduled (Cron)    │
└──────┬───────────────────────────────────────────────────────────────────┘
       │
       ├──► Lead (Bestätigung, Katalog, DOI, Follow-ups)
       ├──► Sales Team (Benachrichtigungen, Routing)
       └──► Partner (Onboarding, Re-Engagement)
```

### Phasen

| Phase | Fokus | Zeitrahmen |
|-------|-------|------------|
| **Phase 1** | Transaktional (live + Design-Upgrade) | Sofort |
| **Phase 2** | Double Opt-in, Follow-ups, Lead-Routing | 2–4 Wochen |
| **Phase 3** | Nurture-Sequenzen, Termin-Integration | 4–8 Wochen |
| **Phase 4** | Partner-Onboarding, Broadcasts, Shop | Bei Bedarf |

---

## 2. E-Mail-Katalog

### Legende

- **Typ:** `TX` = Transaktional · `INT` = Intern · `NUR` = Nurture · `MKT` = Marketing/Broadcast
- **Status:** ✅ Live · 🔧 Geplant · 📋 Konzept

---

### Phase 1 — Transaktional (sofort)

| ID | Name | Typ | Trigger | Empfänger | Verzögerung | Status |
|----|------|-----|---------|-----------|-------------|--------|
| `TX-01` | Kontakt-Bestätigung | TX | `POST /api/leads/contact` | Lead | Sofort | ✅ |
| `TX-02` | Kontakt Sales-Alert | INT | `POST /api/leads/contact` | Sales | Sofort | ✅ |
| `TX-03` | Katalog-Zustellung | TX | `POST /api/leads/booklet` | Lead | Sofort | ✅ |
| `TX-04` | Katalog Sales-Alert | INT | `POST /api/leads/booklet` | Sales | Sofort | ✅ |
| `TX-05` | Newsletter Willkommen | TX | `POST /api/leads/newsletter` | Subscriber | Sofort | ✅ |

**Subject Lines (DE):**

| ID | Betreff |
|----|---------|
| TX-01 | Wir haben Ihre Anfrage erhalten — Rösler & Engert |
| TX-02 | Neue B2B-Anfrage: {company} ({name}) |
| TX-03 | Ihr B2B-Katalog — Rösler & Engert |
| TX-04 | Katalog-Download: {company} ({name}) |
| TX-05 | Newsletter-Anmeldung bestätigt — Rösler & Engert |

---

### Phase 2 — Compliance & Follow-up

| ID | Name | Typ | Trigger | Empfänger | Verzögerung | Status |
|----|------|-----|---------|-----------|-------------|--------|
| `TX-06` | Newsletter Double Opt-in | TX | Newsletter-Anmeldung | Subscriber | Sofort | 🔧 |
| `TX-07` | DOI Bestätigung | TX | Klick auf Bestätigungslink | Subscriber | Sofort | 🔧 |
| `NUR-01` | Katalog Follow-up 1 | NUR | Nach Katalog-Download | Lead | +3 Tage | 🔧 |
| `NUR-02` | Katalog Follow-up 2 | NUR | Nach Katalog-Download | Lead | +7 Tage | 🔧 |
| `NUR-03` | Kontakt Follow-up | NUR | Kontakt, keine Antwort | Lead | +48 Std. | 🔧 |
| `INT-01` | Lead-Routing Partnership | INT | `requestType=partnership` | Partnership-Sales | Sofort | 🔧 |
| `INT-02` | Lead-Routing Diamonds | INT | `requestType=diamonds` | Diamond-Sales | Sofort | 🔧 |

**Implementierung NUR-01/02:** Resend Scheduled Emails oder Cron-Job (Vercel Cron / Supabase Edge) mit Lead-Timestamp in DB.

---

### Phase 3 — Partnership Nurture (5 E-Mails, 21 Tage)

| ID | Tag | Betreff (DE) | Inhalt |
|----|-----|--------------|--------|
| `NUR-P1` | 0 | Willkommen als potenzieller Partner | Kurzvorstellung, 128 Jahre, Showroom-Einladung |
| `NUR-P2` | 3 | So arbeiten wir mit Juwelieren zusammen | B2B-Services, Rechnungsankauf, Anpassungen |
| `NUR-P3` | 7 | Diamanten & Gemmologie in Würzburg | 20+ Schliffe, eigener Gemmologe |
| `NUR-P4` | 14 | Kollektionen & Individualisierung | Made in Germany, Kollektionsanpassung |
| `NUR-P5` | 21 | Persönlicher Termin — Ihr nächster Schritt | Termin-CTA, direkte Telefonnummer |

**Einstieg:** `requestType=partnership` ODER manueller Tag in CRM/Audience.

---

### Phase 3 — Termin-Integration

| ID | Name | Typ | Trigger | Verzögerung | Status |
|----|------|-----|---------|-------------|--------|
| `TX-08` | Termin-Bestätigung | TX | Webhook externes Buchungstool | Sofort | 📋 |
| `TX-09` | Termin-Erinnerung | TX | 24h vor Termin | -24h | 📋 |
| `TX-10` | Nach dem Besuch | TX | Manuell / Webhook nach Termin | +1 Tag | 📋 |

**Hinweis:** Terminbuchung läuft über `roesler-engert.de/termin` (extern). Webhook-Integration beim Buchungsanbieter erforderlich.

---

### Phase 4 — Partner & Marketing

| ID | Name | Typ | Trigger | Status |
|----|------|-----|---------|--------|
| `TX-11` | Partner-Onboarding | TX | Manuell bei Vertragsabschluss | 📋 |
| `MKT-01` | Newsletter Broadcast | MKT | Manuell / Quartalsweise | 📋 |
| `MKT-02` | Re-Engagement | MKT | 90 Tage inaktiv in Audience | 📋 |
| `TX-12` | Shop-Bestellbestätigung | TX | B2B-Shop Order (future) | 📋 |

---

## 3. Segmentierung & Tags

Empfohlene Resend-Audience-Tags / Custom Properties:

| Tag / Property | Quelle | Verwendung |
|----------------|--------|------------|
| `locale` | `de` / `en` | Sprachwahl aller E-Mails |
| `source` | `contact-page`, `footer-form`, `catalog` | Attribution |
| `request_type` | `partnership`, `diamonds`, `collection`, `general` | Routing & Nurture |
| `lead_stage` | `new`, `nurturing`, `qualified`, `partner` | Sequenz-Steuerung |
| `catalog_downloaded` | boolean + timestamp | Follow-up NUR-01/02 |
| `newsletter_confirmed` | boolean (nach DOI) | Broadcast-Zielgruppe |

---

## 4. Design-System (E-Mail)

| Element | Wert |
|---------|------|
| Primärfarbe | `#004646` |
| Akzent / CTA | `#009696` |
| Gold-Akzent | `#b8956b` |
| Hintergrund | `#f2fafa` |
| Text | `#171717` / `#5a6b6b` (muted) |
| Display-Schrift | Lora, Georgia, serif |
| Body-Schrift | Lato, Helvetica, Arial, sans-serif |
| Logo | `/brand/logo-horizontal.svg` (absolute URL in Produktion) |
| CTA-Style | Pill-Button, `#009696`, weiße Schrift |
| Sekundär-CTA | Outline oder `#004646` gefüllt |
| Gold-Linie | 3px unter Header |

**Produktions-URL für Assets:** `https://roesler-engert.de/brand/logo-horizontal.svg`

---

## 5. Technische Umsetzung (Roadmap)

### Sofort (Design-Upgrade)
1. React-Email-Templates in `lib/resend/emails.tsx` an neues Design anpassen
2. Logo, Gold-Akzent, Lora-Headlines, Footer mit Kontaktdaten
3. HTML-Previews in `public/emails/` als Referenz

### Phase 2
1. Lead-Tabelle (Supabase): `email`, `name`, `company`, `source`, `request_type`, `locale`, `created_at`, `tags[]`
2. `POST /api/leads/newsletter` → DOI-Flow mit signiertem Token
3. `GET /api/leads/confirm?token=...` → Audience-Eintrag + TX-07
4. Vercel Cron: täglich fällige Follow-ups prüfen und senden

### Phase 3
1. Webhook-Endpoint `/api/webhooks/appointment`
2. Resend Audiences Segment „Partnership Nurture“
3. Sequenz-Engine (einfach: Status-Feld + Cron)

### Phase 4
1. Resend Broadcasts für Quartals-Newsletter
2. Shop-Order-Events (wenn `SHOP_ENABLED=true`)

---

## 6. Compliance

- **DSGVO:** Double Opt-in für Newsletter (TX-06/07) vor Audience-Eintrag
- **Impressum:** Footer in jeder Marketing-E-Mail
- **Abmelden:** `{{unsubscribe_url}}` (Resend) in allen MKT-E-Mails
- **Transaktional:** Kein Abmelde-Link nötig, aber Kontaktinfo im Footer
- **Absender:** `info@roesler-engert.de` (SPF/DKIM via Resend Domain)

---

## 7. KPIs

| Metrik | Ziel |
|--------|------|
| Zustellrate | > 98 % |
| Öffnungsrate (Nurture) | > 35 % |
| Klickrate Termin-CTA | > 8 % |
| DOI-Bestätigungsrate | > 60 % |
| Katalog → Termin Conversion | Tracken via UTM |

**UTM-Schema:** `?utm_source=email&utm_medium=transactional&utm_campaign={email_id}`

---

## 8. Dateien

| Pfad | Beschreibung |
|------|--------------|
| `docs/email-automations.md` | Dieser Plan |
| `public/emails/preview.html` | Interaktive Vorschau aller Templates |
| `public/emails/templates/*.html` | Einzelne HTML-Dateien pro Template |
| `lib/resend/emails.tsx` | Produktions-Templates (React Email) |
| `lib/resend/send.tsx` | Versand-Orchestrierung |
