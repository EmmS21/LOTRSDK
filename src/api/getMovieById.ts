import { MOVIE_URL, getAuthToken } from '../constants/config';
import { MovieApiResponse } from '../commons/types';
import apiRequestHandler from '../helpers/apiUtils';
import { HttpClient } from '../commons/types';
import { AxiosHttpClient } from '../clients/axiosHttpClient';

export async function getMovieById(
  id: string,
  httpClient: HttpClient = new AxiosHttpClient(),
): Promise<MovieApiResponse> {
  const apiKey = getAuthToken();
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
  const movieUrl = `${MOVIE_URL}/${id}`;
  return apiRequestHandler<MovieApiResponse>(httpClient, movieUrl, headers);
}
