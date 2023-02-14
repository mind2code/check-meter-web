import { Params } from '@angular/router';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// `router` is used as the default feature name. You can use the feature name
// of your choice by creating a feature selector and pass it to the `getRouterSelectors` function
// export const selectRouter = createFeatureSelector<RouterReducerState>('yourFeatureName');
export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const getRouterSelectors = getSelectors;

export const selectRouteNestedParams = createSelector(selectRouter, (router) => {
  let currentRoute = router?.state?.root;
  let params: Params = {};
  while (currentRoute?.firstChild) {
    currentRoute = currentRoute.firstChild;
    params = {
      ...params,
      ...currentRoute.params,
    };
  }
  return params;
});

export const selectRouteNestedParam = (param: string) =>
  createSelector(selectRouteNestedParams, (params) => params && params[param]);
