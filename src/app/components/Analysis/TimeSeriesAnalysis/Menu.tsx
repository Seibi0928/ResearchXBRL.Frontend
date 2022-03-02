import * as React from 'react';
import { AccountItemsSelector } from '../../CommonMenu/AccountItemsSelector';
import { CorporationsSelector } from '../../CommonMenu/CorporationsSelector';
import { AccountItemOption, CommonMenuRepository, CorporationOption } from '../../CommonMenu/CommonMenuReporitory';

export const Menu = (props: {
  repository: CommonMenuRepository,
  corporationSetter: React.Dispatch<React.SetStateAction<CorporationOption | null>>,
  accountItemSetter: React.Dispatch<React.SetStateAction<AccountItemOption | null>>
}) => {
  const { repository, corporationSetter, accountItemSetter } = props;
  return (<div className={"flex-container"}>
    <CorporationsSelector repository={repository} setter={corporationSetter} />
    <AccountItemsSelector repository={repository} setter={accountItemSetter} />
  </div>);
};