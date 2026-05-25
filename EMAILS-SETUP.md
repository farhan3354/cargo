How to configure per-office email SMTP credentials

1. Preferred (production): set environment variables for each office.

Example for dubai@manarcargo.com (local part: DUBAI):

```
SMTP_DUBAI_HOST=manarcargo.com
SMTP_DUBAI_PORT=465
SMTP_DUBAI_USER=dubai@manarcargo.com
SMTP_DUBAI_PASS=your-email-password
SMTP_DUBAI_SECURE=true
SMTP_DUBAI_FROM=dubai@manarcargo.com
```

2. Local-dev (not committed): copy `src/config/emailAccounts.example.json` → `src/config/emailAccounts.json` and fill credentials.

Structure (example):

```
{
  "dubai@manarcargo.com": {
    "host": "manarcargo.com",
    "port": 465,
    "user": "dubai@manarcargo.com",
    "pass": "REPLACE_WITH_PASSWORD",
    "secure": true,
    "from": "dubai@manarcargo.com"
  }
}
```

3. Test sending an email

- Start the dev server: `npm run dev`
- POST to `/api/contact/test` with JSON body `{ "to": "dubai@manarcargo.com" }` (use Postman or curl).

curl example:

```bash
curl -X POST http://localhost:3000/api/contact/test \
  -H "Content-Type: application/json" \
  -d '{"to":"dubai@manarcargo.com"}'
```

4. Notes

- `src/config/emailAccounts.json` is ignored by `.gitignore` (do not commit credentials).
- If no per-office config exists, a global SMTP env (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`) will be used as fallback.
