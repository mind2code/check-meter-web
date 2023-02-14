import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Civility } from '../../shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const CivilityPageActions = createActionGroup({
  source: 'Civilities Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const CivilityApiActions = createActionGroup({
  source: 'Civilities API',
  events: {
    'Load All Success': props<{ items: Civility[], total: number, page: number }>(),
  }
});
