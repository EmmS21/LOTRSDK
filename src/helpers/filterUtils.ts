import { FilteredMovie, FilterVal, FilterAction } from '../commons/types';
import { Movie } from '../commons/types';

function actionType(val: FilterVal, action?: FilterAction): string {
  let result: string;
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

export function appendFilterArgsToUrl(movieUrl: string, filterArgs: FilteredMovie): string {
  let url = movieUrl;
  const validKeys = new Set<keyof Movie>([
    '_id',
    'name',
    'runtimeInMinutes',
    'budgetInMillions',
    'boxOfficeRevenueInMillions',
    'academyAwardNominations',
    'academyAwardWins',
    'rottenTomatoesScore',
  ]);
  const params = Object.entries(filterArgs)
    .filter(([key]) => validKeys.has(key as keyof Movie))
    .map(([key, filter]) => {
      if (
        typeof filter === 'object' &&
        filter?.value !== undefined &&
        typeof filter.action === 'string'
      ) {
        const formattedValue = actionType(filter.value, filter.action);
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
