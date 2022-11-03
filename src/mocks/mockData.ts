import {
  OrdersItem,
  Product,
  OrdersItemAdmin,
  BuyerInfo,
  Orders,
  User,
} from '@/components/common/CustomeTypes';

const product1: Product = {
  id: 2,
  name: '苹果',
  priceToken: 5,
  priceMoney: 10,
  description: 'yummy',
  stock: 1,
  images:
    'https://ourshop-tw.netlify.app/assets/product1.04d88779.png,fake.jpeg',
  logisticMethod: 'office;address',
  logisticMethodComment: 'mock comment',
};

const product2 = {
  id: 1,
  name: '橘子',
  priceToken: 3,
  priceMoney: 9,
  description: '水果 🍊',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
  logisticMethod: 'office',
  logisticMethodComment: '',
};

const product3 = {
  id: 97,
  name: '手机',
  priceToken: 2,
  priceMoney: 899,
  description: '一部手机',
  stock: 1,
  images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
  logisticMethod: 'address',
  logisticMethodComment: '',
};

export const tempProducts: Array<Product> = [product1, product2, product3];

const count = [2, 1, 3];

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
  },
];

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
  },
];

const orders1: Orders = {
  id: 1,
  userId: 1,
  orderProductsId: 1,
  orderAddress: 'wuhan',
  orderStatus: 'pending',
  purchaseDate: new Date('2022-10-01'),
  vendorDate: new Date(''),
  logisticMethod: 'office',
};

const orders2: Orders = {
  id: 2,
  userId: 2,
  orderProductsId: 2,
  orderAddress: 'Pudong road',
  orderStatus: 'finished',
  purchaseDate: new Date('2022-10-02'),
  vendorDate: new Date('2022-10-12'),
  logisticMethod: 'address',
};

const updatedOrders1: Orders = {
  id: 1,
  userId: 1,
  orderProductsId: 1,
  orderAddress: 'wuhan',
  orderStatus: 'finished',
  purchaseDate: new Date('2022-10-01'),
  vendorDate: new Date('2022-10-12'),
  logisticMethod: 'office',
};

export const mockOrder = [
  {
    product: product1,
    orders: orders1,
    orderProducts: {
      id: 3,
      productId: 2,
      purchaseNum: 1,
    },
  },
];

export const mockOrdersItems: OrdersItem[] = [
  {
    product: product1,
    orders: orders1,
    orderProducts: {
      id: 1,
      productId: 2,
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

export const mockUpdatedOrdersItems: OrdersItem[] = [
  {
    product: product1,
    orders: updatedOrders1,
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

export const mockBuyerInfos: BuyerInfo[] = [
  {
    user: users[0],
    orders: orders1,
    productNum: 2,
  },
  {
    user: users[1],
    orders: orders2,
    productNum: 3,
  },
];
