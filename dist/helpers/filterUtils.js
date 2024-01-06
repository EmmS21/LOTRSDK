"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendFilterParamsToUrl = void 0;
function typeOfFilter(val, action) {
    let result;
    switch (action) {
        case 'lessThan':
            result = `<${val}`;
            break;
        case 'greaterThan':
            result = `>${val}`;
            break;
        case 'lessThanOrEqual':
            result = `<=${val}`;
            break;
        case 'greaterThanOrEqual':
            result = `>=${val}`;
            break;
        case 'match':
            result = encodeURIComponent(val.toString());
            break;
        case 'negateMatch':
            result = `!=${encodeURIComponent(val.toString())}`;
            break;
        case 'exists':
            result = 'exists';
            break;
        case 'regex':
            result = `=/${val}/i`;
            break;
        default:
            result = encodeURIComponent(val.toString());
            break;
    }
    return result;
}
function appendFilterParamsToUrl(movieUrl, filterArgs) {
    let url = movieUrl;
    const validKeys = new Set([
        '_id',
        'name',
        'runtimeInMinutes',
        'budgetInMillions',
        'boxOfficeRevenueInMillions',
        'academyAwardNominations',
        'academyAwardWins',
        'rottenTomatoesScore',
    ]);
    const test = Object.entries(filterArgs);
    const params = Object.entries(filterArgs)
        .filter(([key]) => validKeys.has(key))
        .map(([key, filter]) => {
        if (typeof filter === 'object' &&
            (filter === null || filter === void 0 ? void 0 : filter.value) !== undefined &&
            typeof filter.action === 'string') {
            const formattedValue = typeOfFilter(filter.value, filter.action);
            // Determine if an equal sign should be used
            const useEqualSign = ![
                'lessThan',
                'greaterThan',
                'lessThanOrEqual',
                'greaterThanOrEqual',
                'regex',
                'negateMatch',
            ].includes(filter.action);
            const param = formattedValue ? `${key}${useEqualSign ? '=' : ''}${formattedValue}` : null;
            return param;
        }
        return null;
    })
        .filter((param) => param !== null);
    if (params.length > 0) {
        url += `?${params.join('&')}`;
        return url;
    }
    return url;
}
exports.appendFilterParamsToUrl = appendFilterParamsToUrl;
//# sourceMappingURL=filterUtils.js.map