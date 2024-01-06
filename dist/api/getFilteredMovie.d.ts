import { MovieApiResponse, FilteredMovie } from '../commons/types';
import { HttpClient } from '../commons/types';
export declare function getFilteredMovie(httpClient: HttpClient | undefined, filterArgs: FilteredMovie, baseUrl?: string): Promise<MovieApiResponse>;
