import {
  OrdersItem,
  Product,
  OrdersItemAdmin,
} from '@/components/common/CustomeTypes';

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

const date = new Date('2022-10-19 15:34:20');

export const mockOrder = [
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
    orders: {
      id: 1,
      userId: 12,
      orderProductsId: 3,
      orderAddress: 'order address',
      orderStatus: 'order status',
      purchaseDate: date,
    },
    orderProducts: {
      id: 3,
      productId: 79,
      purchaseNum: 1,
    },
  },
];

const product1 = {
  id: 2,
  name: '苹果',
  priceToken: 99,
  priceMoney: 9,
  description: '水果 🍊',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
};
const product2 = {
  id: 1,
  name: '橘子',
  priceToken: 99,
  priceMoney: 9,
  description: '水果 🍊',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
};
const orders1 = {
  id: 1,
  userId: 1,
  orderProductsId: 1,
  orderAddress: 'order address',
  orderStatus: 'finished',
  vendorDate: new Date('2002-10-10'),
  purchaseDate: new Date('2022-10-01'),
};
const orders2 = {
  id: 2,
  userId: 2,
  orderProductsId: 2,
  orderAddress: 'order address',
  orderStatus: 'finished',
  vendorDate: new Date('2002-10-11'),
  purchaseDate: new Date('2022-10-01'),
};
const orders3 = {
  id: 3,
  userId: 3,
  orderProductsId: 3,
  orderAddress: 'order address',
  orderStatus: 'pending',
  purchaseDate: new Date('2022-10-02'),
};
const orders4 = {
  id: 4,
  userId: 12,
  orderProductsId: 4,
  orderAddress: 'order address',
  orderStatus: 'pending',
  purchaseDate: new Date('2022-10-02'),
};
const orders5 = {
  id: 5,
  userId: 12,
  orderProductsId: 5,
  orderAddress: 'order address',
  orderStatus: 'pending',
  purchaseDate: new Date('2022-10-03'),
};
export const ordersItems: OrdersItem[] = [
  {
    product: product1,
    orders: orders1,
    orderProducts: {
      id: 1,
      productId: 1,
      purchaseNum: 1,
    },
  },
  {
    product: product2,
    orders: orders2,
    orderProducts: {
      id: 2,
      productId: 2,
      purchaseNum: 1,
    },
  },
  {
    product: product1,
    orders: orders3,
    orderProducts: {
      id: 3,
      productId: 1,
      purchaseNum: 1,
    },
  },
  {
    product: product2,
    orders: orders4,
    orderProducts: {
      id: 4,
      productId: 2,
      purchaseNum: 1,
    },
  },
  {
    product: product1,
    orders: orders5,
    orderProducts: {
      id: 5,
      productId: 1,
      purchaseNum: 1,
    },
  },
];

export const mockOrderItemAdmin: OrdersItemAdmin[] = [
  {
    product: product1,
    productNumAll: 11,
    ordersList: [orders1, orders3, orders5],
  },
];

export const mockOrderItemAdminPending: OrdersItemAdmin[] = [
  {
    product: product1,
    productNumAll: 2,
    ordersList: [orders3, orders5],
  },
];

export const mockOrderItemAdminFinished: OrdersItemAdmin[] = [
  {
    product: product1,
    productNumAll: 2,
    ordersList: [orders1],
  },
];

export const getProducts = () => tempProducts;
export const getProductCount = () => count;
