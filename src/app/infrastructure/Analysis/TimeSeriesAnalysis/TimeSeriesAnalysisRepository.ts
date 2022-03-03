import { TimeSeriesAnalysisRepository, TimeSeriesAnalysisViewModel } from "../../../components/Analysis/TimeSeriesAnalysis/TimeSeriesAnalysisRepository";

export class TimeSeriesAnalysisRepositoryImpl implements TimeSeriesAnalysisRepository {

  async getAnalysisResult(corporationId: string, accountItemName: string): Promise<TimeSeriesAnalysisViewModel> {
    const response = await fetch(`api/TimeSeriesAnalysis/result?corporationId=${corporationId}&accountItemName=${accountItemName}`);
    return response.json();
  }
}