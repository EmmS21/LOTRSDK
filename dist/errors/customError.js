"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAxiosError = exports.UnexpectedStatusCodeError = exports.AuthorizationError = exports.NetworkError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
class NetworkError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'NetworkError';
    }
}
exports.NetworkError = NetworkError;
class AuthorizationError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AuthorizationError';
    }
}
exports.AuthorizationError = AuthorizationError;
class UnexpectedStatusCodeError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'UnexpectedStatusCodeError';
    }
}
exports.UnexpectedStatusCodeError = UnexpectedStatusCodeError;
// Handles errors thrown by Axios and converts them to custom error types where applicable
function handleAxiosError(error) {
    var _a, _b;
    if (isAxiosError(error)) {
        const status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        const errorData = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
        const serverMessage = errorData.message || 'No additional error details provided.';
        const errorMessage = `Request failed with status code ${status}: ${serverMessage}`;
        switch (status) {
            case 401:
                return new AuthorizationError(errorMessage, status);
            case 400:
            case 404:
            case 403:
                return new ApiError(errorMessage, status);
            default:
                return new UnexpectedStatusCodeError(errorMessage, status);
        }
    }
    else if (error instanceof ApiError ||
        error instanceof NetworkError ||
        error instanceof UnexpectedStatusCodeError ||
        error instanceof AuthorizationError) {
        return error;
    }
    return new ApiError('An unknown error occurred', 500);
}
exports.handleAxiosError = handleAxiosError;
// Type guard in order to check if a particular error is an AxiosError
function isAxiosError(error) {
    return error.isAxiosError;
}
//# sourceMappingURL=customError.js.map