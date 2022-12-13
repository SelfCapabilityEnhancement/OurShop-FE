import { render, screen } from '@testing-library/react';
import RoleTable from './RoleTable';
import { roles } from '@/mocks/mockData';
import { Role } from '@/components/common/CustomTypes';

describe('Role List', () => {
  beforeEach(() => {
    render(<RoleTable roleList={roles} />);
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
