import {
  OrdersItem,
  Product,
  OrdersItemAdmin,
  User,
  Account,
  StoreItem,
  StoresError,
  Feature,
  Role,
} from '@/components/common/CustomTypes';

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
  officeStockList: [
    { officeId: 1, stock: 50 },
    { officeId: 2, stock: 60 },
  ],
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
  officeStockList: [
    { officeId: 3, stock: 40 },
    { officeId: 4, stock: 50 },
  ],
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
  officeStockList: [
    { officeId: 5, stock: 40 },
    { officeId: 6, stock: 50 },
  ],
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
  imageFiles: [],
  logisticMethod: 'address',
  logisticMethodComment: '',
  isDeleted: true,
  deletedTime: '2022-10-01 10:30:20',
  officeStockList: [
    { officeId: 5, stock: 40 },
    { officeId: 6, stock: 50 },
  ],
};

export const deletedProducts: Array<Product> = [deletedProduct];

export const shoppingCartItems = [
  {
    product: deletedProduct,
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
    realName: 'test',
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
    realName: 'test',
  },
];

export const accounts: Account[] = [
  {
    username: 'Tom',
    connection: 'username',
    role: 'Site Admin',
    createdTime: '2022-12-06 09:54:30',
  },
  {
    username: 'Bob',
    connection: 'username',
    role: 'Buyer',
    createdTime: '2022-12-07 06:52:37',
  },
];

export const mockStoreItems: StoreItem[] = [
  {
    id: 1670995827718,
    officeId: 1,
    officeName: 'Beijing',
    inventory: 10,
  },
  {
    id: 1670995827728,
    officeId: 2,
    officeName: 'Chengdu',
    inventory: 20,
  },
];

export const mockOrder = [
  {
    productId: 1,
    purchaseNum: 1,
    orderId: 1,
    address: 'wuhan',
    status: 'Pending',
    vendorDate: '1900-1-1',
    userId: 1,
    purchaseDate: '2022-10-01',
    productName: '苹果',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Ann',
    telephoneNum: '123456',
    logisticMethod: 'office',
  },
];

export const mockOrdersItems: OrdersItem[] = [
  {
    productId: 1,
    purchaseNum: 1,
    orderId: 1,
    address: 'wuhan',
    status: 'Pending',
    vendorDate: '1900-1-1',
    userId: 1,
    purchaseDate: '2022-10-01',
    productName: '苹果',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Ann',
    telephoneNum: '123456',
    logisticMethod: 'office',
  },
  {
    productId: 2,
    purchaseNum: 1,
    orderId: 2,
    address: 'wuhan',
    status: 'Finished',
    vendorDate: '2022-10-12',
    userId: 2,
    purchaseDate: '2022-10-02',
    productName: '橘子',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Bobby',
    telephoneNum: '123789',
    logisticMethod: 'office',
  },
];

export const mockUpdatedOrdersItems: OrdersItem[] = [
  {
    productId: 1,
    purchaseNum: 1,
    orderId: 1,
    address: 'wuhan',
    status: 'Finished',
    vendorDate: '2022-10-13',
    userId: 1,
    purchaseDate: '2022-10-01',
    productName: '苹果',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Ann',
    telephoneNum: '123456',
    logisticMethod: 'office',
  },
  {
    productId: 2,
    purchaseNum: 1,
    orderId: 2,
    address: 'wuhan',
    status: 'Finished',
    vendorDate: '2022-10-12',
    userId: 2,
    purchaseDate: '2022-10-02',
    productName: '橘子',
    description: 'yummy',
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
    username: 'Bobby',
    telephoneNum: '123789',
    logisticMethod: 'office',
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
        vendorDate: '1900-01-01',
        address: 'wuhan',
        purchaseDate: '2022-10-01',
        status: 'Pending',
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
        vendorDate: '2022-10-13',
        address: 'wuhan',
        purchaseDate: '2022-10-02',
        status: 'Finished',
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

export const mockStoresError: StoresError[] = [
  { '1671112015473': { office: true, inventory: true } },
  { '1671112019164': { office: false, inventory: false } },
];

const feature2 = {
  featureId: 2,
  featureName: 'Order Management',
  code: '/order/order-management',
  description: 'order',
  updateTime: '2022-12-07 06:53:32',
};
const feature1 = {
  featureId: 1,
  featureName: 'Product Management',
  code: '/product/product-management',
  description: 'product',
  updateTime: '2022-12-07 06:52:37',
};

export const features: Array<Feature> = [feature1, feature2];

const role1 = {
  roleId: 1,
  roleName: 'buyer',
  updateTime: '2022-12-08 06:52:37',
  featureNameList: ['Product Management', 'Order Management'],
  featureList: [
    {
      featureId: 1,
      featureName: 'Product Management',
      code: '/product/product-management',
      description: 'product',
      updateTime: '2022-12-07 06:52:37',
    },
    {
      featureId: 2,
      featureName: 'Order Management',
      code: '/order/order-management',
      description: 'order',
      updateTime: '2022-12-07 06:53:32',
    },
  ],
};
const role2 = {
  roleId: 2,
  roleName: 'buyer admin',
  updateTime: '2022-12-08 06:59:37',
  featureNameList: ['Product Management'],
  featureList: [
    {
      featureId: 1,
      featureName: 'Product Management',
      code: '/product/product-management',
      description: 'product',
      updateTime: '2022-12-07 06:55:37',
    },
  ],
};

export const roles: Array<Role> = [role1, role2];
