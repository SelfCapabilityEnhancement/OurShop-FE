import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@/components/features/home-page/HomePage';
import { mockOffice, tempProducts, users } from '@/mocks/mockData';
import * as service from '@/service';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SaveUserInfo from '@/components/features/home-page/SaveUserInfo';

jest.mock('@/service', () => ({
  getProducts: jest.fn(),
  getCurrentUser: jest.fn(),
  getAllOffices: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('HomePage', () => {
  // const user = userEvent.setup();
  jest.spyOn(service, 'getProducts').mockResolvedValue(tempProducts);
  jest.spyOn(service, 'getCurrentUser').mockResolvedValue(users[1]);
  jest.spyOn(service, 'getAllOffices').mockResolvedValue(mockOffice);

  beforeEach(async () => {
    await act(async () => {
      render(<HomePage />, { wrapper: BrowserRouter });
      render(<SaveUserInfo isOpen={false} setIsOpen={jest.fn()} />, {
        wrapper: BrowserRouter,
      });
    });
  });

  afterEach(cleanup);

  it('should display products', async () => {
    const products = await screen.findAllByRole('img');

    expect(await screen.findByText(tempProducts[0].name)).toBeInTheDocument();
    expect(products).toHaveLength(tempProducts.length);
  });

  it('should show SearchBar', async () => {
    expect(screen.getByPlaceholderText('Search a product')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Filter');
    expect(screen.getByTestId('search-input')).toHaveDisplayValue('');
  });

  // it('should navigate to detail page when click product', async () => {
  //   const { name, description } = tempProducts[0];
  //
  //   await user.click(await screen.findByText(name));
  //
  //   expect(await screen.findByText(description)).toBeInTheDocument();
  // });
});
