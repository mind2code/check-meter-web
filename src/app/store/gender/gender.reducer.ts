import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Gender } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { GenderApiActions, GenderPageActions } from './gender.actions';

export const featureName = 'genders';

export interface State extends EntityState<Gender> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<Gender> = createEntityAdapter<Gender>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const gendersFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(GenderPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
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
    on(GenderPageActions.clear, (state) => ({
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

