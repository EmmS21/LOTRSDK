"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedMovieResponseHandler = void 0;
const mockedMovieResponseHandler = (data = {}, defaultName = 'Movie 1', status = 200) => {
    let respData;
    if (data instanceof Error) {
        respData = data;
    }
    else {
        respData = Object.assign({ docs: [{ _id: '1', name: defaultName }], total: 1, limit: 10, offset: 0, page: 1, pages: 1 }, data);
    }
    return {
        status: status,
        statusText: status === 200 ? 'OK' : 'Error',
        headers: {},
        config: {},
        data: respData,
    };
};
exports.mockedMovieResponseHandler = mockedMovieResponseHandler;
//# sourceMappingURL=movieRespUtils.js.map