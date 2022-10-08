import {render, screen} from '@testing-library/react';
import Counter from '@/components/common/counter/Counter';

describe('Detail Page', () => {
  beforeEach(() => {
    render(<Counter count={1} handlePlus={() => {}} handleMinus={() => {}}/>);
  });
  test('should show arrows and num of products', () => {
    expect(screen.getByTestId('svg-plus')).toBeInTheDocument();
    expect(screen.getByTestId('svg-minus')).toBeInTheDocument();
    expect(screen.getByTestId('num').textContent).toBe('1');
  });
});
