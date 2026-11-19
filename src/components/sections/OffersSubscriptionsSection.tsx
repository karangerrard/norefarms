import { useState } from 'react';
import { promotions } from '../../config/promotions';
import { EnquiryLink } from '../EnquiryLink';
import { Reveal } from './Reveal';
import shared from './Sections.module.css';
import styles from './OffersSubscriptionsSection.module.css';

function GiftIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 14h22v13H5V14Zm-2-6h26v6H3V8Zm13 0v19M16 8C6 8 7 1 11 3c3 1 5 5 5 5Zm0 0c10 0 9-7 5-5-3 1-5 5-5 5Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M7 6h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-2 7h22M11 3v6M21 3v6m-10 11 4 4 7-8" />
    </svg>
  );
}

export function OffersSubscriptionsSection() {
  const { offer, subscription } = promotions;
  const [delivery, setDelivery] = useState(subscription.deliveryOptions[0].id);
  const selected = subscription.deliveryOptions.find((option) => option.id === delivery)!;

  return (
    <section
      id="offers-and-subscriptions"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="offers-subscriptions-heading"
      tabIndex={-1}
    >
      <Reveal>
        <div className={shared.sectionIntro}>
          <div>
            <p className={shared.eyebrow}>A LITTLE MORE FOR YOUR EVERYDAY</p>
            <h2 id="offers-subscriptions-heading" className={shared.sectionHeading}>
              Good things.
              <br />
              Worth coming back to.
            </h2>
          </div>
          <p className={shared.introCopy}>
            Explore a welcome offer or ask about a milk plan that fits the rhythm of your
            home.
          </p>
        </div>
      </Reveal>

      <div className={styles.grid}>
        <section
          id="offers"
          className={styles.card}
          aria-labelledby="welcome-offer-heading"
          tabIndex={-1}
        >
          <div className={styles.cardTop}>
            <span className={styles.icon}>
              <GiftIcon />
            </span>
          </div>
          <p className={styles.eyebrow}>{offer.eyebrow}</p>
          <h3 id="welcome-offer-heading">{offer.heading}</h3>
          <p className={styles.description}>{offer.description}</p>

          <div className={styles.offerNote}>
            <span className={styles.smallStar} aria-hidden="true">
              ✦
            </span>
            <p>Milk, paneer &amp; ghee. A lovely place to begin.</p>
          </div>

          <div className={styles.cardBottom}>
            <EnquiryLink
              className={`${shared.goldButton} ${styles.enquiry}`}
              product={offer.enquirySubject}
              label={offer.enquiryLabel}
            />
            <p className={styles.terms}>{offer.terms}</p>
          </div>
        </section>

        <section
          id="subscriptions"
          className={`${styles.card} ${styles.subscription}`}
          aria-labelledby="milk-subscription-heading"
          tabIndex={-1}
        >
          <div className={styles.cardTop}>
            <span className={styles.icon}>
              <CalendarIcon />
            </span>
          </div>
          <p className={styles.eyebrow}>{subscription.eyebrow}</p>
          <h3 id="milk-subscription-heading">{subscription.heading}</h3>
          <p className={styles.description}>{subscription.description}</p>

          <fieldset className={styles.delivery}>
            <legend>Your preferred delivery rhythm</legend>
            <div className={styles.options}>
              {subscription.deliveryOptions.map((option) => (
                <label className={styles.option} key={option.id}>
                  <input
                    type="radio"
                    name="milk-delivery-rhythm"
                    value={option.id}
                    checked={delivery === option.id}
                    onChange={() => setDelivery(option.id)}
                    aria-describedby="delivery-rhythm-hint"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p
            id="delivery-rhythm-hint"
            className={styles.selectionHint}
            aria-live="polite"
          >
            {selected.hint}
          </p>

          <div className={styles.cardBottom}>
            <EnquiryLink
              className={`${shared.goldButton} ${styles.enquiry}`}
              product={`milk subscription with ${selected.label.toLowerCase()} delivery`}
              label={subscription.enquiryLabel}
            />
            <p className={styles.terms}>{subscription.terms}</p>
          </div>
        </section>
      </div>
    </section>
  );
}
