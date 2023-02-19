import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  personTypesFeature,
  featureName,
  State,
} from './person-type.reducer';

const selectState = createFeatureSelector<State>(featureName);

export const selectAll = createSelector(
  selectState,
  getEntitySelectors().selectAll,
);

export const selectEntities = createSelector(
  selectState,
  getEntitySelectors().selectEntities,
);

export const selectCurrentId = createSelector(
  personTypesFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  personTypesFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  personTypesFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);

export const selectLoading = createSelector(
  personTypesFeature.selectLoading,
  (loading) => loading,
);
