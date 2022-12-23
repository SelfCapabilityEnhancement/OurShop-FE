import { render, screen } from '@testing-library/react';
import EditProduct from '@/components/features/product-management/EditProduct';
import { tempProducts } from '@/mocks/mockData';
import { Product } from '@/components/common/CustomTypes';
import userEvent from '@testing-library/user-event';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateProduct: jest.fn(),
}));

describe('Edit Product', () => {
  const user = userEvent.setup();

  it('should show edit product modal', () => {
    render(
      <EditProduct
        isOpen={true}
        handleClose={jest.fn}
        oldProduct={tempProducts[0]}
      />
    );
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });

  it('should show old product info', function () {
    render(
      <EditProduct
        isOpen={true}
        handleClose={jest.fn}
        oldProduct={tempProducts[0]}
      />
    );
    const items: { [key: string]: keyof Product } = {
      'Product Name': 'name',
      'Price in USD': 'priceMoney',
      'Price in Token': 'priceToken',
      'Product Description': 'description',
    };

    Object.entries(items).forEach(([k, v]) => {
      expect(screen.getByText(k)).toBeInTheDocument();
      const product: Product = tempProducts[0];
      expect(
        screen.getByDisplayValue(product[v] as string)
      ).toBeInTheDocument();
    });
  });

  it('should handleClose to be called', async () => {
    const handleClose = jest.fn();

    render(
      <EditProduct
        isOpen={true}
        handleClose={handleClose}
        oldProduct={tempProducts[0]}
      />
    );

    const closeBtn = await screen.findByTestId('closeBtn');
    await user.click(closeBtn);

    expect(handleClose).toBeCalled();
  });
});
