import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Gender } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { GenderApiActions, GenderPageActions } from './gender.actions';

export const featureName = 'genders';

export interface State extends EntityState<Gender> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<Gender> = createEntityAdapter<Gender>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const gendersFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(GenderPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      GenderPageActions.loadAll,
      (state) => ({ ...state, loading: true })
    ),
    on(GenderApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
      GenderApiActions.loadAllSuccess,
      GenderApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(GenderPageActions.clear, (state) => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

