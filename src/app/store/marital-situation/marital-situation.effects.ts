import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MaritalSituationService } from '../../shared/services/marital-situation.service';
import { MaritalSituationApiActions, MaritalSituationPageActions } from './marital-situation.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MaritalSituationEffects {
  constructor(
    private actions$: Actions,
    private service: MaritalSituationService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      MaritalSituationPageActions.loadAll,
      MaritalSituationPageActions.paginationChange,
      MaritalSituationPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return MaritalSituationApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(MaritalSituationApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [MaritalSituation loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des situations matrimoniales.`);
            }),
          ),
        ),
      )
    )
  ));
}
