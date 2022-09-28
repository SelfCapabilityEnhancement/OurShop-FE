import { Container } from 'react-dom';
import { render } from '@testing-library/react';
import ShoppingCart from '@/components/features/shopping-cart/ShoppingCart';
import { BrowserRouter } from 'react-router-dom';

describe('display profile option', () => {
  let container: Container;

  beforeEach(() => {
    container = render(<ShoppingCart />, { wrapper: BrowserRouter }).container;
  });
  it('should display shopping cart list', async () => {
    const products = container.querySelectorAll('.product');

    expect(products).toHaveLength(3);
  });
});
