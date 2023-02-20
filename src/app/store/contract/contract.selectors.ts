import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  contractsFeature,
  featureName,
  State,
} from './contract.reducer';
import {  getRouterSelectors} from '../router.selectors';

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
  contractsFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectLoading = createSelector(
  contractsFeature.selectLoading,
  (loading) => loading,
);

export const selectCreating = createSelector(
  contractsFeature.selectCreating,
  (creating) => creating,
);

export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (id) ? entities[id] : null,
);

export const selectCurrentFromRouter = (paramName: string) => createSelector(
  selectEntities,
  getRouterSelectors().selectRouteParam(paramName),
  (entities, paramValue) => {
    return (paramValue) ? entities[paramValue] : null;
  },
);


export const selectCurrentPage = createSelector(
  contractsFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  contractsFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
