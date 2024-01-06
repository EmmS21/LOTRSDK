import { AxiosError, AxiosResponse } from 'axios';
export declare class ApiError extends Error {
    statusCode: number;
    details?: Partial<AxiosResponse<any, any>> | undefined;
    constructor(message: string, statusCode: number, details?: Partial<AxiosResponse<any, any>> | undefined);
}
export declare class NetworkError extends Error {
    statusCode: number;
    details?: Partial<AxiosResponse<any, any>> | undefined;
    constructor(message: string, statusCode: number, details?: Partial<AxiosResponse<any, any>> | undefined);
}
export declare class AuthorizationError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class UnexpectedStatusCodeError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare function handleAxiosError(error: Error | AxiosError): Error;
