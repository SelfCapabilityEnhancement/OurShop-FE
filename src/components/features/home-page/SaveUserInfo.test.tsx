import { render, screen } from '@testing-library/react';
import SaveUserInfo from '@/components/features/home-page/SaveUserInfo';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn(),
}));

describe('Edit UserInfo when user first login', () => {
  beforeEach(() => {
    render(<SaveUserInfo isOpen={true} />);
  });

  it('should show text in Popup', () => {
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(
      screen.getByText('Please fill some information before purchases')
    ).toBeInTheDocument();
  });
});
