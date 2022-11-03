import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MyWallet from '@/components/features/my-wallet/MyWallet';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn().mockResolvedValue([
    {
      id: 2,
      name: 'Ann',
      sex: 'Female',
      age: 23,
      address: 'Guanshan Road',
      office: 'Wuhan',
      token: 23,
      bankAccount: '123',
      avatar: 'avatar',
    },
  ]),
}));

describe('display wallet info', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(async () => {
    await act(async () => {
      container = render(<MyWallet />, { wrapper: BrowserRouter }).container;
    });
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
