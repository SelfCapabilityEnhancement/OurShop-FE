import { render, screen } from '@testing-library/react';
import EditProduct from '@/components/features/product-management/EditProduct';

describe('Delete Product', () => {
  beforeEach(() => {
    render(<EditProduct isOpen={true} handleClose={jest.fn} />);
  });

  it('should show delete product modal', () => {
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });
});
