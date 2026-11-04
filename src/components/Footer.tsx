import { site } from '../config/site';
import styles from './sections/Sections.module.css';
import { BrandLogo } from './BrandLogo';
import { homeUrl, sectionUrl } from '../lib/navigation';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a href={homeUrl} className={styles.footerBrand} aria-label="Nore Farms home">
          <BrandLogo />
        </a>
        <nav aria-label="Footer navigation">
          <a href={sectionUrl('products')}>Products</a>
          <a href={sectionUrl('about')}>About us</a>
          <a href={sectionUrl('contact')}>Contact</a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.phone && (
            <a href={`tel:+${site.phone.replace(/\D/g, '')}`}>{site.phone}</a>
          )}
          {site.socialLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
          {site.privacyUrl && <a href={site.privacyUrl}>Privacy policy</a>}
        </nav>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
