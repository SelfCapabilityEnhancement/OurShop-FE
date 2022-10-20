export interface uploadProduct {
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
  shoppingCartProductsId: number;
  productNum: number;
}
