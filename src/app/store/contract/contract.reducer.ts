import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Contract } from '../../shared/models/contract.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ContractApiActions, ContractPageActions } from './contract.actions';

export const featureName = 'contracts';

export interface State extends EntityState<Contract> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  creating: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Contract> = createEntityAdapter<Contract>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  creating: false,
  loading: false,
});

export const contractsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(ContractPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      ContractPageActions.loadAll,
      ContractPageActions.loadOne,
      ContractPageActions.loadOneFromRouter,
      (state) => ({ ...state, loading: true })
    ),
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
    on(
      ContractApiActions.loadAllSuccess,
      ContractApiActions.loadOneSuccess,
      ContractApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(
      ContractPageActions.create,
      (state) => ({ ...state, creating: true })
    ),
    on(
      ContractApiActions.createSuccess,
      ContractApiActions.createFailed,
      (state) => ({ ...state, creating: false })
    ),

    on(ContractPageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

