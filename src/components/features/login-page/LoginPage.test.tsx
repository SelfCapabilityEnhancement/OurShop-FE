import { cleanup, render, screen } from '@testing-library/react';
import LoginPage from '@/components/features/login-page/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as service from '@/service';
import { AxiosResponse } from 'axios';
import { act } from 'react-dom/test-utils';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('@/service', () => ({
  login: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('display login page', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: BrowserRouter });
    });
  });

  afterEach(cleanup);

  it('should display login page context', () => {
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(
      screen.getByText('Try this shopping platform for TWers')
    ).toBeInTheDocument();
    expect(screen.getByText('Try it now.')).toBeInTheDocument();
    expect(screen.getByText('User Login')).toBeInTheDocument();
    expect(
      screen.getByText('Hey TWer, enter your detail to get in to OurShop')
    ).toBeInTheDocument();
    expect(screen.getByText('Do not have an account?')).toBeInTheDocument();
    expect(screen.getByText('Register with us')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/ })).toBeInTheDocument();
  });

  it('should navigate to Register page when click Register with us', async () => {
    const registerNav = screen.getByText('Register with us');
    await user.click(registerNav);

    expect(location.pathname).toBe('/register');
  });

  it('should show login successfully banner when information is filled correctly', async () => {
    const loginMock = jest
      .spyOn(service, 'login')
      .mockResolvedValue({} as AxiosResponse);

    await user.type(screen.getByTestId('username'), 'name');
    await user.type(screen.getByTestId('password'), '123');

    const loginBtn = screen.getByTestId('login-btn');
    await user.click(loginBtn);

    expect(loginMock).toBeCalled();
  });

  it('should show error tips when username is missing', async () => {
    await user.type(screen.getByTestId('password'), '111');

    const loginBtn = screen.getByTestId('login-btn');
    await user.click(loginBtn);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('should show error tips when password is missing', async () => {
    await user.type(screen.getByTestId('username'), '111');

    const loginBtn = screen.getByTestId('login-btn');
    await user.click(loginBtn);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('should show error tips when username and password are missing', async () => {
    const loginBtn = screen.getByTestId('login-btn');
    await user.click(loginBtn);

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });

  it('should show error tips when username exists or password wrong', async () => {
    jest.spyOn(service, 'login').mockResolvedValue({
      data: {
        detail: 'username & password does not match',
        status: 401,
        title: 'username & password does not match',
        type: '/api/v1/users/login',
      },
    } as AxiosResponse);

    await user.type(screen.getByTestId('username'), 'name');
    await user.type(screen.getByTestId('password'), '123');

    const loginBtn = screen.getByTestId('login-btn');
    await user.click(loginBtn);

    expect(
      await screen.findByText('Username & Password does not match!')
    ).toBeInTheDocument();
  });
});
