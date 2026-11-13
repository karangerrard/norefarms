const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

export const site = {
  name: 'Nore Farms',
  // Replace the sample number through VITE_WHATSAPP_NUMBER before launch.
  whatsappNumber: whatsappNumber || '910000000000',
  whatsappIsSample: !whatsappNumber,
  phone: '919418978555',
  email: 'nodelofficer@norefarms.com',
  serviceArea: '',
  businessHours: '',
  address: '',
  privacyUrl: '',
  socialLinks: [
    { label: 'Facebook', url: 'https://www.facebook.com/', isSample: true },
    { label: 'Instagram', url: 'https://www.instagram.com/', isSample: true },
  ] as { label: string; url: string; isSample?: boolean }[],
};
