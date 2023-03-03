import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Tenant } from '../../shared/models/tenant.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TenantApiActions, TenantPageActions } from './tenant.actions';

export const featureName = 'tenants';

export interface State extends EntityState<Tenant> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
  creating: boolean;
}

export const adapter: EntityAdapter<Tenant> = createEntityAdapter<Tenant>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
  creating: false,
});

export const tenantsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(TenantPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      TenantPageActions.loadAll,
      TenantPageActions.loadOne,
      (state) => ({ ...state, loading: true })
    ),
    on(TenantApiActions.loadAllSuccess, (state, { items, page, total }) => {
      return adapter.setAll(
        items ?? [],
        {
          ...state,
          selectedId: null,
          currentPage: page ?? 0,
          totalRecords: ((!isNaN(total)) ? total : state.totalRecords),
        }
      );
    }),
    on(TenantApiActions.loadOneSuccess, (state, { item }) => {
      return adapter.setOne(item, state);
    }),
    on(
      TenantApiActions.loadAllSuccess,
      TenantApiActions.loadOneSuccess,
      TenantApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(
      TenantPageActions.create,
      (state) => ({ ...state, creating: true })
    ),
    on(
      TenantApiActions.createSuccess,
      TenantApiActions.createFailed,
      (state) => ({ ...state, creating: false })
    ),

    on(TenantPageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

