"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMovieQuoteResponseHandler = void 0;
const mockMovieQuoteResponseHandler = (data = {}, defaultName = 'Sample dialog', status = 200) => {
    return {
        status: status,
        statusText: status === 200 ? 'OK' : 'Error',
        headers: {},
        config: {},
        data: Object.assign({ docs: [
                {
                    _id: '1',
                    dialog: defaultName,
                    movie: 'Sample movie',
                    character: 'Sample character',
                    id: 'Sample ID',
                },
            ], total: 1, limit: 10, offset: 0, page: 1, pages: 1 }, data),
    };
};
exports.mockMovieQuoteResponseHandler = mockMovieQuoteResponseHandler;
//# sourceMappingURL=movieQuoteRespUtils.js.map