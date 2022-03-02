import * as React from 'react';
import { useEffect, useState } from 'react';
import { PerformanceIndicatorsRepository } from './PerformanceIndicatorsRepository';
import { getPerformanceIndicators } from './LineChart';
import { CommonMenuRepository, CorporationOption } from '../../CommonMenu/CommonMenuReporitory';
import { CorporationsSelector } from '../../CommonMenu/CorporationsSelector';

export function PerformanceIndicators(props: { commonMenuRepository: CommonMenuRepository, performanceIndicatorRepository: PerformanceIndicatorsRepository }) {
    const { commonMenuRepository, performanceIndicatorRepository } = props;
    const [selectedCorporation, setCorporation] = useState<CorporationOption | null>(null);
    const [indicatorData, setIndicatorData] = useState<unknown>('waitingUserInput');

    useEffect(() => {
        if (!selectedCorporation) {
            return;
        }
        setIndicatorData('loading');
        getPerformanceIndicators(
            performanceIndicatorRepository,
            selectedCorporation)
            .then(setIndicatorData);
    }, [selectedCorporation]);

    return (
        <>
            <CorporationsSelector
                repository={commonMenuRepository}
                setter={setCorporation} />
            {/* <LineChart data={analysisData} /> */}
        </>
    );
}
