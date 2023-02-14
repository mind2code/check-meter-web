import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ExpiryNotice } from '../../shared/models/expiry-notice.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const ExpiryNoticePageActions = createActionGroup({
  source: 'ExpiryNotices Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const ExpiryNoticeApiActions = createActionGroup({
  source: 'ExpiryNotices API',
  events: {
    'Load All Success': props<{ items: ExpiryNotice[], total: number, page: number }>(),
  }
});
