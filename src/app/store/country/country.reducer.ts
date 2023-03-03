import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Country } from '../../shared/models/country.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CountryApiActions, CountryPageActions } from './country.actions';

export const featureName = 'countries';

export interface State extends EntityState<Country> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const countriesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(CountryPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(CountryPageActions.loadAll, (state) => ({ ...state, loading: true })),
    on(CountryApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
      CountryApiActions.loadAllSuccess,
      CountryApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(CountryPageActions.clear, (state) => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

