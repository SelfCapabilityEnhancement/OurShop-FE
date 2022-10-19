import { render, screen } from '@testing-library/react';
import OrderItem from '@/components/features/my-order/OrderItem';

describe('OrderItem', () => {
  const date = new Date('2022-10-19 15:34:20');
  const mockOrder = [
    {
      product: {
        id: 79,
        name: '橘子',
        priceToken: 99,
        priceMoney: 9,
        description: '水果 🍊',
        stock: 1,
        images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png;',
      },
      orders: {
        id: 1,
        userId: 12,
        orderProductsId: 3,
        orderAddress: 'order address',
        orderStatus: 'order status',
        purchaseDate: date,
      },
      orderProducts: {
        id: 3,
        productId: 79,
        purchaseNum: 1,
      },
    },
  ];

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
      date.toString()
    );
    expect(screen.getByTestId('number-title').textContent).toBe('number: ');
    expect(screen.getByTestId('purchase-number').textContent).toBe(
      mockOrder[0].orderProducts.purchaseNum.toString()
    );
  });
});
