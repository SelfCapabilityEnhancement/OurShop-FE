export interface uploadProduct {
  id: number;
  name: string;
  priceToken: number;
  priceMoney: number;
  stock: number;
  description: string;
  images: File[];
}

export interface Product {
  id: number;
  name: string;
  priceToken: number;
  priceMoney: number;
  stock: number;
  description: string;
  images: String;
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
  shoppingCartProductsId: number;
  productNum: number;
}

export interface Orders {
  id: number;
  userId: number;
  orderProductsId: number;
  orderAddress: string;
  orderStatus: string;
  purchaseDate: Date;
}

export interface orderProducts {
  id: number;
  productId: number;
  purchaseNum: number;
}

export interface OrdersItem {
  product: Product;
  orders: Orders;
  orderProducts: orderProducts;
}
