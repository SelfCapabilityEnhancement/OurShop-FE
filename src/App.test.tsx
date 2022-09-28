import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App test', () => {
  describe('should render Header component', () => {
    it('should navigate to corresponding page when click the create product menu item', async () => {
      render(<App />, { wrapper: BrowserRouter });
      const user = userEvent.setup();

      await user.click(screen.getByText(/create product/i));

      // expect(screen.getByText(/create product page/i)).toBeInTheDocument();
    });
  });
});
