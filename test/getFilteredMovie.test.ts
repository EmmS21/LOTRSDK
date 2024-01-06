import { getFilteredMovie } from '../src';
import { FilterAction, FilteredMovie, MovieApiResponse } from '../src/commons/types';
import { mockedMovieResponseHandler } from '../src/helpers/movieRespUtils';
import { setAuthToken, NetworkError } from '../src';
import { MockHttpClient } from '../src/clients/mockHttpClient';
import { MOVIE_URL, QUOTE_URL } from '../src/constants/config';
import { appendFilterArgsToUrl } from '../src/helpers/filterUtils';

describe('getFilteredMovie Public API', () => {
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    setAuthToken('testApiKey');
  });

  const filters = [
    { key: 'name', value: 'The Lord of the Rings', action: 'match', pattern: '=' },
    { key: 'name', value: 'The Lord of the Rings', action: 'negateMatch', pattern: '!=' },
    { key: 'name', value: 'exists', action: 'exists', pattern: '' },
    { key: 'name', value: 'regex', action: 'regex', pattern: '=/' },
    { key: 'budgetInMillions', value: '500', action: 'lessThan', pattern: '<' },
    { key: 'runtimeInMinutes', value: '90', action: 'greaterThanOrEqual', pattern: '>=' },
  ];

  filters.forEach(({ key, value, action, pattern }) => {
    let adjustedPattern: string;
    if (action === 'exists') {
      adjustedPattern = `=${value}`;
    } else {
      const encodedValue = encodeURIComponent(value);
      adjustedPattern = `${pattern}${encodedValue}`;
    }
    it(`correctly constructs URL for ${action} action with MOVIE_URL`, async () => {
      const filterObj: FilteredMovie = { [key]: { value, action: action as FilterAction } };
      const expectedUrl = `${MOVIE_URL}?${key}${adjustedPattern}`;
      const mockedResponse = mockedMovieResponseHandler<MovieApiResponse>({}, 'Dummy Data');
      mockHttpClient.setMockResponse(mockedResponse);
      await getFilteredMovie(mockHttpClient, filterObj, MOVIE_URL);
      const urlCalled = mockHttpClient.getLastCalledUrl();
      expect(urlCalled).toContain(expectedUrl);
    });
    it(`correctly constructs URL for ${action} action with QUOTE_URL`, async () => {
      const filterObj: FilteredMovie = { [key]: { value, action: action as FilterAction } };
      const expectedUrl = `${QUOTE_URL}?${key}${adjustedPattern}`;
      const mockedResponse = mockedMovieResponseHandler<MovieApiResponse>({}, 'Dummy Data');
      mockHttpClient.setMockResponse(mockedResponse);
      await getFilteredMovie(mockHttpClient, filterObj, QUOTE_URL);
      const urlCalled = mockHttpClient.getLastCalledUrl();
      expect(urlCalled).toContain(expectedUrl);
    });
  });

  it('function correctly handles invalid filter input', () => {
    const invalidFilter: FilteredMovie = {
      incorrectKey: {
        value: 'Dummy Data',
        action: 'match',
      },
    };
    const url = appendFilterArgsToUrl(MOVIE_URL, invalidFilter);
    expect(url).toBe(MOVIE_URL);
  });

  it('function handles empty or no filter parameters gracefully', async () => {
    const emptyFilter: FilteredMovie = {};
    const mockedResponse = mockedMovieResponseHandler<MovieApiResponse>({}, 'Dummy Data');
    mockHttpClient.setMockResponse(mockedResponse);
    await getFilteredMovie(mockHttpClient, emptyFilter);
    const urlCalled = mockHttpClient.getLastCalledUrl();
    const expectedUrl = MOVIE_URL;
    expect(urlCalled).toContain(expectedUrl);
  });

  it('function handles network delays gracefully', async () => {
    const filterObj: FilteredMovie = {
      name: {
        value: 'The Lord of the Rings',
        action: 'match',
      },
    };
    const mockedResponse = mockedMovieResponseHandler<MovieApiResponse>({}, 'Dummy Data');
    mockHttpClient.setMockResponse(mockedResponse);
    mockHttpClient.setTimeoutResponse();
    try {
      await getFilteredMovie(mockHttpClient, filterObj);
      fail('Function did not handle timeout as expected');
    } catch (error) {
      expect(error).toBeInstanceOf(NetworkError);
    }
  });

  it('function handles multiple filter params correctly', async () => {
    const multipleFilter: FilteredMovie = {
      budgetInMillions: {
        value: 500,
        action: 'lessThan',
      },
      runtimeInMinutes: {
        value: 90,
        action: 'greaterThanOrEqual',
      },
    };
    const mockedResponse = mockedMovieResponseHandler<MovieApiResponse>({}, 'Dummy Data');
    mockHttpClient.setMockResponse(mockedResponse);
    await getFilteredMovie(mockHttpClient, multipleFilter);
    const expectedUrl = `${MOVIE_URL}?budgetInMillions<500&runtimeInMinutes>=90`;
    const urlCalled = mockHttpClient.getLastCalledUrl();
    expect(urlCalled).toContain(expectedUrl);
  });
});
