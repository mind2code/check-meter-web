import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Civility } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CivilityApiActions, CivilityPageActions } from './civility.actions';

export const featureName = 'civilities';

export interface State extends EntityState<Civility> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<Civility> = createEntityAdapter<Civility>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const civilitiesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(CivilityPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(CivilityPageActions.loadAll, (state) => ({ ...state, loading: true })),
    on(CivilityApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
      CivilityApiActions.loadAllSuccess,
      CivilityApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(CivilityPageActions.clear, (state) => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

