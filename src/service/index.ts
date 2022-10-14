import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://ourshop-tw.netlify.app/api',
  timeout: 5000,
});
