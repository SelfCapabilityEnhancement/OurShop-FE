import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MyWallet from '@/components/features/my-wallet/MyWallet';
import { BrowserRouter } from 'react-router-dom';

describe('display wallet info', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<MyWallet />, { wrapper: BrowserRouter }).container;
  });
  it('should display wallet info', async () => {
    const wallet = container.querySelector('.wallet-header');

    expect(wallet).toBeTruthy();
    expect(screen.getByText('My Tokens')).toBeTruthy();
    expect(screen.getByText('My Bank Account')).toBeTruthy();
    expect(screen.getByText('Good to Go')).toBeTruthy();
  });

  it('should navigate to home when click good to go', async () => {
    const button = container.querySelector('.go-home');

    await user.click(button as Element);

    expect(screen.findByText('HomePage')).toBeTruthy();
  });
});
