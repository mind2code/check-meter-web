import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SettlementType } from '../../shared/models/rent-receipt.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const SettlementTypePageActions = createActionGroup({
  source: 'SettlementTypes Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const SettlementTypeApiActions = createActionGroup({
  source: 'SettlementTypes API',
  events: {
    'Load All Success': props<{ items: SettlementType[], total: number, page: number }>(),
  }
});
