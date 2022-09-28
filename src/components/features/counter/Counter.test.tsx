import {render, screen} from '@testing-library/react';
import Counter from "@/components/features/counter/Counter";
import userEvent from "@testing-library/user-event";

describe('Detail Page', () => {
  beforeEach(() => {
    render(<Counter/>);
  });
  test('should show arrows and num of products', () => {
    expect(screen.getByTestId('svg-plus')).toBeInTheDocument();
    expect(screen.getByTestId('svg-minus')).toBeInTheDocument();
    expect(screen.getByTestId('num').textContent).toBe('1');
  });
  test('should add one when click svg-plus',async ()=>{
    await userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
  });
  test('svg-minus should be disabled when num of products is 1',async ()=>{
    await userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });
  test('should minus one when click svg-minus',async()=>{
    await userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByTestId('num').textContent).toBe('2');
    await userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByTestId('num').textContent).toBe('1');
  });
});
