import React from 'react';
import Select from 'react-select/async';
import { CommonMenuRepository, CorporationOption } from './CommonMenuReporitory';

const suggestedCorporations = async (repository: CommonMenuRepository, keyword: string): Promise<CorporationOption[]> => {
    if (keyword === '') {
        return [];
    }

    return repository.getCorporations(keyword);
};

export function CorporationsSelector(props: { repository: CommonMenuRepository, setter: React.Dispatch<React.SetStateAction<CorporationOption | null>> }) {
    const { repository, setter } = props;
    return <Select
        className="corporation-selector"
        placeholder={"企業名"}
        cacheOptions
        loadOptions={(inputValue: string) => suggestedCorporations(repository, inputValue)}
        onChange={inputValue => {
            if (!inputValue) {
                return;
            }
            setter(inputValue);
        }}
    />
}