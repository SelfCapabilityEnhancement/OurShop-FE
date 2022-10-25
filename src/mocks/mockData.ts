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
    logisticMethod: '',
    logisticMethodComment: '',
  },
  {
    id: 2,
    name: 'Product2',
    priceToken: 3,
    priceMoney: 0,
    description: '',
    images: 'path3',
    stock: 3,
    logisticMethod: '',
    logisticMethodComment: '',
  },
  {
    id: 3,
    name: 'Product3',
    priceToken: 2,
    priceMoney: 0,
    description: '',
    images: 'path4',
    stock: 5,
    logisticMethod: '',
    logisticMethodComment: '',
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
      logisticMethod: '',
      logisticMethodComment: '',
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
      logisticMethod: '',
      logisticMethodComment: '',
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
      logisticMethod: '',
      logisticMethodComment: '',
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
      logisticMethod: '',
      logisticMethodComment: '',
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
  logisticMethod: '',
  logisticMethodComment: '',
};
const product2 = {
  id: 1,
  name: '橘子',
  priceToken: 99,
  priceMoney: 9,
  description: '水果 🍊',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
  logisticMethod: '',
  logisticMethodComment: '',
};
const orders1 = {
  id: 1,
  userId: 1,
  orderProductsId: 1,
  orderAddress: 'order address',
  orderStatus: 'pending',
  vendorDate: new Date(''),
  purchaseDate: new Date('2022-10-01'),
};
const orders2 = {
  id: 2,
  userId: 2,
  orderProductsId: 2,
  orderAddress: 'order address',
  orderStatus: 'finished',
  vendorDate: new Date('2022-10-12'),
  purchaseDate: new Date('2022-10-02'),
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
];

export const mockOrderItemAdminPending: OrdersItemAdmin[] = [
  {
    product: product1,
    productNumAll: 1,
    ordersList: [orders1],
  },
];

export const mockOrderItemAdminFinished: OrdersItemAdmin[] = [
  {
    product: product2,
    productNumAll: 1,
    ordersList: [orders2],
  },
];

export const mockOrderItemAdmin: OrdersItemAdmin[] = [
  mockOrderItemAdminPending[0],
  mockOrderItemAdminFinished[0],
];

export const getProducts = () => tempProducts;
export const getProductCount = () => count;
