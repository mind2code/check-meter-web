import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { TenantService } from '../../shared/services/tenant.service';
import { TenantApiActions, TenantPageActions } from './tenant.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { selectRouteNestedParam } from '../router.selectors';

@Injectable()
export class TenantEffects {
  constructor(
    private actions$: Actions,
    private service: TenantService,
    private toastr: ToastrService,
    private store: Store,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      TenantPageActions.loadAll,
      TenantPageActions.paginationChange,
      TenantPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return TenantApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(TenantApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('*** [Tenant loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du changement des locataires.`);
            }),
          ),
        ),
      )
    )
  ));

  loadOneFromRouter$ = createEffect(() => this.actions$.pipe(
    ofType(
      TenantPageActions.loadOneFromRouter,
    ),
    concatLatestFrom(({ paramName }) => this.store.select(selectRouteNestedParam(paramName))),
    exhaustMap(([, paramValue]) => this.service.getOneById(String(paramValue))
      .pipe(
        map((tenant) => {
          return TenantApiActions.loadOneSuccess({ item: tenant });
        }),
        catchError((error) =>
          of(TenantApiActions.loadFailed({ error })).pipe(
            tap((err: any) => {
              console.error('*** [Tenant loadOneFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement du locataire #${paramValue}.`);
            }),
          ),
        ),
      )
    ),
  ));

  // Create item
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TenantPageActions.create),
      exhaustMap(({ dto }) => this.service.create(dto).pipe(
        tap((item) => this.toastr.success(`Locataire créé avec succès. #${item.identifiant}`)),
        map((item) => {
          return TenantApiActions.createSuccess({ item })
        }),
        catchError((error) =>
          of(TenantApiActions.createFailed({ error })).pipe(
            tap((err: any) => {
              console.error(`*** [Tenant createFailed]`, err);
              this.toastr.error(`Une erreur est suvernue lors de la création du locataire.`);
            }),
          ),
          ),
        )
      )
    ),
  );
}
