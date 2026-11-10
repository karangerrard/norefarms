import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Arrow } from './Arrow';
import { EnquiryLink } from './EnquiryLink';
import { productUrl } from '../lib/navigation';
import { products } from '../data/products';
import { heroSlides } from '../data/heroSlides';
import styles from './Hero.module.css';

// A full seven-second interval starts when the next slide has settled.
const READING_TIME_MS = 7000;
const COPY_TRANSITION_SECONDS = 0.55;
const ease = [0.22, 1, 0.36, 1] as const;

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 0C28 17 31 20 48 24 31 28 28 31 24 48 20 31 17 28 0 24 17 20 20 17 24 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NaturalBadge({ id }: { id: string }) {
  const inkFilter = `natural-stamp-ink-${id}`;

  return (
    <svg
      className={`${styles.heroBadge} ${styles.naturalBadge}`}
      viewBox="0 0 348 348"
      role="img"
      aria-label="100% natural ingredients"
    >
      <defs>
        <filter
          id={inkFilter}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Only the green ink contributes opacity; the neutral checkerboard drops out. */}
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 4 -4 0 -0.025"
            result="inkMask"
          />
          <feFlood
            floodColor="color-mix(in srgb, var(--gold) 42%, var(--charcoal))"
            result="brandInk"
          />
          <feComposite in="brandInk" in2="inkMask" operator="in" />
        </filter>
      </defs>
      <image
        href={`${import.meta.env.BASE_URL}brand/all-natural-stamp.png`}
        width="348"
        height="348"
        filter={`url(#${inkFilter})`}
      />
    </svg>
  );
}

function CollectionSeal({ id }: { id: string }) {
  return (
    <svg className={styles.seal} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id={`seal-${id}`} d="M60 18a42 42 0 1 1-.01 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--off-white)" stroke="var(--gold)" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="var(--gold)" strokeWidth=".7" />
      <text fill="var(--charcoal)" fontSize="8.5" letterSpacing="2.5">
        <textPath href={`#seal-${id}`} textLength="260">
          NORE FARMS · GOOD MORNINGS·{' '}
        </textPath>
      </text>
      <path
        d="M60 40C64 54 66 56 80 60 66 64 64 66 60 80 56 66 54 64 40 60 54 56 56 54 60 40Z"
        fill="var(--gold)"
      />
    </svg>
  );
}

interface HeroPanelProps {
  index: number;
  direction: number;
  noMotion: boolean;
  onSettled: () => void;
}

