import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  expiryNoticesFeature,
  featureName,
  State,
} from './expiry-notice.reducer';

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
  expiryNoticesFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  expiryNoticesFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  expiryNoticesFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
