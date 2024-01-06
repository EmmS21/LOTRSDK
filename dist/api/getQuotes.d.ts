import { QuoteResponse } from '../commons/types';
import { HttpClient } from '../commons/types';
export declare function getQuotes(httpClient?: HttpClient): Promise<QuoteResponse>;
