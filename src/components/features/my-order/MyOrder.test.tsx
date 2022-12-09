import { act, render } from '@testing-library/react';
import MyOrder from '@/components/features/my-order/MyOrder';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mockOrdersItems } from '@/mocks/mockData';
import * as service from '@/service';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn(),
  getOrdersItemsByUserId: jest.fn(),
}));

describe('display my order', () => {
  let container: Container;

  beforeEach(async () => {
    jest
      .spyOn(service, 'getOrdersItemsByUserId')
      .mockResolvedValue(mockOrdersItems);

    await act(async () => {
      container = await render(<MyOrder />, { wrapper: BrowserRouter })
        .container;
    });
  });

  test('render all OrderItems', () => {
    expect(container.querySelectorAll('.order-item').length).toBe(2);
  });
});
