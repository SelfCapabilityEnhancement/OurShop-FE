import axios from 'axios';
import {
  OrdersItem,
  Product,
  PurchaseConfirmationItem,
  User,
} from '@/components/common/CustomTypes';
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

export const newProduct = async ({
  id,
  imageFiles,
  deletedTime,
  ...product
}: Product) => {
  await http.post('/products', {
    ...product,
    images: imageFiles
      .map((image) => `${imageUrlPrefix}${image.name}`)
      .join(','),
  });
};

export const updateProduct = async ({
  id,
  imageFiles,
  deletedTime,
  ...product
}: Product) => {
  await http.patch(`/products/${id}`, {
    ...product,
    images: product.images
      .split(',')
      .map((url, index) => {
        return url.startsWith(imageUrlPrefix)
          ? url
          : `${imageUrlPrefix}${imageFiles[index].name}`;
      })
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
  const { data } = await http.get(`/users/${userId}/shopping-carts`);
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await http.get('/products?deleted=' + false);

  data.sort((a: { id: number }, b: { id: number }) => {
    return a.id > b.id ? -1 : 1;
  });

  return data;
};

export const getDeletedProducts = async (): Promise<Product[]> => {
  const { data } = await http.get('/products?deleted=' + true);

  data.sort((a: { id: number }, b: { id: number }) => {
    return a.id > b.id ? -1 : 1;
  });

  return data;
};

export const deleteProduct = async (product: Product) => {
  await http.delete('/products/' + product.id);
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

export const updateShoppingCardProduct = async (
  userId: number,
  cost: number,
  purchaseConfirmationItems: PurchaseConfirmationItem[]
) => {
  await http.post('/shopping-carts/add-by-plus', {
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
  http.get(`/users/${userId}/orders`).then((response) => response.data);

export const register = async (name: string, password: string) => {
  return await http.post('/users/register', {
    name,
    password,
  });
};

export const login = async (username: string, password: string) => {
  return await http.post('/users/login', {
    username,
    password,
  });
};
