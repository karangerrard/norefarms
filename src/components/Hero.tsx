import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { EnquiryLink } from './EnquiryLink';
import { productUrl } from '../lib/navigation';
import { products } from '../data/products';
import { heroSlides } from '../data/heroSlides';
import styles from './Hero.module.css';

// A full seven-second interval starts when the next slide has settled.
const READING_TIME_MS = 7000;
const SLIDE_DURATION_SECONDS = 0.95;
const slideEase = [0.4, 0, 0.2, 1] as const;
const heroFrames = [
  { index: heroSlides.length - 1, key: 'loop-start' },
  ...heroSlides.map((slide, index) => ({ index, key: slide.productId })),
  { index: 0, key: 'loop-end' },
];
const productDepth = {
  rest: { scale: 1, y: 0, z: 0 },
  hover: { scale: 1.14, y: -8, z: 20 },
  press: { scale: 1.12, y: -4, z: 14 },
};

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
  instanceId: string;
  isActive: boolean;
  noMotion: boolean;
}

function HeroPanel({ index, instanceId, isActive, noMotion }: HeroPanelProps) {
  const slide = heroSlides[index];
  const product = products.find((item) => item.id === slide.productId)!;

  return (
    <div
      className={`${styles.slide} ${styles[product.id] ?? ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${heroSlides.length}: ${product.name}`}
      aria-hidden={!isActive}
      inert={!isActive}
      data-hero-panel
    >
      <div className={styles.slideInner}>
        <div className={styles.introduction}>
          <p className={styles.eyebrow}>
            NORE FARMS <span aria-hidden="true">/</span> {slide.eyebrow}
          </p>
          <h2 className={styles.heading}>
            {slide.headline[0]}
            <br />
            <span>{slide.headline[1]}</span>
          </h2>
          <p className={styles.description}>{slide.description}</p>
        </div>

        <div className={styles.productStage}>
          <img
            className={styles.cowWatermark}
            src={`${import.meta.env.BASE_URL}brand/nore-milk-label-watermark.svg`}
            alt=""
            aria-hidden="true"
            width="275"
            height="211"
          />
          <div className={styles.backdrop} aria-hidden="true" />
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
            <NaturalBadge id={instanceId} />
          )}
          <CollectionSeal id={instanceId} />
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
            <motion.div
              className={styles.productInteraction}
              initial={false}
              animate="rest"
              variants={productDepth}
              whileHover={noMotion ? undefined : 'hover'}
              whileTap={noMotion ? undefined : 'press'}
              tabIndex={-1}
              style={{ transformPerspective: 900 }}
              transition={
                noMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 260, damping: 25, mass: 0.7 }
              }
            >
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
                    draggable={false}
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
                  draggable={false}
                />
              )}
            </motion.div>
          </div>

          <div className={styles.productNote}>
            <span className={styles.noteLabel}>THE EVERYDAY EDIT</span>
            <span className={styles.highlightValue}>{slide.highlight.value}</span>
            <span className={styles.highlightLabel}>{slide.highlight.label}</span>
            <span className={styles.productName}>{product.name}.</span>
          </div>
        </div>

        <div className={styles.actions}>
          <a className={styles.primaryButton} href={productUrl(product.slug)}>
            View Product
          </a>
          <EnquiryLink product={product.name} className={styles.secondaryButton} />
        </div>
        <ul className={styles.productTags} aria-label={`${product.name} at a glance`}>
          {slide.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(1);
  const [instantJump, setInstantJump] = useState(false);
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
      image.decoding = 'async';
      image.src = `${import.meta.env.BASE_URL}images/${product.image}`;
      void image.decode().catch(() => {
        // Keep the original image element's normal loading fallback on decode failure.
      });
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
      setInstantJump(false);
      setTransitioning(true);
      setPosition((value) => value + 1);
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
    const direction =
      Math.abs(delta) === heroSlides.length - 1 ? -Math.sign(delta) : Math.sign(delta);
    const target =
      active === heroSlides.length - 1 && next === 0 && direction > 0
        ? heroSlides.length + 1
        : active === 0 && next === heroSlides.length - 1 && direction < 0
          ? 0
          : next + 1;
    setInstantJump(noMotion);
    transitionLock.current = !noMotion;
    setTransitioning(!noMotion);
    setPosition(noMotion ? next + 1 : target);
    setActive(next);
    const product = products.find((item) => item.id === heroSlides[next].productId)!;
    setAnnouncement(
      `Showing ${product.name}. Slide ${next + 1} of ${heroSlides.length}.`,
    );
  }

  function onSettled() {
    if (!transitionLock.current) return;
    // Matching end frames keep the loop moving in the same direction. The reset
    // is instantaneous between identical views, with unique SVG IDs per frame.
    if (position === 0 || position === heroFrames.length - 1) {
      setInstantJump(true);
      setPosition(active + 1);
    }
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
      <div className={styles.viewport}>
        <motion.div
          className={styles.slideTrack}
          initial={false}
          animate={{ x: `${position * -100}%` }}
          transition={{
            duration: noMotion || instantJump ? 0 : SLIDE_DURATION_SECONDS,
            ease: slideEase,
          }}
          onAnimationComplete={onSettled}
        >
          {heroFrames.map((frame, framePosition) => (
            <HeroPanel
              key={frame.key}
              index={frame.index}
              instanceId={`hero-${frame.key}`}
              isActive={framePosition === position}
              noMotion={noMotion}
            />
          ))}
        </motion.div>
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
        <div className={styles.selectors} role="group" aria-label="Choose a product">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.productId}
              type="button"
              aria-pressed={active === index}
              aria-label={`Show ${products.find((product) => product.id === slide.productId)!.name}, slide ${index + 1} of ${heroSlides.length}`}
              onClick={() => goTo(index)}
            >
              <span className={styles.readingProgress} aria-hidden="true">
                {active === index && isPlaying && (
                  <motion.span
                    key={active}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: READING_TIME_MS / 1000, ease: 'linear' }}
                  />
                )}
                {active === index && noMotion && <span />}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}
