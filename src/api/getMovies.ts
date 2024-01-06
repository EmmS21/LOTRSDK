import { MOVIE_URL, getAuthToken } from '../constants/config';
import { MovieApiResponse } from '../commons/types';
import apiRequestHandler from '../helpers/apiUtils';
import { HttpClient } from '../commons/types';
import { AxiosHttpClient } from '../clients/axiosHttpClient';

export async function getMovieData(
  httpClient: HttpClient = new AxiosHttpClient(),
): Promise<MovieApiResponse> {
  const authKey = getAuthToken();
  const headers = authKey ? { Authorization: `Bearer ${authKey}` } : {};
  return apiRequestHandler<MovieApiResponse>(httpClient, MOVIE_URL, headers);
}
