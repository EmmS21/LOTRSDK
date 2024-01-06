"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthToken = exports.setAuthToken = exports.QUOTE_URL = exports.MOVIE_URL = void 0;
exports.MOVIE_URL = 'https://the-one-api.dev/v2/movie/';
exports.QUOTE_URL = 'https://the-one-api.dev/v2/quote/';
let userAuthToken = null;
const setAuthToken = (apiKey) => {
    userAuthToken = apiKey;
};
exports.setAuthToken = setAuthToken;
const getAuthToken = () => {
    return userAuthToken;
};
exports.getAuthToken = getAuthToken;
//# sourceMappingURL=config.js.map