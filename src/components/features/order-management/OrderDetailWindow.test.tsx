import { render, screen } from '@testing-library/react';
import { mockOrderItemAdminPending } from '@/mocks/mockData';
import OrderDetailWindow from '@/components/features/order-management/OrderDetailWindow';

describe('OrderDetailWindow', () => {
  beforeEach(() => {
    render(
      <OrderDetailWindow
        setShowWindow={() => {}}
        showWindow={true}
        selectedOrdersItemAdmin={mockOrderItemAdminPending[0]}
        showOrderMadeButton={true}
        refreshData={() => {}}
      />
    );
  });

  it('should render all elements', async () => {
    expect(screen.getByText('Order Detail')).toBeInTheDocument();
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(
      screen.getAllByText(mockOrderItemAdminPending[0].productName)[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Order Number: ' + mockOrderItemAdminPending[0].productNumAll
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Buyer Information:')).toBeInTheDocument();
    expect(screen.getByTestId('buyer-info-list')).toBeInTheDocument();
    expect(screen.getByTestId('export-excel')).toBeInTheDocument();
    expect(screen.getByTestId('order-made')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-icon')).toBeInTheDocument();
  });
});
