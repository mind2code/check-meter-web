import { createActionGroup, props } from '@ngrx/store';
import { ExpiryNotice } from '../../shared/models/expiry-notice.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const ExpiryNoticePageActions = createActionGroup({
  source: 'ExpiryNotices Page',
  events: {
    'Load All': (params?: PaginationQuery) => ({ ...params }),
    'Pagination Change': (params?: PaginationQuery) => ({ ...params }),
    'Query Change': (params?: PaginationQuery) => ({ ...params }),
    'Select One': props<{ id: string | null }>(),
  }
});

export const ExpiryNoticeApiActions = createActionGroup({
  source: 'ExpiryNotices API',
  events: {
    'Load All Success': props<{ items: ExpiryNotice[], total: number, page: number }>(),
  }
});
