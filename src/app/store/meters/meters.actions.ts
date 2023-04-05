import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Meters } from 'src/app/shared/models/meter.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const MetersPageActions = createActionGroup({
  source: 'Meters Page',
  events: {
    'Create': props<{ dto: any }>(),
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string|null }>(),
    'Load One': props<{ id: string|null }>(),
    'Load One From Router': props<{ paramName: string }>(),
    'Clear': emptyProps(),
  }
});

export const MetersApiActions = createActionGroup({
  source: 'Meters API',
  events: {
    'Load All Success': props<{ items: Meters[], total: number, page: number }>(),
    'Load One Success': props<{ item: Meters }>(),
    'Load Failed': props<{ error: any }>(),
    'Create Success': props<{ item: Meters }>(),
    'Create Failed': props<{ error: any }>(),
  }
});
