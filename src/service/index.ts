import axios from 'axios';
import {
  Account,
  OrdersItem,
  Product,
  Feature,
  PurchaseConfirmationItem,
  Role,
  User,
  UserInfo,
} from '@/components/common/CustomTypes';
import { imageUrlPrefix } from '@/constants';
import { uploadFileToBlob } from '@/azure-storage-blob';
import { useLoginStore } from '@/hooks/useLoginStore';

export const isDev = () => import.meta.env.DEV;
const localBaseUrl = 'http://127.0.0.1:5173';
const prodBaseUrl = 'https://ourshop-tw.netlify.app';

const defaultConfig = {
  baseURL: `${isDev() ? localBaseUrl : prodBaseUrl}/api`,
  timeout: 10000,
};

const http = axios.create(defaultConfig);
const httpWithoutAuthorization = axios.create(defaultConfig);

http.interceptors.request.use((config) => {
  const jwt = useLoginStore.getState().jwt;
  if (jwt) {
    if (config.headers) {
      config.headers.Authorization = jwt;
    } else {
      config.headers = { Authorization: jwt };
    }
  }
  return config;
});

export const getAllOffices = async (): Promise<
  { id: number; office: string }[]
> => {
  const { data } = await http.get(`/offices`);
  return data;
};

export const uploadFile = async (images: File[]) => {
  await Promise.all(images.map((image) => uploadFileToBlob(image)));
};

export const createProduct = async ({
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
export const getCurrentUser = async (): Promise<User> => {
  const { data } = await http.get('/users');
  return data;
};

export const addToCarts = async (productId: number, productNum: number) => {
  await http.post('/shopping-carts', {
    productId,
    productNum,
  });
};

export const getShoppingCarts = async (handleRedDot: boolean) => {
  const { data } = await http.get(
    `/users/shopping-carts?handle_red_dot=` + handleRedDot
  );
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  const url = '/products?deleted=' + false;
  const { data } = await http.get(url);

  data.sort((a: { id: number }, b: { id: number }) => {
    return a.id > b.id ? -1 : 1;
  });

  return data;
};

export const getDeletedProducts = async (): Promise<Product[]> => {
  const { data } = await http.get('/products?deleted=' + true);
  return data;
};

export const deleteProduct = async (product: Product) => {
  await http.delete('/products/' + product.id);
};

export const updateUserInfo = async (officeCity: string, address: string) => {
  await http.patch('/users/', {
    office: officeCity,
    address,
  });
};

export const updateProductNum = async (
  productId: number,
  productNum: number
) => {
  const { data } = await http.patch('/shopping-carts/products-quantity', {
    productId,
    productNum,
  });
  return data;
};

export const payByToken = async (
  cost: number,
  purchaseConfirmationItems: PurchaseConfirmationItem[]
) => {
  return await http.post('/shopping-carts/pay-by-token', {
    token: cost,
    purchaseConfirmationItems,
  });
};

export const getProductsByOfficeIds = async (
  officeIds: number[]
): Promise<Product[]> => {
  const { data } = await http.get('/products/officeId?officeIds=' + officeIds);
  data.sort((a: { id: number }, b: { id: number }) => {
    return a.id > b.id ? -1 : 1;
  });
  return data;
};

export const getAllOrdersItems = (): Promise<OrdersItem[]> =>
  http.get(`/orders`).then((response) => response.data);

export const updateOrders = (
  ordersProductIds: { orderId: number; productId: number }[]
) => http.patch('/orders', ordersProductIds).then((response) => response.data);

export const getOrdersItemsByUserId = () =>
  http.get(`/users/orders`).then((response) => response.data);

export const register = async (name: string, password: string) => {
  return await httpWithoutAuthorization.post('/users/register', {
    name,
    password,
  });
};

export const login = async (username: string, password: string) => {
  return await httpWithoutAuthorization.post('/users/login', {
    username,
    password,
  });
};

export const saveUserInfo = async (userInfo: UserInfo) => {
  return await http
    .post('/users/user-info', {
      userRealName: userInfo.userRealName,
      officeId: userInfo.officeId,
      phoneNumber: userInfo.telephoneNum,
    })
    .then((response) => response.data);
};

export const getFeatureList = async (): Promise<Feature[]> => {
  return await http.get('/functions/').then((response) => response.data);
};

export const getRoleList = async (hasFunction: boolean): Promise<Role[]> => {
  return await http
    .get('/roles?has_function=' + hasFunction)
    .then((response) => response.data);
};

export const updateFeature = async (
  featureId: number,
  code: string,
  description: string
) => {
  const { data } = await http.patch(`/functions/${featureId}`, {
    code,
    description,
  });
  return data;
};

export const updateRole = async (roleId: number, featureIds: number[]) => {
  const { data } = await http.patch(`/roles/${roleId}/role_function`, {
    featureIds,
  });
  return data;
};

export const getAccountList = (): Promise<Account[]> => {
  return http.get('/users/get-account-list').then((response) => response.data);
};

export const updateRoleNames = async (userId: number, roleIds: number[]) => {
  const { data } = await http.patch(`/users/${userId}/user-roles`, {
    roleIds,
  });
  return data;
};
