import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StatusService } from '../../shared/services/status.service';
import { StatusApiActions, StatusPageActions } from './status.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class StatusEffects {
  constructor(
    private actions$: Actions,
    private service: StatusService
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      StatusPageActions.loadAll,
      StatusPageActions.paginationChange,
      StatusPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return StatusApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(error).pipe(
            tap((err) => console.error('**** loadAllFailed', err)),
          ),
        ),
      )
    )
  ));
}
