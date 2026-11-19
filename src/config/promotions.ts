// Edit the sample copy here once Nore Farms approves its offer and plan terms.
// Keep isSample enabled until the corresponding details are confirmed.
export const promotions = {
  announcement: {
    label: 'Offers & subscriptions',
    messages: [
      { title: '10% OFF YOUR FIRST ORDER', caption: 'Sample welcome offer' },
      { title: 'YOUR MILK. YOUR RHYTHM.', caption: 'Milk subscriptions' },
      { title: 'MILK. PANEER. GHEE.', caption: 'Your everyday favourites' },
    ],
  },
  offer: {
    isSample: true,
    eyebrow: 'A LITTLE WELCOME',
    heading: '10% off your first order.',
    description:
      'Meet your everyday favourites. Start with milk, paneer or ghee, and ask us about a little something for your first order.',
    terms:
      'Discount, eligible products, delivery areas and validity dates will be confirmed before launch.',
    enquiryLabel: 'Ask about this offer',
    enquirySubject: 'introductory offers on milk, paneer and ghee',
  },
  subscription: {
    isSample: true,
    eyebrow: 'MILK, ON YOUR TERMS',
    heading: 'Your milk. Your rhythm.',
    description:
      'A small daily ritual, planned around your home. Choose a delivery preference and speak to our team about your milk plan.',
    terms:
      'Prices, pack sizes, delivery schedules and plan terms will be confirmed before you subscribe.',
    enquiryLabel: 'Enquire about a milk plan',
    deliveryOptions: [
      {
        id: 'daily',
        label: 'Daily',
        hint: 'Ask about a regular milk delivery for your morning routine.',
      },
      {
        id: 'alternate',
        label: 'Alternate days',
        hint: 'Ask about delivery every other day, based on your household needs.',
      },
      {
        id: 'weekly',
        label: 'Weekly',
        hint: 'Ask about a weekly delivery and the pack sizes available in your area.',
      },
    ],
  },
};
