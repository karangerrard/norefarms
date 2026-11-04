import { MotionConfig } from 'motion/react';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';

import { ProductsSection } from './components/sections/ProductsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';

import { ProductPage } from './components/products/ProductPage';
import { products } from './data/products';

export default function App() {
  const slug = window.location.pathname.match(
    /\/products\/([^/]+)\/?$/
  )?.[1];

  const product = products.find((item) => item.slug === slug);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        {product ? (
          <ProductPage product={product} />
        ) : (
          <>
            <Hero />
            <ProductsSection />
            <AboutSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
    </MotionConfig>
  );
}