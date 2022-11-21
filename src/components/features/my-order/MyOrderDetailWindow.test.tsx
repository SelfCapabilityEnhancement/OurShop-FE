import { render, screen } from '@testing-library/react';
import { mockOrdersItems } from '@/mocks/mockData';
import MyOrderDetailWindow from '@/components/features/my-order/MyOrderDetailWindow';

describe('MyOrderDetailWindow', () => {
  beforeEach(() => {
    render(
      <MyOrderDetailWindow
        showWindow={true}
        setShowWindow={() => {}}
        selectedOrdersItem={mockOrdersItems[0]}
      />
    );
  });

  it('should render all elements', async () => {
    expect(screen.getByText('Order Detail')).toBeInTheDocument();
    expect(screen.getByTestId('product-picture')).toBeInTheDocument();
    expect(screen.getByTestId('purchase-number')).toBeInTheDocument();
    expect(screen.getByTestId('purchase-date')).toBeInTheDocument();
    expect(screen.getByTestId('address')).toBeInTheDocument();
    expect(screen.getByTestId('order-status')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });
});
