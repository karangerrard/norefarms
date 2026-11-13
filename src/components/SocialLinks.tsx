import { site } from '../config/site';
import styles from './SocialLinks.module.css';

export function SocialLinks() {
  return (
    <div className={styles.socials}>
      <ul aria-label="Social media">
        {site.socialLinks.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label}${link.isSample ? ' — sample link' : ''}`}
              title={link.isSample ? `${link.label} — sample link` : link.label}
            >
              {link.label === 'Facebook' ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M14 22v-9h3l.5-4H14V6.5c0-1.2.4-2 2-2h1.8V1.2A22 22 0 0 0 15.2 1C12.6 1 11 2.6 11 5.5V9H8v4h3v9Z"
                  />
                </svg>
              ) : link.label === 'Instagram' ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              ) : (
                link.label
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
