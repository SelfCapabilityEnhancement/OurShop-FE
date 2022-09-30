import { render, screen } from '@testing-library/react';
import OrderItemAdmin from "@/components/features/order-management/OrderItemAdmin";

describe('OrderItemAdmin', () => {
  const mockOrderItemAdmin = [
    {
      productId: 1,
      productName: 'Product Name 1',
      purchaseNumber: '2',
    },
  ];

  beforeEach(() => {
    render(<OrderItemAdmin order={mockOrderItemAdmin[0]} />);
  });
  test('should render picture, product name and number', async () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();

    expect(screen.getByTestId('product-name').textContent).toBe(
        mockOrderItemAdmin[0].productName
    );
    expect(screen.getByTestId('number-title').textContent).toBe('number: ');
    expect(screen.getByTestId('purchase-number').textContent).toBe(
        mockOrderItemAdmin[0].purchaseNumber
    );
  });
});
