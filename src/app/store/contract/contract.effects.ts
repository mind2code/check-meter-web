import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContractService } from '../../shared/services/contract.service';
import { ContractApiActions, ContractPageActions } from './contract.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ContractEffects {
  constructor(
    private actions$: Actions,
    private service: ContractService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      ContractPageActions.loadAll,
      ContractPageActions.paginationChange,
      ContractPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return ContractApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(error).pipe(
            tap((err) => {
              console.error('*** [Contract loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des contrats.`);
            }),
          ),
        ),
      )
    )
  ));
}
