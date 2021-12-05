import * as React from 'react';
import Select from 'react-select/async';

export type CorporationOption = {
  value: string,
  label: string
};
export type AccountItemOption = {
  value: string,
  label: string
};
type CorporationInfo = {
  name: string,
  corporationId: string
};
type AccountItemInfo = {
  name: string
};

const suggestedCorporations = async (keyword: string): Promise<CorporationOption[]> => {
  if (keyword === '') {
    return [];
  }
  // TOOD: urlを変更
  const response = await fetch(`http://localhost:8080/AnalysisMenu/suggest/corporations?keyword=${keyword}`);
  const responsBody = await response.json() as CorporationInfo[];
  return responsBody.map(c => ({
    value: c.corporationId,
    label: c.name
  }));
};

const suggestedAccountItems = async (keyword: string): Promise<AccountItemOption[]> => {
  if (keyword.length <= 0) {
    return [];
  }
  // TOOD: urlを変更
  const response = await fetch(`http://localhost:8080/AnalysisMenu/suggest/accountItems?keyword=${keyword}`);
  const responsBody = await response.json() as AccountItemInfo[];
  return responsBody.map(c => ({
    value: c.name,
    label: c.name
  }));
};

export const Menu = (props: {
  corporationSetter: React.Dispatch<React.SetStateAction<CorporationOption | null>>,
  accountItemSetter: React.Dispatch<React.SetStateAction<AccountItemOption | null>>
}) => {
  const { corporationSetter, accountItemSetter } = props;

  return (<div className={"flex-container"}>
    <div>
      <Select
        className="corporation-selector"
        placeholder={"企業名"}
        cacheOptions
        loadOptions={suggestedCorporations}
        onChange={inputValue => {
          if (!inputValue) {
            return;
          }
          corporationSetter(inputValue);
        }}
      />
    </div>
    <div>
      <Select
        className="corporation-selector"
        placeholder={"会計項目名"}
        cacheOptions
        loadOptions={suggestedAccountItems}
        onChange={inputValue => {
          if (!inputValue) {
            return;
          }
          accountItemSetter(inputValue)
        }} />
    </div>
  </div>);
};