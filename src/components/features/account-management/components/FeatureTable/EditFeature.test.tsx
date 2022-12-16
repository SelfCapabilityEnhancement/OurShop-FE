import { cleanup, render, screen } from '@testing-library/react';
import EditFeature from '@/components/features/account-management/components/FeatureTable/EditFeature';
import { features } from '@/mocks/mockData';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as service from '@/service';
import { AxiosResponse } from 'axios';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateFeature: jest.fn(),
}));

describe('Edit Function', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    await act(async () => {
      render(
        <EditFeature
          isOpen={true}
          handleClose={jest.fn}
          oldFeature={features[0]}
        />,
        {
          wrapper: BrowserRouter,
        }
      );
    });
  });

  afterEach(cleanup);

  test('should show old feature info', async () => {
    const updateMock = jest
      .spyOn(service, 'updateFeature')
      .mockResolvedValue({} as AxiosResponse);

    const codeElement = await screen.findByTestId('code');
    const saveBtn = await screen.findByTestId('saveBtn');

    await user.type(codeElement, '/product/product-management');
    await user.click(saveBtn);

    expect(updateMock).toBeCalled();
  });
});
