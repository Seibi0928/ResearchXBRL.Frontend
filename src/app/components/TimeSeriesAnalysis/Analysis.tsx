import * as React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { LineChart, LineChartData, performTimeSeriesAnalysis } from './LineChart';
import '../../../stylesheet/components/TimeSeriesAnalysis/Analysis.scss';
import { useEffect, useState } from 'react';
import { AccountItemOption, CorporationOption, Menu } from './Menu';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function TimeSeriesAnalysis() {
    const [selectedCorporation, setCorporation] = useState<CorporationOption | null>(null);
    const [selectedAccountItem, setAccountItem] = useState<AccountItemOption | null>(null);
    const [analysisData, setAnalysisData] = useState<LineChartData>('waitingUserInput');

    useEffect(() => {
        if (!selectedCorporation || !selectedAccountItem) {
            return;
        }
        performTimeSeriesAnalysis(selectedCorporation, selectedAccountItem)
            .then(setAnalysisData);
    }, [selectedCorporation, selectedAccountItem]);

    return (
        <>
            <Menu
                corporationSetter={setCorporation}
                accountItemSetter={setAccountItem} />
            <LineChart data={analysisData} />
        </>
    );
}
