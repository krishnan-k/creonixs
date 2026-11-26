// EmailJS REST API (local + live rendulayum work aagum)
export async function sendMail(config, to, data, message) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30000)
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: {
          to_email: to,
          subject: 'New support enquiry from ' + data.name,
          from_name: data.name,
          name: data.name,
          from_email: data.email,
          email: data.email,
          reply_to: data.email,
          phone: data.phone || '-',
          topic: data.topic || 'Other',
          message,
        },
      }),
    })
    const text = await res.text()
    console.log('[contact] EmailJS response', res.status, text)
    if (!res.ok) {
      let hint = ''
      if (res.status === 403) hint = ' (EmailJS Dashboard → Account → Security la domain / origin block aagirukkalaam)'
      if (res.status === 400) hint = ' (Service ID / Template ID / Public Key check pannunga)'
      throw new Error(`${res.status}: ${text || 'Email could not be sent.'}${hint}`)
    }
    return text
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out. Please try again.')
    if (err instanceof TypeError) throw new Error('Network request was blocked (ad-blocker, VPN or offline). Please try again or email us directly.')
    throw err
  } finally {
    clearTimeout(timer)
  }
}
