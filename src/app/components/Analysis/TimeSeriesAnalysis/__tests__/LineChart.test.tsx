import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChart } from '../LineChart';

describe('LineChartTest', () => {
  test('分析結果ロード中の時その旨が表示し、グラフは表示しない', () => {
    render(<LineChart data="loading" />);
    expect(screen.queryByRole('figure')).not.toBeInTheDocument();
    expect(screen.getByText('ロード中...')).toBeInTheDocument();
  });

  test('ユーザの入力待ちのときグラフは表示しない', () => {
    render(<LineChart data="waitingUserInput" />);
    expect(screen.queryByRole('figure')).not.toBeInTheDocument();
  });

  test('連結財務諸表、単体財務諸表の分析結果が両方とも0件の場合はその旨を表示し、グラフは表示しない', () => {
    render(<LineChart data={{
      accountName: '',
      unit: { name: '', measure: '' },
      corporation: { name: '' },
      consolidatedValues: [],
      nonConsolidatedValues: []
    }} />);
    expect(screen.queryByRole('figure')).not.toBeInTheDocument();
    expect(screen.getByText('データ無し')).toBeInTheDocument();
  });

  test('連結財務諸表、単体財務諸表のどちらかの分析結果が1件以上の場合はグラフを表示する1', () => {
    render(<LineChart data={{
      accountName: '',
      unit: { name: '', measure: '' },
      corporation: { name: '' },
      consolidatedValues: [{ financialAccountPeriod: { instant: '' }, amount: 111 }],
      nonConsolidatedValues: []
    }} />);
    expect(screen.queryByRole('figure')).toBeInTheDocument();
  })

  test('連結財務諸表、単体財務諸表のどちらかの分析結果が1件以上の場合はグラフを表示する2', () => {
    render(<LineChart data={{
      accountName: '',
      unit: { name: '', measure: '' },
      corporation: { name: '' },
      consolidatedValues: [],
      nonConsolidatedValues: [{ financialAccountPeriod: { instant: '' }, amount: 111 }]
    }} />);
    expect(screen.queryByRole('figure')).toBeInTheDocument();
  })
});
