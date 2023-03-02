import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Housing } from '../../shared/models/housing.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { HousingApiActions, HousingPageActions } from './housing.actions';

export const featureName = 'housings';

export interface State extends EntityState<Housing> {
  selectedId: number | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
  creating: boolean;
}

export const adapter: EntityAdapter<Housing> = createEntityAdapter<Housing>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
  creating: false,
});

export const housingsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(HousingPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      HousingPageActions.loadAll,
      HousingPageActions.loadOne,
      HousingPageActions.loadOneFromRouter,
      (state) => ({ ...state, loading: true })
    ),
    on(HousingApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(HousingApiActions.loadOneSuccess, (state, { item }) => {
      return adapter.setOne(item, state);
    }),
    on(
      HousingApiActions.loadAllSuccess,
      HousingApiActions.loadOneSuccess,
      HousingApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(
      HousingPageActions.create,
      (state) => ({ ...state, creating: true })
    ),
    on(
      HousingApiActions.createSuccess,
      HousingApiActions.createFailed,
      (state) => ({ ...state, creating: false })
    ),

    on(HousingPageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

