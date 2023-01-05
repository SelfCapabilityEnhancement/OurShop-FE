import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AccountManagement from '@/components/features/account-management/AccountManagement';
import * as service from '@/service';
import { Account, Feature, Role } from '@/components/common/CustomTypes';
import { accounts, features, roles } from '@/mocks/mockData';

jest.mock('@/service', () => ({
  getAccountList: jest.fn(),
  getRoleList: jest.fn(),
  getFeatureList: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('When user has no access to account-management', () => {
  it('When user not login to access account-management, should show tabs', async () => {
    jest.spyOn(service, 'getAccountList').mockResolvedValue(accounts);
    jest.spyOn(service, 'getRoleList').mockResolvedValue(roles);
    jest.spyOn(service, 'getFeatureList').mockResolvedValue(features);

    await act(async () => {
      render(<AccountManagement />, { wrapper: BrowserRouter });
    });
    expect(screen.getByText('Not Login')).toBeInTheDocument();
  });

  it('When user not have access, should show tabs', async () => {
    localStorage.setItem('router', 'test');
    await act(async () => {
      render(<AccountManagement />, { wrapper: BrowserRouter });
    });
    expect(screen.getByText('here')).toBeInTheDocument();
  });
});

describe('Account Management', () => {
  // const user = userEvent.setup();

  beforeEach(async () => {
    localStorage.setItem('router', 'account-management');
    jest.spyOn(service, 'getAccountList').mockResolvedValue([] as Account[]);
    jest.spyOn(service, 'getRoleList').mockResolvedValue([] as Role[]);
    jest.spyOn(service, 'getFeatureList').mockResolvedValue([] as Feature[]);
    await act(async () => {
      // @ts-ignore
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
