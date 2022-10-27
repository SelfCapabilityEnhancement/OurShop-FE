import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Banner from '@/components/common/banner/Banner';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    post: jest.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }),
    get: jest.fn().mockResolvedValue({}),
  },
}));

describe('Banner', () => {
  const successMsg = 'success';
  const failMsg = 'fail';
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
  }));

  it('should display success message', () => {
    render(<Banner visible={true} success={true} message={successMsg} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText(successMsg)).toBeInTheDocument();
  });

  it('should display fail message', () => {
    render(<Banner visible={true} success={false} message={failMsg} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText(failMsg)).toBeInTheDocument();
  });
});
