import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  selectEntities as SelectAllEntities,
  expiryNoticesFeature,
  featureName,
  State,
  selectAll as SelectAllItems
} from './expiry-notice.reducer';

const selectState = createFeatureSelector<State>(featureName);

export const selectAll = createSelector(
  selectState,
  SelectAllItems,
);

export const selectEntities = createSelector(
  selectState,
  SelectAllEntities,
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
  selectState,
  expiryNoticesFeature.selectCurrentPage,
);

export const selectTotalRecords = createSelector(
  selectState,
  expiryNoticesFeature.selectTotalRecords,
);
