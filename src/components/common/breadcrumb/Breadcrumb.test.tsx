import { render } from '@testing-library/react';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';

describe('Breadcrumb', () => {
  const crumbNames = ['a', 'b', 'c'];
  let container: Container;

  beforeEach(() => {
    container = render(<Breadcrumb crumbNames={crumbNames} />, {
      wrapper: BrowserRouter,
    }).container;
  });

  it('should display all crumbs', () => {
    const crumbs = container.querySelectorAll('li');

    expect(crumbs).toHaveLength(crumbNames.length + 1);
  });
});
