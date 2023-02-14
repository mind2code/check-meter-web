import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Person } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { PersonApiActions, PersonPageActions } from './person.actions';

export const featureName = 'persons';

export interface State extends EntityState<Person> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const personsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(PersonPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
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
    on(PersonPageActions.clear, (state) => ({
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

