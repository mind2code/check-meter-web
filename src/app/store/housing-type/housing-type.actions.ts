import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HousingType } from '../../shared/models/housing.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const HousingTypePageActions = createActionGroup({
  source: 'HousingTypes Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const HousingTypeApiActions = createActionGroup({
  source: 'HousingTypes API',
  events: {
    'Load All Success': props<{ items: HousingType[], total: number, page: number }>(),
    'Load Failed': props<{ error: any }>(),
  }
});
