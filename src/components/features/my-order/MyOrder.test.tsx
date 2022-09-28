import { render, screen } from '@testing-library/react';
import MyOrder from '@/components/features/my-order/MyOrder';
import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event/index';
import { BrowserRouter } from 'react-router-dom';

describe('display my order', () => {
  const mockOrder = [
    {
      productName: 'Product Name',
      purchaseDate: '11.10.2022',
      purchaseNumber: '1',
    },
    {
      productName: 'Product Name2',
      purchaseDate: '11.12.2022',
      purchaseNumber: '2',
    },
  ];
  let container: Container;

  beforeEach(() => {
    container = render(<MyOrder />, { wrapper: BrowserRouter }).container;
  });
  test('render all OrderItems', () => {
    expect(container.querySelectorAll('.order-item').length).toBe(2);
  });
});
