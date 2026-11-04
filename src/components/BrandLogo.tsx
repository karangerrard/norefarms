import styles from './BrandLogo.module.css';

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      className={`${styles.logo} ${compact ? styles.compact : ''}`}
      src={`${import.meta.env.BASE_URL}brand/nore-farms-logo.png`}
      alt="Nore Farms"
      width="900"
      height="467"
    />
  );
}
