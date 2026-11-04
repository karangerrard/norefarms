import { Arrow } from '../Arrow';
import { Reveal } from './Reveal';
import styles from './Sections.module.css';
import { BrandLogo } from '../BrandLogo';

export function AboutSection() {
  return (
    <section
      id="about"
      className={`${styles.section} ${styles.about}`}
      aria-labelledby="about-heading"
      tabIndex={-1}
    >
      <Reveal className={styles.aboutGrid}>
        <div className={styles.aboutCopy}>
          <div style={{ marginBottom: 24 }}>
            <BrandLogo compact />
          </div>
          <p className={styles.eyebrow}>ABOUT NORE FARMS / OUR VALUES</p>
          <h2 id="about-heading" className={styles.valuesHeading}>
            EVERYDAY.
            <br />
            THOUGHTFUL.
            <br />
            TOGETHER.
          </h2>
          <p className={styles.story}>
            Good food has a place in the smallest moments. The first cup of tea. A
            favourite family recipe. A meal shared at the end of the day.
          </p>
          <p className={styles.story}>
            Nore Farms brings milk, paneer and ghee together in a focused range for
            everyday kitchens. We believe these familiar rituals deserve thought and care.
          </p>
          <a href="#contact" className={styles.textLink}>
            Get to know us <Arrow />
          </a>
        </div>
        <figure className={styles.aboutFigure}>
          <img
            src={`${import.meta.env.BASE_URL}images/farm-illustration.webp`}
            alt="Illustrative sunlit pasture with cows, trees and distant hills"
            width="355"
            height="344"
            loading="lazy"
          />
          <figcaption>Illustrative farm scene.</figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
