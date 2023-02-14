import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { TenantService } from '../../shared/services/tenant.service';
import { TenantApiActions, TenantPageActions } from './tenant.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { selectRouteNestedParam } from '../router.selectors';
import { PersonApiActions, } from '../person/person.actions';

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
          of(error).pipe(
            tap((err) => {
              console.error('*** [Tenant loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue.`);
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
        map(({ data, statut, error_message }) => {
          if (statut === true) {
            return PersonApiActions.loadOneSuccess({ item: data.personne });
          } else {
            return TenantApiActions.loadOneFailed({ error: new Error(error_message) })
          }
        }),
        catchError((error) =>
          of(TenantApiActions.loadOneFailed({ error })).pipe(
            tap((err: any) => {
              console.error('*** [Tenant loadOneFailed]', err);
              this.toastr.error(`Une erreur est suvernue.`);
            }),
          ),
        ),
      )
    ),
  ));
}
