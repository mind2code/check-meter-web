import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GenderService } from '../../shared/services/gender.service';
import { GenderApiActions, GenderPageActions } from './gender.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GenderEffects {
  constructor(
    private actions$: Actions,
    private service: GenderService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      GenderPageActions.loadAll,
      GenderPageActions.paginationChange,
      GenderPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return GenderApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(GenderApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [Gender loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des genres.`);
            }),
          ),
        ),
      )
    )
  ));
}
