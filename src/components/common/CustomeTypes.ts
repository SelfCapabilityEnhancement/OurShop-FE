export interface Product {
  id: number;
  name: string;
  priceToken: number;
  priceMoney: number;
  stock: number;
  description: string;
  images: File[];
}
