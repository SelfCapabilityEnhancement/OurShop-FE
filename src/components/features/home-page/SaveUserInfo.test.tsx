import { render, screen } from '@testing-library/react';
import SaveUserInfo from '@/components/features/home-page/SaveUserInfo';
import userEvent from '@testing-library/user-event';
import * as service from '@/service';
import { AxiosResponse } from 'axios';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn(),
  saveUserInfo: jest.fn(),
}));

describe('Edit UserInfo when user first login', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<SaveUserInfo isOpen={true} />);
  });

  it('should show text in Popup', () => {
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(
      screen.getByText('Please fill the required information before purchases')
    ).toBeInTheDocument();
  });

  it('should show saveInfo successfully when information is filled correctly and click save', async () => {
    const saveInfoMock = jest
      .spyOn(service, 'saveUserInfo')
      .mockResolvedValue({} as AxiosResponse);

    const newName = 'Poly International';
    const newPhone = '1233';

    const userRealName = await screen.findByTestId('userRealName');
    const telephoneNum = await screen.findByTestId('telephoneNum');

    await user.type(userRealName, newName);
    await user.type(telephoneNum, newPhone);
    const chooseOffice = screen.getByTestId('officeId');
    await user.click(chooseOffice);
    await user.click(screen.getByText('Beijing'));

    const saveBtn = screen.getByTestId('save-btn');
    await user.click(saveBtn);

    expect(saveInfoMock).toBeCalled();
  });
});
