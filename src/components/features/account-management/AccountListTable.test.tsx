import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AccountListTable from '@/components/features/account-management/AccountListTable';
import { accounts } from '@/mocks/mockData';

jest.mock('@/service', () => ({}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('Account List', () => {
  // const user = userEvent.setup();

  beforeEach(async () => {
    await act(async () => {
      render(<AccountListTable userList={accounts} />, {
        wrapper: BrowserRouter,
      });
    });
  });

  afterEach(cleanup);

  it('should show account list tabs', () => {
    expect(screen.getAllByTestId('account-tab-title')).toHaveLength(5);

    expect(screen.getAllByTestId('account-tab-title')[0]).toHaveTextContent(
      'Username'
    );
    expect(screen.getAllByTestId('account-tab-title')[1]).toHaveTextContent(
      'Connection'
    );
    expect(screen.getAllByTestId('account-tab-title')[2]).toHaveTextContent(
      'Role'
    );
    expect(screen.getAllByTestId('account-tab-title')[3]).toHaveTextContent(
      'Created at'
    );
    expect(screen.getAllByTestId('account-tab-title')[4]).toHaveTextContent(
      'Action'
    );
  });

  it('should show account list items', () => {
    expect(screen.getByText('Tom')).toBeInTheDocument();
    expect(screen.getAllByText('username')).toHaveLength(2);
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('2022-12-06 09:54:30')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Buyer')).toBeInTheDocument();
    expect(screen.getByText('2022-12-07 06:52:37')).toBeInTheDocument();
    expect(screen.getAllByText('Access')).toHaveLength(2);
    expect(screen.getAllByText('Delete')).toHaveLength(2);
  });
});
