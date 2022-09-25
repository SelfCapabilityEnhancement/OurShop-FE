import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App test', () => {
  describe('navigation event part', () => {
    it('should navigate to corresponding page when click the create product menu item', async () => {
      render(<App />, { wrapper: BrowserRouter });
      const user = userEvent.setup();

      await user.click(screen.getByText(/Create Product/i));

      expect(
        screen.getByText(/you are on the create product page/i)
      ).toBeInTheDocument();
    });
  });
});
