import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  statutesFeature,
  featureName,
  State,
} from './status.reducer';

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
  statutesFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  statutesFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  statutesFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
