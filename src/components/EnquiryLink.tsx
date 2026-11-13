import { whatsappUrl } from '../lib/whatsapp';
import { site } from '../config/site';

interface EnquiryLinkProps {
  product?: string;
  className?: string;
  label?: string;
}

export function EnquiryLink({
  product,
  className = '',
  label = 'WhatsApp us',
}: EnquiryLinkProps) {
  const href = whatsappUrl(product);

  if (!href) {
    return (
      <button
        type="button"
        className={className}
        disabled
        title="WhatsApp enquiries will be available when we launch"
      >
        {label}
      </button>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={
        site.whatsappIsSample ? 'Preview link using a sample WhatsApp number' : undefined
      }
    >
      {label}
    </a>
  );
}
