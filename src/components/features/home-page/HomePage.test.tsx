import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@/components/features/home-page/HomePage';
import { tempProducts } from '@/mocks/mockData';
import * as service from '@/service';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.mock('@/service', () => ({
  getProducts: jest.fn(),
}));

describe('HomePage', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.spyOn(service, 'getProducts').mockResolvedValue(tempProducts);
    render(<HomePage />, { wrapper: BrowserRouter });
  });

  it('should display products', async () => {
    const products = await screen.findAllByRole('img');

    expect(await screen.findByText(tempProducts[0].name)).toBeInTheDocument();
    expect(products).toHaveLength(tempProducts.length);
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
