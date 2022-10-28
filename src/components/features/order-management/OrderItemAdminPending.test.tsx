import { render, screen } from '@testing-library/react';
import { mockOrderItemAdminPending } from '@/mocks/mockData';
import OrderItemAdminPending from '@/components/features/order-management/OrderItemAdminPending';

describe('OrderItemAdmin', () => {
  beforeEach(() => {
    render(
      <OrderItemAdminPending
        order={mockOrderItemAdminPending[0]}
        setShowWindow={() => {}}
        setSelectedOrdersItemAdmin={() => {}}
      />
    );
  });
  test('should render picture, product name, number and detail button', () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrderItemAdminPending[0].product.name
    );
    expect(screen.getByTestId('number-title').textContent).toBe('Number: ');
    expect(screen.getByTestId('total-order-number').textContent).toBe(
      mockOrderItemAdminPending[0].productNumAll.toString()
    );
    expect(screen.getByTestId('view-detail')).toBeInTheDocument();
  });
});
