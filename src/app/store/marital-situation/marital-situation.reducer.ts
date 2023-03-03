import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { MaritalSituation } from '../../shared/models/person.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { MaritalSituationApiActions, MaritalSituationPageActions } from './marital-situation.actions';

export const featureName = 'maritalSituations';

export interface State extends EntityState<MaritalSituation> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<MaritalSituation> = createEntityAdapter<MaritalSituation>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const maritalSituationsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(MaritalSituationPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      MaritalSituationPageActions.loadAll,
      (state) => ({ ...state, loading: true })
    ),
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
    on(
      MaritalSituationApiActions.loadAllSuccess,
      MaritalSituationApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(MaritalSituationPageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

