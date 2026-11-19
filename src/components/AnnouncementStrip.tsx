import { promotions } from '../config/promotions';
import styles from './AnnouncementStrip.module.css';

function OfferMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3c2 8 5 11 13 13-8 2-11 5-13 13C14 21 11 18 3 16 11 14 14 11 16 3Z" />
    </svg>
  );
}

function AnnouncementMessages({ repeat = false }: { repeat?: boolean }) {
  return (
    <span className={styles.messageGroup} aria-hidden={repeat || undefined}>
      {promotions.announcement.messages.map((message) => (
        <span className={styles.message} key={message.title}>
          <span className={styles.sparkle}>
            <OfferMark />
          </span>
          <strong>{message.title}</strong>
          <span className={styles.caption}>{message.caption}</span>
        </span>
      ))}
    </span>
  );
}

export function AnnouncementStrip() {
  return (
    <aside
      className={styles.announcement}
      aria-label="Nore Farms offers and milk subscriptions"
    >
      <span className={styles.labelPanel} aria-hidden="true">
        <span className={styles.labelIcon}>
          <OfferMark />
        </span>
        <span className={styles.label}>{promotions.announcement.label}</span>
      </span>
      <span className={styles.viewport}>
        <span className={styles.track}>
          <AnnouncementMessages />
          <AnnouncementMessages repeat />
        </span>
      </span>
    </aside>
  );
}
