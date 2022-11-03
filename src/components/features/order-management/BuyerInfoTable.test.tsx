import { render, screen } from '@testing-library/react';
import BuyerInfoTable from '@/components/features/order-management/BuyerInfoTable';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('OrderItemAdmin', () => {
  let container: Container;
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
  }));

  beforeEach(() => {
    container = render(<BuyerInfoTable />, {
      wrapper: BrowserRouter,
    }).container;
  });
  test('should render 4 titles', () => {
    expect(screen.getByText('Buyer Name')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Number of Product')).toBeInTheDocument();
    expect(screen.getByText('Received Address')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
  });

  test('should render Buyer Info', () => {
    expect(container.querySelectorAll('.buyer-info-line').length).toBe(2);
    expect(container.querySelectorAll('.buyer-info-line')[0].textContent).toBe(
      'AnnProduct12wuhan123'
    );
    expect(container.querySelectorAll('.buyer-info-line')[1].textContent).toBe(
      'BettyProduct13Pudong road456'
    );
  });
});
