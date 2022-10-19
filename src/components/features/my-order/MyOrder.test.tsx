import { render } from '@testing-library/react';
import MyOrder from '@/components/features/my-order/MyOrder';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('display my order', () => {
  let container: Container;

  beforeEach(() => {
    container = render(<MyOrder />, { wrapper: BrowserRouter }).container;
  });
  test('render all OrderItems', () => {
    expect(container.querySelectorAll('.order-item').length).toBe(2);
  });
});
