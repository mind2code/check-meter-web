import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { PersonType } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { PersonTypeApiActions, PersonTypePageActions } from './person-type.actions';

export const featureName = 'personTypes';

export interface State extends EntityState<PersonType> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<PersonType> = createEntityAdapter<PersonType>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const personTypesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(PersonTypePageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(PersonTypePageActions.loadAll, (state) => ({ ...state, loading: true })),
    on(PersonTypeApiActions.loadAllSuccess, (state, { items, page, total }) => {
      return adapter.setAll(
        items ?? [],
        {
          ...state,
          currentPage: page ?? 0,
          totalRecords: ((Number.isSafeInteger(total)) ? total : state.totalRecords),
        }
      );
    }),
    on(
      PersonTypeApiActions.loadAllSuccess,
      PersonTypeApiActions.loadFailed,
      (state) => ({ ...state, loading: false , selectedId: null })
    ),

    on(PersonTypePageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

