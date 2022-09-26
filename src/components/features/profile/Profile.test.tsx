import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';
import { Container } from 'react-dom';
import Profile from '@/components/features/profile/Profile';
import { BrowserRouter } from 'react-router-dom';


describe('display profile option', () => {
  let container: Container;

  beforeEach(() => {
    container = render(<Profile />, { wrapper: BrowserRouter }).container;
  });
  it('should display options when click avatar', async () => {
    // given
    const avatar = container.querySelector('.avatar');

    // when
    await act(async ()=> {
      await userEvent.click(avatar as Element);
    });

    // then
    await waitFor(() => {
      expect(container.querySelector('.wallet')).toBeTruthy();
      expect(container.querySelector('.settings')).toBeTruthy();
    });
  });
});
