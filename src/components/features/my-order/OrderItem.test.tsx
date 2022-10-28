import { render, screen } from '@testing-library/react';
import OrderItem from '@/components/features/my-order/OrderItem';
import { mockOrder } from '@/mocks/mockData';

describe('OrderItem', () => {
  beforeEach(() => {
    render(<OrderItem order={mockOrder[0]} />);
  });

  test('should render picture, product name, purchase date and number in my order', async () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrder[0].product.name
    );
    expect(screen.getByTestId('purchase-date-title').textContent).toBe(
      'Date of purchase: '
    );
    expect(screen.getByTestId('purchase-date').textContent).toBe(
      mockOrder[0].orders.purchaseDate.toLocaleDateString()
    );
    expect(screen.getByTestId('number-title').textContent).toBe('Number: ');
    expect(screen.getByTestId('purchase-number').textContent).toBe(
      mockOrder[0].orderProducts.purchaseNum.toString()
    );
  });
});
