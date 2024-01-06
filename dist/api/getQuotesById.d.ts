import { QuoteResponse } from '../commons/types';
import { HttpClient } from '../commons/types';
export declare function getQuotesById(id: string, httpClient?: HttpClient): Promise<QuoteResponse>;
