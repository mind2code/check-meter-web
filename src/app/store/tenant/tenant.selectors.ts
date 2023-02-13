import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  selectEntities as SelectAllEntities,
  tenantsFeature,
  featureName,
  State,
  selectAll as SelectAllItems
} from './tenant.reducer';

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
  tenantsFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  selectState,
  tenantsFeature.selectCurrentPage,
);

export const selectTotalRecords = createSelector(
  selectState,
  tenantsFeature.selectTotalRecords,
);
