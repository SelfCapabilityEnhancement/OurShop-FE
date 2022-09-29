import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import PurchaseConfirmation from '@/components/features/purchase-confirmation/PurchaseConfirmation';
import { BrowserRouter } from 'react-router-dom';


describe('purchase confirmation', () => {
  let container: Container;

  beforeEach(() => {
    container = render(<PurchaseConfirmation />, { wrapper: BrowserRouter }).container;
  });
  it('should display purchase info', () => {
    expect(screen.getByText('Purchase Confirmation')).toBeTruthy();
    expect(screen.getByText('My Tokens:')).toBeTruthy();
    expect(screen.getByText('Cost of Tokens:')).toBeTruthy();
    expect(container.querySelectorAll('.button')).toHaveLength(2);
  });
});
