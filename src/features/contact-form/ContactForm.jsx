import { useRef, useState } from 'react'
import styles from './ContactForm.module.scss'
import emailjs from '@emailjs/browser'

export function ContactForm() {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  const validate = (data) => {
    const errors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!data.name.trim()) errors.name = 'Name is required'
    if (!emailRe.test(data.email)) errors.email = 'Valid email is required'
    if (!data.message.trim() || data.message.trim().length < 10)
      errors.message = 'Message must be at least 10 characters'

    return errors
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
    }

    const errors = validate(payload)
    if (Object.keys(errors).length) {
      showToast('error', Object.values(errors)[0])
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      showToast('error', 'EmailJS keys are missing in .env')
      return
    }

    try {
      setLoading(true)
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      formRef.current.reset()
      showToast('success', 'Message sent successfully!')
    } catch (err) {
      console.error(err)
      showToast('error', 'Failed to send. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      {/* Toast */}
      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === 'success' ? styles.success : styles.error
          }`}
          role="status"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}

      <form ref={formRef} onSubmit={onSubmit} className={styles.form} noValidate>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input className={styles.input} id="name" name="name" type="text" placeholder="Your name" />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} id="email" name="email" type="email" placeholder="you@example.com" />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="message">Message</label>
          <textarea className={styles.textarea} id="message" name="message" rows="5" placeholder="How can I help you?" />
        </div>

        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  )
}
