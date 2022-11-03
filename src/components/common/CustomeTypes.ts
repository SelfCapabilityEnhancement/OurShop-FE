export interface UploadProduct {
  id: number;
  name: string;
  priceToken: number;
  priceMoney: number;
  stock: number;
  description: string;
  images: File[];
  logisticMethod: string;
  logisticMethodComment: string;
}

export interface Product {
  id: number;
  name: string;
  priceToken: number;
  priceMoney: number;
  stock: number;
  description: string;
  images: string;
  logisticMethod: string;
  logisticMethodComment: string;
}

export interface User {
  id: number;
  name: string;
  sex: string;
  age: number;
  address: string;
  office: string;
  token: number;
  bankAccount: string;
  avatar: string;
}

export interface ShoppingCartItem {
  product: Product;
  productNum: number;
  productId: number;
  shoppingCartId: number;
  logisticMethod: string;
}

export interface PurchaseConfirmationItem {
  productNum: number;
  productId: number;
  shoppingCartId: number;
  logisticMethod: string;
}

export interface Orders {
  id: number;
  userId: number;
  orderProductsId: number;
  orderAddress: string;
  orderStatus: string;
  purchaseDate: Date;
  vendorDate: Date;
  logisticMethod: string;
}

export interface OrderProducts {
  id: number;
  productId: number;
  purchaseNum: number;
}

export interface OrdersItem {
  product: Product;
  orders: Orders;
  orderProducts: OrderProducts;
}

export interface OrdersItemAdmin {
  product: Product;
  productNumAll: number;
  ordersList: Orders[];
}

export interface BuyerInfo {
  user: User;
  orders: Orders;
  productNum: number;
}
