import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockStores } from '@/mocks/mockData';
import { officeList } from '@/components/features/create-product/CreateProduct';
import OfficeStoreSelect from '@/components/features/product-management/OfficeStoreSelect';
import userEvent from '@testing-library/user-event';

jest.mock('@/service', () => ({
  getAllOffices: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('Office store item', () => {
  const user = userEvent.setup();

  it('should show Office 1 item', async () => {
    render(
      <OfficeStoreSelect
        index={0}
        storeItem={mockStores[0]}
        officeList={officeList}
        error={{ office: false, inventory: false }}
        isMinCounts={true}
        isMaxCounts={false}
        setStoreItem={jest.fn}
        addStoreItem={jest.fn}
        deleteStoreItem={jest.fn}
      />,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByTestId('drop-down')).toBeInTheDocument();
    expect(screen.getByText('has')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByTestId('add-store-item')).toBeInTheDocument();
  });

  it('should addStoreItem to be called', async () => {
    const addStoreItem = jest.fn();
    render(
      <OfficeStoreSelect
        index={0}
        storeItem={mockStores[0]}
        officeList={officeList}
        error={{ office: false, inventory: false }}
        isMinCounts={true}
        isMaxCounts={false}
        setStoreItem={jest.fn}
        addStoreItem={addStoreItem}
        deleteStoreItem={jest.fn}
      />,
      { wrapper: BrowserRouter }
    );
    const addBtn = screen.getByTestId('add-store-item');
    await user.click(addBtn);

    expect(addStoreItem).toBeCalled();
  });

  it('should setStoreItem to be called', async () => {
    const setStoreItem = jest.fn();
    render(
      <OfficeStoreSelect
        index={0}
        storeItem={mockStores[0]}
        officeList={officeList}
        error={{ office: false, inventory: false }}
        isMinCounts={true}
        isMaxCounts={false}
        setStoreItem={setStoreItem}
        addStoreItem={jest.fn}
        deleteStoreItem={jest.fn}
      />,
      { wrapper: BrowserRouter }
    );
    const numInput = await screen.getByTestId('product-number');
    await user.type(numInput, '50');

    expect(setStoreItem).toBeCalled();
  });
});
