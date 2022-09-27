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
    expect(screen.getByRole('span', {name: /1/i})).toBeInTheDocument();
  });
  test('should add one when click svg-plus',()=>{
    userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByRole('span', {name: /2/i})).toBeInTheDocument();
  });
  test('svg-minus should be disabled when num of products is 1',()=>{
    userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByRole('span', {name: /1/i})).toBeInTheDocument();
  });
  test('should minus one when click svg-minus',()=>{
    userEvent.click(screen.getByTestId('svg-plus'));
    expect(screen.getByRole('span', {name: /2/i})).toBeInTheDocument();
    userEvent.click(screen.getByTestId('svg-minus'));
    expect(screen.getByRole('span', {name: /1/i})).toBeInTheDocument();
  });
});
