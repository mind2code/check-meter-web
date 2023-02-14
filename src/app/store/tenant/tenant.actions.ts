import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Tenant } from '../../shared/models/tenant.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

export const TenantPageActions = createActionGroup({
  source: 'Tenants Page',
  events: {
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string }>(),
    'Load One': props<{ id: string }>(),
    'Load One From Router': props<{ paramName: string }>(),
    'Clear': emptyProps(),
  }
});

export const TenantApiActions = createActionGroup({
  source: 'Tenants API',
  events: {
    'Load All Success': props<{ items: Tenant[], total: number, page: number }>(),
    'Load One Success': props<{ item: Tenant }>(),
    'Load One Failed': props<{ error: any }>()
  }
});
