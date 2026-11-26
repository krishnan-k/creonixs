import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { me, topics, emailjs, upload } from '../data'
import { Button, ease } from '../ui'
import { sendMail } from '../lib/sendMail'
import { useUploads } from '../lib/useUploads'

export default function ContactForm() {
  const [status, setStatus] = useState({ type: '', text: '' })
  const [sending, setSending] = useState(false)
  const sendingRef = useRef(false)
  const hideTimer = useRef(null)
  const input = useRef(null)

  const showStatus = (type, text, hideAfter) => {
    clearTimeout(hideTimer.current)
    setStatus({ type, text })
    if (hideAfter) hideTimer.current = setTimeout(() => setStatus({ type: '', text: '' }), hideAfter)
  }
  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const { items, add, retry, remove, clear } = useUploads()
  const uploading = items.filter((i) => i.state === 'uploading').length
  const canUpload = Boolean(upload.cloudName && upload.preset)

  const pick = (e) => {
    const problems = add(Array.from(e.target.files || []))
    e.target.value = ''
    if (problems.length) showStatus('err', problems.join(' '), 8000)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (sendingRef.current) return
    const form = e.currentTarget
    const fd = new FormData(form)
    const data = Object.fromEntries(['name', 'email', 'phone', 'topic', 'message'].map((k) => [k, String(fd.get(k) || '').trim()]))

    if (!data.name || !data.email || !data.message) return showStatus('err', 'Please fill in your name, email and message.', 6000)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return showStatus('err', 'Please enter a valid email address.', 6000)
    if (uploading) return showStatus('err', 'Please wait, your files are still uploading...', 5000)
    if (items.some((i) => i.state === 'error')) return showStatus('err', 'Some files failed to upload. Retry or remove them (✕) before sending.', 8000)

    const links = items.filter((i) => i.state === 'done').map((i) => i.url)
    const message = data.message + (links.length ? '\n\nAttachments:\n' + links.join('\n') : '')

    sendingRef.current = true; setSending(true)
    showStatus('', 'Sending your message...')
    try {
      await sendMail(emailjs, me.email, data, message)
      showStatus('ok', 'Message sent! We will contact you soon.', 8000)
      form.reset(); clear()
    } catch (error) {
      console.error('[contact] send failed:', error)
      showStatus('err', `Could not send: ${error.message} You can also email ${me.email}.`, 20000)
    } finally {
      sendingRef.current = false; setSending(false)
    }
  }

  const label = sending ? 'Sending...' : uploading ? `Uploading files (${uploading})...` : 'Send message'

  return (
    <motion.form id="contactForm" className="panel form-card" noValidate onSubmit={submit} initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease }}>
      <div className="two">
        <label><span>Name *</span><input name="name" required autoComplete="name" placeholder="Your full name" /></label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" /></label>
      </div>
      <label><span>Email *</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
      <label><span>Topic</span><select name="topic">{topics.map((t) => <option key={t}>{t}</option>)}</select></label>
      <label><span>Message *</span><textarea name="message" rows="4" required placeholder="Tell us about your store, products and what you need..." /></label>

      {canUpload && (
        <div>
          <span className="title" id="files-label">Attach images / videos (optional)</span>
          <div className="picker">
            <button type="button" aria-describedby="files-label files-help" onClick={() => input.current.click()}>Choose Files</button>
            <span>{items.length ? `${items.length} file${items.length > 1 ? 's' : ''} chosen` : 'No file chosen'}</span>
            <input ref={input} type="file" accept="image/*,video/*" multiple hidden onChange={pick} />
          </div>
          <p className="help" id="files-help">
            Files upload automatically as soon as you select them. Images up to {upload.maxImageMB}MB, videos up to {upload.maxVideoMB}MB each. Max {upload.maxFiles} files.
          </p>
          <ul className="files" aria-live="polite">
            {items.map((it) => (
              <li key={it.id} className={it.state}>
                <div className="preview">{it.preview ? <img src={it.preview} alt="" /> : '🎬'}</div>
                <div className="meta">
                  <span>{it.file.name}</span>
                  <em>{it.state === 'done' ? 'Uploaded ✓' : it.state === 'error' ? `Failed: ${it.error}` : `Uploading... ${it.pct}%`}</em>
                  {it.state === 'uploading' && <div className="upbar"><i style={{ width: it.pct + '%' }} /></div>}
                </div>
                {it.state === 'error' && <button type="button" className="retry" onClick={() => retry(it)}>Retry</button>}
                <button type="button" aria-label={'Remove ' + it.file.name} disabled={sending} onClick={() => remove(it.id)}>✕</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button type="submit" disabled={sending || uploading > 0}>{label}</Button>
      <div className={'status-msg ' + status.type} role="status" aria-live="polite">{status.text}</div>
    </motion.form>
  )
}
