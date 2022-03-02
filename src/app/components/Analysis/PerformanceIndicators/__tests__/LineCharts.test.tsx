import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineCharts } from '../LineCharts';

describe('LineChartTest', () => {
    test('分析結果ロード中の時その旨が表示し、グラフは表示しない', () => {
        render(<LineCharts data="loading" />);
        expect(screen.queryByRole('group')).not.toBeInTheDocument();
        expect(screen.getByText('ロード中...')).toBeInTheDocument();
    });

    test('ユーザの入力待ちのときグラフは表示しない', () => {
        render(<LineCharts data="waitingUserInput" />);
        expect(screen.queryByRole('group')).not.toBeInTheDocument();
    });

    test('業績指標データが投入されたときグラフを表示する', () => {
        render(<LineCharts data={{
            indicators: []
        }} />);

        expect(screen.queryByRole('main')).toBeInTheDocument();
    });

    test('業績指標の数だけグラフを表示する', () => {
        const expectedIndicators = [{
            indicatorType: 1,
            values: { '': 1, 'a': 2, '3': 3 }
        }, {
            indicatorType: 2,
            values: { '': 1, 'a': 2, '3': 3 }
        }, {
            indicatorType: 3,
            values: { '': 1, 'a': 2, '3': 3 }
        }];

        render(<LineCharts data={{
            indicators: expectedIndicators
        }} />);

        expect(screen.getAllByRole('figure').length).toBe(expectedIndicators.length);
    })
});
