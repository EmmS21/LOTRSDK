import { MOVIE_URL, getAuthToken } from '../constants/config';
import { QuoteResponse } from '../commons/types';
import apiRequestHandler from '../helpers/apiUtils';
import { HttpClient } from '../commons/types';
import { AxiosHttpClient } from '../clients/axiosHttpClient';

export async function getMovieQuotesById(
  id: string,
  httpClient: HttpClient = new AxiosHttpClient(),
): Promise<QuoteResponse> {
  const apiKey = getAuthToken();
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
  const movieUrl = `${MOVIE_URL}/${id}/quote`;
  return apiRequestHandler<QuoteResponse>(httpClient, movieUrl, headers);
}
