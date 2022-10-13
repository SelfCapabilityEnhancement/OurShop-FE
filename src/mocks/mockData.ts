import { Product } from '@/components/common/CustomeTypes';

export const tempProducts: Array<Product> = [
  {
    id: 1,
    name: 'Product1',
    priceToken: 5,
    priceMoney: 0,
    description: 'yummy',
    images: [],
    stock: 2,
  },
  {
    id: 2,
    name: 'Product2',
    priceToken: 3,
    priceMoney: 0,
    description: '',
    images: [],
    stock: 3,
  },
  {
    id: 3,
    name: 'Product3',
    priceToken: 2,
    priceMoney: 0,
    description: '',
    images: [],
    stock: 5,
  },
];

const count = [2, 1, 3];

export const getProducts = () => tempProducts;
export const getProductCount = () => count;
