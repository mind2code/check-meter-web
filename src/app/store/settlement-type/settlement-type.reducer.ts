import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { SettlementType } from '../../shared/models/rent-receipt.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { SettlementTypeApiActions, SettlementTypePageActions } from './settlement-type.actions';

export const featureName = 'settlementTypes';

export interface State extends EntityState<SettlementType> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<SettlementType> = createEntityAdapter<SettlementType>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const settlementTypesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(SettlementTypePageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(SettlementTypePageActions.loadAll, (state) => ({ ...state, loading: true })),
    on(SettlementTypeApiActions.loadAllSuccess, (state, { items, page, total }) => {
      return adapter.setAll(
        items ?? [],
        {
          ...state,
          currentPage: page ?? 0,
          totalRecords: ((Number.isSafeInteger(total)) ? total : state.totalRecords),
        }
      );
    }),
    on(
      SettlementTypeApiActions.loadAllSuccess,
      SettlementTypeApiActions.loadFailed,
      (state) => ({ ...state, loading: false, selectedId: null })
    ),

    on(SettlementTypePageActions.clear, (state) => ({
      ...state,
      currentPage: 0,
      totalRecords: 0,
      selectedId: null,
      entities: {},
      ids: [],
    })),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

