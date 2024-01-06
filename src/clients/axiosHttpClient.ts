import axios from 'axios';
import { HttpClient, HttpResponse } from '../commons/types';

export class AxiosHttpClient implements HttpClient {
  async get<T>(url: string, headers: object = {}): Promise<HttpResponse<T>> {
    const response = await axios.get(url, headers);
    return {
      data: response.data,
      status: response.status,
    };
  }
}
