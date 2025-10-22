import styles from './Contacts.module.scss'
import { ContactForm } from '../../features/contact-form/ContactForm.jsx'

export function Contacts() {
  return (
    <section id="contacts" className={styles.section}>
      <h2 className={styles.title}>Get in Touch</h2>
      <ContactForm />
    </section>
  )
}
