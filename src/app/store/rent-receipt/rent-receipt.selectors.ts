import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  rentReceiptsFeature,
  featureName,
  State,
} from './rent-receipt.reducer';

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
  rentReceiptsFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  rentReceiptsFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  rentReceiptsFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);

export const selectLoading = createSelector(
  rentReceiptsFeature.selectLoading,
  (loading) => loading,
);

export const selectCreating = createSelector(
  rentReceiptsFeature.selectCreating,
  (creating) => creating,
);
