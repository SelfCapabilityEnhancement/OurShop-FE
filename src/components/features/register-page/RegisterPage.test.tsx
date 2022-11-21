import { render, screen } from '@testing-library/react';
import RegisterPage from '@/components/features/register-page/RegisterPage';
import { MemoryRouter } from 'react-router-dom';

describe('display register page', () => {
  it('should display register page context', () => {
    render(<RegisterPage />, { wrapper: MemoryRouter });
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(
      screen.getByText('Try this shopping platform for TWers')
    ).toBeInTheDocument();
    expect(screen.getByText('Try it now.')).toBeInTheDocument();
    expect(screen.getByText('Register with Us')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Hey TWer, please fill the necessary information to register'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Already has an account?')).toBeInTheDocument();
    expect(screen.getByText('Login OurShop')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Register/ })
    ).toBeInTheDocument();
  });
});
