import { QUOTE_URL, getAuthToken } from '../constants/config';
import { QuoteResponse } from '../commons/types';
import apiRequestHandler from '../helpers/apiUtils';
import { HttpClient } from '../commons/types';
import { AxiosHttpClient } from '../clients/axiosHttpClient';

export async function getQuotes(
  httpClient: HttpClient = new AxiosHttpClient(),
): Promise<QuoteResponse> {
  const authKey = getAuthToken();
  const headers = authKey ? { Authorization: `Bearer ${authKey}` } : {};
  return apiRequestHandler<QuoteResponse>(httpClient, QUOTE_URL, headers);
}
