import { render, screen } from '@testing-library/react';
import ErrorPage from '@/components/features/error-page/ErrorPage';

jest.mock('react-router-dom', () => ({
  useRouteError: jest.fn().mockReturnValue({ statusText: 'mock error' }),
}));

describe('ErrorPage', () => {
  beforeEach(() => {
    render(<ErrorPage />);
  });

  it('should show error page', function () {
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(screen.getByText('mock error')).toBeInTheDocument();
  });
});
