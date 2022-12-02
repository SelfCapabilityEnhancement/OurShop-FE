import { render, screen } from '@testing-library/react';
import {
  mockOrderItemAdmin,
  mockOrderItemAdminFinished,
  mockOrderItemAdminPending,
} from '@/mocks/mockData';
import OrderItemAdmin from '@/components/features/order-management/OrderItemAdmin';

describe('OrderItemAdminAll', () => {
  beforeEach(() => {
    render(
      <OrderItemAdmin
        order={mockOrderItemAdmin[0]}
        setShowWindow={() => {}}
        setSelectedOrdersItemAdmin={() => {}}
        setShowOrderMadeButton={() => {}}
        nowStatus="All"
      />
    );
  });
  test('should render picture, product name and number', () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();

    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrderItemAdmin[0].productName
    );
    expect(screen.getByTestId('number-title').textContent).toBe('Number: ');
    expect(screen.getByTestId('total-order-number').textContent).toBe(
      mockOrderItemAdmin[0].productNumAll.toString()
    );
  });
});

describe('OrderItemAdmin', () => {
  beforeEach(() => {
    render(
      <OrderItemAdmin
        order={mockOrderItemAdminFinished[0]}
        setShowWindow={() => {}}
        setSelectedOrdersItemAdmin={() => {}}
        setShowOrderMadeButton={() => {}}
        nowStatus="Finished"
      />
    );
  });
  test('should render picture, product name, number and detail button', () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrderItemAdminFinished[0].productName
    );
    expect(screen.getByTestId('number-title').textContent).toBe('Number: ');
    expect(screen.getByTestId('total-order-number').textContent).toBe(
      mockOrderItemAdminFinished[0].productNumAll.toString()
    );
    expect(screen.getByTestId('ordered-date-title').textContent).toBe(
      'Order is Made on: '
    );

    const dateString = mockOrderItemAdminFinished[0].ordersList[0].vendorDate;
    expect(screen.getByTestId('ordered-date').textContent).toBe(dateString);
    expect(screen.getByTestId('view-detail')).toBeInTheDocument();
  });
});

describe('OrderItemAdminPending', () => {
  beforeEach(() => {
    render(
      <OrderItemAdmin
        order={mockOrderItemAdminPending[0]}
        setShowWindow={() => {}}
        setSelectedOrdersItemAdmin={() => {}}
        setShowOrderMadeButton={() => {}}
        nowStatus="Pending"
      />
    );
  });
  test('should render picture, product name, number and detail button', () => {
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(screen.getByTestId('product-name').textContent).toBe(
      mockOrderItemAdminPending[0].productName
    );
    expect(screen.getByTestId('number-title').textContent).toBe('Number: ');
    expect(screen.getByTestId('total-order-number').textContent).toBe(
      mockOrderItemAdminPending[0].productNumAll.toString()
    );
    expect(screen.getByTestId('view-detail')).toBeInTheDocument();
  });
});
