import * as React from 'react';
import { LineChart, LineChartData, performTimeSeriesAnalysis } from './LineChart';
import '../../../stylesheet/components/TimeSeriesAnalysis/Analysis.scss';
import { useEffect, useState } from 'react';
import { AccountItemOption, CorporationOption, Menu, TimeSeriesAnalysisRepository } from './Menu';

export function TimeSeriesAnalysis(props: { repository: TimeSeriesAnalysisRepository }) {
    const { repository } = props;
    const [selectedCorporation, setCorporation] = useState<CorporationOption | null>(null);
    const [selectedAccountItem, setAccountItem] = useState<AccountItemOption | null>(null);
    const [analysisData, setAnalysisData] = useState<LineChartData>('waitingUserInput');

    useEffect(() => {
        if (!selectedCorporation || !selectedAccountItem) {
            return;
        }
        performTimeSeriesAnalysis(
            repository,
            selectedCorporation,
            selectedAccountItem)
            .then(setAnalysisData);
    }, [selectedCorporation, selectedAccountItem]);

    return (
        <>
            <Menu
                repository={repository}
                corporationSetter={setCorporation}
                accountItemSetter={setAccountItem} />
            <LineChart data={analysisData} />
        </>
    );
}
