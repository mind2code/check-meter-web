import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  metersFeature,
  featureName,
  State,
} from './meters.reducer';
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
  metersFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectLoading = createSelector(
  metersFeature.selectLoading,
  (loading) => loading,
);

export const selectCreating = createSelector(
  metersFeature.selectCreating,
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
  metersFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  metersFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
