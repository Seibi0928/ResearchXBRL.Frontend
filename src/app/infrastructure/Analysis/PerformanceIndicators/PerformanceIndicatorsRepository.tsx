import { PerformanceIndicatorsRepository, PerformanceIndicatorsViewModel } from '../../../components/Analysis/PerformanceIndicators/PerformanceIndicatorsRepository';

export class PerformanceIndicatorRepositoryImpl implements PerformanceIndicatorsRepository {
    getPerformanceIndicators(corporationId: string): Promise<PerformanceIndicatorsViewModel> {
        throw new Error('Method not implemented.');
    }

}