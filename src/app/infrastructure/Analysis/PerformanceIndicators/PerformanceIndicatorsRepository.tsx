import { PerformanceIndicatorsRepository, PerformanceIndicatorsViewModel } from '../../../components/Analysis/PerformanceIndicators/PerformanceIndicatorsRepository';

export class PerformanceIndicatorRepositoryImpl implements PerformanceIndicatorsRepository {
    async getPerformanceIndicators(corporationId: string): Promise<PerformanceIndicatorsViewModel> {
        const response = await fetch(`api/PerformanceIndicators?corporationId=${corporationId}`);
        return await response.json() as PerformanceIndicatorsViewModel;
    }
}