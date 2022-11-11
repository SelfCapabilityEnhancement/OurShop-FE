import axios from 'axios';
import {
  Product,
  OrdersItem,
  UploadProduct,
  User,
  PurchaseConfirmationItem,
} from '@/components/common/CustomeTypes';
import { imageUrlPrefix } from '@/constants';
import { uploadFileToBlob } from '@/azure-storage-blob';

export const isDev = () => import.meta.env.DEV;
const localBaseUrl = 'http://127.0.0.1:5173';
const prodBaseUrl = 'https://ourshop-tw.netlify.app';

export const http = axios.create({
  baseURL: `${isDev() ? localBaseUrl : prodBaseUrl}/api`,
  timeout: 10000,
});

export const uploadFile = async (images: File[]) => {
  await Promise.all(images.map((image) => uploadFileToBlob(image)));
};

export const newProduct = async (product: UploadProduct) => {
  await http.post('/products', {
    ...product,
    images: product.images
      .map((image) => `${imageUrlPrefix}${image.name}`)
      .join(','),
  });
};

// this will be replaced by useContext in next iteration
export const getCurrentUser = (): Promise<User> => {
  return http.get('/users/13').then((response) => response.data);
};

export const addToCarts = async (
  userId: number,
  productId: number,
  productNum: number,
  logisticMethod: string
) => {
  await http.post('/shopping-carts', {
    userId,
    productId,
    productNum,
    logisticMethod,
  });
};

export const getShoppingCarts = async (userId: number) => {
  const { data } = await http.get(`/shopping-carts/user/${userId}`);
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await http.get('/products/not-deleted');

  data.sort((a: { id: number }, b: { id: number }) => {
    return a.id > b.id ? -1 : 1;
  });

  return data;
};

export const updateUserInfo = async (
  userId: number,
  officeCity: string,
  address: string
) => {
  await http.patch('/users/' + userId, {
    office: officeCity,
    address,
  });
};

export const payByToken = async (
  userId: number,
  cost: number,
  purchaseConfirmationItems: PurchaseConfirmationItem[]
) => {
  await http.post('/shopping-carts/pay-by-token', {
    userId,
    token: cost,
    purchaseConfirmationItems,
  });
};

export const getAllOrdersItems = (): Promise<OrdersItem[]> =>
  http.get(`/orders`).then((response) => response.data);

export const updateOrders = (
  ordersProductIds: { orderId: number; productId: number }[]
) => http.patch('/orders', ordersProductIds).then((response) => response.data);

export const getOrdersItemsByUserId = (userId: number) =>
  http.get(`/orders/${userId}`).then((response) => response.data);
