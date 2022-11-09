import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { Container } from 'react-dom';
import { act } from 'react-dom/test-utils';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn().mockResolvedValue([{ id: 2 }]),
  getShoppingCarts: jest.fn().mockResolvedValue({}),
}));

describe('Header test', () => {
  let container: Container;

  beforeEach(async () => {
    await act(async () => {
      container = render(<Header />, { wrapper: BrowserRouter }).container;
    });
  });

  describe('display part', () => {
    it('should render logo', () => {
      const logoIcon = container.querySelector('.logo');

      expect(logoIcon).toBeTruthy();
    });

    it('should render navigation list', () => {
      // const navList = container.querySelector('.nav-list');
      //
      // expect(navList?.children.length).toEqual(5);
      expect(screen.getByTestId('header')).toBeInTheDocument();
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
