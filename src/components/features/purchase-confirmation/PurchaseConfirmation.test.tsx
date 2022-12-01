import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import PurchaseConfirmation from '@/components/features/purchase-confirmation/PurchaseConfirmation';
import { BrowserRouter, Location } from 'react-router-dom';
import * as ReactRouter from 'react-router';

import userEvent from '@testing-library/user-event';
import {
  productCount,
  tempProducts,
  users,
  logisticMethods,
  productIds,
  shoppingCartIds,
} from '@/mocks/mockData';
import * as service from '@/service';
import { act } from 'react-dom/test-utils';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn(),
  payByToken: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('purchase confirmation', () => {
  let container: Container;
  const user = userEvent.setup();

  const mockLocation: Location = {
    key: 'default',
    pathname: '',
    search: '',
    hash: '',
    state: {
      products: tempProducts,
      count: productCount,
      shoppingCartIds,
      productIds,
      logisticMethods,
    },
  };

  jest.spyOn(service, 'getCurrentUser').mockResolvedValue(users[0]);
  jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);

  beforeEach(async () => {
    await act(async () => {
      container = render(<PurchaseConfirmation />, {
        wrapper: BrowserRouter,
      }).container;
    });
  });

  it('should display purchase info', async () => {
    expect(
      await screen.findByText('Purchase Confirmation')
    ).toBeInTheDocument();
    expect(await screen.findByText('My Tokens:')).toBeInTheDocument();
    expect(await screen.findByText('Cost of Tokens:')).toBeInTheDocument();
    expect(container.querySelectorAll('button')).toHaveLength(2);
  });

  // it('should navigate to shopping cart when click cancel', async () => {
  //   const cancelButton = container.querySelector('button.cancel');
  //
  //   expect(cancelButton).toBeInTheDocument();
  //   await user.click(cancelButton as Element);
  //
  //   expect(await screen.findByTestId('shopping-cart')).toBeInTheDocument();
  // });

  it('should calculate the cost of tokens', () => {
    expect(screen.getByText('19')).toBeInTheDocument();
  });

  it('should show banner when click buy by token btn and verify successfully', async () => {
    const element = container.querySelector('button.buy');
    await user.click(element as Element);
    expect(
      await screen.findByText('The Purchase Made Successfully!')
    ).toBeInTheDocument();
  });
});
