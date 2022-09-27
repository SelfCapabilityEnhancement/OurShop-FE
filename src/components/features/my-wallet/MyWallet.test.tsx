import { Container } from 'react-dom';
import { render } from '@testing-library/react';
import MyWallet from '@/components/features/my-wallet/MyWallet';
import { BrowserRouter } from 'react-router-dom';

describe('display wallet info', () => {
  let container: Container;

  beforeEach(() => {
    container = render(<MyWallet />, { wrapper: BrowserRouter }).container;
  });
  it('should display wallet info', async () => {
    // given

    // when
    const wallet = container.querySelector('.wallet-header');

    // then
    expect(wallet).toBeTruthy();
  });
});
