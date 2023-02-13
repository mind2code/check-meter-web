import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RentReceiptApiActions, RentReceiptPageActions } from './rent-receipt.actions';
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { RentReceiptService } from 'src/app/shared/services/rent-receipt.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RentReceiptEffects {
  constructor(
    private actions$: Actions,
    private service: RentReceiptService,
    private toastrService: ToastrService,
  ) {}

  // Load paginated list
  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      RentReceiptPageActions.loadAll,
      RentReceiptPageActions.paginationChange,
      RentReceiptPageActions.queryChange,
    ),
    mergeMap(({ params }) =>
      this.service.getAll(params).pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return RentReceiptApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError(() => EMPTY),
      )
    )
  ));

  // Create item
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RentReceiptPageActions.create),
      exhaustMap(({ dto }) => this.service.create(dto).pipe(
        tap((item) => this.toastrService.success(`Encaissement effectué avec succès. #${item.identifiant}`)),
        map((item) => {
          return RentReceiptApiActions.createSuccess({ item })
        }),
        catchError((error) =>
          of(RentReceiptApiActions.createFailed({ error })).pipe(
            tap((err: any) => {
              console.error(`*** [RentReceipt createFailed]`, err);
              this.toastrService.error(`Une erreur est suvernue. (${err.message})`);
            }),
          ),
          ),
        )
      )
    ),
  );
}
