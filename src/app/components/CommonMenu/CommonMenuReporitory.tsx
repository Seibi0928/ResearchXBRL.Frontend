export type CorporationOption = {
    value: string,
    label: string
};

export type AccountItemOption = {
    value: string,
    label: string
};

export interface CommonMenuRepository {
    getCorporations(keyword: string): Promise<CorporationOption[]>;
    getAccountItems(keyword: string): Promise<AccountItemOption[]>;
}
