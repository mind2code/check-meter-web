import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MeterService } from '../../shared/services/meter.service';
import { MetersApiActions, MetersPageActions } from './meters.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MetersEffects {
  constructor(
    private actions$: Actions,
    private service: MeterService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      MetersPageActions.loadAll,
      MetersPageActions.paginationChange,
      MetersPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return MetersApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(MetersApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('*** [Meters loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des compteurs.`);
            }),
          ),
        ),
      )
    )
  ));

  // Create item
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MetersPageActions.create),
      exhaustMap(({ dto }) => this.service.create(dto).pipe(
        tap((item) => this.toastr.success(`Compteur créé avec succès. #${item.id}`)),
        map((item) => {
          return MetersApiActions.createSuccess({ item })
        }),
        catchError((error) =>
          of(MetersApiActions.createFailed({ error })).pipe(
            tap((err: any) => {
              console.error(`*** [Meters createFailed]`, err);
              this.toastr.error(`Une erreur est suvernue lors de la création du compteur.`);
            }),
          ),
        ),
      ))
    ),
  );
}
