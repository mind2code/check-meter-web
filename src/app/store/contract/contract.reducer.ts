import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Contract } from '../../shared/models/contract.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ContractApiActions, ContractPageActions } from './contract.actions';

export const featureName = 'contracts';

export interface State extends EntityState<Contract> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<Contract> = createEntityAdapter<Contract>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const contractsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(ContractPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
    on(ContractApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(ContractApiActions.loadOneSuccess, (state, { item }) => {
      return adapter.setOne(item, state);
    }),
    on(ContractPageActions.clear, (state) => ({
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

