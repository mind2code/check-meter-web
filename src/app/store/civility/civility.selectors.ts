import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  civilitiesFeature,
  featureName,
  State,
} from './civility.reducer';

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
  civilitiesFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  civilitiesFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  civilitiesFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
