import { render, screen } from '@testing-library/react';
import RoleTable from './RoleTable';
import { features, roles } from '@/mocks/mockData';
import { Role } from '@/components/common/CustomTypes';
import * as service from '@/service';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/service', () => ({
  getRoleList: jest.fn(),
  getFeatureList: jest.fn(),
}));

describe('Role List', () => {
  beforeEach(async () => {
    jest.spyOn(service, 'getRoleList').mockResolvedValue(roles);
    jest.spyOn(service, 'getFeatureList').mockResolvedValue(features);
    await act(async () => {
      render(<RoleTable />, {
        wrapper: BrowserRouter,
      });
    });
  });

  test('should show function list', () => {
    const items: { [key: string]: keyof Role } = {
      Role: 'roleName',
      'Updated at': 'updateTime',
    };

    Object.entries(items).forEach(([k, v]) => {
      expect(screen.getByText(k)).toBeInTheDocument();
      const role: Role = roles[0];
      expect(screen.getByText(role[v] as string)).toBeInTheDocument();
    });
    expect(screen.getAllByText('Edit')).toHaveLength(2);
  });
});
