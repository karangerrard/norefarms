import { useEffect } from 'react';
import type { Product } from '../../data/products';
import { products } from '../../data/products';
import { productDetails } from '../../data/productDetails';
import { homeUrl, productUrl, sectionUrl } from '../../lib/navigation';
import { BrandLogo } from '../BrandLogo';
import { Arrow } from '../Arrow';
import { EnquiryLink } from '../EnquiryLink';
import styles from './ProductPage.module.css';

export function ProductPage({ product }: { product: Product }) {
  const details = productDetails[product.id];
  const isMilk = Boolean(product.isMilk);

  useEffect(() => {
    document.title = `${product.name} | Nore Farms`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', details.introduction);
  }, [product.name, details.introduction]);

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href={homeUrl}>Home</a>
        <span aria-hidden="true">/</span>
        <a href={sectionUrl('products')}>Products</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className={styles.productHero} aria-labelledby="product-heading">
        <div className={styles.gallery}>
          <div className={styles.galleryBrand}>
            <BrandLogo compact />
          </div>
          <div className={styles.halo} aria-hidden="true" />
          {isMilk ? (
            <div className={styles.milkCrop}>
              <img
                src={`${import.meta.env.BASE_URL}images/${product.image}`}
                alt={product.imageAlt}
                width="1168"
                height="1347"
                fetchPriority="high"
              />
            </div>
          ) : (
            <img
              className={styles.packImage}
              src={`${import.meta.env.BASE_URL}images/${product.image}`}
              alt={product.imageAlt}
              width="1024"
              height="1536"
              fetchPriority="high"
            />
          )}
          <span className={styles.galleryCaption}>
            {product.illustrative
              ? 'Illustrative packaging · final pack image to follow'
              : 'NORE FARMS / COW MILK'}
          </span>
        </div>

        <div className={styles.summary}>
          <p className={styles.eyebrow}>THE NORE FARMS COLLECTION</p>
          <h1 id="product-heading">
            {product.name}
            <span>{details.subtitle}</span>
          </h1>
          <p className={styles.introduction}>{details.introduction}</p>
          <dl className={styles.quickFacts}>
            <div>
              <dt>Pack size</dt>
              <dd>{details.pack ?? 'Ask about available packs'}</dd>
            </div>
            <div>
              <dt>{isMilk ? 'Milk type' : 'Availability'}</dt>
              <dd>{isMilk ? 'Pasteurised cow’s milk' : 'Enquire with our team'}</dd>
            </div>
          </dl>
          <EnquiryLink
            product={product.name}
            className={styles.enquiry}
            label={`Enquire about ${product.name.toLowerCase()}`}
          />
          <p className={styles.enquiryNote}>
            Ask us about availability and delivery in your area.
          </p>
          {details.allergen && (
            <p className={styles.allergen}>
              <strong>Allergen information:</strong> {details.allergen}
            </p>
          )}
          {!isMilk && (
            <p className={styles.pending}>
              Ingredients, nutrition, allergens and storage details will be published once
              the product label is confirmed. Please ask our team before ordering.
            </p>
          )}
          <a className={styles.backLink} href={sectionUrl('products')}>
            Explore the range <Arrow direction="right" />
          </a>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Product information">
        <a href="#product-story">The product</a>
        <a href="#nutrition">Nutrition</a>
        <a href="#care">Storage & details</a>
      </nav>

      <section
        id="product-story"
        className={styles.story}
        aria-labelledby="story-heading"
      >
        <div>
          <p className={styles.eyebrow}>
            A LITTLE MORE ABOUT YOUR {product.name.toUpperCase()}
          </p>
          <h2 id="story-heading">
            Everyday essentials.
            <br />
            Thoughtfully shared.
          </h2>
        </div>
        <div>
          <p>{details.story}</p>
          {details.ingredients && (
            <div className={styles.ingredients}>
              <h3>Ingredients</h3>
              <p>{details.ingredients}</p>
            </div>
          )}
        </div>
      </section>

      <section
        id="nutrition"
        className={styles.nutrition}
        aria-labelledby="nutrition-heading"
      >
        <div>
          <p className={styles.eyebrow}>KNOW YOUR {product.name.toUpperCase()}</p>
          <h2 id="nutrition-heading">
            The details,
            <br />
            at a glance.
          </h2>
          {isMilk && (
            <p>
              Milk fat: 3.50%
              <br />
              Solids-not-fat (SNF): 8.3%
            </p>
          )}
          {isMilk && (
            <a
              className={styles.labelLink}
              href={`${import.meta.env.BASE_URL}documents/nore-cow-milk-label.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View milk label (PDF) <Arrow />
            </a>
          )}
        </div>
        {details.nutrition ? (
          <div className={styles.tableWrap}>
            <table>
              <caption>Nutritional information as declared on the milk label</caption>
              <thead>
                <tr>
                  <th scope="col">Nutrition facts</th>
                  <th scope="col">Per 100 ml</th>
                  <th scope="col">
                    RDA%<span>Per 250 ml</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {details.nutrition.map((row) => (
                  <tr key={row.nutrient}>
                    <th scope="row">{row.nutrient}</th>
                    <td>{row.amount}</td>
                    <td>{row.rda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.tableNote}>
              Approximate daily values are based on a 2,000-calorie diet. Your daily
              values depend on your calorie needs. Values and RDA percentages are
              reproduced from the supplied label; a dash indicates no value declared.
            </p>
          </div>
        ) : (
          <div className={styles.pendingPanel}>
            <h3>Product information coming soon.</h3>
            <p>
              The nutrition panel for {product.name.toLowerCase()} will be added after its
              label is confirmed.
            </p>
          </div>
        )}
      </section>

      <section id="care" className={styles.care} aria-labelledby="care-heading">
        <p className={styles.eyebrow}>GOOD TO KNOW</p>
        <h2 id="care-heading">Care for your {product.name.toLowerCase()}.</h2>
        <details open>
          <summary>Storage & shelf life</summary>
          <p>
            {details.storage ??
              'Confirmed storage and shelf-life instructions are not yet available. Please contact our team for the current product guidance.'}
          </p>
        </details>
        <details>
          <summary>Ingredients & allergens</summary>
          <p>
            {details.ingredients
              ? `Ingredients: ${details.ingredients} Allergen information: ${details.allergen}`
              : 'The ingredients and allergen declaration will be added when the product label is supplied.'}
          </p>
        </details>
        {isMilk && (
          <details>
            <summary>Processing & label information</summary>
            <p>
              Processed & packed by Lakshya Food (I) Ltd., VPO Kandlea (8 km Milestone
              from Jind), Kaithal Road, Jind, Haryana – 126102.
            </p>
            <p>FSSAI licence number printed on label: 10014064000469.</p>
            <p>
              Marketed & distributed by Lakshya Dairy & Milk Procurement LLP, Sector 10,
              First Floor, SCO-57, Jind, Haryana – 126102.
            </p>
          </details>
        )}
        <details>
          <summary>Availability & enquiries</summary>
          <p>
            Contact Nore Farms to confirm pack sizes, product availability and delivery
            for your location.
          </p>
          <a href={sectionUrl('contact')} className={styles.labelLink}>
            Contact Nore Farms <Arrow />
          </a>
        </details>
      </section>

      <section className={styles.related} aria-labelledby="related-heading">
        <p className={styles.eyebrow}>MORE FROM NORE FARMS</p>
        <h2 id="related-heading">Meet the rest of the range.</h2>
        <div>
          {products
            .filter((item) => item.id !== product.id)
            .map((item) => (
              <a key={item.id} href={productUrl(item.slug)}>
                <span>{item.name}</span>
                <Arrow direction="right" />
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
