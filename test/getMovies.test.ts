import { getAuthToken, getMovieData } from '../src';
import { MovieApiResponse } from '../src/commons/types';
import { mockedMovieResponseHandler } from '../src/helpers/movieRespUtils';
import {
  setAuthToken,
  ApiError,
  NetworkError,
  UnexpectedStatusCodeError,
  AuthorizationError,
} from '../src';
import { MockHttpClient } from '../src/clients/mockHttpClient';

describe('getMovieData Public API', () => {
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    setAuthToken('testApiKey');
  });

  it('function, when called successfully, returns the correct movie data', async () => {
    const mockedResponse = mockedMovieResponseHandler<MovieApiResponse>({}, 'Movie 1');
    mockHttpClient.setMockResponse(mockedResponse);

    const movieData = await getMovieData(mockHttpClient);
    expect(movieData.docs).toHaveLength(1);
    expect(movieData.docs[0].name).toBe('Movie 1');
  });

  const errorCases = [
    { error: new ApiError('Not Found', 404), expectedError: ApiError },
    {
      error: new NetworkError('Network error', 500),
      expectedError: NetworkError,
    },
    {
      error: new UnexpectedStatusCodeError('Not Found', 404),
      expectedError: UnexpectedStatusCodeError,
    },
    {
      error: new AuthorizationError('Forbidden', 403),
      expectedError: AuthorizationError,
    },
    {
      error: new Error('Unknown error'),
      expectedError: UnexpectedStatusCodeError,
    },
  ];

  // Iterate over each error scenario to test error handling
  errorCases.forEach(({ error, expectedError }) => {
    it(`handles error case: ${error.message}`, async () => {
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const mockedError = mockedMovieResponseHandler<Error>(error, error.message, statusCode);
      mockHttpClient.setMockResponse(mockedError);

      await expect(getMovieData(mockHttpClient)).rejects.toThrow(expectedError);
    });
  });

  it('setApiKey and getApiKey functions work correctly', () => {
    const newApiKey = 'new_api_key';
    setAuthToken(newApiKey);
    expect(getAuthToken()).toBe(newApiKey);
  });

  it('function handles empty response data gracefully', async () => {
    const mockedResponse = mockedMovieResponseHandler<MovieApiResponse>({ docs: [] });
    mockHttpClient.setMockResponse(mockedResponse);

    const movieData = await getMovieData(mockHttpClient);
    expect(movieData.docs).toHaveLength(0);
  });
});
