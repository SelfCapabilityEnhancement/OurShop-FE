import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import Profile from '@/components/features/profile/Profile';
import { BrowserRouter } from 'react-router-dom';


describe('display profile option', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<Profile />, { wrapper: BrowserRouter }).container;
  });
  it('should display options when click avatar', async () => {
    // given
    const avatar = container.querySelector('.avatar');

    // when
    await user.click(avatar as Element);

    // then
    expect(container.querySelector('.wallet')).toBeTruthy();
    expect(container.querySelector('.settings')).toBeTruthy();
  });

  it('should navigate to wallet page when click my wallet', async () => {
    // given
    const avatar = container.querySelector('.avatar');

    // when
    await user.click(avatar as Element);
    const wallet = container.querySelector('.wallet');
    await user.click(wallet as Element);

    // then
    expect(screen.findByText('My Wallet')).toBeTruthy();
  });
});
