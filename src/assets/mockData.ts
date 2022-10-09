import { Product } from '@/components/common/CustomeTypes';

const tempProducts: Array<Product> = [
  {name: 'Product1', token: 5, usd: 0, description: ''},
  {name: 'Product2', token: 3, usd: 0, description: ''},
  {name: 'Product3', token: 2, usd: 0, description: ''},
];

const count = [2, 1, 3];

export const getProducts = () => tempProducts;
export const getProductCount = () => count;
