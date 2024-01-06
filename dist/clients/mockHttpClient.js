"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockHttpClient = void 0;
const customError_1 = require("../errors/customError");
//mocking behavior of HTTP client
class MockHttpClient {
    constructor() {
        this.lastCalledUrl = null;
        this.simulateTimeout = false;
    }
    setMockResponse(response) {
        this.mockAxiosResponse = response;
    }
    getLastCalledUrl() {
        return this.lastCalledUrl;
    }
    setTimeoutResponse() {
        this.simulateTimeout = true;
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mockAxiosResponse) {
                throw new Error('Mock response not set');
            }
            this.lastCalledUrl = url;
            if (this.simulateTimeout) {
                const mockResponse = {
                    status: 408,
                    statusText: 'Request Timeout',
                    headers: {},
                    data: { message: 'Network timeout' },
                };
                throw new customError_1.NetworkError('Network timeout', 408, mockResponse);
            }
            return Promise.resolve({
                status: this.mockAxiosResponse.status,
                data: this.mockAxiosResponse.data,
            });
        });
    }
    resetTimeoutSimulation() {
        this.simulateTimeout = false;
    }
}
exports.MockHttpClient = MockHttpClient;
//# sourceMappingURL=mockHttpClient.js.map