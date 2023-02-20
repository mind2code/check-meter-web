import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Person } from '../../shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const PersonPageActions = createActionGroup({
  source: 'Persons Page',
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

export const PersonApiActions = createActionGroup({
  source: 'Persons API',
  events: {
    'Load All Success': props<{ items: Person[], total: number, page: number }>(),
    'Load One Success': props<{ item: Person }>(),
    'Load Failed': props<{ error: any }>(),
  }
});
