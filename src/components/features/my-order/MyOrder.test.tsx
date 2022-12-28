import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MyOrder from '@/components/features/my-order/MyOrder';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mockOrdersItems } from '@/mocks/mockData';
import * as service from '@/service';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn(),
  getOrdersItemsByUserId: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('display my order', () => {
  let container: Container;

  beforeEach(async () => {
    localStorage.setItem('router', 'my-order');
    jest
      .spyOn(service, 'getOrdersItemsByUserId')
      .mockResolvedValue(mockOrdersItems);

    await act(async () => {
      container = await render(<MyOrder />, { wrapper: BrowserRouter })
        .container;
    });
  });

  afterEach(cleanup);

  test('render all OrderItems', () => {
    expect(container.querySelectorAll('.order-item').length).toBe(2);
  });
});

describe('When user not login to access my-order', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<MyOrder />, { wrapper: BrowserRouter });
    });
  });

  afterEach(cleanup);

  it('should show tabs', () => {
    expect(screen.getByText('Not Login')).toBeInTheDocument();
  });
});
