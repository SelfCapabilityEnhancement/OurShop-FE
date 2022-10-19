import { Product } from '@/components/common/CustomeTypes';

export const tempProducts: Array<Product> = [
  {
    id: 1,
    name: 'Product1',
    priceToken: 5,
    priceMoney: 0,
    description: 'yummy',
    images: 'path1,path2',
    stock: 2,
  },
  {
    id: 2,
    name: 'Product2',
    priceToken: 3,
    priceMoney: 0,
    description: '',
    images: 'path3',
    stock: 3,
  },
  {
    id: 3,
    name: 'Product3',
    priceToken: 2,
    priceMoney: 0,
    description: '',
    images: 'path4',
    stock: 5,
  },
];

const count = [2, 1, 3];

export const shoppingCartItems = [
  {
    product: {
      id: 79,
      name: '橘子',
      priceToken: 99,
      priceMoney: 9,
      description: '水果 🍊',
      stock: 1,
      images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
    },
    shoppingCartProductsId: 53,
    productNum: 5,
  },
  {
    product: {
      id: 1,
      name: '西瓜',
      priceToken: 87,
      priceMoney: 7,
      description: '水果 🍉',
      stock: 1,
      images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
    },
    shoppingCartProductsId: 98,
    productNum: 5,
  },
  {
    product: {
      id: 97,
      name: '手机',
      priceToken: 9999,
      priceMoney: 899,
      description: '一部手机',
      stock: 1,
      images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
    },
    shoppingCartProductsId: 24,
    productNum: 1,
  },
];

export const users = [
  {
    id: 2,
    name: 'Ann',
    sex: 'Female',
    age: 23,
    address: 'Guanshan Road',
    office: 'Wuhan',
    token: 23,
    bankAccount: '123',
    avatar: 'avatar',
  },
];

export const getProducts = () => tempProducts;
export const getProductCount = () => count;
