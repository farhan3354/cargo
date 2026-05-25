import fs from 'fs'
import path from 'path'

export type SmtpConfig = {
  host: string
  port?: number
  user: string
  pass: string
  secure?: boolean
  from?: string
}

function envKey(base: string) {
  return base.replace(/[^A-Z0-9_]/g, '_')
}

export function getSmtpConfigForRecipient(email?: string): SmtpConfig | null {
  // 1) try env vars using localpart (before @)
  if (email) {
    const local = email.split('@')[0].toUpperCase()
    const host = process.env[`SMTP_${envKey(local)}_HOST`]
    const user = process.env[`SMTP_${envKey(local)}_USER`]
    const pass = process.env[`SMTP_${envKey(local)}_PASS`]
    const port = process.env[`SMTP_${envKey(local)}_PORT`]
    const secure = process.env[`SMTP_${envKey(local)}_SECURE`]
    const from = process.env[`SMTP_${envKey(local)}_FROM`]

    if (host && user && pass) {
      return {
        host,
        user,
        pass,
        port: port ? parseInt(port) : undefined,
        secure: secure === 'true',
        from,
      }
    }
  }

  // 2) try to load local config file (dev only)
  try {
    const cfgPaths = [
      path.join(process.cwd(), 'src', 'config', 'emailAccounts.json'),
      path.join(process.cwd(), 'emailAccounts.json'),
    ]

    for (const p of cfgPaths) {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf8')
        const json = JSON.parse(raw)

        // check exact email key first
        if (email && json[email]) return json[email]

        // check local part
        if (email) {
          const local = email.split('@')[0]
          if (json[local]) return json[local]
        }

        // fallback to 'default'
        if (json.default) return json.default
      }
    }
  } catch (err) {
    // ignore parse errors — fallback to env/global
    console.warn('emailAccounts load error:', err)
  }

  return null
}
