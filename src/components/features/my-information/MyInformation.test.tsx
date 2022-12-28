import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import MyInformation from '@/components/features/my-information/MyInformation';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import MyWallet from '@/components/features/my-wallet/MyWallet';

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn().mockResolvedValue({
    id: 2,
    name: 'Ann',
    sex: 'Female',
    age: 23,
    address: 'Guanshan Road',
    office: 'Shanghai',
    token: 23,
    bankAccount: '123',
    avatar: 'avatar',
    telephoneNum: 123456789,
  }),
  updateUserInfo: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('display user info', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(async () => {
    localStorage.setItem('router', 'my-information');
    await act(async () => {
      container = render(<MyInformation />, {
        wrapper: BrowserRouter,
      }).container;
    });
  });

  afterEach(cleanup);

  it('should display user info', async () => {
    expect(await screen.findByText('My Information')).toBeInTheDocument();
    expect(await screen.findByText('My Office')).toBeInTheDocument();
    expect(await screen.findByText('My Shipping Address')).toBeInTheDocument();
    expect(await screen.findByText('My Phone')).toBeInTheDocument();
    expect(await screen.findByText('Shanghai')).toBeInTheDocument();
    expect(await screen.findByText('Guanshan Road')).toBeInTheDocument();
    expect(await screen.findByText('123456789')).toBeInTheDocument();
    expect(await screen.findByText('Save')).toBeInTheDocument();
  });

  it('should display new shipping address after edit and save', async () => {
    const edit = await screen.findByTestId('edit-address');
    const newAddress = 'Poly International';

    expect(await screen.findByText('Guanshan Road')).toBeInTheDocument();
    expect(edit).toBeInTheDocument();

    await user.click(edit as Element);

    const addressInput = await screen.findByDisplayValue('Guanshan Road');
    const confirm = await screen.findByRole('button', { name: /Confirm/i });
    expect(confirm).toBeInTheDocument();

    await user.clear(addressInput);
    await user.type(addressInput, newAddress);
    await user.click(confirm as Element);

    expect(await screen.findByText(newAddress)).toBeInTheDocument();
  });

  it('should navigate to home when click good to go', async () => {
    const button = container.querySelector('.go-home');

    await user.click(button as Element);

    expect(screen.findByText('HomePage')).toBeTruthy();
  });
});

describe('When user not login to access to MyInformation', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<MyWallet />, { wrapper: BrowserRouter });
    });
  });

  afterEach(cleanup);

  it('should show tabs', () => {
    expect(screen.getByText('Not Login')).toBeInTheDocument();
  });
});
