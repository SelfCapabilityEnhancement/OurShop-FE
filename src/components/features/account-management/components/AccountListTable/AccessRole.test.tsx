import { cleanup, render, screen } from '@testing-library/react';
import { account1, roles } from '@/mocks/mockData';
import * as service from '@/service';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AccessRole from '@/components/features/account-management/components/AccountListTable/AccessRole';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateRoleNames: jest.fn(),
  getRoleList: jest.fn(),
}));

describe('Access roleNames', () => {
  beforeEach(async () => {
    jest.spyOn(service, 'getRoleList').mockResolvedValue(roles);
    await act(async () => {
      render(
        <AccessRole
          isOpen={true}
          handleClose={jest.fn}
          oldAccount={account1}
        />,
        {
          wrapper: BrowserRouter,
        }
      );
    });
  });

  afterEach(cleanup);

  test('should show Modal', () => {
    expect(screen.getByText('Access Configuration')).toBeInTheDocument();
  });
});
