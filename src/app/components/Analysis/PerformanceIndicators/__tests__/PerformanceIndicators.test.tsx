import React from 'react';
import { fireEvent, render, screen, waitFor, waitForDomChange, waitForElement } from '@testing-library/react';
import { CommonMenuRepository } from '../../../CommonMenu/CommonMenuReporitory';
import { PerformanceIndicators } from '../PerformanceIndicators';
import { PerformanceIndicatorsRepository } from '../PerformanceIndicatorsRepository';

describe('PerformanceIndicators', () => {
    test('企業検索ボックスがある', () => {
        render(<PerformanceIndicators commonMenuRepository={createMockCommonMenuRepository()()} performanceIndicatorRepository={createMockPerformanceIndicatorsRepository()()} />);

        expect(screen.getAllByRole('search').length).toEqual(1);
    });

    test('企業検索ボックスに値を入れたエンターを押したとき、グラフが表示される', async () => {
        const component = render(<PerformanceIndicators commonMenuRepository={createMockCommonMenuRepository()()} performanceIndicatorRepository={createMockPerformanceIndicatorsRepository()()} />);
        await waitFor(() => fireEvent.input(component.getByRole('combobox'), { target: { value: 'さけ' } }))
        await waitFor(() => fireEvent.keyDown(component.getByRole('combobox'), {
            code: 'Enter',
            key: 'Enter',
            keyCode: 13,
            charCode: 13
        }));

        expect(await component.findByRole('group')).toBeInTheDocument();
    });
});

function createMockPerformanceIndicatorsRepository() {
    return jest.fn<PerformanceIndicatorsRepository, []>()
        .mockImplementation(() => {
            return {
                getPerformanceIndicators: (_: string) => {
                    return new Promise(r => r({
                        indicators: []
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
