import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import Profile from '@/components/features/profile/Profile';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    get: jest.fn(),
  },
}));

describe('display profile option', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<Profile />, { wrapper: BrowserRouter }).container;
  });
  it('should display options when click avatar', async () => {
    const avatar = container.querySelector('.avatar');

    await user.click(avatar as Element);

    expect(container.querySelector('.wallet')).toBeTruthy();
    expect(container.querySelector('.address')).toBeTruthy();
    expect(container.querySelector('.settings')).toBeTruthy();
  });

  it('should navigate to wallet page when click my wallet', async () => {
    const avatar = container.querySelector('.avatar');

    await user.click(avatar as Element);
    const wallet = container.querySelector('.wallet');

    await user.click(wallet as Element);

    expect(screen.findByText('My Wallet')).toBeTruthy();
  });

  it('should navigate to address page when click my address', async () => {
    const avatar = container.querySelector('.avatar');

    await user.click(avatar as Element);
    const address = container.querySelector('.address');
    await user.click(address as Element);

    expect(screen.findByText('My Address')).toBeTruthy();
  });
});
