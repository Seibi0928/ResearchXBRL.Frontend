import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimeSeriesAnalysis } from '../TimeSeriesAnalysis';
import { CommonMenuRepository } from '../../../CommonMenu/CommonMenuReporitory';
import { TimeSeriesAnalysisRepository } from '../TimeSeriesAnalysisRepository';

describe('TimeSeriesAnalysis', () => {
  test('二つの検索ボックスがある', () => {
    render(<TimeSeriesAnalysis commonMenuRepository={createMockCommonMenuRepository()()} timeSeriesAnalysisRepository={createMockTimeSeriesAnalysisRepository()()} />);

    expect(screen.getAllByRole('search').length).toEqual(2);
  });
});

function createMockTimeSeriesAnalysisRepository() {
  return jest.fn<TimeSeriesAnalysisRepository, []>()
    .mockImplementation(() => {
      return {
        getAnalysisResult: (_: string, __: string) => {
          return new Promise(r => r({
            accountName: '',
            unit: { name: '', measure: '' },
            corporation: { name: '' },
            consolidatedValues: [{ financialAccountPeriod: { instant: '2021-02-01' }, amount: 111 }],
            nonConsolidatedValues: []
          }));
        }
      };
    });
}

function createMockCommonMenuRepository() {
  return jest.fn<CommonMenuRepository, []>()
    .mockImplementation(() => {
      return {
        getAccountItems: async (_: string) => {
          return new Promise(r => r([{ label: '売掛金', value: '売掛金' }]));
        },
        getCorporations: (_: string) => {
          return new Promise(r => r([{ label: '鮭産業', value: 'Exxxx' }]));
        }
      };
    });
}
