import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@/components/features/home-page/HomePage';
import { tempProducts } from '@/mocks/mockData';
import { http } from '@/service';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    get: jest.fn(),
  },
}));

describe('HomePage', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.spyOn(http, 'get').mockResolvedValue({ data: tempProducts });
    render(<HomePage />, { wrapper: BrowserRouter });
  });

  it('should display products',  () => {
    waitFor(() => {
      const products = screen.findAllByRole('img');
      expect(screen.findByText(tempProducts[0].name)).toBeInTheDocument();
      expect(products).toHaveLength(tempProducts.length);
    });
  });

  it('should navigate to detail page when click product', () => {
    const { name, description } = tempProducts[0];

    act(async () => {
      await user.click(await screen.findByText(name));
    });

    waitFor(async () => {
      expect(await screen.findByText(description)).toBeInTheDocument();
    });
  });
});
