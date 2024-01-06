import { AxiosResponse } from 'axios';
import { HttpClient, HttpResponse } from '../commons/types';
export declare class MockHttpClient implements HttpClient {
    private mockAxiosResponse;
    private lastCalledUrl;
    private simulateTimeout;
    setMockResponse<T>(response: AxiosResponse<T>): void;
    getLastCalledUrl(): string | null;
    setTimeoutResponse(): void;
    get<T>(url: string): Promise<HttpResponse<T>>;
    resetTimeoutSimulation(): void;
}
