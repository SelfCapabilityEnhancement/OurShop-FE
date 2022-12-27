import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AccountListTable from '@/components/features/account-management/components/AccountListTable/AccountListTable';
import { accounts, roles } from '@/mocks/mockData';
import * as service from '@/service';

jest.mock('@/service', () => ({}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

jest.mock('@/service', () => ({
  getRoleList: jest.fn(),
}));

describe('Account List', () => {
  jest.spyOn(service, 'getRoleList').mockResolvedValue(roles);

  beforeEach(async () => {
    await act(async () => {
      render(<AccountListTable userList={accounts} />, {
        wrapper: BrowserRouter,
      });
    });
  });

  afterEach(cleanup);

  it('should show account list tabs', () => {
    const tableHead = screen.getAllByTestId('account-table-head');
    expect(tableHead).toHaveLength(5);
    expect(tableHead[0]).toHaveTextContent('Username');
    expect(tableHead[1]).toHaveTextContent('Connection');
    expect(tableHead[2]).toHaveTextContent('Role');
    expect(tableHead[3]).toHaveTextContent('Created at');
    expect(tableHead[4]).toHaveTextContent('Action');
  });

  it('should show account list items', () => {
    expect(screen.getByText('Tom')).toBeInTheDocument();
    expect(screen.getByText('Buyer')).toBeInTheDocument();
    expect(screen.getByText('2022-12-06 09:54:30')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Buyer')).toBeInTheDocument();
    expect(screen.getByText('2022-12-07 06:52:37')).toBeInTheDocument();
    expect(screen.getAllByText('username')).toHaveLength(2);
    expect(screen.getAllByText('Access')).toHaveLength(2);
    expect(screen.getAllByText('Delete')).toHaveLength(2);
  });
});
