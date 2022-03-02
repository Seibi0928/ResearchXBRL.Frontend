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
import { PerformanceIndicatorsViewModel, PerformanceIndicatorsRepository } from './PerformanceIndicatorsRepository';

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
    receiver: PerformanceIndicatorsRepository,
    corporation: CorporationOption)
    : Promise<PerformanceIndicatorsViewModel> => {
    return await receiver.getPerformanceIndicators(corporation.value);
};
const convertToChartData = (response: PerformanceIndicatorsViewModel)
    : ChartData<"line", number[], string> => {
        
    throw new Error('');
    // return {
    //     labels: [...labelsSet].sort(),
    //     datasets: [{
    //         label: `連結財務諸表`,
    //         backgroundColor: 'rgb(255, 99, 132)',
    //         borderColor: 'rgb(255, 99, 132)',
    //         data: response.consolidatedValues.sort(comparePeriod).map(v => v.amount)
    //     },
    //     {
    //         label: `単体財務諸表`,
    //         backgroundColor: 'rgb(77, 196, 255)',
    //         borderColor: 'rgb(77, 196, 255)',
    //         data: response.nonConsolidatedValues.sort(comparePeriod).map(v => v.amount)
    //     }]
    // }
}

const createChartTitle = (data: PerformanceIndicatorsViewModel) => {

    return data.indicators
};

export type LineChartData = 'waitingUserInput' | 'loading' | PerformanceIndicatorsViewModel;

export const LineChart = (props: {
    data: LineChartData
}) => {
    const { data } = props;
    if (data === 'loading') {
        return <>ロード中...</>;
    } 

    throw new Error('not implemented.');
}
