export interface Movie {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
}
export interface MovieApiResponse {
    docs: Movie[];
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
}
export interface QuoteResponse {
    docs: Quote[];
}
export interface Quote {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
    id: string;
}
export interface ErrorResponse {
    name: string;
    message: string;
    statusCode: number;
}
export interface HttpResponse<T> {
    data: T;
    status: number;
}
export interface HttpClient {
    get<T>(url: string, headers?: object): Promise<HttpResponse<T>>;
}
export interface FilteredMovie {
    [key: string]: {
        value: FilterVal;
        action?: FilterAction;
    } | string | number | null;
}
export type FilterVal = string | number;
export type FilterAction = 'lessThan' | 'greaterThan' | 'lessThanOrEqual' | 'greaterThanOrEqual' | 'match' | 'negateMatch' | 'exists' | 'regex';
