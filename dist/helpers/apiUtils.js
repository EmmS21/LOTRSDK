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
const customError_1 = require("../errors/customError");
const apiRequestHandler = (httpClient, url, headers = {}) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield httpClient.get(url, { headers });
        if (response.status === 401) {
        }
        if (response.status === 200) {
            return response.data;
        }
        else {
            const errorData = response.data;
            switch (errorData.name) {
                case 'ApiError':
                    throw new customError_1.ApiError(errorData.message, errorData.statusCode);
                case 'NetworkError':
                    throw new customError_1.NetworkError(errorData.message, errorData.statusCode);
                case 'AuthorizationError':
                    throw new customError_1.AuthorizationError('Authorization error', errorData.statusCode);
                default:
                    throw new customError_1.UnexpectedStatusCodeError(`Unexpected status code: ${response.status}`, response.status);
            }
        }
    }
    catch (err) {
        const error = (0, customError_1.handleAxiosError)(err);
        throw error;
    }
});
exports.default = apiRequestHandler;
//# sourceMappingURL=apiUtils.js.map