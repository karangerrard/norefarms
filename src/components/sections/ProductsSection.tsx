import { products } from '../../data/products';
import { Reveal } from './Reveal';
import styles from './Sections.module.css';
import { productUrl } from '../../lib/navigation';

export function ProductsSection() {
  return (
    <section
      id="products"
      className={styles.section}
      aria-labelledby="products-heading"
      tabIndex={-1}
    >
      <Reveal>
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.eyebrow}>THE EVERYDAY COLLECTION</p>
            <h2 id="products-heading" className={styles.sectionHeading}>
              A small range.
              <br />A place in every kitchen.
            </h2>
          </div>
          <p className={styles.introCopy}>
            Milk, paneer and ghee. Everyday favourites for the way you cook, share and
            start your day.
          </p>
        </div>
      </Reveal>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <Reveal key={product.id} className={styles.cardReveal}>
            <article className={styles.productCard}>
              <a
                className={styles.imageStage}
                href={productUrl(product.slug)}
                aria-label={`View ${product.name} product details`}
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
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <img
                    className={styles.packImage}
                    src={`${import.meta.env.BASE_URL}images/${product.image}`}
                    alt={product.imageAlt}
                    width="1024"
                    height="1536"
                    loading="lazy"
                  />
                )}
                {product.illustrative && (
                  <span className={styles.imageLabel}>Illustrative packaging</span>
                )}
              </a>
              <div className={styles.cardCopy}>
                <h3>
                  <a href={productUrl(product.slug)}>{product.name}</a>
                </h3>
                <p>{product.description}</p>
                <a href={productUrl(product.slug)} className={styles.goldButton}>
                  View product
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className={styles.sectionNote}>
        Ask us about pack sizes, availability and delivery in your area.
      </p>
    </section>
  );
}
