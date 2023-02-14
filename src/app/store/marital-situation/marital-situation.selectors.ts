import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  maritalSituationsFeature,
  featureName,
  State,
} from './marital-situation.reducer';

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
  maritalSituationsFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  maritalSituationsFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  maritalSituationsFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
