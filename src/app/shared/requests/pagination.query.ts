import { QueryParamsType } from '../definitions/types';

export interface PaginationQuery {
  page?: number;
  size?: number;
  query?: QueryParamsType;
}
