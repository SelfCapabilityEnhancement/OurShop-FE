import { render } from '@testing-library/react';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@/components/features/home-page/HomePage';
import * as mock from '@/assets/mockData';


describe('HomePage', () => {
  let container: Container;

  beforeEach(() => {
    jest.spyOn(mock, 'getProducts').mockReturnValue(mock.tempProducts);
    container = render(<HomePage />, {wrapper: BrowserRouter}).container;
  });

  it('should display products', () => {
    const products = container.querySelectorAll('.product');

    expect(products).toHaveLength(mock.tempProducts.length);
  });
});
