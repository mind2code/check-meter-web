import { Person } from './person.model';

export interface ApiPaginatedResponse<T> {
  currentPage: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: T[];
}

export interface TenantApiOneResponse {
  error_message: string;
  statut: boolean;
  data: {
    personne: Person;
  };
}

export interface ApiOneResponse<T> {
  error_message: string;
  status: boolean;
  data: T;
}
