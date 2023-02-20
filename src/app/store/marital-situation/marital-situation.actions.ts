import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaritalSituation } from '../../shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const MaritalSituationPageActions = createActionGroup({
  source: 'MaritalSituations Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const MaritalSituationApiActions = createActionGroup({
  source: 'MaritalSituations API',
  events: {
    'Load All Success': props<{ items: MaritalSituation[], total: number, page: number }>(),
    'Load Failed': props<{ error: any }>(),
  }
});
