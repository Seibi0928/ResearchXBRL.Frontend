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
import React from "react";
import { Line } from "react-chartjs-2";
import { AccountItemOption, CorporationOption, TimeSeriesAnalysisRepository } from "./Menu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const performTimeSeriesAnalysis = async (
  receiver: TimeSeriesAnalysisRepository,
  corporation: CorporationOption,
  accountItem: AccountItemOption)
  : Promise<TimeSeriesAnalysisResposeValue> => {
  return await receiver.getAnalysisResult(corporation.value, accountItem.value);
};
const convertToChartData = (response: TimeSeriesAnalysisResposeValue)
  : ChartData<"line", number[], string> => {
  const toLabel = (value: TimeSeriesAnalysisValue): string => {
    if (isInstansPeriod(value.financialAccountPeriod)) {
      return value.financialAccountPeriod.instant;
    }
    return value.financialAccountPeriod.from;
  };

  const labelsSet = new Set(response.consolidatedValues
    .map(toLabel).concat(response.nonConsolidatedValues
    .map(toLabel)));
  return {
    labels: [...labelsSet],
    datasets: [{
      label: `連結財務諸表`,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: response.consolidatedValues.map(v => v.amount)
    },
    {
      label: `単体財務諸表`,
      backgroundColor: 'rgb(77, 196, 255)',
      borderColor: 'rgb(77, 196, 255)',
      data: response.nonConsolidatedValues.map(v => v.amount)
    }]
  }
}

const isInstansPeriod = (period: AccountPeriod): period is InstantPeriod => {
  const mayBeInstant = period as InstantPeriod;
  return mayBeInstant.instant?.length > 0 ?? false;
}


type AccountPeriod = InstantPeriod | DurationPeriod;
type InstantPeriod = {
  instant: string
};
type DurationPeriod = {
  from: string,
  to: string
}
type TimeSeriesAnalysisValue = {
  financialAccountPeriod: AccountPeriod
  amount: number
};
export type TimeSeriesAnalysisResposeValue = {
  accountName: string,
  unit: unknown,
  corporation: { name: string },
  consolidatedValues: TimeSeriesAnalysisValue[],
  nonConsolidatedValues: TimeSeriesAnalysisValue[],
}
export type LineChartData = 'waitingUserInput' | 'loading' | TimeSeriesAnalysisResposeValue;

export const LineChart = (props: {
  data: LineChartData
}) => {
  const { data } = props;
  if (data === 'loading') {
    return <>ロード中...</>;
  } else if (data === 'waitingUserInput') {
    return <></>;
  } else if (!data.consolidatedValues.some(v => v)
    && !data.nonConsolidatedValues.some(v => v)) {
    return <>データ無し</>;
  }
  return <div role="main"><Line data={convertToChartData(data)} /></div>;
}
