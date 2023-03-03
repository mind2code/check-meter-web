import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HousingService } from '../../shared/services/housing.service';
import { HousingApiActions, HousingPageActions } from './housing.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
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
          return HousingApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(HousingApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('*** [Housing loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des habitations.`);
            }),
          ),
        ),
      )
    )
  ));

  // Create item
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HousingPageActions.create),
      exhaustMap(({ dto }) => this.service.create(dto).pipe(
        tap((item) => this.toastr.success(`Habitation créé avec succès. #${item.identifiant}`)),
        map((item) => {
          return HousingApiActions.createSuccess({ item })
        }),
        catchError((error) =>
          of(HousingApiActions.createFailed({ error })).pipe(
            tap((err: any) => {
              console.error(`*** [Housing createFailed]`, err);
              this.toastr.error(`Une erreur est suvernue lors de la création de l'habitation.`);
            }),
          ),
        ),
      ))
    ),
  );
}
