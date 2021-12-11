import * as React from 'react';
import Select from 'react-select/async';
import { TimeSeriesAnalysisResposeValue } from './LineChart';

export interface TimeSeriesAnalysisRepository {
  getAnalysisResult(corporationId: string, accountItemName: string): Promise<TimeSeriesAnalysisResposeValue>;
  getCorporations(keyword: string): Promise<CorporationOption[]>;
  getAccountItems(keyword: string): Promise<AccountItemOption[]>;
}

export type CorporationOption = {
  value: string,
  label: string
};
export type AccountItemOption = {
  value: string,
  label: string
};

const suggestedCorporations = async (repository: TimeSeriesAnalysisRepository, keyword: string): Promise<CorporationOption[]> => {
  if (keyword === '') {
    return [];
  }

  return repository.getCorporations(keyword);
};

const suggestedAccountItems = async (repository: TimeSeriesAnalysisRepository, keyword: string): Promise<AccountItemOption[]> => {
  if (keyword.length <= 0) {
    return [];
  }

  return repository.getAccountItems(keyword);
};

export const Menu = (props: {
  repository: TimeSeriesAnalysisRepository,
  corporationSetter: React.Dispatch<React.SetStateAction<CorporationOption | null>>,
  accountItemSetter: React.Dispatch<React.SetStateAction<AccountItemOption | null>>
}) => {
  const { repository, corporationSetter, accountItemSetter } = props;
  return (<div className={"flex-container"}>
    <div role="search">
      <Select
        className="corporation-selector"
        placeholder={"企業名"}
        cacheOptions
        loadOptions={(inputValue: string) => suggestedCorporations(repository, inputValue)}
        onChange={inputValue => {
          if (!inputValue) {
            return;
          }
          corporationSetter(inputValue);
        }}
      />
    </div>
    <div role="search">
      <Select
        className="corporation-selector"
        placeholder={"会計項目名"}
        cacheOptions
        loadOptions={(inputValue: string) => suggestedAccountItems(repository, inputValue)}
        onChange={inputValue => {
          if (!inputValue) {
            return;
          }
          accountItemSetter(inputValue)
        }} />
    </div>
  </div>);
};