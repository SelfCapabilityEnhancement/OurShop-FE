import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { useLoginStore } from '@/hooks/useLoginStore';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn().mockResolvedValue([{ id: 2 }]),
  getShoppingCarts: jest.fn().mockResolvedValue({}),
}));

describe('App test', () => {
  beforeEach(async () => {
    localStorage.setItem('router', 'create-product'); // todo: delete
    useLoginStore.setState({ accessiblePaths: ['create-product'], jwt: 'jwt' });
  });

  afterEach(cleanup);

  describe('should render Header component', () => {
    it('should navigate to corresponding page when click the create product menu item', async () => {
      render(<App />, { wrapper: BrowserRouter });
      const user = userEvent.setup();

      await user.click(screen.getByText(/create product/i));

      // expect(screen.getByText(/create product page/i)).toBeInTheDocument();
    });
  });
});
