import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Loading from '@/components/common/loading/Loading';

describe('Loading', () => {
  const loadingMsg = 'Loading';
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
  }));

  it('should display success message', () => {
    render(<Loading visible={true} message={loadingMsg} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText(loadingMsg)).toBeInTheDocument();
  });
});
