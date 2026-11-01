import { whatsappUrl } from '../lib/whatsapp';
import { Arrow } from './Arrow';
export function EnquiryLink({
  product,
  className = '',
}: {
  product?: string;
  className?: string;
}) {
  const href = whatsappUrl(product);
  return href ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      WhatsApp us <Arrow />
    </a>
  ) : (
    <button
      className={className}
      disabled
      title="Add the confirmed WhatsApp number in .env.local to enable enquiries"
    >
      WhatsApp us <Arrow />
    </button>
  );
}
