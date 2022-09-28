import { render, screen } from '@testing-library/react';
import MyOrder from '@/components/features/my-order/MyOrder';

describe('display my order', () => {
  const mockOrder = [
    {
      productName: 'Product Name',
      purchaseDate: '11.10.2022',
      purchaseNumber: '1',
    },
  ];

  beforeEach(() => {
    render(<MyOrder />);
  });
});
