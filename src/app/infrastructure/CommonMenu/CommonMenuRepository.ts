import { AccountItemOption, CommonMenuRepository, CorporationOption } from '../../components/CommonMenu/CommonMenuReporitory';

type CorporationInfo = {
  name: string,
  corporationId: string
};
type AccountItemInfo = {
  name: string
};


export class CommonMenuRepositoryImpl implements CommonMenuRepository {
  async getCorporations(keyword: string): Promise<CorporationOption[]> {
    const response = await fetch(`api/AnalysisMenu/suggest/corporations?keyword=${keyword}`);
    const responsBody = await response.json() as CorporationInfo[];
    return responsBody.map(c => ({
      value: c.corporationId,
      label: c.name
    }));
  }

  async getAccountItems(keyword: string): Promise<AccountItemOption[]> {
    const response = await fetch(`api/AnalysisMenu/suggest/accountItems?keyword=${keyword}`);
    const responsBody = await response.json() as AccountItemInfo[];
    return responsBody.map(c => ({
      value: c.name,
      label: c.name
    }));
  }
}