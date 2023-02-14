import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  settlementTypesFeature,
  featureName,
  State,
} from './settlement-type.reducer';

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
  settlementTypesFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  settlementTypesFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  settlementTypesFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
