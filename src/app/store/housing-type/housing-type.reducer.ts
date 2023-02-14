import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { HousingType } from '../../shared/models/housing.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { HousingTypeApiActions, HousingTypePageActions } from './housing-type.actions';

export const featureName = 'housingTypes';

export interface State extends EntityState<HousingType> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<HousingType> = createEntityAdapter<HousingType>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const housingTypesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(HousingTypePageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
    on(HousingTypeApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(HousingTypePageActions.clear, (state) => ({
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

