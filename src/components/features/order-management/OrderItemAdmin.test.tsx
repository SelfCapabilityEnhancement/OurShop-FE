import { render, screen } from '@testing-library/react';
import OrderItemAdmin from '@/components/features/order-management/OrderItemAdmin';
import { mockOrderItemAdmin } from '@/mocks/mockData';

describe('OrderItemAdmin', () => {
  beforeEach(() => {
    render(<OrderItemAdmin order={mockOrderItemAdmin[0]} />);
  });
  test('should render picture, product name and number', () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();

    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrderItemAdmin[0].product.name
    );
    expect(screen.getByTestId('number-title').textContent).toBe('Number: ');
    expect(screen.getByTestId('total-order-number').textContent).toBe(
      mockOrderItemAdmin[0].productNumAll.toString()
    );
  });
});
