import { render, screen } from '@testing-library/react';
import { features, roles } from '@/mocks/mockData';
import EditRole from '@/components/features/account-management/components/RoleTable/EditRole';
import * as service from '@/service';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateFeature: jest.fn(),
  getFeatureList: jest.fn(),
}));

describe('Edit Role', () => {
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

  test('should show Modal', () => {
    expect(screen.getByText('Role Configuration')).toBeInTheDocument();
  });
});
