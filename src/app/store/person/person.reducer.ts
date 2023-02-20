import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Person } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { PersonApiActions, PersonPageActions } from './person.actions';

export const featureName = 'persons';

export interface State extends EntityState<Person> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const personsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(PersonPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      PersonPageActions.loadAll,
      PersonPageActions.loadOne,
      PersonPageActions.loadOneFromRouter,
      (state) => ({ ...state, loading: true })
    ),
    on(PersonApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(PersonApiActions.loadOneSuccess, (state, { item }) => {
      return adapter.setOne(item, state);
    }),
    on(
      PersonApiActions.loadAllSuccess,
      PersonApiActions.loadOneSuccess,
      PersonApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(PersonPageActions.clear, (state) => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

