import { render, screen } from '@testing-library/react';
import FeatureTable from './FeatureTable';
import { features } from '@/mocks/mockData';
import { Feature } from '@/components/common/CustomTypes';
import * as service from '@/service';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/service', () => ({
  getFeatureList: jest.fn(),
}));

describe('Function List', () => {
  beforeEach(async () => {
    jest.spyOn(service, 'getFeatureList').mockResolvedValue(features);
    await act(async () => {
      render(<FeatureTable />, {
        wrapper: BrowserRouter,
      });
    });
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
