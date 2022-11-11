import { render, screen } from '@testing-library/react';
import DeleteProduct from '@/components/features/product-management/DeleteProduct';
import { deletedProducts } from '@/mocks/mockData';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  deleteProduct: jest.fn(),
}));

describe('Delete Product', () => {
  beforeEach(() => {
    render(
      <DeleteProduct
        isOpen={true}
        handleClose={jest.fn}
        product={deletedProducts[0]}
      />
    );
  });

  it('should show delete product modal', () => {
    expect(screen.getByText('Warning Message')).toBeInTheDocument();
    expect(
      screen.getByText('Do you want to delete the followed product?')
    ).toBeInTheDocument();
    const product = deletedProducts[0];
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});
