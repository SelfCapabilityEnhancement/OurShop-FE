import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import PurchaseConfirmation from '@/components/features/purchase-confirmation/PurchaseConfirmation';
import { BrowserRouter, Location } from 'react-router-dom';
import * as ReactRouter from 'react-router';

import userEvent from '@testing-library/user-event';
import { getProducts } from '@/assets/mockData';


describe('purchase confirmation', () => {
  let container: Container;
  const user = userEvent.setup();
  const mockLocation: Location = {
    key: 'default',
    pathname: '',
    search: '',
    hash: '',
    state: { products :getProducts() },
  };

  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    container = render(<PurchaseConfirmation />, { wrapper: BrowserRouter }).container;
  });

  it('should display purchase info', () => {
    expect(screen.getByText('Purchase Confirmation')).toBeTruthy();
    expect(screen.getByText('My Tokens:')).toBeTruthy();
    expect(screen.getByText('Cost of Tokens:')).toBeTruthy();
    expect(container.querySelectorAll('.button')).toHaveLength(2);
  });

  it('should navigate to shopping cart when click cancel', async () => {
    const cancelButton = container.querySelector('.cancel.button');

    await user.click(cancelButton as Element);

    expect(screen.findByTestId('shopping-cart')).toBeTruthy();
  });
  it('should calculate the cost of tokens',()=>{
    expect(screen.getByText(/19/i)).toBeInTheDocument();
  });

  it('should show banner when click buy by token btn',async ()=>{
    const element = container.querySelector('.buy.button');
    await user.click(element as Element);
    expect(screen.findByText('The purchase made successfully!')).toBeTruthy();
    expect(screen.findByTestId('shopping-cart')).toBeTruthy();
  });
});
