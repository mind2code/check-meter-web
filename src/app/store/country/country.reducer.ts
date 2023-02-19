import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Country } from '../../shared/models/country.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CountryApiActions, CountryPageActions } from './country.actions';

export const featureName = 'countries';

export interface State extends EntityState<Country> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const countriesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(CountryPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
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
    on(CountryPageActions.clear, (state) => ({
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

