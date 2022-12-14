import { render, screen } from '@testing-library/react';
import { roles } from '@/mocks/mockData';
import EditRole from '@/components/features/account-management/components/RoleTable/EditRole';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateFeature: jest.fn(),
}));

describe('Edit Function', () => {
  beforeEach(() => {
    render(<EditRole isOpen={true} handleClose={jest.fn} oldRole={roles[0]} />);
  });
  test('should show Modal', () => {
    expect(screen.getByText('Role Configuration')).toBeInTheDocument();
  });
});
