import { getMovieQuotesById } from '../src';
import { QuoteResponse } from '../src/commons/types';
import { MockHttpClient } from '../src/clients/mockHttpClient';
import { mockMovieQuoteResponseHandler } from '../src/helpers/movieQuoteRespUtils';
import {
  setAuthToken,
  ApiError,
  NetworkError,
  UnexpectedStatusCodeError,
  AuthorizationError,
} from '../src';

describe('getMovieQuotesById API endpoint', () => {
  let mockHttpClient: MockHttpClient;
  const validId = '1234567890';

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    setAuthToken('testApiKey');
  });

  it('function, when called successfully with a valid ID, returns the correct movie quotes', async () => {
    const mockedResponse = mockMovieQuoteResponseHandler<QuoteResponse>();
    mockHttpClient.setMockResponse(mockedResponse);

    const respData = await getMovieQuotesById(validId, mockHttpClient);
    expect(respData.docs).toHaveLength(1);
    expect(respData.docs[0].movie).toBe('Sample movie');
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

  errorCases.forEach(({ error, expectedError }) => {
    it(`handles error case: ${error.message} for invalid movie ID`, async () => {
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const mockedError = mockMovieQuoteResponseHandler<Error>(error, error.message, statusCode);
      mockHttpClient.setMockResponse(mockedError);

      await expect(getMovieQuotesById(validId, mockHttpClient)).rejects.toThrow(expectedError);
    });
  });

  it('handles incorrect movie ID error', async () => {
    const incorrectId = '999';
    const error = new ApiError('Not Found', 404);
    const mockedError = mockMovieQuoteResponseHandler<Error>(
      error,
      error.message,
      error.statusCode,
    );
    mockHttpClient.setMockResponse(mockedError);

    await expect(getMovieQuotesById(incorrectId, mockHttpClient)).rejects.toThrow(ApiError);
  });

  it('function handles empty response data gracefully', async () => {
    const mockedResponse = mockMovieQuoteResponseHandler<QuoteResponse>({ docs: [] });
    mockHttpClient.setMockResponse(mockedResponse);

    const respData = await getMovieQuotesById(validId, mockHttpClient);
    expect(respData.docs).toHaveLength(0);
  });

  it('handles incorrect apiKey error', async () => {
    setAuthToken('incorrectApiKey');
    const error = new AuthorizationError('Forbidden', 403);
    const mockedError = mockMovieQuoteResponseHandler<Error>(
      error,
      error.message,
      error.statusCode,
    );
    mockHttpClient.setMockResponse(mockedError);

    await expect(getMovieQuotesById(validId, mockHttpClient)).rejects.toThrow(AuthorizationError);
  });
});
