import type { PayloadRequest } from 'payload'
import { prettyPhone } from '../lib/contact'

export type LeadKind = 'enquiry' | 'scholarship' | 'admission'

type Lead = Record<string, unknown> & { id?: string | number; name?: string; email?: string | null; phone?: string }

const KIND = {
  enquiry: { label: 'New enquiry', collection: 'enquiries' },
  scholarship: { label: 'New scholarship test registration', collection: 'scholarship-registrations' },
  admission: { label: 'New admission application', collection: 'admissions' },
} as const

/** Fields shown in the staff alert, in order. */
const FIELDS: Record<LeadKind, [string, string][]> = {
  enquiry: [['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['course', 'Course'], ['batch', 'Preferred batch'], ['message', 'Message'], ['source', 'Sent from']],
  scholarship: [['name', 'Name'], ['phone', 'WhatsApp'], ['email', 'Email'], ['qualification', 'Class / qualification'], ['course', 'Course of interest'], ['mode', 'Test mode']],
  admission: [['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['dob', 'Date of birth'], ['guardian', 'Parent / guardian'], ['address', 'Address'], ['course', 'Course'], ['batch', 'Batch'], ['qualification', 'Qualification'], ['scholarshipCode', 'Scholarship code']],
}

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const shell = (title: string, body: string) => `<!doctype html><html><body style="margin:0;background:#EEEDFE;font-family:Poppins,Segoe UI,Arial,sans-serif;color:#333">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:linear-gradient(135deg,#004AAD,#1BB0CE);background-color:#004AAD;padding:22px 26px;color:#fff">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.85">Jagriti Institute of Education</div>
<div style="font-size:20px;font-weight:700;margin-top:4px">${esc(title)}</div></td></tr>
<tr><td style="padding:24px 26px;font-size:15px;line-height:1.6">${body}</td></tr>
<tr><td style="padding:16px 26px;background:#F7F6FF;font-size:12px;color:#4A5568">U 75, First Floor, Kalra Complex, Shakarpur, near Laxmi Nagar Metro Gate No. 2, Delhi 110092</td></tr>
</table></td></tr></table></body></html>`

function staffEmail(kind: LeadKind, doc: Lead, adminUrl: string) {
  const rows = FIELDS[kind]
    .filter(([k]) => doc[k] !== undefined && doc[k] !== null && doc[k] !== '')
    .map(([k, label]) => {
      const v = k === 'dob' && doc[k] ? new Date(String(doc[k])).toLocaleDateString('en-IN') : doc[k]
      return `<tr><td style="padding:8px 0;color:#4A5568;width:42%;vertical-align:top">${esc(label)}</td><td style="padding:8px 0;font-weight:600;color:#1E3A5F">${esc(v)}</td></tr>`
    })
    .join('')
  const phone = String(doc.phone ?? '').replace(/\D/g, '').slice(-10)
  return shell(
    KIND[kind].label,
    `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>
     <p style="margin:22px 0 0">
       <a href="${adminUrl}" style="display:inline-block;background:#004AAD;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">Open in admin</a>
       ${phone ? `&nbsp; <a href="https://wa.me/91${phone}" style="display:inline-block;background:#1FAF55;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">WhatsApp ${esc(doc.name)}</a>` : ''}
     </p>`,
  )
}

function studentEmail(kind: LeadKind, doc: Lead, phone: string) {
  const first = esc(String(doc.name ?? '').split(' ')[0] || 'there')
  const course = doc.course ? ` for <b>${esc(doc.course)}</b>` : ''
  const lines: Record<LeadKind, string> = {
    enquiry: `Thank you for your enquiry${course}. A counsellor will call or WhatsApp you within one working day to answer your questions and book a free demo class.`,
    scholarship: `You are registered for the JIE Scholarship Test${course}. We will send the test link and date to your WhatsApp number <b>${esc(doc.phone)}</b>.`,
    admission: `We have received your admission application${course}. Our admissions desk will confirm your batch and fee shortly. Please bring your original documents to the centre.`,
  }
  return shell(
    kind === 'admission' ? 'Application received' : kind === 'scholarship' ? 'Registration confirmed' : 'We got your enquiry',
    `<p style="margin:0 0 14px">Hi ${first},</p><p style="margin:0 0 14px">${lines[kind]}</p>
     <p style="margin:0">Questions? Call or WhatsApp <b>${esc(phone)}</b>.</p>
     <p style="margin:18px 0 0">Team JIE</p>`,
  )
}

/** Sends the staff alert and (when the visitor gave an email) a confirmation. Never throws. */
export async function notifyNewLead(req: PayloadRequest, kind: LeadKind, doc: Lead) {
  const { payload } = req
  try {
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0, req })
    const fromSettings = (settings?.notificationEmails ?? []).map((e) => e?.email).filter(Boolean) as string[]
    const staff = fromSettings.length
      ? fromSettings
      : (process.env.ADMIN_NOTIFY_EMAIL ?? '').split(',').map((s) => s.trim()).filter(Boolean)
    const base = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
    const adminUrl = `${base}/admin/collections/${KIND[kind].collection}/${doc.id ?? ''}`

    const jobs: Promise<unknown>[] = []
    if (staff.length) {
      jobs.push(
        payload.sendEmail({
          to: staff,
          subject: `${KIND[kind].label}: ${doc.name ?? ''}${doc.course ? ` (${doc.course})` : ''}`,
          html: staffEmail(kind, doc, adminUrl),
          ...(doc.email ? { replyTo: String(doc.email) } : {}),
        }),
      )
    } else {
      payload.logger.warn(`No notification email configured; ${kind} ${doc.id} saved without a staff alert.`)
    }
    if (doc.email) {
      jobs.push(
        payload.sendEmail({
          to: String(doc.email),
          subject:
            kind === 'admission'
              ? 'Your JIE admission application'
              : kind === 'scholarship'
                ? 'You are registered: JIE Scholarship Test'
                : 'Thanks for contacting Jagriti Institute of Education',
          html: studentEmail(kind, doc, prettyPhone(settings?.mainNumber)),
        }),
      )
    }
    const results = await Promise.allSettled(jobs)
    results.forEach((r) => r.status === 'rejected' && payload.logger.error({ err: r.reason }, `Email for ${kind} failed`))
  } catch (err) {
    payload.logger.error({ err }, `Could not send ${kind} notification`)
  }
}
