export interface Paginated<T> {
  currentPage: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: T[];
}
