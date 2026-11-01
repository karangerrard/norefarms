import { useEffect, useRef, useState } from 'react';
import { EnquiryLink } from './EnquiryLink';
import styles from './Header.module.css';
const links = ['Products', 'Our story', 'Contact'];
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
  const pendingLinks = links.map((label) => (
    <button
      key={label}
      disabled
      title="This section will be added in the next build stage"
    >
      {label}
    </button>
  ));
  return (
    <header ref={header} className={styles.header}>
      <nav className={styles.bar} aria-label="Main navigation">
        <div className={styles.links}>{pendingLinks}</div>
        <a href="#main" className={styles.brand} aria-label="Nore Farms home">
          NORE<span>F A R M S</span>
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
        <nav aria-label="Mobile navigation">
          {pendingLinks}
          <span>More of Nore Farms, coming soon.</span>
        </nav>
      </div>
    </header>
  );
}
