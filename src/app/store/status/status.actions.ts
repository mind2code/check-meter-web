import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Status } from '../../shared/models/commons.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const StatusPageActions = createActionGroup({
  source: 'Statutes Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const StatusApiActions = createActionGroup({
  source: 'Statutes API',
  events: {
    'Load All Success': props<{ items: Status[], total: number, page: number }>(),
  }
});
