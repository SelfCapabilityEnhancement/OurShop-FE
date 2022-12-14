import { cleanup, render, screen } from '@testing-library/react';
import EditFeature from '@/components/features/account-management/components/FeatureTable/EditFeature';
import { features } from '@/mocks/mockData';

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/service', () => ({
  updateFeature: jest.fn(),
}));

describe('Edit Function', () => {
  beforeEach(() => {
    render(
      <EditFeature
        isOpen={true}
        handleClose={jest.fn}
        oldFeature={features[0]}
      />
    );
  });

  afterEach(cleanup);

  test('should show old feature info', () => {
    expect(
      screen.getByPlaceholderText('/product/product-management')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('product')).toBeInTheDocument();
  });
});
