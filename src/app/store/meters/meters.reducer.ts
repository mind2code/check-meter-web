import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { MetersApiActions, MetersPageActions } from './meters.actions';
import { Meters } from 'src/app/shared/models/meter.model';

export const featureName = 'meters';

export interface State extends EntityState<Meters> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
  creating: boolean;
}

export const adapter: EntityAdapter<Meters> = createEntityAdapter<Meters>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
  creating: false,
});

export const metersFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(MetersPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      MetersPageActions.loadAll,
      MetersPageActions.loadOne,
      MetersPageActions.loadOneFromRouter,
      (state) => ({ ...state, loading: true })
    ),
    on(MetersApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(MetersApiActions.loadOneSuccess, (state, { item }) => {
      return adapter.setOne(item, state);
    }),
    on(
      MetersApiActions.loadAllSuccess,
      MetersApiActions.loadOneSuccess,
      MetersApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(
      MetersPageActions.create,
      (state) => ({ ...state, creating: true })
    ),
    on(
      MetersApiActions.createSuccess,
      MetersApiActions.createFailed,
      (state) => ({ ...state, creating: false })
    ),

    on(MetersPageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

