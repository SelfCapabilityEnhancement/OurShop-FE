import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CreateProduct from '@/components/features/create-product/CreateProduct';
import userEvent from '@testing-library/user-event';



describe('Create product test', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<CreateProduct />, {wrapper: BrowserRouter}).container;
  });

  it('should display create product form', () => {
    expect(screen.getByText('product name')).toBeInTheDocument();
    expect(screen.getByText('price in USD')).toBeInTheDocument();
    expect(screen.getByText('price in token')).toBeInTheDocument();
    expect(screen.getByText('product description')).toBeInTheDocument();
    expect(screen.getByText('picture')).toBeInTheDocument();
    expect(container.querySelector('.create.button')).toBeInTheDocument();
  });

  it('should display product info when edited', () => {
    const inputs = [
      {id: '#name', value: 'product Name'},
      {id: '#usd', value: '123'},
      {id: '#token', value: '321'},
      {id: '#description', value: 'product Description'},
    ];

    inputs.forEach(async ({ id, value }) => {
      const input = container.querySelector(id);

      await user.type(input as Element, value);

      expect(input).toHaveValue(value);
    });
  });
});
