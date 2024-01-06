import { MovieApiResponse } from '../commons/types';
import { HttpClient } from '../commons/types';
export declare function getMovieById(id: string, httpClient?: HttpClient): Promise<MovieApiResponse>;
