import { site } from '../config/site';
import { products } from '../data/products';
import { homeUrl, productUrl, sectionUrl } from '../lib/navigation';
import { whatsappUrl } from '../lib/whatsapp';
import { BrandLogo } from './BrandLogo';
import styles from './Footer.module.css';

export function Footer() {
  const whatsapp = whatsappUrl();
  const phone = site.phone.replace(/\D/g, '');
  const displayPhone = `+${phone.replace(/^(91)(\d{5})(\d{5})$/, '$1 $2 $3')}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.masthead}>
          <a href={homeUrl} className={styles.brand} aria-label="Nore Farms home">
            <BrandLogo inverse />
          </a>
          <p className={styles.rangeTitle}>Milk, Paneer &amp; Ghee</p>
        </div>

        <div className={styles.grid}>
          <nav aria-label="Footer navigation">
            <ul className={styles.linkList}>
              <li>
                <a href={homeUrl}>Home</a>
              </li>
              <li>
                <a href={sectionUrl('products')}>Products</a>
              </li>
              <li>
                <a href={sectionUrl('about')}>About us</a>
              </li>
              <li>
                <a href={sectionUrl('contact')}>Contact us</a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Product links">
            <ul className={styles.linkList}>
              {products.map((product) => (
                <li key={product.slug}>
                  <a href={productUrl(product.slug)}>{product.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.enquiries}>
            <h2>Product enquiries</h2>
            <p>
              Ask us about pack sizes, product availability and delivery in your area.
            </p>
            <a
              className={styles.enquiryLink}
              href={whatsapp ?? sectionUrl('contact')}
              target={whatsapp ? '_blank' : undefined}
              rel={whatsapp ? 'noopener noreferrer' : undefined}
            >
              {whatsapp ? 'Enquire on WhatsApp' : 'Ask about availability'}
            </a>
            {site.socialLinks.length > 0 && (
              <ul className={styles.socialLinks} aria-label="Social links">
                {site.socialLinks.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.contact}>
            <h2>Contact us</h2>
            <address>
              {phone && <a href={`tel:+${phone}`}>{displayPhone}</a>}
              {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
              <span className={styles.streetAddress}>
                {!site.address && (
                  <span className={styles.addressLabel}>Sample address</span>
                )}
                {site.address || '12 Farm Lane, Pune, Maharashtra'}
              </span>
            </address>
          </div>
        </div>

        <div className={styles.legal}>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          {site.privacyUrl && <a href={site.privacyUrl}>Privacy policy</a>}
        </div>
      </div>
    </footer>
  );
}
