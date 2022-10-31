import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import PurchaseConfirmation from '@/components/features/purchase-confirmation/PurchaseConfirmation';
import { BrowserRouter, Location } from 'react-router-dom';
import * as ReactRouter from 'react-router';

import userEvent from '@testing-library/user-event';
import { getProductCount, getProducts } from '@/mocks/mockData';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    post: jest.fn(),
    get: jest.fn().mockResolvedValue({}),
  },
  getCurrentUser: jest.fn().mockResolvedValue([
    {
      id: 2,
      name: 'Ann',
      sex: 'Female',
      age: 23,
      address: 'Guanshan Road',
      office: 'Wuhan',
      token: 23,
      bankAccount: '123',
      avatar: 'avatar',
    },
  ]),
}));

describe('purchase confirmation', () => {
  let container: Container;
  const user = userEvent.setup();
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
  }));
  const mockLocation: Location = {
    key: 'default',
    pathname: '',
    search: '',
    hash: '',
    state: { products: getProducts(), count: getProductCount() },
  };

  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    container = render(<PurchaseConfirmation />, {
      wrapper: BrowserRouter,
    }).container;
  });

  it('should display purchase info', async () => {
    expect(
      await screen.findByText('Purchase Confirmation')
    ).toBeInTheDocument();
    expect(await screen.findByText('My Tokens:')).toBeInTheDocument();
    expect(await screen.findByText('Cost of Tokens:')).toBeInTheDocument();
    expect(container.querySelectorAll('button')).toHaveLength(2);
  });

  it('should navigate to shopping cart when click cancel', async () => {
    const cancelButton = container.querySelector('button.cancel');

    expect(cancelButton).toBeInTheDocument();
    await user.click(cancelButton as Element);

    expect(screen.findByTestId('shopping-cart')).toBeTruthy();
  });

  it('should calculate the cost of tokens', () => {
    expect(screen.getByText(/19/i)).toBeInTheDocument();
  });

  it('should show banner when click buy by token btn', async () => {
    const element = container.querySelector('button.buy');

    await user.click(element as Element);

    expect(
      await screen.findByText('The Purchase Made Successfully!')
    ).toBeInTheDocument();
  });
});
