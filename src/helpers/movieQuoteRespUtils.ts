import { AxiosResponse } from 'axios';

export const mockMovieQuoteResponseHandler = <T>(
  data: Partial<T> = {},
  defaultName: string = 'Sample dialog',
  status: number = 200,
): AxiosResponse<T> => {
  return {
    status: status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {},
    data: {
      docs: [
        {
          _id: '1',
          dialog: defaultName,
          movie: 'Sample movie',
          character: 'Sample character',
          id: 'Sample ID',
        },
      ],
      total: 1,
      limit: 10,
      offset: 0,
      page: 1,
      pages: 1,
      ...data,
    },
  } as AxiosResponse<T>;
};
