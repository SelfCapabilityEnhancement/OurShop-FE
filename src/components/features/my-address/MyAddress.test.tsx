import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MyAddress from '@/components/features/my-address/MyAddress';
import { BrowserRouter } from 'react-router-dom';

describe('display address info', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<MyAddress />, { wrapper: BrowserRouter }).container;
  });
  it('should display address info', async () => {
    const address = container.querySelector('.address-header');

    expect(address).toBeTruthy();
    expect(screen.getByText('My Address')).toBeInTheDocument();
    expect(screen.getByText('My Office')).toBeInTheDocument();
    expect(screen.getByText('My Shipping address')).toBeInTheDocument();
    expect(screen.getByText('Wuhan')).toBeInTheDocument();
    expect(screen.getByText('Good to Go')).toBeInTheDocument();
  });

  it('should navigate to home when click good to go', async () => {
    const button = container.querySelector('.go-home');

    await user.click(button as Element);

    expect(screen.findByText('HomePage')).toBeTruthy();
  });
});
