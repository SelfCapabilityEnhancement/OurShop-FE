import { render, screen } from '@testing-library/react';
import * as service from '@/service';
import { BrowserRouter } from 'react-router-dom';
import { mockOffice } from '@/mocks/mockData';
import SearchBar from '@/components/features/home-page/SearchBar';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  getCurrentUser: jest.fn(),
  saveUserInfo: jest.fn(),
  getAllOffices: jest.fn(),
}));

describe('Searchbar', () => {
  const setProductMock = jest.fn();

  beforeEach(() => {
    jest.spyOn(service, 'getAllOffices').mockResolvedValue(mockOffice);
    render(<SearchBar setProduct={setProductMock} />, {
      wrapper: BrowserRouter,
    });
  });

  it('should show text in SearchBar', () => {
    expect(screen.getByText('Search')).toBeInTheDocument();
    // expect(
    //     screen.getByText('Please fill the required information before purchases')
    // ).toBeInTheDocument();
  });
});
