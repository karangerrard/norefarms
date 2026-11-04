import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Arrow } from './Arrow';
import { EnquiryLink } from './EnquiryLink';
import styles from './Hero.module.css';
import { productUrl } from '../lib/navigation';

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

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [motionPaused] = useState(false);
  const hasMotion = !reducedMotion && !motionPaused;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>
          NORE FARMS <span aria-hidden="true">/</span> EVERYDAY DAIRY
        </p>
        <h1 id="hero-heading" className={styles.heading}>
          Good mornings.
          <br />
          <span>Start here.</span>
        </h1>
        <p className={styles.description}>
          A familiar ritual. A little more care.
          <br className={styles.mobileBreak} /> Milk from Nore Farms.
        </p>
      </div>

      <div className={styles.productStage}>
        <div className={styles.goldDisc} aria-hidden="true" />
        <div className={styles.orbit} aria-hidden="true" />
        <Sparkle className={styles.sparkleLeft} />
        <Sparkle className={styles.sparkleRight} />

        <div className={styles.sideNote}>
          <span className={styles.noteNumber}>01 / THE COLLECTION</span>
          <span>For the everyday.</span>
          <span>And the moments between.</span>
          <span className={styles.noteRule} aria-hidden="true" />
        </div>

        <motion.div
          className={styles.productEntrance}
          initial={reducedMotion ? false : { opacity: 0, y: 36, rotate: -4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`${styles.productFloat} ${hasMotion ? styles.isMoving : ''}`}>
            {/* Show the left bottle without altering the original photograph or label. */}
            <div className={styles.productCrop}>
              <img
                className={styles.productImage}
                src={`${import.meta.env.BASE_URL}images/nore-milk-original.jpeg`}
                alt="Nore Farms cow milk bottle with a white cap and gold-accented label"
                width="1168"
                height="1347"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>

        <div className={styles.productNote}>
          <span className={styles.noteLabel}>MEET YOUR MORNING</span>
          <span className={styles.productName}>Cow milk.</span>
          <span className={styles.noteDetail}>Simple. Familiar. Everyday.</span>
          <Arrow />
        </div>
      </div>

      <div className={styles.actions}>
        <EnquiryLink product="cow milk" className={styles.primaryButton} />
        <a className={styles.secondaryButton} href={productUrl('cow-milk')}>
          Meet our milk <Arrow direction="right" />
        </a>
      </div>

      <div id="milk-details" className={styles.productDetails}>
        <span>MILK, BY NORE FARMS.</span>
        <p>Ask us about pack sizes, availability and delivery in your area.</p>
      </div>

      <div className={styles.bottomLine}>
        <span>A LITTLE CARE. EVERY DAY.</span>
        <span>
          Milk <i aria-hidden="true">·</i> Paneer <i aria-hidden="true">·</i> Ghee
        </span>
      </div>
    </section>
  );
}
