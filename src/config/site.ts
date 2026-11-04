export const site = {
  name: 'Nore Farms',
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  phone: '919418978555',
  email: 'nodelofficer@norefarms.com',
  serviceArea: '',
  businessHours: '',
  address: '',
  privacyUrl: '',
  socialLinks: [] as { label: string; url: string }[],
};
