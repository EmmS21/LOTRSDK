import { HttpClient } from '../commons/types';
declare const apiRequestHandler: <T>(httpClient: HttpClient, url: string, headers?: object) => Promise<T>;
export default apiRequestHandler;
