import { render, screen } from '@testing-library/react';
import FeatureTable from './FeatureTable';
import { features } from '@/mocks/mockData';
import { Feature } from '@/components/common/CustomTypes';

describe('Function List', () => {
  beforeEach(() => {
    render(<FeatureTable featureList={features} />);
  });

  test('should show function list', () => {
    const items: { [key: string]: keyof Feature } = {
      Function: 'featureName',
      Code: 'code',
      Description: 'description',
      'Updated at': 'updateTime',
    };

    Object.entries(items).forEach(([k, v]) => {
      expect(screen.getByText(k)).toBeInTheDocument();
      const feature: Feature = features[0];
      expect(screen.getByText(feature[v] as string)).toBeInTheDocument();
    });
    expect(screen.getAllByText('Edit')).toHaveLength(2);
  });
});
