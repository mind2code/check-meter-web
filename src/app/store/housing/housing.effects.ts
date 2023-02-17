import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HousingService } from '../../shared/services/housing.service';
import { HousingApiActions, HousingPageActions } from './housing.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HousingEffects {
  constructor(
    private actions$: Actions,
    private service: HousingService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      HousingPageActions.loadAll,
      HousingPageActions.paginationChange,
      HousingPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return HousingApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(error).pipe(
            tap((err) => {
              console.error('*** [Housing loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des habitations.`);
            }),
          ),
        ),
      )
    )
  ));
}
