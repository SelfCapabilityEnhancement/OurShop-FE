import { render, screen } from '@testing-library/react';
import EditProduct from '@/components/features/product-management/EditProduct';
import { tempProducts } from '@/mocks/mockData';
import { Product } from '@/components/common/CustomTypes';
import userEvent from '@testing-library/user-event';
import * as service from '@/service';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateProduct: jest.fn(),
}));

describe('Edit Product', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <EditProduct
        isOpen={true}
        handleClose={jest.fn}
        oldProduct={tempProducts[0]}
      />
    );
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

  it('should show old product info', async () => {
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

    const updateProductMock = jest.spyOn(service, 'updateProduct');

    const saveBtn = await screen.findByTestId('save-btn');
    await user.click(saveBtn);

    expect(updateProductMock).toBeCalled();
  });
});
