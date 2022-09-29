import {Container} from 'react-dom';
import {render, screen} from '@testing-library/react';
import ShoppingCart from '@/components/features/shopping-cart/ShoppingCart';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as mock from '@/assets/mockData';


describe('display shopping cart page given nonempty products', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<ShoppingCart />, {wrapper: BrowserRouter}).container;
  });
  it('should display shopping cart list', () => {
    const products = container.querySelectorAll('.product');

    expect(products).toHaveLength(3);
  });
  it('should display pay button', () => {
    const payBtn = container.querySelectorAll('.payBtn');

    expect(payBtn.length).toBe(2);
  });
  it('should navigate to purchase-confirmation page', async () => {
    const element = container.querySelector('.token');
    await user.click(element as Element);
    expect(screen.findByText('Purchase Confirmation')).toBeTruthy();
  });
});

describe('display empty message given empty products', () => {
  it('should display nothing in the shopping cart', () => {
    jest.spyOn(mock, 'getProducts').mockReturnValue([]);
    const container = render(<ShoppingCart />, {wrapper: BrowserRouter}).container;
    const emptyMsg = container.querySelector('.empty-msg');

    expect(emptyMsg).toBeTruthy();
  });
});
