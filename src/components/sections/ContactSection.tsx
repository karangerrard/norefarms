import { site } from '../../config/site';
import { EnquiryLink } from '../EnquiryLink';
import { Reveal } from './Reveal';
import styles from './Sections.module.css';

export function ContactSection() {
  const phone = site.phone || site.whatsappNumber;
  const hasContact = Boolean(phone || site.email);
  const details = [
    {
      label: 'Call us',
      value: phone,
      href: phone ? `tel:+${phone.replace(/\D/g, '')}` : undefined,
    },
    {
      label: 'Write to us',
      value: site.email,
      href: site.email ? `mailto:${site.email}` : undefined,
    },
    { label: 'Our address', value: site.address },
    { label: 'Service area', value: site.serviceArea },
    { label: 'Business hours', value: site.businessHours },
  ].filter((detail) => detail.value);

  return (
    <section
      id="contact"
      className={`${styles.section} ${styles.contact}`}
      aria-labelledby="contact-heading"
      tabIndex={-1}
    >
      <Reveal className={styles.contactGrid}>
        <div>
          <p className={styles.eyebrow}>LET’S TALK / NORE FARMS</p>
          <h2 id="contact-heading" className={styles.contactHeading}>
            A conversation.
            <br />A good beginning.
          </h2>
          <p className={styles.contactCopy}>
            Questions about the range? Tell us what you’re looking for and where you’re
            based. We’ll help you find out more.
          </p>
          <EnquiryLink className={styles.goldButton} label="Start a conversation" />
          {!hasContact && (
            <p className={styles.launchNote}>
              Enquiries open soon. Contact details will be shared at launch.
            </p>
          )}
        </div>
        {details.length > 0 ? (
          <dl className={styles.contactDetails}>
            {details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>
                  {detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className={styles.contactCard}>
            <span className={styles.contactMark} aria-hidden="true">
              N.
            </span>
            <p>
              Everyday dairy.
              <br />
              Room for conversation.
            </p>
            <span>MILK · PANEER · GHEE</span>
          </div>
        )}
      </Reveal>
    </section>
  );
}
