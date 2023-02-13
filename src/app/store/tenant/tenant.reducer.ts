import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Tenant } from '../../shared/models/tenant.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TenantApiActions, TenantPageActions } from './tenant.actions';

export const featureName = 'tenants';

export interface State extends EntityState<Tenant> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<Tenant> = createEntityAdapter<Tenant>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const tenantsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(TenantPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
    on(TenantApiActions.loadAllSuccess, (state, { items, page, total }) => {
      return adapter.setAll(
        items ?? [],
        {
          ...state,
          selectedId: null,
          currentPage: page ?? 0,
          totalRecords: ((Number.isSafeInteger(total)) ? total : state.totalRecords),
        }
      );
    }),
  ),
});

// get the selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

