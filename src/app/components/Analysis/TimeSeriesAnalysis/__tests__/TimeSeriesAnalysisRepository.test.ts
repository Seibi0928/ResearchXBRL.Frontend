import { comparePeriod, isInstantPeriod } from "../TimeSeriesAnalysisRepository";

describe('TimeSeriesAnalysisRepository', () => {
    describe('isInstantPeriod', () => {
        test('期間が一点のときtrueを返す', () => {
            expect(isInstantPeriod({ instant: '2021/01/01' })).toBeTruthy();
        });

        test('期間が一点のとき連続的なときfalseを返す', () => {
            expect(isInstantPeriod({ from: '2021/01/01', to: '2030/01/01' })).toBeFalsy();
        });
    });

    describe('comparePeriod', () => {
        test('両引数の期間の種類が異なるとき例外を出す', () => {
            const left = { financialAccountPeriod: { instant: '2021/01/01' }, amount: 1 };
            const right = { financialAccountPeriod: { from: '2021/01/01', to: '2030/01/01' }, amount: 2 };

            expect(() => comparePeriod(left, right)).toThrow();
        });

        test('左側の引数の日付が大きければ0より大きい値を返す(ver.InstantPeriod)', () => {
            const left = { financialAccountPeriod: { instant: '2030/01/02' }, amount: 1 };
            const right = { financialAccountPeriod: { instant: '2030/01/01' }, amount: 2 };

            expect(comparePeriod(left, right) > 0).toBeTruthy();
        });

        test('左側の引数の日付が大きければ0より大きい値を返す(ver.DurationPeriod)', () => {
            const left = { financialAccountPeriod: { from: '2021/01/02', to: '2030/01/01' }, amount: 2 };
            const right = { financialAccountPeriod: { from: '2021/01/01', to: '2030/01/01' }, amount: 2 };

            expect(comparePeriod(left, right) > 0).toBeTruthy();
        });

        test('両引数の日付が同じ大きさであれば0を返す(ver.InstantPeriod)', () => {
            const left = { financialAccountPeriod: { instant: '2030/01/01' }, amount: 2 };
            const right = { financialAccountPeriod: { instant: '2030/01/01' }, amount: 1 };

            expect(comparePeriod(left, right)).toBe(0);
        });

        test('両引数の日付が同じ大きさであれば0を返すver.DurationPeriod)', () => {
            const left = { financialAccountPeriod: { from: '2021/01/01', to: '2030/01/01' }, amount: 2 };
            const right = { financialAccountPeriod: { from: '2021/01/01', to: '2030/01/01' }, amount: 1 };

            expect(comparePeriod(left, right)).toBe(0);
        });

        test('左側の引数の日付が大きければ0より小さい値を返す(ver.InstantPeriod)', () => {
            const left = { financialAccountPeriod: { instant: '2030/01/01' }, amount: 2 };
            const right = { financialAccountPeriod: { instant: '2030/01/02' }, amount: 1 };

            expect(comparePeriod(left, right) < 0).toBeTruthy();
        });

        test('左側の引数の日付が大きければ0より小さい値を返す(ver.DurationPeriod)', () => {
            const left = { financialAccountPeriod: { from: '2021/01/01', to: '2030/01/01' }, amount: 2 };
            const right = { financialAccountPeriod: { from: '2021/01/02', to: '2030/01/01' }, amount: 2 };

            expect(comparePeriod(left, right) < 0).toBeTruthy();
        });
    });
});