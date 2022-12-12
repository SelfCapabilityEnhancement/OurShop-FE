import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AccountManagement from '@/components/features/account-management/AccountManagement';
import * as service from '@/service';
import { Account } from '@/components/common/CustomTypes';

jest.mock('@/service', () => ({
  getAccountList: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('Account Management', () => {
  // const user = userEvent.setup();

  beforeEach(async () => {
    jest.spyOn(service, 'getAccountList').mockResolvedValue([] as Account[]);
    await act(async () => {
      render(<AccountManagement />, { wrapper: BrowserRouter });
    });
  });

  afterEach(cleanup);

  it('should show tabs', () => {
    expect(screen.getByText('Account List')).toBeInTheDocument();
    expect(screen.getByText('Role Configuration')).toBeInTheDocument();
    expect(screen.getByText('Function Configuration')).toBeInTheDocument();
  });
});
