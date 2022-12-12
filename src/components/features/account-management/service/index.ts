import { Feature } from '@/components/common/CustomTypes';
import axios from 'axios';

export const isDev = () => import.meta.env.DEV;
const localBaseUrl = 'http://127.0.0.1:5173';
const prodBaseUrl = 'https://ourshop-tw.netlify.app';

export const http = axios.create({
  baseURL: `${isDev() ? localBaseUrl : prodBaseUrl}/api`,
  timeout: 10000,
});

export const getFeatureList = async (): Promise<Feature[]> => {
  return await http.get('/functions/').then((response) => response.data);
};
