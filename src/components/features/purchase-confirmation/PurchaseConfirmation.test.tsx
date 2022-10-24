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
          shoppingCartProductsId: 53,
          productNum: 5,
        },
        {
          product: {
            id: 1,
            name: '西瓜',
            priceToken: 87,
            priceMoney: 7,
            description: '水果 🍉',
            stock: 1,
            images:
              'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
          },
          shoppingCartProductsId: 98,
          productNum: 5,
        },
        {
          product: {
            id: 97,
            name: '手机',
            priceToken: 9999,
            priceMoney: 899,
            description: '一部手机',
            stock: 1,
            images:
              'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
          },
          shoppingCartProductsId: 24,
          productNum: 1,
        },
      ],
    }),
  },
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
