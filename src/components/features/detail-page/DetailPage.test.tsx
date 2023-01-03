import { render, screen } from '@testing-library/react';
import DetailPage from '@/components/features/detail-page/DetailPage';
import userEvent from '@testing-library/user-event';
import { tempProducts } from '@/mocks/mockData';
import * as ReactRouter from 'react-router';
import { BrowserRouter, Location } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

jest.mock('@/service', () => ({
  getProductStockById: jest.fn(),
  getCurrentUser: jest.fn().mockResolvedValue([{ id: 2 }]),
  addToCarts: jest.fn().mockImplementation(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }),
}));

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(() => ({ observe: () => null, disconnect: () => null }));

describe('Detail Page', () => {
  const user = userEvent.setup();
  const mockProduct = tempProducts[0];
  const mockLocation: Location = {
    key: 'default',
    pathname: '',
    search: '',
    hash: '',
    state: { product: mockProduct },
  };

  jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);

  beforeEach(async () => {
    await act(async () => {
      render(<DetailPage />, {
        wrapper: BrowserRouter,
      });
    });
  });

  test('should show product picture', () => {
    expect(screen.getByAltText(/big product picture/i)).toBeInTheDocument();
    expect(screen.getAllByAltText(/small product picture.*?/i).length).toBe(2);
  });

  test('should show detail page', () => {
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Price: $${mockProduct.priceMoney} or ${mockProduct.priceToken} Token`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    expect(screen.getByText('No. of Purchase')).toBeInTheDocument();

    expect(screen.getByTestId('counter')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add in Shopping Cart/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Purchase/i })
    ).toBeInTheDocument();
  });

  test('should show another picture when click small product picture', async () => {
    await user.click(screen.getByAltText('small product picture 1'));
    expect(screen.queryByAltText('big product picture 1')).toBeInTheDocument();
  });

  test('should show title of Office & Inventory', () => {
    expect(screen.getByText('Office & Inventory')).toBeInTheDocument();
    expect(screen.getByText('Beijing : 50')).toBeInTheDocument();
    expect(screen.getByText('Chengdu : 60')).toBeInTheDocument();
  });

  test('should show processing and success message when add in shopping cart', async () => {
    const addInCart = screen.getByText('Add in Shopping Cart');

    await user.click(addInCart);

    expect(await screen.findByText('Processing...')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'The Product was Added into Shopping Cart Successfully!'
      )
    ).toBeInTheDocument();
  });

  test('should add one when click svg-plus', async () => {
    await user.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
  });

  test('svg-minus should be disabled when num of products is 1', async () => {
    await user.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });

  test('should minus one when click svg-minus', async () => {
    await user.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
    await user.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });

  test('should display breadcrumb', () => {
    expect(screen.getByText('Product Detail')).toBeInTheDocument();
  });
});
