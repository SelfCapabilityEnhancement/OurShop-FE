import { render, screen } from '@testing-library/react';
import { mockOrderItemAdminFinished } from '@/mocks/mockData';
import OrderItemAdminFinished from '@/components/features/order-management/OrderItemAdminFinished';

describe('OrderItemAdmin', () => {
  beforeEach(() => {
    render(
      <OrderItemAdminFinished
        order={mockOrderItemAdminFinished[0]}
        setShowWindow={() => {}}
        setSelectedOrdersItemAdmin={() => {}}
        setShowOrderMadeButton={() => {}}
      />
    );
  });
  test('should render picture, product name, number and detail button', () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrderItemAdminFinished[0].product.name
    );
    expect(screen.getByTestId('number-title').textContent).toBe('Number: ');
    expect(screen.getByTestId('total-order-number').textContent).toBe(
      mockOrderItemAdminFinished[0].productNumAll.toString()
    );
    expect(screen.getByTestId('ordered-date-title').textContent).toBe(
      'Ordered Date: '
    );

    const dateString = mockOrderItemAdminFinished[0].ordersList[0].vendorDate
      ? mockOrderItemAdminFinished[0].ordersList[0].vendorDate.toLocaleDateString()
      : '';
    expect(screen.getByTestId('ordered-date').textContent).toBe(dateString);
    expect(screen.getByTestId('view-detail')).toBeInTheDocument();
  });
});
