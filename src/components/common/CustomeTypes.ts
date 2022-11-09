export interface UploadProduct {
  id: number;
  name: string;
  priceToken: number;
  priceMoney: number;
  stock: number;
  productCategory: string;
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
  productCategory: string;
  description: string;
  images: string;
  logisticMethod: string;
  logisticMethodComment: string;
  isDeleted: boolean;
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
  purchaseDate: Date;
  vendorDate: Date;
  logisticMethod: string;
}

export interface OrderProducts {
  id: number;
  productId: number;
  purchaseNum: number;
}

// export interface OrdersItem {
//   product: Product;
//   orders: Orders;
//   orderProducts: OrderProducts;
// }
//
// export interface OrdersItemAdmin {
//   product: Product;
//   productNumAll: number;
//   ordersList: Orders[];
// }

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
  vendorDate: Date;
  userId: number;
  purchaseDate: Date;
  productName: string;
  description: string;
  images: string;
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
    vendorDate: Date;
    address: string;
    purchaseDate: Date;
    status: string;
    purchaseNum: number;
  }[];
}
