import { AxiosResponse } from 'axios';
export declare const mockedMovieResponseHandler: <T>(data?: Partial<T>, defaultName?: string, status?: number) => AxiosResponse<T, any>;
