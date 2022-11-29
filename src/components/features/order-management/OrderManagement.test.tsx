import { act, render, screen } from '@testing-library/react';
import OrderManagement from '@/components/features/order-management/OrderManagement';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as service from '@/service';
import { mockOrdersItems, mockUpdatedOrdersItems } from '@/mocks/mockData';

jest.mock('echarts-for-react', () => ({
  default: jest.fn().mockReturnValue(<div></div>),
}));

jest.mock('lodash.clonedeep', () => ({
  default: jest.fn().mockImplementation((data) => data),
}));

jest.mock('@/service', () => ({
  getAllOrdersItems: jest.fn(),
  updateOrders: jest.fn().mockResolvedValue([]),
}));

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(() => ({ observe: () => null, disconnect: () => null }));

describe('display order management', () => {
  let container: Container;
  const user = userEvent.setup();
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
  }));

  beforeEach(async () => {
    jest
      .spyOn(service, 'getAllOrdersItems')
      .mockResolvedValueOnce(mockOrdersItems)
      .mockResolvedValue(mockUpdatedOrdersItems);

    await act(async () => {
      container = await render(<OrderManagement />, {
        wrapper: BrowserRouter,
      }).container;
    });
  });

  test('should render datePicker, apply button, reset button and OrderItem for Admin', () => {
    expect(container.querySelectorAll('.order-item-admin')).toBeTruthy();
    expect(
      container.querySelector('.start-end-date-picker')
    ).toBeInTheDocument();
    expect(container.querySelector('.apply')).toBeInTheDocument();
    expect(container.querySelector('.reset')).toBeInTheDocument();
  });

  test('should count total order number for each product', () => {
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果Number: 1');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('橘子Number: 1');
  });

  test('should filter orders by date range when input date range and count total order number for each product', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const endDateInput = container.querySelector(' .end-date');
    const applyButton = container.querySelector('.apply');

    await user.type(startDateInput as Element, '10/01/2022');
    await user.type(endDateInput as Element, '10/01/2022');
    await user.click(applyButton as Element);
    expect(container.querySelectorAll('.order-item-admin').length).toBe(1);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果Number: 1');
  });

  test('should filter orders by start date when only input start date and count total order number for each product', async () => {
    const startDateInput = container.querySelector('.start-date');
    const applyButton = container.querySelector('.apply');

    await user.type(startDateInput as Element, '10/02/2022');
    await user.click(applyButton as Element);
    expect(container.querySelectorAll('.order-item-admin').length).toBe(1);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('橘子Number: 1');
  });

  test('should filter orders by end date when only input end date and count total order number for each product', async () => {
    const endDateInput = container.querySelector('.end-date');
    const applyButton = container.querySelector('.apply');

    await user.type(endDateInput as Element, '10/01/2022');
    await user.click(applyButton as Element);
    expect(container.querySelectorAll('.order-item-admin').length).toBe(1);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果Number: 1');
  });

  test('should show all orders when do not input any date and count total order number for each product', async () => {
    const applyButton = container.querySelector('.apply');
    await user.click(applyButton as Element);
    expect(container.querySelectorAll('.order-item-admin').length).toBe(2);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果Number: 1');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('橘子Number: 1');
  });

  test('should do not show any order when input incoorect date range', async () => {
    const startDateInput = container.querySelector('.start-date');
    const endDateInput = container.querySelector('.end-date');
    const applyButton = container.querySelector('.apply');
    await user.type(startDateInput as Element, '10/02/2022');
    await user.type(endDateInput as Element, '10/01/2022');
    await user.click(applyButton as Element);
    expect(container.querySelectorAll('.order-item-admin').length).toBe(0);
  });

  test('should clear date range input and show all orders when click reset button', async () => {
    const startDateInput = container.querySelector('.start-date');
    const endDateInput = container.querySelector('.end-date');
    const applyButton = container.querySelector('.apply');
    const resetButton = container.querySelector('.reset');
    await user.type(startDateInput as Element, '09/03/2022');
    await user.type(endDateInput as Element, '09/03/2022');
    await user.click(applyButton as Element);
    await user.click(resetButton as Element);
    expect(container.querySelectorAll('.order-item-admin').length).toBe(2);
    expect(
      container.querySelectorAll('.order-item-admin').item(0).textContent
    ).toBe('苹果Number: 1');
    expect(
      container.querySelectorAll('.order-item-admin').item(1).textContent
    ).toBe('橘子Number: 1');
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
    expect(ordersItems[0].textContent).toBe('苹果Number: 1View Detail');
  });

  test('should only display finished orders when click historical order label', async () => {
    const historicalOrderLabel = container.querySelector('.historicalOrder');
    await user.click(historicalOrderLabel as Element);
    const ordersItems = container.querySelectorAll('.order-item-admin');
    expect(ordersItems.length).toBe(1);
    expect(ordersItems[0].textContent).toBe(
      '橘子Order is Made on: 2022-10-12Number: 1View Detail'
    );
  });

  test('should display order detail window when click View Detail Button in Pending or Historical order status', async () => {
    const pendingOrderLabel = container.querySelector('.pendingOrder');
    await user.click(pendingOrderLabel as Element);
    const viewDetail = container.querySelector('.view-detail');
    await user.click(viewDetail as Element);
    expect(await screen.findByText('Order Detail')).toBeInTheDocument();
  });

  // test('should show success message and delete from pending orders when order is made successfully', async () => {
  //   const pendingOrder = screen.getByText('Pending Order');
  //   await user.click(pendingOrder);
  //
  //   const viewDetail = screen.getByText('View Detail');
  //   await user.click(viewDetail);
  //
  //   const orderMade = screen.getByText('Order is Made');
  //   await user.click(orderMade);
  //
  //   expect(
  //     screen.queryByText('Order is Made Successfully!')
  //   ).toBeInTheDocument();
  //   expect(screen.queryByText('View Detail')).not.toBeInTheDocument();
  // });

  test('should only choose endDate after startDate in calendar', async () => {
    const startDateInput = container.querySelector(' .start-date');
    const endDateInput = container.querySelector(' .end-date');

    await user.type(startDateInput as Element, '10/29/2022');
    await user.type(endDateInput as Element, '10/01/2022');
    expect(screen.findByText('10/29/2022')).toBeTruthy();
    expect(screen.findByText('Time')).toBeTruthy();
  });
});
