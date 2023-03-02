import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Housing } from '../../shared/models/housing.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const HousingPageActions = createActionGroup({
  source: 'Housings Page',
  events: {
    'Create': props<{ dto: any }>(),
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: number|null }>(),
    'Load One': props<{ id: number|null }>(),
    'Load One From Router': props<{ paramName: string }>(),
    'Clear': emptyProps(),
  }
});

export const HousingApiActions = createActionGroup({
  source: 'Housings API',
  events: {
    'Load All Success': props<{ items: Housing[], total: number, page: number }>(),
    'Load One Success': props<{ item: Housing }>(),
    'Load Failed': props<{ error: any }>(),
    'Create Success': props<{ item: Housing }>(),
    'Create Failed': props<{ error: any }>(),
  }
});
