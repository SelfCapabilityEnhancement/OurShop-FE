import { render, waitFor } from '@testing-library/react';
import MyOrder from '@/components/features/my-order/MyOrder';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { users } from '@/mocks/mockData';
import * as utils from '@/utils';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    get: jest.fn().mockResolvedValue({
      data: [
        {
          product: {
            id: 79,
            name: '橘子',
            priceToken: 99,
            priceMoney: 9,
            description: '水果 🍊',
            stock: 1,
            images:
              'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
          },
          orders: {
            id: 1,
            userId: 12,
            orderProductsId: 3,
            orderAddress: 'order address',
            orderStatus: 'order status',
            purchaseDate: '2022-10-19-15:34:20',
          },
          orderProducts: {
            id: 3,
            productId: 79,
            purchaseNum: 1,
          },
        },
        {
          product: {
            id: 78,
            name: '苹果',
            priceToken: 98,
            priceMoney: 8,
            description: '水果',
            stock: 1,
            images:
              'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
          },
          orders: {
            id: 2,
            userId: 12,
            orderProductsId: 2,
            orderAddress: 'order address',
            orderStatus: 'order status',
            purchaseDate: '2022-10-19-16:23:20',
          },
          orderProducts: {
            id: 2,
            productId: 78,
            purchaseNum: 2,
          },
        },
      ],
    }),
  },
}));

describe('display my order', () => {
  let container: Container;
  beforeEach(() => {
    container = render(<MyOrder />, { wrapper: BrowserRouter }).container;
    jest.spyOn(utils, 'getCurrentUser').mockResolvedValue(users);
  });
  test('render all OrderItems', () => {
    waitFor(() => {
      expect(container.querySelectorAll('.order-item').length).toBe(2);
    });
  });
});
