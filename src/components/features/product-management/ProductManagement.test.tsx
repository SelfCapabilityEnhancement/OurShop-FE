import { cleanup, render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import ProductManagement from '@/components/features/product-management/ProductManagement';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import * as service from '@/service';
import { deletedProducts, mockOffice, tempProducts } from '@/mocks/mockData';
import userEvent from '@testing-library/user-event';

jest.mock('@/service', () => ({
  getProducts: jest.fn(),
  getDeletedProducts: jest.fn(),
  getAllOffices: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('Product Management', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(async () => {
    jest.spyOn(service, 'getProducts').mockResolvedValue(tempProducts);
    jest
      .spyOn(service, 'getDeletedProducts')
      .mockResolvedValue(deletedProducts);
    jest.spyOn(service, 'getAllOffices').mockResolvedValue(mockOffice);
    await act(async () => {
      container = render(<ProductManagement />, {
        wrapper: BrowserRouter,
      }).container;
    });
  });

  afterEach(cleanup);

  it('should show tabs', () => {
    expect(screen.getByText('Available Products')).toBeInTheDocument();
    expect(screen.getByText('Deleted Products')).toBeInTheDocument();
  });

  it('should show list of available products', () => {
    expect(container.querySelectorAll('li.available')).toHaveLength(
      tempProducts.length
    );
    expect(container.querySelectorAll('li.deleted')).toHaveLength(0);
  });

  it('should show list of deleted products', async () => {
    const tab = screen.getByText('Deleted Products');

    await user.click(tab);

    expect(container.querySelectorAll('li.available')).toHaveLength(0);
    expect(container.querySelectorAll('li.deleted')).toHaveLength(
      deletedProducts.length
    );
  });
});
