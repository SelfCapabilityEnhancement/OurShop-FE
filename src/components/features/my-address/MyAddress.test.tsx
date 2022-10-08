import { Container } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MyAddress from '@/components/features/my-address/MyAddress';
import { BrowserRouter } from 'react-router-dom';

describe('display address info', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    container = render(<MyAddress />, { wrapper: BrowserRouter }).container;
  });
  it('should display address info', async () => {
    const address = container.querySelector('.address-header');

    expect(address).toBeTruthy();
    expect(screen.getByText('My Address')).toBeInTheDocument();
    expect(screen.getByText('My Office')).toBeInTheDocument();
    expect(screen.getByText('My Shipping address')).toBeInTheDocument();
    expect(screen.getByText('Wuhan')).toBeInTheDocument();
    expect(screen.getByText('Good to Go')).toBeInTheDocument();
  });

  it('should display new shipping address after edit and save', async () => {
    const edit = container.querySelector('.edit-btn');
    const save = container.querySelector('.save-btn');
    const addressInput = container.querySelector('.address-input');
    const newAddress = 'another text here';

    expect(screen.getByText('text text here')).toBeInTheDocument();
    expect(save).toBeTruthy();

    await user.click(edit as Element);
    await user.type(addressInput as Element, newAddress);
    await user.click(save as Element);

    expect(screen.queryByText(newAddress)).toBeInTheDocument();
  });

  it('should display new shipping address after edit and cancel', async () => {
    const edit = container.querySelector('.edit-btn');
    const cancel = container.querySelector('.cancel-btn');
    const addressInput = container.querySelector('.address-input');
    const address = 'text text here';

    expect(screen.getByText('text text here')).toBeInTheDocument();
    expect(cancel).toBeTruthy();

    await user.click(edit as Element);
    await user.type(addressInput as Element, 'newAddress');
    await user.click(cancel as Element);

    expect(screen.queryByText(address)).toBeInTheDocument();
  });

  it('should navigate to home when click good to go', async () => {
    const button = container.querySelector('.go-home');

    await user.click(button as Element);

    expect(screen.findByText('HomePage')).toBeTruthy();
  });
});
