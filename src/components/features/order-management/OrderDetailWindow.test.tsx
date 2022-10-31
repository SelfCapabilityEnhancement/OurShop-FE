import { render, screen, waitFor } from '@testing-library/react';
import { mockOrderItemAdminPending } from '@/mocks/mockData';
import OrderDetailWindow from '@/components/features/order-management/OrderDetailWindow';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    post: jest.fn(),
  },
}));

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
        setAdminOrdersItemList={() => {}}
        setOrdersItems={() => {}}
        getAdminOrdersList={() => {}}
        filterOrdersByStatus={() => {}}
        filterOrdersByDateRange={() => {}}
      />
    );
  });
  it('should render all elements', async () => {
    waitFor(() => {
      expect(screen.findByText('Order Detail')).toBeInTheDocument();
      expect(screen.findByTestId('product-picture')).toBeInTheDocument();
      expect(
        screen.findByText(mockOrderItemAdminPending[0].product.name)
      ).toBeInTheDocument();
      expect(
        screen.findByText(
          'Order Number: ' + mockOrderItemAdminPending[0].productNumAll
        )
      ).toBeInTheDocument();
      expect(screen.findByText('Buyer Information')).toBeInTheDocument();
      expect(screen.findByTestId('buyer-info-list')).toBeInTheDocument();
      expect(screen.findByTestId('export-excel')).toBeInTheDocument();
      expect(screen.findByTestId('order-made')).toBeInTheDocument();
      expect(screen.findByTestId('cancel-icon')).toBeInTheDocument();
    });
  });
});
