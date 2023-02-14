import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Contract } from '../../shared/models/contract.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const ContractPageActions = createActionGroup({
  source: 'Contracts Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string }>(),
    'Load One': props<{ id: string }>(),
    'Load One From Router': props<{ paramName: string }>(),
    'Clear': emptyProps(),
  }
});

export const ContractApiActions = createActionGroup({
  source: 'Contracts API',
  events: {
    'Load All Success': props<{ items: Contract[], total: number, page: number }>(),
    'Load One Success': props<{ item: Contract }>(),
    'Load One Failed': props<{ error: any }>()
  }
});
