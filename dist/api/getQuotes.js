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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuotes = void 0;
const config_1 = require("../constants/config");
const apiUtils_1 = __importDefault(require("../helpers/apiUtils"));
const axiosHttpClient_1 = require("../clients/axiosHttpClient");
function getQuotes(httpClient = new axiosHttpClient_1.AxiosHttpClient()) {
    return __awaiter(this, void 0, void 0, function* () {
        const authKey = (0, config_1.getAuthToken)();
        const headers = authKey ? { Authorization: `Bearer ${authKey}` } : {};
        return (0, apiUtils_1.default)(httpClient, config_1.QUOTE_URL, headers);
    });
}
exports.getQuotes = getQuotes;
//# sourceMappingURL=getQuotes.js.map