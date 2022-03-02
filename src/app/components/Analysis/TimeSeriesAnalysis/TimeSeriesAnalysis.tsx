import * as React from 'react';
import { LineChart, LineChartData, performTimeSeriesAnalysis } from './LineChart';
import { useEffect, useState } from 'react';
import { Menu } from './Menu';
import { AccountItemOption, CommonMenuRepository, CorporationOption } from '../../CommonMenu/CommonMenuReporitory';
import { TimeSeriesAnalysisRepository } from './TimeSeriesAnalysisRepository';
import '../../../../stylesheet/components/Analysis/TimeSeriesAnalysis.scss';

export function TimeSeriesAnalysis(props: {
    commonMenuRepository: CommonMenuRepository,
    timeSeriesAnalysisRepository: TimeSeriesAnalysisRepository
}) {
    const { commonMenuRepository, timeSeriesAnalysisRepository } = props;
    const [selectedCorporation, setCorporation] = useState<CorporationOption | null>(null);
    const [selectedAccountItem, setAccountItem] = useState<AccountItemOption | null>(null);
    const [analysisData, setAnalysisData] = useState<LineChartData>('waitingUserInput');

    useEffect(() => {
        if (!selectedCorporation || !selectedAccountItem) {
            return;
        }
        setAnalysisData('loading');
        performTimeSeriesAnalysis(
            timeSeriesAnalysisRepository,
            selectedCorporation,
            selectedAccountItem)
            .then(setAnalysisData);
    }, [selectedCorporation, selectedAccountItem]);

    return (
        <>
            <Menu
                repository={commonMenuRepository}
                corporationSetter={setCorporation}
                accountItemSetter={setAccountItem} />
            <LineChart data={analysisData} />
        </>
    );
}
