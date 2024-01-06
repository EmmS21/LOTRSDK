import { getMovieData } from './api/getMovies';
import { getMovieById } from './api/getMovieById';
import { getMovieQuotesById } from './api/getMovieQuotesById';
import { getQuotes } from './api/getQuotes';
import { getQuotesById } from './api/getQuotesById';
import { getFilteredMovie } from './api/getFilteredMovie';
import { setAuthToken, getAuthToken } from './constants/config';
import {
  NetworkError,
  ApiError,
  UnexpectedStatusCodeError,
  AuthorizationError,
  handleAxiosError,
} from './errors/customError';

export {
  ApiError,
  setAuthToken,
  getMovieData,
  getAuthToken,
  NetworkError,
  UnexpectedStatusCodeError,
  AuthorizationError,
  handleAxiosError,
  getMovieById,
  getMovieQuotesById,
  getQuotes,
  getQuotesById,
  getFilteredMovie,
};
