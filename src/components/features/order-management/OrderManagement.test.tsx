import { render } from '@testing-library/react';
import OrderManagement from '@/components/features/order-management/OrderManagement';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('display my order', () => {
  const mockOrder = [
    {
      id: 1,
      productId: 1,
      productName: 'Product Name 1',
      purchaseDate: new Date('2022-01-01'),
      purchaseNumber: 1,
    },
    {
      id: 2,
      productId: 1,
      productName: 'Product Name 1',
      purchaseDate: new Date('2022-01-01'),
      purchaseNumber: 2,
    },
    {
      id: 3,
      productId: 2,
      productName: 'Product Name 2',
      purchaseDate: new Date('2022-01-01'),
      purchaseNumber: 1,
    },
    {
      id: 4,
      productId: 2,
      productName: 'Product Name 2',
      purchaseDate: new Date('2022-01-01'),
      purchaseNumber: 2,
    },
    {
      id: 5,
      productId: 2,
      productName: 'Product Name 2',
      purchaseDate: new Date('2022-01-01'),
      purchaseNumber: 3,
    },
  ];
  let container: Container;

  beforeEach(() => {
    container = render(<OrderManagement />, {
      wrapper: BrowserRouter,
    }).container;
  });
  test('should render datePicker, apply button, reset button and OrderItem for Admin', () => {
    expect(container.querySelectorAll('.order-item-admin')).toBeTruthy();
    expect(
      container.querySelector('.start-end-date-picker')
    ).toBeInTheDocument();
    expect(container.querySelector('.apply-button')).toBeInTheDocument();
    expect(container.querySelector('.reset-button')).toBeInTheDocument();
  });
  test('should count total order number for each product', () => {
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('Product Name 1number: 3');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('Product Name 2number: 6');
  });
});
