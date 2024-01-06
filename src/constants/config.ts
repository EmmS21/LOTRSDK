export const MOVIE_URL = 'https://the-one-api.dev/v2/movie/';
export const QUOTE_URL = 'https://the-one-api.dev/v2/quote/';

let userAuthToken: string | null = null;

export const setAuthToken = (apiKey: string): void => {
  userAuthToken = apiKey;
};

export const getAuthToken = (): string | null => {
  return userAuthToken;
};
