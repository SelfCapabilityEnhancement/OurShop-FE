import { render, screen } from '@testing-library/react';
import { mockOrderItemAdminPending } from '@/mocks/mockData';
import OrderDetailWindow from '@/components/features/order-management/OrderDetailWindow';

describe('OrderDetailWindow', () => {
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
  }));
  beforeEach(() => {
    render(
      <OrderDetailWindow
        setShowWindow={() => {}}
        showWindow={true}
        selectedOrdersItemAdmin={mockOrderItemAdminPending[0]}
        showOrderMadeButton={true}
      />
    );
  });
  it('should render all elements', async () => {
    expect(await screen.findByText('Order Detail')).toBeInTheDocument();
    expect(await screen.findByTestId('product-picture')).toBeInTheDocument();
    expect(
      await screen.findByText(mockOrderItemAdminPending[0].product.name)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Order Number: ' + mockOrderItemAdminPending[0].productNumAll
      )
    ).toBeInTheDocument();
    expect(await screen.findByText('Buyer Information')).toBeInTheDocument();
    expect(await screen.findByTestId('buyer-info-list')).toBeInTheDocument();
    expect(await screen.findByTestId('export-excel')).toBeInTheDocument();
    expect(await screen.findByTestId('order-made')).toBeInTheDocument();
    expect(await screen.findByTestId('cancel-icon')).toBeInTheDocument();
  });
});
