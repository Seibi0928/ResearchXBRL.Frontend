enum IndicatorTypeViewModel {
    NetSales = 0,
    OperatingIncome = 1,
    OrdinaryIncome = 2,
    ProfitLossAttributableToOwnersOfParent = 3,
    RateOfReturnOnEquitySummaryOfBusinessResults = 4,
    DividendPaidPerShareSummaryOfBusinessResults = 5
}
interface IndicatorsViewModel {
    indicatorType: IndicatorTypeViewModel,
    values: { [key: string]: number };
}
export interface PerformanceIndicatorsViewModel {
    indicators: IndicatorsViewModel[]
}

export interface PerformanceIndicatorsRepository {
    getPerformanceIndicators(corporationId: string): Promise<PerformanceIndicatorsViewModel>;
}
