import { render, screen } from '@testing-library/react';
import { mockOffice } from '@/mocks/mockData';
import { act } from 'react-dom/test-utils';
import * as service from '@/service';
import Filter from '@/components/features/home-page/Filter';
import userEvent from '@testing-library/user-event';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  getAllOffices: jest.fn(),
  getProductsByOfficeIds: jest.fn(),
}));

describe('Filter', () => {
  const user = userEvent.setup();
  beforeEach(async () => {
    jest.spyOn(service, 'getAllOffices').mockResolvedValue(mockOffice);
    const setProductMock = jest.fn();
    await act(async () => {
      render(<Filter setProduct={setProductMock} />);
    });
  });

  it('should show office box modal', async () => {
    const getProductsByOfficeIdsMock = jest
      .spyOn(service, 'getProductsByOfficeIds')
      .mockResolvedValue([]);
    const applyBtn = screen.getByTestId('applyBtn');
    await user.click(applyBtn);
    expect(getProductsByOfficeIdsMock).toBeCalled();
  });
});
