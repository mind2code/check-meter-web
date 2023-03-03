import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getEntitySelectors,
  personsFeature,
  featureName,
  State,
} from './person.reducer';
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
  personsFeature.selectSelectedId,
  (selectedId) => selectedId,
);

export const selectLoading = createSelector(
  personsFeature.selectLoading,
  (loading) => loading,
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
  personsFeature.selectCurrentPage,
  (currentPage) => currentPage,
);

export const selectTotalRecords = createSelector(
  personsFeature.selectTotalRecords,
  (totalRecords) => totalRecords,
);
