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
  mockOffice,
} from '@/mocks/mockData';
import * as service from '@/service';
import { act } from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
// import {validateOffice} from '@/utils';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn(),
  payByToken: jest.fn(),
  getAllOffices: jest.fn(),
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
      selectedOffices: new Set(['Beijing']),
    },
  };

  jest.spyOn(service, 'getCurrentUser').mockResolvedValue(users[0]);
  jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
  jest.spyOn(service, 'getAllOffices').mockResolvedValue(mockOffice);

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
    expect(container.querySelectorAll('button')).toHaveLength(3);
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
    const buyBtn = container.querySelector('button.buy');
    const mockResp = {
      config: {},
      data: {
        code: 22001,
        data: {},
        message: 'test error',
        success: true,
      },
      headers: {},
      status: 200,
      statusText: 'OK',
    };
    const payByToken = jest
      .spyOn(service, 'payByToken')
      .mockResolvedValue(mockResp as AxiosResponse);
    const dropDown = screen.getByTestId('drop-down');
    await user.click(dropDown as Element);
    const office = screen.getByText('Beijing');
    await user.click(office);
    await user.click(buyBtn as Element);
    expect(payByToken).toBeCalled();
  });
});