function HeroPanel({ index, direction, noMotion, onSettled }: HeroPanelProps) {
  const slide = heroSlides[index];
  const product = products.find((item) => item.id === slide.productId)!;

  return (
    <div
      className={`${styles.slide} ${styles[product.id] ?? ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${heroSlides.length}: ${product.name}`}
      aria-hidden="false"
      data-hero-panel
    >
      <div className={styles.slideInner}>
        <motion.div
          className={styles.introduction}
          initial={noMotion ? false : { x: direction * 18, opacity: 0.45 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: noMotion ? 0 : COPY_TRANSITION_SECONDS, ease }}
          onAnimationComplete={onSettled}
        >
          <p className={styles.eyebrow}>
            NORE FARMS <span aria-hidden="true">/</span> {slide.eyebrow}
          </p>
          <h2 className={styles.heading}>
            {slide.headline[0]}
            <br />
            <span>{slide.headline[1]}</span>
          </h2>
          <p className={styles.description}>{slide.description}</p>
        </motion.div>

        <div className={styles.productStage}>
          <img
            className={styles.cowWatermark}
            src={`${import.meta.env.BASE_URL}brand/nore-milk-label-watermark.svg`}
            alt=""
            aria-hidden="true"
            width="275"
            height="211"
          />
          <motion.div
            className={styles.backdrop}
            aria-hidden="true"
            initial={noMotion ? false : { rotate: -18, scale: 0.96 }}
            animate={{ rotate: product.id === 'paneer' ? 10 : -10, scale: 1 }}
            transition={{ duration: noMotion ? 0 : 1.15, ease }}
          />
          <div className={styles.orbit} aria-hidden="true" />
          {product.isMilk ? (
            <img
              className={`${styles.heroBadge} ${styles.milkBadge}`}
              src={`${import.meta.env.BASE_URL}brand/fresh-milk-badge.svg`}
              alt="Fresh milk, single source"
              width="200"
              height="200"
            />
          ) : (
            <NaturalBadge id={product.id} />
          )}
          <CollectionSeal id={product.id} />
          <Sparkle className={styles.sparkleLeft} />
          <Sparkle className={styles.sparkleRight} />

          <div className={styles.sideNote}>
            <span className={styles.noteLabel}>0{index + 1} / EVERYDAY MOMENTS</span>
            <p>{slide.note}</p>
            <span className={styles.noteRule} aria-hidden="true" />
            <span className={styles.pairingLabel}>AT YOUR TABLE</span>
            <ul className={styles.pairings}>
              {slide.pairings.map((pairing) => (
                <li key={pairing}>{pairing}</li>
              ))}
            </ul>
          </div>

          {/* The product never shares a transform or opacity animation with the décor. */}
          <div className={styles.productImageLayer}>
            {product.isMilk ? (
              <div
                className={styles.milkCrop}
                style={{
                  maskImage: `url("${import.meta.env.BASE_URL}brand/milk-silhouette.svg")`,
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/${product.image}`}
                  alt={product.imageAlt}
                  width="1168"
                  height="1347"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            ) : (
              <img
                className={styles.packImage}
                src={`${import.meta.env.BASE_URL}images/${product.image}`}
                alt={product.imageAlt}
                width="1024"
                height="1536"
                decoding="async"
              />
            )}
          </div>

          <div className={styles.productNote}>
            <span className={styles.noteLabel}>THE EVERYDAY EDIT</span>
            <span className={styles.highlightValue}>{slide.highlight.value}</span>
            <span className={styles.highlightLabel}>{slide.highlight.label}</span>
            <span className={styles.productName}>{product.name}.</span>
            {product.illustrative && (
              <span className={styles.packagingNote}>Illustrative packaging</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <a className={styles.primaryButton} href={productUrl(product.slug)}>
            Explore {product.name.toLowerCase()} <Arrow />
          </a>
          <EnquiryLink product={product.name} className={styles.secondaryButton} />
        </div>
        <ul className={styles.productTags} aria-label={`${product.name} at a glance`}>
          {slide.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {product.illustrative && (
          <p className={styles.mobilePackNote}>Illustrative packaging</p>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [slideKeyboardFocus, setSlideKeyboardFocus] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(
    document.visibilityState === 'visible',
  );
  const [announcement, setAnnouncement] = useState('');
  const reducedMotion = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.35 });
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const transitionLock = useRef(false);
  const navigation = useRef<HTMLDivElement>(null);
  const noMotion = Boolean(reducedMotion);
  const interrupted = !inView || !documentVisible || slideKeyboardFocus;
  const isPlaying = !noMotion && !interrupted && !transitioning;

  useEffect(() => {
    const onVisibilityChange = () =>
      setDocumentVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    // Preload local pack shots so the next product is ready before its first reveal.
    const images = products.map((product) => {
      const image = new Image();
      image.src = `${import.meta.env.BASE_URL}images/${product.image}`;
      return image;
    });
    return () => {
      images.forEach((image) => {
        image.onload = null;
      });
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => {
      transitionLock.current = true;
      setDirection(1);
      setTransitioning(true);
      setActive((index) => (index + 1) % heroSlides.length);
    }, READING_TIME_MS);
    return () => window.clearTimeout(timer);
  }, [active, isPlaying]);

  function goTo(index: number) {
    if (transitionLock.current) return;
    const next = (index + heroSlides.length) % heroSlides.length;
    if (next === active) return;
    const panel = document.activeElement?.closest('[data-hero-panel]');
    if (panel) navigation.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const delta = next - active;
    setDirection(
      Math.abs(delta) === heroSlides.length - 1 ? -Math.sign(delta) : Math.sign(delta),
    );
    transitionLock.current = !noMotion;
    setTransitioning(!noMotion);
    setActive(next);
    const product = products.find((item) => item.id === heroSlides[next].productId)!;
    setAnnouncement(
      `Showing ${product.name}. Slide ${next + 1} of ${heroSlides.length}.`,
    );
  }

  function onSettled() {
    transitionLock.current = false;
    setTransitioning(false);
  }

  return (
    <section
      ref={hero}
      className={styles.hero}
      aria-label="The Nore Farms collection"
      aria-roledescription="carousel"
      onFocusCapture={(event) => {
        // Keep a keyboard user's focused link in place; mouse hover/clicks do not stop rotation.
        setSlideKeyboardFocus(
          Boolean(
            event.target.closest('[data-hero-panel]') &&
            event.target.matches(':focus-visible'),
          ),
        );
      }}
      onBlurCapture={(event) => {
        if (
          !(event.relatedTarget instanceof Element) ||
          !event.relatedTarget.closest('[data-hero-panel]')
        )
          setSlideKeyboardFocus(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
          goTo(active + (dx < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <h1 className="sr-only">Nore Farms. Dairy for the everyday.</h1>
      <div className={styles.progressIndicator} aria-hidden="true">
        <span>
          {String(active + 1).padStart(2, '0')} /{' '}
          {String(heroSlides.length).padStart(2, '0')}
        </span>
        <div className={styles.readingProgress}>
          {isPlaying && (
            <motion.span
              key={active}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: READING_TIME_MS / 1000, ease: 'linear' }}
            />
          )}
        </div>
      </div>
      <div className={styles.viewport}>
        <HeroPanel
          key={active}
          index={active}
          direction={direction}
          noMotion={noMotion}
          onSettled={onSettled}
        />
      </div>

      <div
        ref={navigation}
        className={styles.navigation}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(active + 1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(active - 1);
          }
          if (event.key === 'Home') {
            event.preventDefault();
            goTo(0);
          }
          if (event.key === 'End') {
            event.preventDefault();
            goTo(heroSlides.length - 1);
          }
        }}
      >
        <div className={styles.controls}>
          <button
            className={styles.arrowButton}
            onClick={() => goTo(active - 1)}
            aria-label="Previous product"
          >
            <Arrow direction="left" />
          </button>
          <div className={styles.selectors} role="group" aria-label="Choose a product">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.productId}
                aria-pressed={active === index}
                onClick={() => goTo(index)}
              >
                <span className={styles.dot} aria-hidden="true" />
                {products.find((product) => product.id === slide.productId)!.name}
              </button>
            ))}
          </div>
          <button
            className={styles.arrowButton}
            onClick={() => goTo(active + 1)}
            aria-label="Next product"
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}
