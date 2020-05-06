type TimeLineItem = { [key: string]: number }

interface TimeLine {
  cases: TimeLineItem;
  deaths: TimeLineItem;
};
interface ChartDataResponse {
  country: string;
  timeline: TimeLine;
}

class FetchHandler {
  static check = async (response: Response) => {
    if (response.status === 404) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }
}

class CoronaService {
  static baseUrl: string = 'https://corona.lmao.ninja';

  getCountries = async () => {
    return await fetch(`${CoronaService.baseUrl}/v2/countries`).then(FetchHandler.check)
  }

  getCountry = async (country: string) => {
    return await fetch(`${CoronaService.baseUrl}/v2/countries/${country}`).then(FetchHandler.check)
  }

  getChartData = async (country: string, limit: number = 30): Promise<ChartDataResponse> => {
    return await fetch(`${CoronaService.baseUrl}/v2/historical/${country}?lastdays=${limit}`).then(FetchHandler.check)
  }
}

const coronaService = new CoronaService();

export { coronaService }