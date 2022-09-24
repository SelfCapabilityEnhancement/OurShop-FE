import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header test', () => {
  describe('display part', () => {
    it('should render logo', () => {
      const { container } = render(<Header />);
      const logoIcon = container.querySelector('.logo');

      expect(logoIcon).toBeTruthy();
    });

    it('should render navigation list', () => {
      const { container } = render(<Header />);
      const navList = container.querySelector('.nav-list');

      expect(navList?.children.length).toEqual(3);
    });

    it('should render user avatar', () => {
      const { container } = render(<Header />);
      const avatar = container.querySelector('.avatar');

      expect(avatar).toBeTruthy();
    });
  });

  describe('navigation event part', () => {});
});
