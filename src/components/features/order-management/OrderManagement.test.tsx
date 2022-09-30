import { getByRole, render, screen } from '@testing-library/react';
import OrderManagement from '@/components/features/order-management/OrderManagement';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('display my order', () => {
  const mockOrder = [
    {
      id: 1,
      productId: 1,
      productName: 'Product Name 1',
      purchaseDate: new Date('2022-09-01'),
      purchaseNumber: 1,
    },
    {
      id: 2,
      productId: 1,
      productName: 'Product Name 1',
      purchaseDate: new Date('2022-09-02'),
      purchaseNumber: 2,
    },
    {
      id: 3,
      productId: 2,
      productName: 'Product Name 2',
      purchaseDate: new Date('2022-09-01'),
      purchaseNumber: 1,
    },
    {
      id: 4,
      productId: 2,
      productName: 'Product Name 2',
      purchaseDate: new Date('2022-09-02'),
      purchaseNumber: 2,
    },
    {
      id: 5,
      productId: 2,
      productName: 'Product Name 2',
      purchaseDate: new Date('2022-09-03'),
      purchaseNumber: 3,
    },
  ];
  let container: Container;
  const user = userEvent.setup();
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
  test('should filter orders by date range when input date range and count total order number for each product', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const endDateInput = container.querySelector(' .end-date');
    const applyButton = container.querySelector('.apply-button');

    await user.type(startDateInput as Element, '09/01/2022');
    await user.type(endDateInput as Element, '09/02/2022');
    await user.click(applyButton as Element);

    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('Product Name 1number: 3');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('Product Name 2number: 3');
  });

  test('should filter orders by start date when only input start date and count total order number for each product', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const applyButton = container.querySelector('.apply-button');

    await user.type(startDateInput as Element, '09/03/2022');
    await user.click(applyButton as Element);

    expect(container.querySelectorAll('.order-item-admin').length).toBe(1);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('Product Name 2number: 3');
  });
  test('should filter orders by end date when only input end date and count total order number for each product', async () => {
    const endDateInput = container.querySelector(' .end-date');
    const applyButton = container.querySelector('.apply-button');

    await user.type(endDateInput as Element, '09/01/2022');
    await user.click(applyButton as Element);

    expect(container.querySelectorAll('.order-item-admin').length).toBe(2);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('Product Name 1number: 1');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('Product Name 2number: 1');
  });
  test('should show all orders when do not input any date and count total order number for each product', async () => {
    const applyButton = container.querySelector('.apply-button');
    await user.click(applyButton as Element);

    expect(container.querySelectorAll('.order-item-admin').length).toBe(2);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('Product Name 1number: 3');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('Product Name 2number: 6');
  });
  test('should do not show any order when input incoorect date range', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const endDateInput = container.querySelector(' .end-date');
    const applyButton = container.querySelector('.apply-button');

    await user.type(startDateInput as Element, '09/02/2022');
    await user.type(endDateInput as Element, '09/01/2022');
    await user.click(applyButton as Element);

    expect(container.querySelectorAll('.order-item-admin').length).toBe(0);
  });
});
