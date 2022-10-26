import { render, screen } from '@testing-library/react';
import HLine from '@/components/common/horizontal-line/HorizontalLine';

describe('Horizontal Line', () => {
  beforeEach(() => {
    render(<HLine text="mock" />);
  });

  it('should display all crumbs', () => {
    expect(screen.getByText('mock')).toBeInTheDocument();
  });
});
