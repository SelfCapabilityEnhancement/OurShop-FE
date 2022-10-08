import { Container } from 'react-dom';
import { render, screen } from '@testing-library/react';
import ShoppingCart from '@/components/features/shopping-cart/ShoppingCart';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as mock from '@/assets/mockData';


describe('display shopping cart page given nonempty products', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<ShoppingCart />, {wrapper: BrowserRouter}).container;
  });
  it('should display shopping cart list', () => {
    const products = container.querySelectorAll('.product');

    expect(products).toHaveLength(3);
  });
  it('should display pay button', () => {
    const payBtn = container.querySelectorAll('.payBtn');

    expect(payBtn.length).toBe(2);
  });
  it('should navigate to purchase-confirmation page', async () => {
    const element = container.querySelector('.token');
    await user.click(element as Element);
    expect(screen.findByText('Purchase Confirmation')).toBeTruthy();
  });

  it('should add one when click svg-plus',async ()=>{
    const plusBtn = screen.getAllByTestId('svg-plus')[0];

    await user.click(plusBtn);

    const count = screen.getAllByTestId('num')[0].textContent;
    expect(count).toBe('3');
  });
  it('svg-minus should be disabled when num of products is 1',async ()=>{
    const minusBtn = screen.getAllByTestId('svg-minus')[1];

    await user.click(minusBtn);
    const count = screen.getAllByTestId('num')[1].textContent;

    expect(count).toBe('1');
  });
  it('should minus one when click svg-minus',async()=>{
    const minusBtn = screen.getAllByTestId('svg-minus')[2];

    await userEvent.click(minusBtn);

    expect(screen.getAllByTestId('num')[2].textContent).toBe('2');
  });
});

describe('display empty message given empty products', () => {
  it('should display nothing in the shopping cart', () => {
    jest.spyOn(mock, 'getProducts').mockReturnValue([]);
    const container = render(<ShoppingCart />, {wrapper: BrowserRouter}).container;
    const emptyMsg = container.querySelector('.empty-msg');

    expect(emptyMsg).toBeTruthy();
  });
});
