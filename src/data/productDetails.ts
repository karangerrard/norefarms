export interface NutritionRow {
  nutrient: string;
  amount: string;
  rda: string;
}

export interface ProductDetails {
  subtitle: string;
  introduction: string;
  pack?: string;
  ingredients?: string;
  allergen?: string;
  storage?: string;
  story: string;
  nutrition?: NutritionRow[];
}

export const productDetails: Record<string, ProductDetails> = {
  milk: {
    subtitle: 'A drop of care.',
    introduction:
      'Single-source, pasteurised cow’s milk. For the first cup of tea, familiar recipes and the everyday moments that bring us together.',
    pack: '1 litre',
    ingredients: 'Pasteurised cow’s milk.',
    allergen: 'Contains milk.',
    storage:
      'Store below 4°C. Refer to the bottle stamp for the batch number, date of manufacture and use-by date.',
    story:
      'Our story begins at a single farm, where cows thrive on nourishing feed in clean, caring surroundings. Collected untouched by hands, our milk retains its full natural richness. Just honest milk, from our farm to your home.',
    nutrition: [
      { nutrient: 'Energy', amount: '63 kcal', rda: '7.90%' },
      { nutrient: 'Protein', amount: '3.2 g', rda: '16.00%' },
      { nutrient: 'Carbohydrates', amount: '4.8 g', rda: '—' },
      { nutrient: 'Total sugar', amount: '4.8 g', rda: '—' },
      { nutrient: 'Added sugar', amount: '0 g', rda: '—' },
      { nutrient: 'Total fat', amount: '3.5 g', rda: '13.01%' },
      { nutrient: 'Saturated fat', amount: '2.2 g', rda: '25.00%' },
      { nutrient: 'Trans fat', amount: '0.1 g', rda: '12.50%' },
      { nutrient: 'Sodium', amount: '45 mg', rda: '5.70%' },
      { nutrient: 'Calcium', amount: '120 mg', rda: '30.00%' },
      { nutrient: 'Vitamin A', amount: '40 µg', rda: '11.90%' },
    ],
  },
  paneer: {
    subtitle: 'Made for the family table.',
    introduction:
      'A familiar ingredient for comforting favourites, shared meals and recipes you make your own.',
    story:
      'Discover paneer in the Nore Farms range. Ask our team about available packs and product information.',
  },
  ghee: {
    subtitle: 'The little finishing touch.',
    introduction:
      'For familiar flavours, favourite recipes and the food you love coming home to.',
    story:
      'Discover ghee in the Nore Farms range. Ask our team about available packs and product information.',
  },
};
