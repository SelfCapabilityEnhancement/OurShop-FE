import { render, screen } from '@testing-library/react';
import LoginPage from '@/components/features/login-page/LoginPage';

describe('display login page', () => {
  it('should display login page context', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(
      screen.getByText('Try this shopping platform for TWers')
    ).toBeInTheDocument();
    expect(screen.getByText('Try it now.')).toBeInTheDocument();
    expect(screen.getByText('User Login')).toBeInTheDocument();
    expect(
      screen.getByText('Hey TWer, Enter your detail to get in to OurShop')
    ).toBeInTheDocument();
    expect(screen.getByText('Do not have an account?')).toBeInTheDocument();
    expect(screen.getByText('Register with us')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/ })).toBeInTheDocument();
  });

  // it('should navigate to Register page when click Register with us', async () => {
  //
  // });
});
