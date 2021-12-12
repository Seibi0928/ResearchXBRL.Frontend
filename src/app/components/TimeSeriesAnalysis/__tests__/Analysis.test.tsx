import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimeSeriesAnalysis } from '../Analysis';
import { TimeSeriesAnalysisRepository } from '../Menu';

describe('AnalysisTest', () => {
  test('二つの検索ボックスがある', () => {
    const repositoryMock = createMockRepository();
    render(<TimeSeriesAnalysis repository={repositoryMock()} />);

    expect(screen.getAllByRole('search').length).toEqual(2);
  });
});

function createMockRepository() {
  return jest.fn<TimeSeriesAnalysisRepository, []>()
    .mockImplementation(() => {
      return {
        getAccountItems: async (_: string) => {
          return new Promise(r => r([{ label: '売掛金', value: '売掛金' }]));
        },
        getCorporations: (_: string) => {
          return new Promise(r => r([{ label: '鮭産業', value: 'Exxxx' }]));
        },
        getAnalysisResult: (_: string, __: string) => {
          return new Promise(r => r({
            accountName: '',
            unit: {},
            corporation: { name: '' },
            consolidatedValues: [{ financialAccountPeriod: { instant: '2021-02-01' }, amount: 111 }],
            nonConsolidatedValues: []
          }));
        }
      };
    });
}
