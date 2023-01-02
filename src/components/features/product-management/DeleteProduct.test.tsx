import { render, RenderResult, screen } from '@testing-library/react';
import DeleteProduct from '@/components/features/product-management/DeleteProduct';
import { deletedProducts } from '@/mocks/mockData';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  deleteProduct: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('Delete Product', () => {
  const handleDelete = jest.fn();
  let wrapper: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  >;
  beforeEach(() => {
    wrapper = render(
      <DeleteProduct
        isOpen={true}
        handleDelete={handleDelete}
        handleCancel={jest.fn}
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

  it('should execution handleDelete after delete product', async () => {
    await wrapper.getByTestId('delete-btn').click();
    expect(handleDelete).toHaveBeenCalled();
  });
});
