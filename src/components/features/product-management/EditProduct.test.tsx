import { render, screen } from '@testing-library/react';
import EditProduct from '@/components/features/product-management/EditProduct';
import { tempProducts } from '@/mocks/mockData';
import { Product } from '@/components/common/CustomTypes';
import { act } from 'react-dom/test-utils';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateProduct: jest.fn(),
}));

describe('Edit Product', () => {
  const handleClose = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(
        <EditProduct
          isOpen={true}
          handleClose={handleClose}
          oldProduct={tempProducts[0]}
        />
      );
    });
  });

  it('should show edit product modal', () => {
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });

  it('should show old product info', function () {
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

  // it('should handleClose to be called', async () => {
  //   const closeBtn = screen.getByTestId('cancelIcon');
  //   await user.click(closeBtn);
  //
  //   expect(handleClose).toBeCalled();
  // });
});
