import styles from './BrandLogo.module.css';

export function BrandLogo({
  compact = false,
  inverse = false,
}: {
  compact?: boolean;
  inverse?: boolean;
}) {
  return (
    <img
      className={`${styles.logo} ${compact ? styles.compact : ''} ${inverse ? styles.inverse : ''}`}
      src={`${import.meta.env.BASE_URL}brand/nore-farms-logo.png`}
      alt="Nore Farms"
      width="900"
      height="467"
    />
  );
}
