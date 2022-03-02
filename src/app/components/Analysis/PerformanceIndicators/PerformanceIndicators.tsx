import * as React from 'react';
import { useEffect, useState } from 'react';
import { PerformanceIndicatorsRepository, PerformanceIndicatorsViewModel } from './PerformanceIndicatorsRepository';
import { LineCharts, LineChartsData } from './LineCharts';
import { CommonMenuRepository, CorporationOption } from '../../CommonMenu/CommonMenuReporitory';
import { CorporationsSelector } from '../../CommonMenu/CorporationsSelector';
import '../../../../stylesheet/components/Analysis/PerformanceIndicators.scss';

const getPerformanceIndicators = async (
    repository: PerformanceIndicatorsRepository,
    corporation: CorporationOption)
    : Promise<PerformanceIndicatorsViewModel> => {
    return await repository.getPerformanceIndicators(corporation.value);
};

export function PerformanceIndicators(props: { commonMenuRepository: CommonMenuRepository, performanceIndicatorRepository: PerformanceIndicatorsRepository }) {
    const { commonMenuRepository, performanceIndicatorRepository } = props;
    const [selectedCorporation, setCorporation] = useState<CorporationOption | null>(null);
    const [indicatorData, setIndicatorData] = useState<LineChartsData>('waitingUserInput');

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
        <div className="performance-indicators-menu">
            <CorporationsSelector
                repository={commonMenuRepository}
                setter={setCorporation} />
            <LineCharts data={indicatorData} />
        </div>
    );
}
