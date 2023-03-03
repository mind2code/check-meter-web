import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HousingTypeService } from '../../shared/services/housing-type.service';
import { HousingTypeApiActions, HousingTypePageActions } from './housing-type.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HousingTypeEffects {
  constructor(
    private actions$: Actions,
    private service: HousingTypeService,
    private toastr: ToastrService,
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
          return HousingTypeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(HousingTypeApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [HousingType loadAllFailed}', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des types d'habitation.`);
            }),
          ),
        ),
      )
    )
  ));
}
