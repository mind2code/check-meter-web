import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  identityDocumentTypesFeature,
  featureName,
  State,
} from './identity-document-type.reducer';

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
  identityDocumentTypesFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);


export const selectCurrentPage = createSelector(
  identityDocumentTypesFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  identityDocumentTypesFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
