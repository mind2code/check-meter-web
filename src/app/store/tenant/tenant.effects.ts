import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TenantService } from '../../shared/services/tenant.service';
import { TenantApiActions, TenantPageActions } from './tenant.actions';
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TenantEffects {
  constructor(
    private actions$: Actions,
    private service: TenantService,
    private toastrService: ToastrService,
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
            tap(() => {
              console.error('*** [Tenant loadAllFailed]', error);
              this.toastrService.error(`Une erreur est suvernue. (${error.message})`);
            }),
          ),
        ),
      )
    )
  ));
}
