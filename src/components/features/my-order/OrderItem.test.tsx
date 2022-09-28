import { render, screen } from '@testing-library/react';
import OrderItem from '@/components/features/my-order/OrderItem';

describe('OrderItem', () => {
  const mockOrder = [
    {
      productName: 'Product Name',
      purchaseDate: '11.10.2022',
      purchaseNumber: '1',
    },
  ];

  beforeEach(() => {
    render(<OrderItem order={mockOrder[0]} />);
  });
  test('should render picture, product name, purchase date and number in my order', async () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrder[0].productName
    );
    expect(screen.getByTestId('purchase-date-title').textContent).toBe(
      'Date of purchase: '
    );
    expect(screen.getByTestId('purchase-date').textContent).toBe(
      mockOrder[0].purchaseDate
    );
    expect(screen.getByTestId('number-title').textContent).toBe('number: ');
    expect(screen.getByTestId('purchase-number').textContent).toBe(
      mockOrder[0].purchaseNumber
    );
  });
});
