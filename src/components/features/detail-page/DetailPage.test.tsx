import { render, screen } from '@testing-library/react';
import DetailPage from '@/components/features/detail-page/DetailPage';
import userEvent from '@testing-library/user-event';
import { tempProducts } from '@/mocks/mockData';
import * as ReactRouter from 'react-router';
import { Location } from 'react-router-dom';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    get: jest.fn().mockResolvedValue({
      data: [
        {
          id: 2,
          name: 'Ann',
          sex: 'Female',
          age: 23,
          address: 'Guanshan Road',
          office: 'Wuhan',
          token: 23,
          bankAccount: '123',
          avatar: 'avatar',
        },
      ],
    }),
  },
}));

window.IntersectionObserver = jest.fn()
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

  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    render(<DetailPage />);
  });

  test('should show product picture', () => {
    expect(screen.getByAltText(/big product picture/i)).toBeInTheDocument();
    expect(screen.getAllByAltText(/small product picture.*?/i).length).toBe(2);
  });

  test('should show detail page', () => {
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`price: $${mockProduct.priceMoney} or ${mockProduct.priceToken} token`))
      .toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    expect(screen.getByText('No. of purchase')).toBeInTheDocument();

    expect(screen.getByTestId('counter')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add in shopping cart/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /purchase/i })
    ).toBeInTheDocument();
  });

  test('should show another picture when click small product picture', async () => {
    await userEvent.click(screen.getByAltText('small product picture 1'));
    expect(screen.queryByAltText('big product picture 1')).toBeInTheDocument();
  });

  test('should show banner when click add to shopping cart button', async () => {
    await user.click(screen.getByText('add in shopping cart'));

    expect(await screen.findByText(
      'Please choose one logistic method!'))
      .toBeInTheDocument();
  });

  test('should show title of logistic method', () => {
    expect(screen.getByText('Logistic method')).toBeInTheDocument();
    expect(screen.getByText('collecting at office')).toBeInTheDocument();
    expect(screen.getByText('shipping to an address')).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(2);
  });

  test('should show error prompt when not click any logistic method', async () => {
    await userEvent.click(screen.getByText('add in shopping cart'));
    expect(screen.queryByText('Please choose one logistic method!')).toBeInTheDocument();
    setTimeout(() => {
      expect(screen.getByText('Please choose one logistic method!'))
        .not
        .toBeInTheDocument();
    }, 3000);
  });

  test('should add one when click svg-plus', async () => {
    await userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
  });

  test('svg-minus should be disabled when num of products is 1', async () => {
    await userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });

  test('should minus one when click svg-minus', async () => {
    await userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
    await userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });

});
