import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js'
import dayjs from 'dayjs';
import React from "react";
import { Line } from "react-chartjs-2";
import { CorporationOption } from '../../CommonMenu/CommonMenuReporitory';
import { PerformanceIndicatorsViewModel, PerformanceIndicatorsRepository, IndicatorViewModel, IndicatorTypeViewModel } from './PerformanceIndicatorsRepository';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const getPerformanceIndicators = async (
    repository: PerformanceIndicatorsRepository,
    corporation: CorporationOption)
    : Promise<PerformanceIndicatorsViewModel> => {
    return await repository.getPerformanceIndicators(corporation.value);
};
const convertToChartData = (indicator: IndicatorViewModel)
    : ChartData<"line", number[], string> => {

    return {
        labels: Object.keys(indicator.values).map(dayjs).sort((a, b) => a.diff(b)).map(x => x.format('YYYY/MM')),
        datasets: [{
            label: createChartTitle(indicator),
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: Object.keys(indicator.values)
                .map(x => { return { key: dayjs(x), value: indicator.values[x] } })
                .sort((a, b) => a.key.diff(b.key))
                .map(x => x.value)
        }]
    };
}

const createChartTitle = (indicator: IndicatorViewModel) => {
    switch (indicator.indicatorType) {
        case IndicatorTypeViewModel.NetSales:
            return '売上高';
        case IndicatorTypeViewModel.OperatingIncome:
            return '営業利益';
        case IndicatorTypeViewModel.OrdinaryIncome:
            return '経常利益';
        case IndicatorTypeViewModel.ProfitLossAttributableToOwnersOfParent:
            return '親会社の所有者に帰属する利益';
        case IndicatorTypeViewModel.RateOfReturnOnEquitySummaryOfBusinessResults:
            return 'ROE';
        case IndicatorTypeViewModel.DividendPaidPerShareSummaryOfBusinessResults:
            return '１株当たり配当';
        default:
            return ''
    }
};

export type LineChartsData = 'waitingUserInput' | 'loading' | PerformanceIndicatorsViewModel;

export const LineCharts = (props: {
    data: LineChartsData
}) => {
    const { data } = props;
    if (data === 'loading') {
        return <div role="main">ロード中...</div>;
    } else if (data === 'waitingUserInput') {
        return <div role="main"></div>;
    }

    return <div role="main">
        <div role="group" className="indicators-container">
            {data.indicators.map((i, index) =>
                <div role="figure" key={index}>
                    <Line options={{
                        plugins: {
                            title: {
                                display: true,
                                text: createChartTitle(i),
                                padding: {
                                    top: 10,
                                    bottom: 20
                                }
                            }
                        }
                    }} data={convertToChartData(i)} />
                </div>
            )}
        </div>
    </div>
}
