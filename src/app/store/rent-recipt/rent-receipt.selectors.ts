import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  selectEntities as SelectAllEntities,
  rentReceiptsFeature,
  featureName,
  State,
  selectAll as SelectAllItems
} from './rent-receipt.reducer';

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
  rentReceiptsFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  selectState,
  rentReceiptsFeature.selectCurrentPage,
);

export const selectTotalRecords = createSelector(
  selectState,
  rentReceiptsFeature.selectTotalRecords,
);
