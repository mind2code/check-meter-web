import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { MaritalSituation } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { MaritalSituationApiActions, MaritalSituationPageActions } from './marital-situation.actions';

export const featureName = 'maritalSituations';

export interface State extends EntityState<MaritalSituation> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<MaritalSituation> = createEntityAdapter<MaritalSituation>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const maritalSituationsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(MaritalSituationPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
    on(MaritalSituationApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(MaritalSituationPageActions.clear, (state) => ({
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

