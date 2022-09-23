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

    it('should render navigate list', () => {
      const { container } = render(<Header />);
      const navList = container.querySelector('.nav-list');

      expect(navList?.children.length).toEqual(3);
    });
  });

  describe('navigate event part', () => {});
});
