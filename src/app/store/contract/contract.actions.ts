import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Contract } from '../../shared/models/contract.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { CreateContractDto } from 'src/app/shared/dto/contract.dto';

export const ContractPageActions = createActionGroup({
  source: 'Contracts Page',
  events: {
    'Create': props<{ dto: CreateContractDto }>(),
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
    'Load Failed': props<{ error: any }>(),
    'Create Success': props<{ item: Contract }>(),
    'Create Failed': props<{ error: any }>(),
  }
});
