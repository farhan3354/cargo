import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { getSmtpConfigForRecipient } from '@/lib/emailAccounts'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, message, captchaInput, captchaHash, to } = body

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400, headers: CORS_HEADERS })
    }

    if (!captchaInput || !captchaHash) {
      return NextResponse.json({ success: false, error: 'Invalid CAPTCHA.' }, { status: 400, headers: CORS_HEADERS })
    }

    // Verify Captcha (server-side base64)
    const normalizedInput = (captchaInput || '').toString().toUpperCase().trim()
    const calculatedHash = Buffer.from(normalizedInput + 'mango-cargo-salt').toString('base64')
    if (calculatedHash !== captchaHash) {
      return NextResponse.json({ success: false, error: 'Invalid CAPTCHA code. Please try again.' }, { status: 400 })
    }

    // Default receiver: corrected domain
    const receiverEmail = to || process.env.CONTACT_RECEIVER_EMAIL || 'dubai@manarcargo.com'

    // basic email format validator
    const isValidEmail = (s?: string) => !!(s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))

    if (!isValidEmail(receiverEmail)) {
      console.error('[Contact API] invalid receiver email configured:', receiverEmail)
      return NextResponse.json({ success: false, error: 'Server contact recipient is misconfigured. Please set CONTACT_RECEIVER_EMAIL.' }, { status: 500, headers: CORS_HEADERS })
    }

    // prefer per-recipient SMTP config (env or local json)
    const perConfig = getSmtpConfigForRecipient(receiverEmail)

    function logFailedMail(err: any, mailOptions: any) {
      try {
        const logDir = path.join(process.cwd(), 'src', 'tmp')
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
        const p = path.join(logDir, 'failed-emails.log')
        fs.appendFileSync(
          p,
          JSON.stringify({ time: new Date().toISOString(), error: err?.message || err, rejected: err?.rejected || null, mailOptions }) + '\n',
        )
      } catch (e) {
        console.warn('Failed to write failed email log', e)
      }
    }

    if (perConfig && perConfig.host && perConfig.user && perConfig.pass) {
      const transporter = nodemailer.createTransport({
        host: perConfig.host,
        port: perConfig.port || 465,
        secure: !!perConfig.secure,
        auth: { user: perConfig.user, pass: perConfig.pass },
      })

      // verify SMTP credentials early to return a helpful error instead of failing silently
      try {
        await transporter.verify()
      } catch (err: any) {
        console.error('[Contact API] SMTP verify failed', { host: perConfig.host, user: perConfig.user }, err?.message || err)
        return NextResponse.json({ success: false, error: 'SMTP authentication failed. Check SMTP credentials.' }, { status: 502, headers: CORS_HEADERS })
      }

      const webFrom = process.env.WEB_FROM_EMAIL || process.env.SMTP_FROM || 'fromweb@manarcargo.com'
      // Use the authenticated SMTP account as the envelope sender to satisfy SMTP sender verification.
      let envelopeFrom = perConfig.user || perConfig.from || webFrom
      if (!isValidEmail(envelopeFrom)) {
        envelopeFrom = perConfig.user && isValidEmail(perConfig.user) ? perConfig.user : 'no-reply@manarcargo.com'
      }

      const mailOptions = {
        from: `"MangoCargo Website" <${webFrom}>`,
        to: receiverEmail,
        replyTo: email,
        envelope: { from: envelopeFrom, to: receiverEmail },
        subject: `[MangoCargo Inquiry] ${subject || 'Website Inquiry'}`,
        text:
          `You have received a new inquiry from the website contact form:\n\n` +
          `Name: ${name}\nEmail: ${email}\nSubject: ${subject || ''}\n\nMessage:\n${message}\n`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg">
            <h2 style="color: #1F2288; border-bottom: 2px solid #1F2288; padding-bottom: 10px; margin-top: 0;">New Website Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || ''}</p>
            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #1F2288; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0; font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #1e293b;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              Sent from the MangoCargo Contact Form.
            </p>
          </div>
        `,
      }

      try {
        await transporter.sendMail(mailOptions)
      } catch (err: any) {
        console.error('[Contact API] sendMail failed (per-recipient SMTP)', err)
        logFailedMail(err, mailOptions)

        // Try fallback to global SMTP if configured
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
          try {
            const smtpHost = process.env.SMTP_HOST
            const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
            const smtpUser = process.env.SMTP_USER
            const smtpPass = process.env.SMTP_PASS

            const fallback = nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: { user: smtpUser, pass: smtpPass },
            })

            await fallback.verify()
            const fallbackOptions = { ...mailOptions, envelope: { from: smtpUser, to: receiverEmail } }
            await fallback.sendMail(fallbackOptions)
            console.log('[Contact API] fallback send via global SMTP succeeded')
          } catch (err2: any) {
            console.error('[Contact API] global fallback failed', err2)
            logFailedMail(err2, mailOptions)
            return NextResponse.json({ success: false, error: 'Failed to deliver mail to recipient. Please contact support.' }, { status: 502, headers: CORS_HEADERS })
          }
        } else {
          return NextResponse.json({ success: false, error: 'Failed to deliver mail to recipient. Please contact support.' }, { status: 502, headers: CORS_HEADERS })
        }
      }
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // fallback to global SMTP env
      const smtpHost = process.env.SMTP_HOST
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
      const smtpUser = process.env.SMTP_USER
      const smtpPass = process.env.SMTP_PASS

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      })

      // verify global SMTP credentials to provide clearer diagnostics
      try {
        await transporter.verify()
      } catch (err: any) {
        console.error('[Contact API] SMTP verify failed', { host: smtpHost, user: smtpUser }, err?.message || err)
        return NextResponse.json({ success: false, error: 'SMTP authentication failed. Check SMTP credentials.' }, { status: 502, headers: CORS_HEADERS })
      }

      const webFrom = process.env.WEB_FROM_EMAIL || process.env.SMTP_FROM || 'fromweb@manarcargo.com'
      // For global SMTP, use the authenticated user as envelope sender to avoid "sender verify failed" errors
      let envelopeFrom = smtpUser || process.env.SMTP_FROM || webFrom
      if (!isValidEmail(envelopeFrom)) {
        envelopeFrom = smtpUser && isValidEmail(smtpUser) ? smtpUser : 'no-reply@manarcargo.com'
      }

      const mailOptions = {
        from: `"MangoCargo Website" <${webFrom}>`,
        to: receiverEmail,
        replyTo: email,
        envelope: { from: envelopeFrom, to: receiverEmail },
        subject: `[MangoCargo Inquiry] ${subject || 'Website Inquiry'}`,
        text:
          `You have received a new inquiry from the website contact form:\n\n` +
          `Name: ${name}\nEmail: ${email}\nSubject: ${subject || ''}\n\nMessage:\n${message}\n`,
        html: `...`,
      }

      try {
        await transporter.sendMail(mailOptions)
      } catch (err: any) {
        console.error('[Contact API] sendMail failed (global SMTP)', err)
        // persist failure for later inspection
        try {
          const logDir = path.join(process.cwd(), 'src', 'tmp')
          if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
          const p = path.join(logDir, 'failed-emails.log')
          fs.appendFileSync(p, JSON.stringify({ time: new Date().toISOString(), error: err?.message || err, rejected: err?.rejected || null, mailOptions }) + '\n')
        } catch (e) {
          console.warn('Failed to write failed email log', e)
        }

        return NextResponse.json({ success: false, error: 'Failed to deliver mail to recipient. Please contact support.' }, { status: 502, headers: CORS_HEADERS })
      }
    } else {
      console.log('=========================================')
      console.log('[Contact API] SMTP is not configured. To send real emails, set per-office env variables or create src/config/emailAccounts.json.')
      console.log('[Contact API] Simulated Inquiry: ', { name, email, subject, message, receiverEmail })
      console.log('=========================================')
    }

    return NextResponse.json({ success: true, message: 'Your message has been sent successfully!' }, { headers: CORS_HEADERS })
  } catch (error: any) {
    console.error('[Contact API Error]:', error)
    return NextResponse.json({ success: false, error: 'Internal server error. Please try again later.' }, { status: 500, headers: CORS_HEADERS })
  }
}
