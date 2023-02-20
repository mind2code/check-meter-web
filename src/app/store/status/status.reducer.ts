import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Status } from '../../shared/models/commons.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusApiActions, StatusPageActions } from './status.actions';

export const featureName = 'statutes';

export interface State extends EntityState<Status> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<Status> = createEntityAdapter<Status>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const statutesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(StatusPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      StatusPageActions.loadAll,
      (state) => ({ ...state, loading: true }),
    ),
    on(StatusApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(
      StatusApiActions.loadAllSuccess,
      StatusApiActions.loadFailed,
      (state) => ({ ...state, loading: false }),
    ),

    on(StatusPageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

