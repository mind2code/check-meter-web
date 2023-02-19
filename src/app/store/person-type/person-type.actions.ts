import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PersonType } from '../../shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const PersonTypePageActions = createActionGroup({
  source: 'PersonTypes Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const PersonTypeApiActions = createActionGroup({
  source: 'PersonTypes API',
  events: {
    'Load All Success': props<{ items: PersonType[], total: number, page: number }>(),
    'Load Failed': props<{ error: any }>(),
  }
});
