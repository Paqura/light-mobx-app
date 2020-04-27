class FetchHandler {
  static check = (response: Response) => {
    if (response.status === 404) {
      throw new Error('Country not found');
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
}

const coronaService = new CoronaService();

export { coronaService }