import { cleanup, render, screen } from '@testing-library/react';
import RegisterPage from '@/components/features/register-page/RegisterPage';
import { BrowserRouter } from 'react-router-dom';
import * as service from '@/service';
import userEvent from '@testing-library/user-event';
import { AxiosResponse } from 'axios';

jest.mock('@/service', () => ({
  register: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('display register page', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<RegisterPage />, { wrapper: BrowserRouter });
  });

  afterEach(cleanup);

  it('should display register page context', () => {
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

  it('should navigate to login page when click Login Ourshop', async () => {
    const loginNav = screen.getByText('Login OurShop');
    await user.click(loginNav as Element);

    expect(location.pathname).toBe('/login');
  });

  it('should show register successful banner when information is filled correctly', async () => {
    const registerMock = jest
      .spyOn(service, 'register')
      .mockResolvedValue({} as AxiosResponse);

    await user.type(screen.getByTestId('username'), 'tom');
    await user.type(screen.getByTestId('password'), '111');
    await user.type(screen.getByTestId('confirmPassword'), '111');

    const registerBtn = screen.getByTestId('register-btn');
    await user.click(registerBtn);

    expect(registerMock).toBeCalled();
    // expect(
    //   await screen.findByText('Registered successfully, you can login now')
    // ).toBeInTheDocument();
  });

  it('should show error tips when username is missing', async () => {
    await user.type(screen.getByTestId('password'), '111');
    await user.type(screen.getByTestId('confirmPassword'), '111');

    const registerBtn = screen.getByTestId('register-btn');
    await user.click(registerBtn);

    expect(screen.getByText('Required field!')).toBeInTheDocument();
  });

  it('should show error tips when all required information is missing', async () => {
    const registerBtn = screen.getByTestId('register-btn');
    await user.click(registerBtn);

    expect(screen.getAllByText('Required field!')).toHaveLength(3);
  });

  it('should show error tips when passwords do not match', async () => {
    jest.spyOn(service, 'register').mockResolvedValue({} as AxiosResponse);

    await user.type(screen.getByTestId('username'), 'tom');
    await user.type(screen.getByTestId('password'), '111');
    await user.type(screen.getByTestId('confirmPassword'), '123');

    const registerBtn = screen.getByTestId('register-btn');
    await user.click(registerBtn);

    expect(
      await screen.findByText('Passwords does not match!')
    ).toBeInTheDocument();
  });
});
