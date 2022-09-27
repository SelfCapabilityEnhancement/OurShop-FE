import {render, screen} from '@testing-library/react';
import DetailPage from '@/components/features/detail-page/DetailPage';
import test from "node:test";

describe('Detail Page', () => {
  beforeEach(() => {
    render(<DetailPage/>);
  });
  test('should show product picture', () => {
    expect(screen.getByAltText(/big product picture/i)).toBeInTheDocument();
    expect(screen.getAllByAltText(/small product picture.*?/i).length).toBe(5);
  });
  test('should show detail page', () => {
    expect(screen.getByText(/here is a book name xxxx/i)).toBeInTheDocument();
    expect(screen.getByText(/price: 111 or 5 token/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText('xxx')).toBeInTheDocument();

    expect(screen.getByText('No. of purchase')).toBeInTheDocument();

    expect(screen.getByTestId('counter')).toBeInTheDocument();
    expect(
        screen.getByRole('button', {name: /add in shopping cart/i})
    ).toBeInTheDocument();
    expect(
        screen.getByRole('button', {name: /purchase/i})
    ).toBeInTheDocument();
  });
});
