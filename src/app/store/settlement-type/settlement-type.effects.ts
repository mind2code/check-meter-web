import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettlementTypeService } from '../../shared/services/settlement-type.service';
import { SettlementTypeApiActions, SettlementTypePageActions } from './settlement-type.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SettlementTypeEffects {
  constructor(
    private actions$: Actions,
    private service: SettlementTypeService,
    private toastr: ToastrService,
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
          return SettlementTypeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(SettlementTypeApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [SettlementType loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des types de règlement.`);
            }),
          ),
        ),
      )
    )
  ));
}
