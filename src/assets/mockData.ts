import { Product } from '@/components/common/CustomeTypes';

const tempProducts: Array<Product> = [
  {id: '1', name: 'Product1', token: 5, usd: 0, description: '', images: [], sku: 2},
  {id: '2', name: 'Product2', token: 3, usd: 0, description: '', images: [], sku: 3},
  {id: '3', name: 'Product3', token: 2, usd: 0, description: '', images: [], sku: 5},
];

const count = [2, 1, 3];

export const getProducts = () => tempProducts;
export const getProductCount = () => count;
