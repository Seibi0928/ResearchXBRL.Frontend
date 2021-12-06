import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChart } from '../LineChart';

describe('LineChartTest', () => {
  test('分析結果ロード中の時その旨が表示し、グラフは表示しない', () => {
    render(<LineChart data="loading" />);
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
    expect(screen.getByText('ロード中...')).toBeInTheDocument();
  });

  test('ユーザの入力待ちのときグラフは表示しない', () => {
    render(<LineChart data="waitingUserInput" />);
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });

  test('分析結果が0件の場合はその旨を表示し、グラフは表示しない', () => {
    render(<LineChart data={{
      accountName: '',
      unit: {},
      corporation: { name: '' },
      values: []
    }} />);
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
    expect(screen.getByText('データ無し')).toBeInTheDocument();
  });

  test('結果が1件以上の場合はグラフを表示する', () => {
    render(<LineChart data={{
      accountName: '',
      unit: {},
      corporation: { name: '' },
      values: [{ financialAccountPeriod: { instant: '' }, amount: 111 }]
    }} />);
    expect(screen.queryByRole('main')).toBeInTheDocument();
  })
});
