import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import ProductManagement from '@/components/features/product-management/ProductManagement';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import * as service from '@/service';
import { tempProducts } from '@/mocks/mockData';

jest.mock('@/service', () => ({
  getProducts: jest.fn(),
}));

describe('Product Management', () => {
  let container: Container;

  beforeEach(async () => {
    jest.spyOn(service, 'getProducts').mockResolvedValue(tempProducts);
    await act(async () => {
      container = render(<ProductManagement />, {
        wrapper: BrowserRouter,
      }).container;
    });
  });

  it('should show tabs', () => {
    expect(screen.getByText('Available Products')).toBeInTheDocument();
    expect(screen.getByText('Deleted Products')).toBeInTheDocument();
  });

  it('should show list of products', () => {
    expect(container.querySelectorAll('li.product')).toHaveLength(
      tempProducts.length
    );
  });
});
