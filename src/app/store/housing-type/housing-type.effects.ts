import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HousingTypeService } from '../../shared/services/housing-type.service';
import { HousingTypeApiActions, HousingTypePageActions } from './housing-type.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class HousingTypeEffects {
  constructor(
    private actions$: Actions,
    private service: HousingTypeService
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      HousingTypePageActions.loadAll,
      HousingTypePageActions.paginationChange,
      HousingTypePageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return HousingTypeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
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
