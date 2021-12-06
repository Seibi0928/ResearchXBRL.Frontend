import { TimeSeriesAnalysisResposeValue } from "../../components/TimeSeriesAnalysis/LineChart";
import { AccountItemOption, CorporationOption, TimeSeriesAnalysisRepository } from "../../components/TimeSeriesAnalysis/Menu";

type CorporationInfo = {
  name: string,
  corporationId: string
};
type AccountItemInfo = {
  name: string
};

export class TimeSeriesAnalysisRepositoryImpl implements TimeSeriesAnalysisRepository {
  async getCorporations(keyword: string): Promise<CorporationOption[]> {
    // TOOD: urlを変更
    const response = await fetch(`http://localhost:8080/AnalysisMenu/suggest/corporations?keyword=${keyword}`);
    const responsBody = await response.json() as CorporationInfo[];
    return responsBody.map(c => ({
      value: c.corporationId,
      label: c.name
    }));
  }

  async getAccountItems(keyword: string): Promise<AccountItemOption[]> {
    // TOOD: urlを変更
    const response = await fetch(`http://localhost:8080/AnalysisMenu/suggest/accountItems?keyword=${keyword}`);
    const responsBody = await response.json() as AccountItemInfo[];
    return responsBody.map(c => ({
      value: c.name,
      label: c.name
    }));
  }

  async getAnalysisResult(corporationId: string, accountItemName: string): Promise<TimeSeriesAnalysisResposeValue> {
    const response = await fetch(`http://localhost:8080/TimeSeriesAnalysis/result?corporationId=${corporationId}&accountItemName=${accountItemName}`);
    return response.json();
  }
}