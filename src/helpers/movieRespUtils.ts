import { AxiosResponse } from 'axios';

export const mockedMovieResponseHandler = <T>(
  data: Partial<T> = {},
  defaultName: string = 'Movie 1',
  status: number = 200,
): AxiosResponse<T> => {
  let respData: T | Error;
  if (data instanceof Error) {
    respData = data;
  } else {
    respData = {
      docs: [{ _id: '1', name: defaultName }],
      total: 1,
      limit: 10,
      offset: 0,
      page: 1,
      pages: 1,
      ...data,
    } as T;
  }
  return {
    status: status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {},
    data: respData,
  } as AxiosResponse<T>;
};
