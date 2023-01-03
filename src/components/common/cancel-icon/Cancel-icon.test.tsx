import { render, screen } from '@testing-library/react';
import CancelIcon from './Cancel-icon';

describe('Detail Page', () => {
  beforeEach(() => {
    render(<CancelIcon handleClose={() => {}} />);
  });
  test('should show arrows and num of products', () => {
    expect(screen.getByTestId('svg-cancel')).toBeInTheDocument();
  });
});
