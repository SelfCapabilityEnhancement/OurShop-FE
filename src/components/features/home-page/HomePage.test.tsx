import { render, waitFor } from '@testing-library/react';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@/components/features/home-page/HomePage';
import { tempProducts } from '@/assets/mockData';
import { http } from '@/service';


describe('HomePage', () => {
  let container: Container;

  beforeEach(() => {
    jest.spyOn(http, 'get').mockResolvedValue({ data: tempProducts });
    container = render(<HomePage />, { wrapper: BrowserRouter }).container;
  });

  it('should display products', () => {
    const products = container.querySelectorAll('.product');

    waitFor(() => {
      expect(products).toHaveLength(tempProducts.length);
    });
  });
});
