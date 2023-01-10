import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { Container } from 'react-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { useLoginStore } from '@/hooks/useLoginStore';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn().mockResolvedValue([{ id: 2 }]),
  getShoppingCarts: jest.fn().mockResolvedValue({}),
}));

describe('Header test when user not login', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Header />, { wrapper: BrowserRouter });
    });
  });

  afterEach(cleanup);

  describe('navigation event part', () => {
    const user = userEvent.setup();
    it('should not navigate to home when click ourshop img in login page', async function () {
      await user.click(screen.getAllByRole('img')[0]);
      expect(mockedNavigate).not.toHaveBeenCalledWith('/home');
    });
  });
});

describe('Header test when user has authority', () => {
  let container: Container;

  beforeEach(async () => {
    const accessiblePaths = [
      'account-management',
      'product-management',
      'order-management',
      'create-product',
    ];
    useLoginStore.setState({ accessiblePaths });
    await act(async () => {
      container = render(<Header />, { wrapper: BrowserRouter }).container;
    });
  });

  afterEach(cleanup);

  describe('display part', () => {
    it('should render logo', () => {
      const logoIcon = container.querySelector('.logo');

      expect(logoIcon).toBeTruthy();
    });

    it('should render navigation list', () => {
      const navList = container.querySelector('.nav-list');

      expect(navList?.children.length).toEqual(6);
    });

    it('should render user avatar', () => {
      const avatar = container.querySelector('.avatar');

      expect(avatar).toBeTruthy();
    });

    it('should show red dot after shopping cart when cart is not empty', () => {
      expect(screen.getByTestId('redDot')).toBeInTheDocument();
    });
  });

  describe('navigation event part', () => {
    it('should navigate to homepage when click the logo', async () => {});
    it('should navigate to the create product page when click the create product menu item', async () => {});
  });
});
