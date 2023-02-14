import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettlementTypeService } from '../../shared/services/settlement-type.service';
import { SettlementTypeApiActions, SettlementTypePageActions } from './settlement-type.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class SettlementTypeEffects {
  constructor(
    private actions$: Actions,
    private service: SettlementTypeService
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      SettlementTypePageActions.loadAll,
      SettlementTypePageActions.paginationChange,
      SettlementTypePageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return SettlementTypeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
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
