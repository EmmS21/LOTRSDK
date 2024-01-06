import { AxiosResponse } from 'axios';
import { HttpClient, HttpResponse } from '../commons/types';
import { NetworkError } from '../errors/customError';

//mocking behavior of HTTP client
export class MockHttpClient implements HttpClient {
  private mockAxiosResponse!: AxiosResponse;
  private lastCalledUrl: string | null = null;
  private simulateTimeout: boolean = false;

  setMockResponse<T>(response: AxiosResponse<T>) {
    this.mockAxiosResponse = response;
  }

  getLastCalledUrl() {
    return this.lastCalledUrl;
  }

  setTimeoutResponse() {
    this.simulateTimeout = true;
  }

  async get<T>(url: string): Promise<HttpResponse<T>> {
    if (!this.mockAxiosResponse) {
      throw new Error('Mock response not set');
    }

    this.lastCalledUrl = url;

    if (this.simulateTimeout) {
      const mockResponse: Partial<AxiosResponse> = {
        status: 408,
        statusText: 'Request Timeout',
        headers: {},
        data: { message: 'Network timeout' },
      };
      throw new NetworkError('Network timeout', 408, mockResponse);
    }

    return Promise.resolve({
      status: this.mockAxiosResponse.status,
      data: this.mockAxiosResponse.data,
    });
  }

  resetTimeoutSimulation() {
    this.simulateTimeout = false;
  }
}
