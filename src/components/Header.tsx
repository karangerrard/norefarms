import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { BrandLogo } from './BrandLogo';
import { SocialLinks } from './SocialLinks';
import { site } from '../config/site';
import { homeUrl, sectionUrl } from '../lib/navigation';
import styles from './Header.module.css';

const links = [
  { label: 'Products', id: 'products' },
  { label: 'Subscriptions', id: 'subscriptions' },
  { label: 'About us', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

function UserIcon() {
  return (
    <svg
      className={styles.userIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </svg>
  );
}

function ProductArrow() {
  return (
    <span className={styles.productArrow} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m9 5 7 7-7 7" />
      </svg>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const brand = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggle.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)');
    const resize = () => {
      if (media.matches && open) {
        closeMenu();
        brand.current?.focus({ preventScroll: true });
      }
    };

    function keydown(event: KeyboardEvent) {
      if (!open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        header.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    function outside(event: PointerEvent) {
      if (open && !header.current?.contains(event.target as Node)) closeMenu(true);
    }

    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', outside);
    media.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('pointerdown', outside);
      media.removeEventListener('change', resize);
    };
  }, [open, closeMenu]);

  useLayoutEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const body = document.body;
    const previous = {
      rootOverflow: root.style.overflow,
      rootOverscroll: root.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const backgrounds = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, a.skip'),
    ).map((element) => ({ element, inert: element.inert }));

    root.style.overflow = 'hidden';
    root.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const padding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    backgrounds.forEach(({ element }) => {
      element.inert = true;
    });

    const frame = window.requestAnimationFrame(() => {
      mobileMenu.current
        ?.querySelector<HTMLAnchorElement>('a[href]')
        ?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      root.style.overflow = previous.rootOverflow;
      root.style.overscrollBehavior = previous.rootOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      backgrounds.forEach(({ element, inert }) => {
        element.inert = inert;
      });
    };
  }, [open]);

  function navigateToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    closeMenu();
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    window.requestAnimationFrame(() => {
      section.focus({ preventScroll: true });
      section.scrollIntoView({ block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    });
  }

  return (
    <header ref={header} className={styles.header}>
      <div
        className={styles.shell}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? 'Nore Farms menu' : undefined}
      >
        {open && (
          <div
            className={styles.menuBackdrop}
            onClick={() => closeMenu(true)}
            aria-hidden="true"
          />
        )}

        <nav className={styles.bar} aria-label="Main navigation">
          <div className={styles.links}>
            {links.map((link) => (
              <a
                key={link.id}
                href={sectionUrl(link.id)}
                onClick={(event) => navigateToSection(event, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            ref={brand}
            href={homeUrl}
            className={styles.brand}
            aria-label="Nore Farms home"
            title="Back to home"
          >
            <BrandLogo inverse />
          </a>

          <div className={styles.actions}>
            <button type="button" className={styles.login}>
              <UserIcon />
              <span>Log in</span>
            </button>
            <button
              ref={toggle}
              type="button"
              className={styles.toggle}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path className={styles.topLine} d="M5 12h14" />
                <path className={styles.bottomLine} d="M5 12h14" />
              </svg>
            </button>
          </div>
        </nav>

        <div
          ref={mobileMenu}
          id="mobile-navigation"
          className={styles.mobile}
          hidden={!open}
        >
          <nav aria-label="Mobile navigation">
            <ul className={styles.mobileLinks}>
              <li>
                <a
                  className={styles.mobileLink}
                  href={homeUrl}
                  onClick={() => closeMenu()}
                >
                  Home
                </a>
              </li>
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    className={styles.mobileLink}
                    href={sectionUrl(link.id)}
                    onClick={(event) => navigateToSection(event, link.id)}
                  >
                    {link.label}
                    {link.id === 'products' && <ProductArrow />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileBottom}>
            <SocialLinks variant="text" />
            {site.socialLinks.some((link) => link.isSample) && (
              <p className={styles.socialNote}>Social profiles coming soon.</p>
            )}
            <div className={styles.mobileActions}>
              <a
                className={styles.productsAction}
                href={sectionUrl('products')}
                onClick={(event) => navigateToSection(event, 'products')}
              >
                View products
              </a>
              <a
                href={sectionUrl('subscriptions')}
                onClick={(event) => navigateToSection(event, 'subscriptions')}
              >
                Milk plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
