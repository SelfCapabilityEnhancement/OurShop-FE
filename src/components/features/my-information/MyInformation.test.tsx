import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MyInformation from '@/components/features/my-information/MyInformation';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    post: jest.fn(),
  },
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
  }),
}));

describe('display user info', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<MyInformation />, { wrapper: BrowserRouter }).container;
  });
  it('should display user info', async () => {
    // const address = container.querySelector('.address-header');
    expect(await screen.findByText('My Information')).toBeInTheDocument();
    expect(await screen.findByText('My Office')).toBeInTheDocument();
    expect(await screen.findByText('My Shipping Address')).toBeInTheDocument();
    expect(await screen.findByText('Shanghai')).toBeInTheDocument();
    expect(await screen.findByText('Guanshan Road')).toBeInTheDocument();
    expect(await screen.findByText('Save')).toBeInTheDocument();
  });

  it('should display new shipping address after edit and save', async () => {
    const edit = await screen.findByText('Edit');
    const newAddress = 'Poly International';

    expect(await screen.findByText('Guanshan Road')).toBeInTheDocument();
    expect(edit).toBeInTheDocument();

    user.click(edit as Element);

    const addressInput = await screen.findByDisplayValue('Guanshan Road');
    expect(addressInput).toBeInTheDocument();
    const confirm = await screen.findByRole('button', { name: /Confirm/i });
    expect(confirm).toBeInTheDocument();

    await userEvent.type(addressInput, newAddress);
    user.click(confirm as Element);

    const save = await screen.findByRole('button', { name: /Save/i });
    expect(save).toBeInTheDocument();
    await user.click(save as Element);
  });

  it('should navigate to home when click good to go', async () => {
    const button = container.querySelector('.go-home');

    await user.click(button as Element);

    expect(screen.findByText('HomePage')).toBeTruthy();
  });
});
