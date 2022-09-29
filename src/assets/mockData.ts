import { Product } from '@/components/common/CustomeTypes';

const tempProducts: Array<Product> = [
  {name: 'Product1', token: 5, count: 2},
  {name: 'Product2', token: 3, count: 1},
  {name: 'Product3', token: 2, count: 3},
];

export const getProducts = () => tempProducts;
