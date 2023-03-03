import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountryService } from '../../shared/services/country.service';
import { CountryApiActions, CountryPageActions } from './country.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private service: CountryService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      CountryPageActions.loadAll,
      CountryPageActions.paginationChange,
      CountryPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, recordsTotal, currentPage  }) => {
          return CountryApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal });
        }),
        catchError((error) =>
          of(CountryApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [Country loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des nationalités.`);
            }),
          ),
        ),
      )
    )
  ));
}
