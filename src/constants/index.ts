import { Product } from '@/components/common/CustomeTypes';

export const imageUrlPrefix = `https://ourshopimages.blob.core.windows.net/images/`;
export const initProduct: Product = {
  id: 1,
  name: '',
  priceToken: 0,
  priceMoney: 0,
  category: '',
  description: '',
  stock: 1,
  images: '',
  imageFiles: [],
  logisticMethod: '',
  logisticMethodComment: '',
  isDeleted: false,
  deletedTime: null,
};

export const initValidateResult = {
  name: false,
  priceToken: false,
  priceMoney: false,
  category: false,
  description: false,
  images: false,
  imageFiles: false,
  logisticMethod: false,
};

export const categoryList = ['Clothes', 'Book', 'Souvenir'];
