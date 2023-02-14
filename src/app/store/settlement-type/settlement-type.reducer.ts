import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { SettlementType } from '../../shared/models/rent-receipt.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { SettlementTypeApiActions, SettlementTypePageActions } from './settlement-type.actions';

export const featureName = 'settlementTypes';

export interface State extends EntityState<SettlementType> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<SettlementType> = createEntityAdapter<SettlementType>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const settlementTypesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(SettlementTypePageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
    on(SettlementTypeApiActions.loadAllSuccess, (state, { items, page, total }) => {
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

