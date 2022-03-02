import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TimeSeriesAnalysis } from '../TimeSeriesAnalysis';
import { CommonMenuRepository } from '../../../CommonMenu/CommonMenuReporitory';
import { TimeSeriesAnalysisRepository } from '../TimeSeriesAnalysisRepository';

describe('TimeSeriesAnalysis', () => {
  test('企業検索ボックスと勘定項目検索ボックスがある', () => {
    render(<TimeSeriesAnalysis commonMenuRepository={createMockCommonMenuRepository()()} timeSeriesAnalysisRepository={createMockTimeSeriesAnalysisRepository()()} />);

    expect(screen.getAllByRole('search').length).toEqual(2);
  });

  test('企業検索ボックスと勘定項目検索ボックスにそれぞれに値を入れエンターを押したときグラフが表示される', async () => {
    const component = render(<TimeSeriesAnalysis commonMenuRepository={createMockCommonMenuRepository()()} timeSeriesAnalysisRepository={createMockTimeSeriesAnalysisRepository()()} />);
    for (const searchBox of await component.findAllByRole('combobox')) {
      await waitFor(() => fireEvent.input(searchBox, { target: { value: 'さけ' } }))
      await waitFor(() => fireEvent.keyDown(searchBox, {
        code: 'Enter',
        key: 'Enter',
        keyCode: 13,
        charCode: 13
      }));
    }

    expect(await component.findByRole('figure')).toBeInTheDocument();
  })
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
