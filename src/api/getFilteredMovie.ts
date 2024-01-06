import { MOVIE_URL, getAuthToken } from '../constants/config';
import { MovieApiResponse, FilteredMovie } from '../commons/types';
import apiRequestHandler from '../helpers/apiUtils';
import { HttpClient } from '../commons/types';
import { AxiosHttpClient } from '../clients/axiosHttpClient';
import { appendFilterArgsToUrl } from '../helpers/filterUtils';

export async function getFilteredMovie(
  httpClient: HttpClient = new AxiosHttpClient(),
  filterArgs: FilteredMovie,
  baseUrl: string = MOVIE_URL,
): Promise<MovieApiResponse> {
  const authKey = getAuthToken();
  const urlWithFilterParams = appendFilterArgsToUrl(baseUrl, filterArgs);
  const headers = authKey ? { Authorization: `Bearer ${authKey}` } : {};
  return apiRequestHandler<MovieApiResponse>(httpClient, urlWithFilterParams, headers);
}
