import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpiryNoticeService } from '../../shared/services/expiry-notice.service';
import { ExpiryNoticeApiActions, ExpiryNoticePageActions } from './expiry-notice.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ExpiryNoticeEffects {
  constructor(
    private actions$: Actions,
    private service: ExpiryNoticeService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      ExpiryNoticePageActions.loadAll,
      ExpiryNoticePageActions.paginationChange,
      ExpiryNoticePageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return ExpiryNoticeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(ExpiryNoticeApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [ExpiryNotice loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des avis d'échéance.`);
            }),
          ),
        ),
      )
    )
  ));
}
