import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpiryNoticeService } from '../../shared/services/expiry-notice.service';
import { ExpiryNoticeApiActions, ExpiryNoticePageActions } from './expiry-notice.actions';
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class ExpiryNoticeEffects {
  constructor(
    private actions$: Actions,
    private service: ExpiryNoticeService
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
          return ExpiryNoticeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(error).pipe(
            tap(() => console.error('**** loadAllFailed', error)),
          ),
        ),
      )
    )
  ));
}
