import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MyInformation from '@/components/features/my-information/MyInformation';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    post: jest.fn(),
    get: jest.fn().mockResolvedValue({
      data: {
        id: 2,
        name: 'Ann',
        sex: 'Female',
        age: 23,
        address: 'Guanshan Road',
        office: 'Shanghai',
        token: 23,
        bankAccount: '123',
        avatar: 'avatar',
      },
    }),
  },
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
    expect(await screen.findByText('My Shipping address')).toBeInTheDocument();
    expect(await screen.findByText('Shanghai')).toBeInTheDocument();
    expect(await screen.findByText('Guanshan Road')).toBeInTheDocument();
    expect(await screen.findByText('Save')).toBeInTheDocument();
  });

  // it('should display new shipping address after edit and save', async () => {
  //   const edit = container.querySelector('.edit-btn');
  //   const newAddress = 'another text here';
  //
  //   expect(screen.getByText('Guanshan Road')).toBeInTheDocument();
  //
  //   await user.click(edit as Element);
  //   const save = container.querySelector('.save.button');
  //   const addressInput = container.querySelector('.address-input');
  //   expect(edit).toBeTruthy();
  //   expect(save).toBeTruthy();
  //   expect(addressInput).toBeTruthy();
  //
  //   await user.type(addressInput as Element, newAddress);
  //   await user.click(save as Element);
  //
  //   expect(screen.getByText(newAddress)).toBeInTheDocument();
  // });

  // it('should display new shipping address after edit and cancel', async () => {
  //   const edit = container.querySelector('.edit-btn');
  //   const address = 'Guanshan Road';
  //
  //   expect(screen.getByText(address)).toBeInTheDocument();
  //   await user.click(edit as Element);
  //
  //   const cancel = container.querySelector('.cancel.button');
  //   const addressInput = container.querySelector('.address-input');
  //   expect(edit).toBeTruthy();
  //   expect(cancel).toBeTruthy();
  //   expect(addressInput).toBeTruthy();
  //
  //   await user.type(addressInput as Element, 'newAddress');
  //   await user.click(cancel as Element);
  //
  //   expect(screen.queryByText(address)).toBeInTheDocument();
  // });

  it('should navigate to home when click good to go', async () => {
    const button = container.querySelector('.go-home');

    await user.click(button as Element);

    expect(screen.findByText('HomePage')).toBeTruthy();
  });
});
