import { useState } from 'react';
import type { FormEvent } from 'react';
import { site } from '../../config/site';
import { EnquiryLink } from '../EnquiryLink';
import { SocialLinks } from '../SocialLinks';
import { Reveal } from './Reveal';
import styles from './ContactSection.module.css';

const detailIcons = {
  address:
    'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  email: 'M3 5h18v14H3ZM3 5l9 8 9-8',
  phone:
    'M8 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 3a14 14 0 0 1-7-7l3-2Z',
  hours: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2',
};

export function ContactSection() {
  const [draftNotice, setDraftNotice] = useState('');
  const phone = (site.phone || site.whatsappNumber).replace(/\D/g, '');
  const displayPhone = `+${phone.replace(/^(91)(\d{5})(\d{5})$/, '$1 $2$3')}`;
  const details = [
    {
      icon: 'address' as const,
      label: 'Our address',
      value: site.address || '12 Farm Lane, Jind, Haryana',
    },
    {
      icon: 'email' as const,
      label: 'Write to us',
      value: site.email || 'Email address coming soon',
      href: site.email ? `mailto:${site.email}` : undefined,
    },
    {
      icon: 'phone' as const,
      label: 'Call us',
      value: displayPhone,
      href: phone ? `tel:+${phone}` : undefined,
    },
    {
      icon: 'hours' as const,
      label: 'Business hours',
      value: site.businessHours || 'Monday–Saturday, 7 am–7 pm',
    },
  ];

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!site.email) return;

    const fields = new FormData(event.currentTarget);
    const name = String(fields.get('name') ?? '').trim();
    const email = String(fields.get('email') ?? '').trim();
    const message = String(fields.get('message') ?? '').trim();
    const subject = encodeURIComponent(`Nore Farms website enquiry from ${name}`);
    const body = encodeURIComponent(
      `Hello Nore Farms,\n\n${message}\n\nName: ${name}\nReply to: ${email}`,
    );

    setDraftNotice(
      'Send the prepared draft from your email app to complete your enquiry.',
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-heading"
      tabIndex={-1}
    >
      <div className={styles.background} aria-hidden="true">
        {/* Photo by Helena Lopes on Pexels, photo 4775040. Replace this local file with client imagery. */}
        <img
          src={`${import.meta.env.BASE_URL}images/contact-farm.webp`}
          alt=""
          width="2400"
          height="1600"
          loading="lazy"
          decoding="async"
        />
      </div>

      <Reveal className={styles.contactGrid}>
        <div className={styles.detailsPanel}>
          <p className={styles.eyebrow}></p>
          <h2 id="contact-heading">Contact us</h2>
          <p className={styles.detailsIntro}>
            A question about your everyday dairy? We’d love to hear from you.
          </p>

          <dl className={styles.details}>
            {details.map((detail) => (
              <div key={detail.icon} className={styles.detail}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={detailIcons[detail.icon]} />
                </svg>
                <div>
                  <dt>
                    {detail.label}
                  </dt>
                  <dd>
                    {detail.href ? (
                      <a href={detail.href}>{detail.value}</a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
            {site.serviceArea && (
              <div className={styles.serviceArea}>
                <dt>Delivery area</dt>
                <dd>{site.serviceArea}</dd>
              </div>
            )}
          </dl>

          <EnquiryLink className={styles.whatsapp} label="Enquire on WhatsApp" />
          {site.whatsappIsSample && (
            <p className={styles.sampleNumber}>
             WhatsApp number · +91 00000 00000
            </p>
          )}
          <SocialLinks />
        </div>

        <div className={styles.messagePanel}>
          <h3>Get in touch.</h3>
          <p className={styles.messageIntro}>
            Ask about our products, available packs or delivery in your area. Let’s find
            what works for you.
          </p>

          <form
            className={styles.form}
            onSubmit={prepareEmail}
            aria-label="Product enquiry"
          >
            <div className={styles.field}>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="How should we address you?"
                minLength={2}
                maxLength={80}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tell us which product you’re interested in and your delivery area."
                minLength={10}
                maxLength={2000}
                required
              />
            </div>
            <button type="submit" className={styles.submit} disabled={!site.email}>
              Submit enquiry
            </button>
            <p className={styles.formNote}>
              Opens your email app with your message ready to send.
            </p>
            <p className={styles.draftNotice} role="status">
              {draftNotice}
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
