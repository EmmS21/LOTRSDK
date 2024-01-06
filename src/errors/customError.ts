import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../commons/types';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: Partial<AxiosResponse>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: Partial<AxiosResponse>,
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthorizationError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class UnexpectedStatusCodeError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = 'UnexpectedStatusCodeError';
  }
}

//Handle errors thrown and converting them to relevant error types where applicable
export function handleAxiosError(error: Error | AxiosError): Error {
  if (isAxiosError(error)) {
    const status = error.response?.status || 500;
    const errorData = error.response?.data as ErrorResponse;
    const serverMessage = errorData.message || 'No additional error details provided.';

    const errorMessage = `Request failed with status code ${status}: ${serverMessage}`;

    switch (status) {
      case 401:
        return new AuthorizationError(errorMessage, status);
      case 400:
      case 404:
      case 403:
        return new ApiError(errorMessage, status);
      default:
        return new UnexpectedStatusCodeError(errorMessage, status);
    }
  } else if (
    error instanceof ApiError ||
    error instanceof NetworkError ||
    error instanceof UnexpectedStatusCodeError ||
    error instanceof AuthorizationError
  ) {
    return error;
  }

  return new ApiError('An unknown error occurred', 500);
}

//Type guard in order to check if a particular error is an AxiosError
function isAxiosError(error: Error | AxiosError): error is AxiosError {
  return (error as AxiosError).isAxiosError;
}
