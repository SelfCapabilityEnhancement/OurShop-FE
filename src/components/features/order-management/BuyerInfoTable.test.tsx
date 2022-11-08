import { render, screen } from '@testing-library/react';
import BuyerInfoTable from '@/components/features/order-management/BuyerInfoTable';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mockOrderItemAdmin } from '@/mocks/mockData';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('OrderItemAdmin', () => {
  let container: Container;

  beforeEach(() => {
    container = render(
      <BuyerInfoTable selectedOrdersItemAdmin={mockOrderItemAdmin[0]} />,
      {
        wrapper: BrowserRouter,
      }
    ).container;
  });

  test('should render 4 titles', () => {
    expect(screen.getByText('Buyer Name')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Number of Product')).toBeInTheDocument();
    expect(screen.getByText('Received Address')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
  });

  test('should render Buyer Info', () => {
    expect(container.querySelectorAll('.buyer-info-line').length).toBe(1);
    expect(container.querySelectorAll('.buyer-info-line')[0].textContent).toBe(
      '苹果Ann1wuhan123456'
    );
  });
});
