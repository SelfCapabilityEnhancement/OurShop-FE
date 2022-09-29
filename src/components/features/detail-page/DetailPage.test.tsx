import {render, screen} from '@testing-library/react';
import DetailPage from '@/components/features/detail-page/DetailPage';
import userEvent from '@testing-library/user-event';

describe('Detail Page', () => {
  beforeEach(() => {
    render(<DetailPage/>);
  });
  test('should show product picture', () => {
    expect(screen.getByAltText(/big product picture/i)).toBeInTheDocument();
    expect(screen.getAllByAltText(/small product picture.*?/i).length).toBe(5);
  });
  test('should show detail page', () => {
    expect(screen.getByText(/here is a book name xxxx/i)).toBeInTheDocument();
    expect(screen.getByText(/price: 111 or 5 token/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText('xxx')).toBeInTheDocument();

    expect(screen.getByText('No. of purchase')).toBeInTheDocument();

    expect(screen.getByTestId('counter')).toBeInTheDocument();
    expect(
        screen.getByRole('button', {name: /add in shopping cart/i})
    ).toBeInTheDocument();
    expect(
        screen.getByRole('button', {name: /purchase/i})
    ).toBeInTheDocument();
  });
  test('should show another picture when click small product picture', async () => {
    await userEvent.click(screen.getByAltText('small product picture 2'));
    expect(screen.queryByAltText('big product picture 2')).toBeInTheDocument();
  });
  test('should show banner when click adding to shopping cart button',async ()=>{
    await userEvent.click(screen.getByText('add in shopping cart'));
    expect(screen.getByText('The product was added into shopping cart successfully!')).toBeInTheDocument();
    setTimeout(() => {
      expect(screen.queryByText('The product was added into shopping cart successfully!')).not.toBeInTheDocument();
    }, 3000);
  });

  test('should add one when click svg-plus',async ()=>{
    await userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
  });
  test('svg-minus should be disabled when num of products is 1',async ()=>{
    await userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });
  test('should minus one when click svg-minus',async()=>{
    await userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
    await userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });
});
