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
    if (isInstantPeriod(value.financialAccountPeriod)) {
      return dayjs(value.financialAccountPeriod.instant).format('YYYY/MM');
    }
    return dayjs(value.financialAccountPeriod.from).format('YYYY/MM');
  };

  const labelsSet = new Set(response.consolidatedValues
    .map(toLabel).concat(response.nonConsolidatedValues
      .map(toLabel)));
  return {
    labels: [...labelsSet].sort(),
    datasets: [{
      label: `連結財務諸表`,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: response.consolidatedValues.sort(comparePeriod).map(v => v.amount)
    },
    {
      label: `単体財務諸表`,
      backgroundColor: 'rgb(77, 196, 255)',
      borderColor: 'rgb(77, 196, 255)',
      data: response.nonConsolidatedValues.sort(comparePeriod).map(v => v.amount)
    }]
  }
}

const isInstantPeriod = (period: AccountPeriod): period is InstantPeriod => {
  const mayBeInstant = period as InstantPeriod;
  return mayBeInstant.instant?.length > 0 ?? false;
}
const comparePeriod = (a: TimeSeriesAnalysisValue, b: TimeSeriesAnalysisValue): number => {
  if (isInstantPeriod(a.financialAccountPeriod)
  && isInstantPeriod(b.financialAccountPeriod)) {
    return a.financialAccountPeriod.instant
      .localeCompare(b.financialAccountPeriod.instant);
  }
  else if (!isInstantPeriod(a.financialAccountPeriod)
  && !isInstantPeriod(b.financialAccountPeriod)) {
    return a.financialAccountPeriod.from
      .localeCompare(b.financialAccountPeriod.from);
  }
  throw new Error('単位情報に不整合があります');
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
  unit: Unit,
  corporation: { name: string },
  consolidatedValues: TimeSeriesAnalysisValue[],
  nonConsolidatedValues: TimeSeriesAnalysisValue[],
}
export type Unit = NormalUnit | DividedUnit
type BaseUnit = { name: string }
type NormalUnit = {
  measure: string
} & BaseUnit
type DividedUnit = {
  unitNumerator: string,
  unitDenominator: string
} & BaseUnit
const isNormalUnit = (unit: Unit): unit is NormalUnit => {
  const maybeNormalUnit = unit as DividedUnit;
  return maybeNormalUnit.unitNumerator === null;
};
const createChartTitle = (data: TimeSeriesAnalysisResposeValue) => {
  if (isNormalUnit(data.unit)) {
    return `${data.accountName} ${data.unit.name}(${data.unit.measure})`
  }

  return `${data.accountName} ${data.unit.name}(${data.unit.unitNumerator} / ${data.unit.unitDenominator})`
};

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
  return <div role="main"><Line options={{
    plugins: {
      title: {
        display: true,
        text: createChartTitle(data),
        padding: {
          top: 10,
          bottom: 20
        }
      }
    }
  }} data={convertToChartData(data)} /></div>;
}
