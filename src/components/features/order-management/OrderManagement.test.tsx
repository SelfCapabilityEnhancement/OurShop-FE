import { render, screen } from '@testing-library/react';
import OrderManagement from '@/components/features/order-management/OrderManagement';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    get: jest.fn(),
  },
}));

jest.mock('@/components/common/chart/Chart', () => ({
  default: jest.fn().mockImplementation(() => <div />),
}));

describe('display my order', () => {
  let container: Container;
  const user = userEvent.setup();
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
  }));

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
    ).toBe('苹果number: 1');
  });

  test('should filter orders by date range when input date range and count total order number for each product', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const endDateInput = container.querySelector(' .end-date');
    const applyButton = container.querySelector('.apply-button');

    await user.type(startDateInput as Element, '10/01/2022');
    await user.type(endDateInput as Element, '10/02/2022');
    await user.click(applyButton as Element);

    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果number: 1');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('橘子number: 1');
  });

  test('should filter orders by start date when only input start date and count total order number for each product', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const applyButton = container.querySelector('.apply-button');

    await user.type(startDateInput as Element, '10/02/2022');
    await user.click(applyButton as Element);

    expect(container.querySelectorAll('.order-item-admin').length).toBe(1);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('橘子number: 1');
  });

  test('should filter orders by end date when only input end date and count total order number for each product', async () => {
    const endDateInput = container.querySelector(' .end-date');
    const applyButton = container.querySelector('.apply-button');

    await user.type(endDateInput as Element, '10/01/2022');
    await user.click(applyButton as Element);

    expect(container.querySelectorAll('.order-item-admin').length).toBe(1);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果number: 1');
  });

  test('should show all orders when do not input any date and count total order number for each product', async () => {
    const applyButton = container.querySelector('.apply-button');
    await user.click(applyButton as Element);

    expect(container.querySelectorAll('.order-item-admin').length).toBe(2);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果number: 1');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('橘子number: 1');
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

  test('should clear date range input and show all orders when click reset button', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const endDateInput = container.querySelector(' .end-date');
    const applyButton = container.querySelector('.apply-button');
    const resetButton = container.querySelector('.reset-button');

    await user.type(startDateInput as Element, '09/03/2022');
    await user.type(endDateInput as Element, '09/03/2022');
    await user.click(applyButton as Element);
    await user.click(resetButton as Element);
    expect(container.querySelectorAll('.order-item-admin').length).toBe(2);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果number: 1');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('橘子number: 1');
    expect(screen.getAllByRole('textbox')[0].textContent).toBe('');
    expect(screen.getAllByRole('textbox')[1].textContent).toBe('');
  });

  test('should display order management header', () => {
    const orderStatusLabels = container.querySelectorAll('.order-status-label');
    expect(orderStatusLabels.length).toBe(3);
    expect(orderStatusLabels[0].textContent).toBe('Sales Overview');
    expect(orderStatusLabels[1].textContent).toBe('Pending Order');
    expect(orderStatusLabels[2].textContent).toBe('Historical Order');
  });

  test('should only display pending orders when click pending order label', async () => {
    const pendingOrderLabel = await container.querySelector('.pendingOrder');
    await user.click(pendingOrderLabel as Element);
    const ordersItems = container.querySelectorAll('.order-item-admin');
    expect(ordersItems.length).toBe(1);
    expect(ordersItems[0].textContent).toBe('苹果number: 1View Detail');
  });

  test('should only display finished orders when click pending order label', async () => {
    const pendingOrderLabel = container.querySelector('.historicalOrder');
    await user.click(pendingOrderLabel as Element);
    const ordersItems = container.querySelectorAll('.order-item-admin');
    expect(ordersItems.length).toBe(1);
    expect(ordersItems[0].textContent).toBe(
      '橘子Ordered Date: 10/12/2022Number: 1View Detail'
    );
  });

  test('should display order detail window when click View Detail Button in Pending or Historical order status', async () => {
    const pendingOrderLabel = container.querySelector('.historicalOrder');
    await user.click(pendingOrderLabel as Element);
    const viewDetail = container.querySelector('.view-detail');
    await user.click(viewDetail as Element);
    expect(await screen.findByText('Order Detail')).toBeInTheDocument();
  });
});
