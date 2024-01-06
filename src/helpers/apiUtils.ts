import { AxiosError } from 'axios';
import { HttpClient } from '../commons/types';
import {
  ApiError,
  AuthorizationError,
  NetworkError,
  UnexpectedStatusCodeError,
  handleAxiosError,
} from '../errors/customError';
import { ErrorResponse } from '../commons/types';

const apiRequestHandler = async <T>(
  httpClient: HttpClient,
  url: string,
  headers: object = {},
): Promise<T> => {
  try {
    const response = await httpClient.get<T>(url, { headers });
    if (response.status === 401) {
    }
    if (response.status === 200) {
      return response.data;
    } else {
      const errorData = response.data as ErrorResponse;
      switch (errorData.name) {
        case 'ApiError':
          throw new ApiError(errorData.message, errorData.statusCode);
        case 'NetworkError':
          throw new NetworkError(errorData.message, errorData.statusCode);
        case 'AuthorizationError':
          throw new AuthorizationError('Authorization error', errorData.statusCode);
        default:
          throw new UnexpectedStatusCodeError(
            `Unexpected status code: ${response.status}`,
            response.status,
          );
      }
    }
  } catch (err) {
    const error = handleAxiosError(err as AxiosError);
    throw error;
  }
};

export default apiRequestHandler;
