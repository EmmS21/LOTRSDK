import { MovieApiResponse } from '../commons/types';
import { HttpClient } from '../commons/types';
export declare function getMovieData(httpClient?: HttpClient): Promise<MovieApiResponse>;
