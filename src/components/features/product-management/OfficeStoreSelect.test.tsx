import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { mockStores } from '@/mocks/mockData';
import { officeList } from '@/components/features/create-product/CreateProduct';
import OfficeStoreSelect from '@/components/features/product-management/OfficeStoreSelect';

jest.mock('@/service', () => ({
  getAllOffices: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('Office store item', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <OfficeStoreSelect
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
    });
  });

  afterEach(cleanup);

  it('should show Office 1 item', async () => {
    expect(screen.getByTestId('drop-down')).toBeInTheDocument();
    expect(screen.getByText('has')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByTestId('add-store-item')).toBeInTheDocument();
  });
});
