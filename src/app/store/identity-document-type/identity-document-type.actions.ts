import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IdentityDocumentType } from '../../shared/models/identity-document.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const IdentityDocumentTypePageActions = createActionGroup({
  source: 'IdentityDocumentTypes Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
    'clear': emptyProps(),
  }
});

export const IdentityDocumentTypeApiActions = createActionGroup({
  source: 'IdentityDocumentTypes API',
  events: {
    'Load All Success': props<{ items: IdentityDocumentType[], total: number, page: number }>(),
    'Load Failed': props<{ error: any }>(),
  }
});
