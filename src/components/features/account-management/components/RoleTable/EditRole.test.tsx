import { cleanup, render, screen } from '@testing-library/react';
import { features, roles } from '@/mocks/mockData';
import EditRole from '@/components/features/account-management/components/RoleTable/EditRole';
import * as service from '@/service';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AxiosResponse } from 'axios';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateRole: jest.fn(),
  getFeatureList: jest.fn(),
}));

describe('Edit Role', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    jest.spyOn(service, 'getFeatureList').mockResolvedValue(features);
    await act(async () => {
      render(
        <EditRole isOpen={true} handleClose={jest.fn} oldRole={roles[0]} />,
        {
          wrapper: BrowserRouter,
        }
      );
    });
  });

  afterEach(cleanup);

  test('should show Modal', () => {
    expect(screen.getByText('Role Configuration')).toBeInTheDocument();
  });

  test('should show Role Configuration popup', async () => {
    const updateMock = jest
      .spyOn(service, 'updateRole')
      .mockResolvedValue({} as AxiosResponse);

    const saveBtn = screen.getByTestId('saveBtn');

    await user.click(saveBtn);

    expect(updateMock).toBeCalled();
  });
});
