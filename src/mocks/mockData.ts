import {
  OrdersItem,
  Product,
  OrdersItemAdmin,
  User,
} from '@/components/common/CustomeTypes';

const product1: Product = {
  id: 2,
  name: '苹果',
  priceToken: 5,
  priceMoney: 10,
  category: '',
  description: 'yummy',
  stock: 1,
  images:
    'https://ourshop-tw.netlify.app/assets/product1.04d88779.png,fake.jpeg',
  imageFiles: [],
  logisticMethod: 'office;address',
  logisticMethodComment: 'mock comment',
  isDeleted: false,
  deletedTime: null,
};

const product2: Product = {
  id: 1,
  name: '橘子',
  priceToken: 3,
  priceMoney: 9,
  category: '',
  description: '水果 🍊',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
  imageFiles: [],
  logisticMethod: 'office',
  logisticMethodComment: '',
  isDeleted: false,
  deletedTime: null,
};

const product3: Product = {
  id: 97,
  name: '手机',
  priceToken: 2,
  priceMoney: 899,
  category: '',
  description: '一部手机',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
  imageFiles: [],
  logisticMethod: 'address',
  logisticMethodComment: '',
  isDeleted: false,
  deletedTime: null,
};

export const tempProducts: Array<Product> = [product1, product2, product3];

const deletedProduct: Product = {
  id: 97,
  name: '4K显示器',
  priceToken: 500,
  priceMoney: 500,
  category: '',
  description: '一台显示器',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
  logisticMethod: 'address',
  logisticMethodComment: '',
  isDeleted: true,
  deletedTime: new Date('2022-10-01'),
};
export const deletedProducts: Array<Product> = [deletedProduct];

export const shoppingCartItems = [
  {
    product: product1,
    shoppingCartProductsId: 53,
    productNum: 5,
  },
  {
    product: product2,
    shoppingCartProductsId: 98,
    productNum: 5,
  },
  {
    product: product3,
    shoppingCartProductsId: 24,
    productNum: 1,
    logisticMethod: 'office',
  },
];

export const productCount = [2, 1, 3];

export const shoppingCartIds = [53, 98, 24];

export const productIds = [79, 1, 97];

export const logisticMethods = ['office', 'office', 'office'];

export const users: User[] = [
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
    telephoneNum: 123456,
  },
  {
    id: 3,
    name: 'Betty',
    sex: 'Female',
    age: 22,
    address: 'Pudong Road',
    office: 'Shanghai',
    token: 55,
    bankAccount: '456',
    avatar: 'avatar',
    telephoneNum: 456789,
  },
];

export const mockOrder = [
  {
    productId: 1,
    purchaseNum: 1,
    orderId: 1,
    address: 'wuhan',
    status: 'pending',
    vendorDate: new Date('1900-1-1'),
    userId: 1,
    purchaseDate: new Date('2022-10-01'),
    productName: '苹果',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Ann',
    telephoneNum: '123456',
  },
];

export const mockOrdersItems: OrdersItem[] = [
  {
    productId: 1,
    purchaseNum: 1,
    orderId: 1,
    address: 'wuhan',
    status: 'pending',
    vendorDate: new Date('1900-1-1'),
    userId: 1,
    purchaseDate: new Date('2022-10-01'),
    productName: '苹果',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Ann',
    telephoneNum: '123456',
  },
  {
    productId: 2,
    purchaseNum: 1,
    orderId: 2,
    address: 'wuhan',
    status: 'finished',
    vendorDate: new Date('2022-10-12'),
    userId: 2,
    purchaseDate: new Date('2022-10-02'),
    productName: '橘子',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Bobby',
    telephoneNum: '123789',
  },
];

export const mockUpdatedOrdersItems: OrdersItem[] = [
  {
    productId: 1,
    purchaseNum: 1,
    orderId: 1,
    address: 'wuhan',
    status: 'finished',
    vendorDate: new Date('2022-10-13'),
    userId: 1,
    purchaseDate: new Date('2022-10-01'),
    productName: '苹果',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Ann',
    telephoneNum: '123456',
  },
  {
    productId: 2,
    purchaseNum: 1,
    orderId: 2,
    address: 'wuhan',
    status: 'finished',
    vendorDate: new Date('2022-10-12'),
    userId: 2,
    purchaseDate: new Date('2022-10-02'),
    productName: '橘子',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Bobby',
    telephoneNum: '123789',
  },
];

export const mockOrderItemAdminPending: OrdersItemAdmin[] = [
  {
    productId: 1,
    productName: '苹果',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    productNumAll: 1,
    ordersList: [
      {
        orderId: 1,
        userId: 1,
        vendorDate: new Date('1900-01-01'),
        address: 'wuhan',
        purchaseDate: new Date('2022-10-01'),
        status: 'pending',
        purchaseNum: 1,
        username: 'Ann',
        telephoneNum: '123456',
      },
    ],
  },
];

export const mockOrderItemAdminFinished: OrdersItemAdmin[] = [
  {
    productId: 2,
    productName: '橘子',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    productNumAll: 1,
    ordersList: [
      {
        orderId: 2,
        userId: 2,
        vendorDate: new Date('2022-10-13'),
        address: 'wuhan',
        purchaseDate: new Date('2022-10-02'),
        status: 'finished',
        purchaseNum: 1,
        username: 'Bobby',
        telephoneNum: '123789',
      },
    ],
  },
];

export const mockOrderItemAdmin: OrdersItemAdmin[] = [
  mockOrderItemAdminPending[0],
  mockOrderItemAdminFinished[0],
];
