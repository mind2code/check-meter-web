import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CivilityService } from '../../shared/services/civility.service';
import { CivilityApiActions, CivilityPageActions } from './civility.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CivilityEffects {
  constructor(
    private actions$: Actions,
    private service: CivilityService,
    private toastr: ToastrService,
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
          return CivilityApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(CivilityApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [Civility loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des civilités.`);
            }),
          ),
        ),
      )
    )
  ));
}
