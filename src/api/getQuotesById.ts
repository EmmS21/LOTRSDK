import { QUOTE_URL, getAuthToken } from '../constants/config';
import { QuoteResponse } from '../commons/types';
import apiRequestHandler from '../helpers/apiUtils';
import { HttpClient } from '../commons/types';
import { AxiosHttpClient } from '../clients/axiosHttpClient';

export async function getQuotesById(
  id: string,
  httpClient: HttpClient = new AxiosHttpClient(),
): Promise<QuoteResponse> {
  const apiKey = getAuthToken();
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
  const movieUrl = `${QUOTE_URL}/${id}`;
  return apiRequestHandler<QuoteResponse>(httpClient, movieUrl, headers);
}
