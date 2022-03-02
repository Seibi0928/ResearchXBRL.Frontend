import React from 'react';
import Select from 'react-select/async';
import { AccountItemOption, CommonMenuRepository } from './CommonMenuReporitory';
import '../../../stylesheet/components/CommonMenu/CommonSelector.scss';


const suggestedAccountItems = async (repository: CommonMenuRepository, keyword: string): Promise<AccountItemOption[]> => {
    if (keyword.length <= 0) {
        return [];
    }

    return repository.getAccountItems(keyword);
};

export function AccountItemsSelector(props: { repository: CommonMenuRepository, setter: React.Dispatch<React.SetStateAction<AccountItemOption | null>> }) {
    const { repository, setter } = props;
    return <div role="search" className="common-selector">
        <Select
            className="corporation-selector"
            placeholder={"企業名"}
            cacheOptions
            loadOptions={(inputValue: string) => suggestedAccountItems(repository, inputValue)}
            onChange={inputValue => {
                if (!inputValue) {
                    return;
                }
                setter(inputValue);
            }}
        />
    </div>
}