export enum IndicatorTypeViewModel {
    NetSales = 0,
    OperatingIncome = 1,
    OrdinaryIncome = 2,
    ProfitLossAttributableToOwnersOfParent = 3,
    RateOfReturnOnEquitySummaryOfBusinessResults = 4,
    DividendPaidPerShareSummaryOfBusinessResults = 5
}
export interface IndicatorViewModel {
    indicatorType: IndicatorTypeViewModel,
    values: { [key: string]: number };
}
export interface PerformanceIndicatorsViewModel {
    indicators: IndicatorViewModel[]
}

export interface PerformanceIndicatorsRepository {
    getPerformanceIndicators(corporationId: string): Promise<PerformanceIndicatorsViewModel>;
}
