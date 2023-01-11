import { render, screen } from '@testing-library/react';
import { mockOffice } from '@/mocks/mockData';
import { act } from 'react-dom/test-utils';
import * as service from '@/service';
import OfficeBox from '@/components/features/home-page/OfficeBox';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  getAllOffices: jest.fn(),
}));

describe('Office Box', () => {
  beforeEach(async () => {
    jest.spyOn(service, 'getAllOffices').mockResolvedValue(mockOffice);
    const getIsCheckMock = jest.fn();
    await act(async () => {
      render(<OfficeBox getIsCheck={getIsCheckMock} />);
    });
  });

  it('should show office box modal', () => {
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});
