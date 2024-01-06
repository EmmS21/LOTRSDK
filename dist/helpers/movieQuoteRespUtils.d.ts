import { AxiosResponse } from 'axios';
export declare const mockMovieQuoteResponseHandler: <T>(data?: Partial<T>, defaultName?: string, status?: number) => AxiosResponse<T, any>;
