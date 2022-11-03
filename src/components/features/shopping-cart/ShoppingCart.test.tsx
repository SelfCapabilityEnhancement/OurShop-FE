import { render, screen, waitFor } from '@testing-library/react';
import ShoppingCart from '@/components/features/shopping-cart/ShoppingCart';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Container } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shoppingCartItems } from '@/mocks/mockData';
import * as service from '@/service';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn().mockResolvedValue({ id: 2 }),
  getShoppingCarts: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('display shopping cart page given nonempty products', () => {
  const user = userEvent.setup();
  let container: Container;
  jest.spyOn(service, 'getShoppingCarts').mockImplementation(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return shoppingCartItems;
  });

  beforeEach(async () => {
    await act(async () => {
      container = render(<ShoppingCart />, {
        wrapper: BrowserRouter,
      }).container;
    });
  });

  it('should display loading when startup', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('should display shopping cart list', async () => {
    await waitFor(() => {
      const products = container.querySelectorAll('.product');
      expect(products).toHaveLength(3);
    });
  });

  it('should display pay button', () => {
    const payBtn = container.querySelectorAll('button');
    expect(payBtn.length).toBe(2);
  });

  // it('should navigate to purchase-confirmation page', async () => {
  //   await waitFor(async () => {
  //     const checkbox = container.querySelector('#product-checkbox-0');
  //     expect(checkbox).toBeInTheDocument();
  //     await user.click(checkbox as Element);
  //   });
  //
  //   const element = container.querySelector('button.token');
  //   await user.click(element as Element);
  //
  //   expect(
  //     await screen.findByText('Purchase Confirmation')
  //   ).toBeInTheDocument();
  // });

  it('should add one when click svg-plus', async () => {
    await waitFor(async () => {
      const plusBtn = screen.getAllByTestId('svg-plus')[0];
      await user.click(plusBtn);
    });

    expect(screen.getAllByTestId('num')[0].textContent).toBe('6');
  });

  it('should minus one when click svg-minus', async () => {
    await waitFor(async () => {
      const minusBtn = screen.getAllByTestId('svg-minus')[1];
      await user.click(minusBtn);
    });

    expect(screen.getAllByTestId('num')[1].textContent).toBe('4');
  });

  it('svg-minus should be disabled when num of products is 1', async () => {
    await waitFor(async () => {
      const minusBtn = screen.getAllByTestId('svg-minus')[2];
      await user.click(minusBtn);
    });

    const count = screen.getAllByTestId('num')[2].textContent;
    expect(count).toBe('1');
  });
});
