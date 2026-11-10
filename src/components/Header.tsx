import { useEffect, useRef, useState } from 'react';
import { EnquiryLink } from './EnquiryLink';
import styles from './Header.module.css';
import { BrandLogo } from './BrandLogo';
import { homeUrl, sectionUrl } from '../lib/navigation';
const links = [
  { label: 'Products', href: '#products' },
  { label: 'About us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia('(min-width: 900px)');
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    media.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      media.removeEventListener('change', resize);
    };
  }, [open]);
  const sectionLinks = links.map(({ label, href }) => (
    <a
      key={href}
      href={sectionUrl(href.slice(1))}
      onClick={(event) => {
        setOpen(false);
        const section = document.querySelector<HTMLElement>(href);
        if (section) {
          event.preventDefault();
          section.focus({ preventScroll: true });
          section.scrollIntoView();
          window.history.replaceState(null, '', href);
        }
      }}
    >
      {label}
    </a>
  ));
  return (
    <header ref={header} className={styles.header}>
      <nav className={styles.bar} aria-label="Main navigation">
        <div className={styles.links}>{sectionLinks}</div>
        <a
          href={homeUrl}
          className={styles.brand}
          aria-label="Nore Farms home"
          title="Back to home"
        >
          <BrandLogo inverse />
        </a>
        <div className={styles.actions}>
          <EnquiryLink className={styles.enquiry} />
          <button
            ref={toggle}
            className={styles.toggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <span className={open ? styles.cross : ''} />
          </button>
        </div>
      </nav>
      <div id="mobile-navigation" className={styles.mobile} hidden={!open}>
        <nav aria-label="Mobile navigation">{sectionLinks}</nav>
      </div>
    </header>
  );
}
