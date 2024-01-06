import { HttpClient, HttpResponse } from '../commons/types';
export declare class AxiosHttpClient implements HttpClient {
    get<T>(url: string, headers?: object): Promise<HttpResponse<T>>;
}
