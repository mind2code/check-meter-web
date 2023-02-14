import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Gender } from '../../shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const GenderPageActions = createActionGroup({
  source: 'Genders Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const GenderApiActions = createActionGroup({
  source: 'Genders API',
  events: {
    'Load All Success': props<{ items: Gender[], total: number, page: number }>(),
  }
});
