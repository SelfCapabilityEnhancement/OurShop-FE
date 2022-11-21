export interface Product {
  id: number;
  name: string;
  priceToken: number;
  priceMoney: number;
  stock: number;
  category: string;
  description: string;
  images: string;
  imageFiles: File[];
  logisticMethod: string;
  logisticMethodComment: string;
  isDeleted: boolean;
  deletedTime: string | null;
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
  telephoneNum: number;
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
  purchaseDate: string;
  vendorDate: string;
  logisticMethod: string;
}

export interface OrderProducts {
  id: number;
  productId: number;
  purchaseNum: number;
}

export interface BuyerInfo {
  user: User;
  orders: Orders;
  productNum: number;
}

export interface OrdersItem {
  productId: number;
  purchaseNum: number;
  orderId: number;
  address: string;
  status: string;
  vendorDate: string;
  userId: number;
  purchaseDate: string;
  productName: string;
  description: string;
  images: string;
  username: string;
  telephoneNum: string;
  logisticMethod: string;
}

export interface OrdersItemAdmin {
  productId: number;
  productName: string;
  description: string;
  images: string;
  productNumAll: number;
  ordersList: {
    orderId: number;
    userId: number;
    vendorDate: string;
    address: string;
    purchaseDate: string;
    status: string;
    purchaseNum: number;
    username: string;
    telephoneNum: string;
  }[];
}
