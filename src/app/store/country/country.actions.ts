import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Country } from '../../shared/models/country.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const CountryPageActions = createActionGroup({
  source: 'Countries Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const CountryApiActions = createActionGroup({
  source: 'Countries API',
  events: {
    'Load All Success': props<{ items: Country[], total: number, page: number }>(),
    'Load Failed': props<{ error: any }>(),
  }
});
