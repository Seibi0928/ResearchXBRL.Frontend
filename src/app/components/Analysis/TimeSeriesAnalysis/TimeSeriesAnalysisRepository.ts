export interface TimeSeriesAnalysisRepository {
    getAnalysisResult(corporationId: string, accountItemName: string): Promise<TimeSeriesAnalysisViewModel>;
}

export const isInstantPeriod = (period: AccountPeriod): period is InstantPeriod => {
    const mayBeInstant = period as InstantPeriod;
    return mayBeInstant.instant?.length > 0 ?? false;
}
export const comparePeriod = (a: TimeSeriesAnalysisValue, b: TimeSeriesAnalysisValue): number => {
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

export type AccountPeriod = InstantPeriod | DurationPeriod;
export type InstantPeriod = {
    instant: string
};
export type DurationPeriod = {
    from: string,
    to: string
}
export type TimeSeriesAnalysisValue = {
    financialAccountPeriod: AccountPeriod
    amount: number
};
export type TimeSeriesAnalysisViewModel = {
    accountName: string,
    unit: Unit,
    corporation: { name: string },
    consolidatedValues: TimeSeriesAnalysisValue[],
    nonConsolidatedValues: TimeSeriesAnalysisValue[],
}
export type Unit = NormalUnit | DividedUnit
export type BaseUnit = { name: string }
export type NormalUnit = {
    measure: string
} & BaseUnit
export type DividedUnit = {
    unitNumerator: string,
    unitDenominator: string
} & BaseUnit
export const isNormalUnit = (unit: Unit): unit is NormalUnit => {
    const maybeNormalUnit = unit as DividedUnit;
    return maybeNormalUnit.unitNumerator === null;
};