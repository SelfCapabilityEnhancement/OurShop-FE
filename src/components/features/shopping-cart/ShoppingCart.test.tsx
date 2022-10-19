import {render, screen, waitFor} from '@testing-library/react';
import ShoppingCart from '@/components/features/shopping-cart/ShoppingCart';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {http} from '@/service';
import {shoppingCartItems, users} from '@/mocks/mockData';
import * as utils from '@/utils';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    get: jest.fn().mockResolvedValue({data: [
        {
          'product': {
            'id': 79,
            'name': '橘子',
            'priceToken': 99,
            'priceMoney': 9,
            'description': '水果 🍊',
            'stock': 1,
            'images': 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
          },
          'shoppingCartProductsId': 53,
          'productNum': 5,
        },
        {
          'product': {
            'id': 1,
            'name': '西瓜',
            'priceToken': 87,
            'priceMoney': 7,
            'description': '水果 🍉',
            'stock': 1,
            'images': 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
          },
          'shoppingCartProductsId': 98,
          'productNum': 5,
        },
        {
          'product': {
            'id': 97,
            'name': '手机',
            'priceToken': 9999,
            'priceMoney': 899,
            'description': '一部手机',
            'stock': 1,
            'images': 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
          },
          'shoppingCartProductsId': 24,
          'productNum': 1,
        },
      ]}),
  },
}));

describe('display shopping cart page given nonempty products', () => {
  const user = userEvent.setup();
  const container = render(<ShoppingCart/>, {wrapper: BrowserRouter}).container;

  beforeEach(() => {
    jest.spyOn(http, 'get').mockResolvedValue({data: shoppingCartItems});
    jest.spyOn(utils, 'getCurrentUser').mockResolvedValue(users);
  });

  it('should display shopping cart list', () => {
    waitFor(() => {
      const products = container.querySelectorAll('.product');
      expect(products).toHaveLength(3);
    });
  });

  it('should display pay button', () => {
    waitFor(() => {
      const payBtn = container.querySelectorAll('.payBtn');
      expect(payBtn.length).toBe(2);
    });
  });

  it('should navigate to purchase-confirmation page', () => {
    waitFor(() => {
      const element = container.querySelector('.token');
      user.click(element as Element);
      expect(screen.findByText('Purchase Confirmation')).toBeTruthy();
    });
  });

  it('should add one when click svg-plus', () => {
    waitFor(() => {
      const plusBtn = screen.getAllByTestId('svg-plus')[0];
      user.click(plusBtn);

      const count = screen.getAllByTestId('num')[0].textContent;
      expect(count).toBe('3');
    });
  });

  it('svg-minus should be disabled when num of products is 1', () => {
    waitFor(() => {
      const minusBtn = screen.getAllByTestId('svg-minus')[1];
      user.click(minusBtn);
      const count = screen.getAllByTestId('num')[1].textContent;
      expect(count).toBe('1');
    });
  });

  it('should minus one when click svg-minus', () => {
    waitFor(() => {
      const minusBtn = screen.getAllByTestId('svg-minus')[2];
      userEvent.click(minusBtn);
      expect(screen.getAllByTestId('num')[2].textContent).toBe('2');
    });
  });
});

describe('display empty message given empty products', () => {
  const container = render(<ShoppingCart/>, {wrapper: BrowserRouter}).container;

  it('should display nothing in the shopping cart', () => {
    jest.spyOn(http, 'get').mockResolvedValue({data: []});
    jest.spyOn(utils, 'getCurrentUser').mockResolvedValue(users);
    waitFor(() => {
      const emptyMsg = container.querySelector('.empty-msg');
      expect(emptyMsg).toBeTruthy();
    });
  });
});
