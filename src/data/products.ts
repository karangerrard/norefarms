export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  isMilk?: boolean;
  illustrative?: boolean;
}

export const products: Product[] = [
  {
    id: 'milk',
    slug: 'cow-milk',
    name: 'Cow milk',
    description: 'For your morning tea, coffee and everyday recipes.',
    image: 'nore-milk-original.jpeg',
    imageAlt: 'Nore Farms cow milk bottle with a white cap and gold-accented label',
    isMilk: true,
  },
  {
    id: 'paneer',
    slug: 'paneer',
    name: 'Paneer',
    description: 'For comforting family favourites and everyday meals.',
    image: 'paneer.webp',
    imageAlt: 'Illustrative paneer packaging and paneer cubes',
    illustrative: true,
  },
  {
    id: 'ghee',
    slug: 'ghee',
    name: 'Ghee',
    description: 'A finishing touch for the food you love.',
    image: 'ghee.webp',
    imageAlt: 'Illustrative glass ghee jar with a gold lid',
    illustrative: true,
  },
];
