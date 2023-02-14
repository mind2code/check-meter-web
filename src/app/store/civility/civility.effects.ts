import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CivilityService } from '../../shared/services/civility.service';
import { CivilityApiActions, CivilityPageActions } from './civility.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class CivilityEffects {
  constructor(
    private actions$: Actions,
    private service: CivilityService
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      CivilityPageActions.loadAll,
      CivilityPageActions.paginationChange,
      CivilityPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return CivilityApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
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
