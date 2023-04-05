
export interface ApiPaginatedResponse<T> {
  currentPage: number;
  recordsTotal: number;
  data: T[];
}


export interface ApiOneResponse<T> {
  error_message: string;
  status: boolean;
  data: T;
}
