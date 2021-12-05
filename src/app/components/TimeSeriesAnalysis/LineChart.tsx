import { ChartData } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { AccountItemOption, CorporationOption } from "./Menu";

export const performTimeSeriesAnalysis = async (
  corporation: CorporationOption,
  accountItem: AccountItemOption)
  : Promise<TimeSeriesAnalysisResposeValue> => {
  const response = await fetch(`http://localhost:8080/TimeSeriesAnalysis/result?corporationId=${corporation.value}&accountItemName=${accountItem.value}`);
  return await response.json();
};
const convertToChartData = (response: TimeSeriesAnalysisResposeValue)
  : ChartData<"line", number[], string> => {
  return {
    labels: response.values.map(x => {
      if (isInstansPeriod(x.financialAccountPeriod)) {
        return x.financialAccountPeriod.instant;
      }
      return x.financialAccountPeriod.from;
    }),
    datasets: [{
      label: `${response.accountName}-${response.corporation.name}`,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: response.values.map(v => v.amount)
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
type TimeSeriesAnalysisResposeValue = {
  accountName: string,
  unit: unknown,
  corporation: { name: string },
  values: TimeSeriesAnalysisValue[]
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
  } else if (!data.values.some(v => v)) {
    return <>データ無し</>;
  }
  return <div><Line data={convertToChartData(data)} /></div>;
}