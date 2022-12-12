import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import FeatureTable from './FeatureTable';
import { features } from '@/mocks/mockData';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('Function List', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<FeatureTable featureList={features} />, {
        wrapper: BrowserRouter,
      });
    });
  });

  afterEach(cleanup);

  test('should show function list', () => {
    const tableHead = screen.getAllByTestId('account-table-head');
    expect(tableHead).toHaveLength(5);
    expect(screen.getByText('Product Management')).toBeInTheDocument();
    expect(screen.getByText('/product/product-management')).toBeInTheDocument();
    expect(screen.getByText('2022-12-07 06:52:37')).toBeInTheDocument();
    expect(screen.getByText('Order Management')).toBeInTheDocument();
    expect(screen.getByText('/order/order-management')).toBeInTheDocument();
    expect(screen.getByText('2022-12-07 06:53:32')).toBeInTheDocument();
    expect(screen.getAllByText('Edit')).toHaveLength(2);
  });
});
