import { site } from '../config/site';
export function whatsappUrl(product?: string): string | undefined {
  if (!/^\d{8,15}$/.test(site.whatsappNumber)) return undefined;
  const message = product
    ? `Hello Nore Farms, I'd like to know more about your ${product} and its availability.`
    : "Hello Nore Farms, I'd like to enquire about your products and availability.";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
