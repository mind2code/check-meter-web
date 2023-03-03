import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  tenantsFeature,
  featureName,
  State,
} from './tenant.reducer';
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
  tenantsFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectLoading = createSelector(
  tenantsFeature.selectLoading,
  (loading) => loading,
);

export const selectCreating = createSelector(
  tenantsFeature.selectCreating,
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
  tenantsFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  tenantsFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
