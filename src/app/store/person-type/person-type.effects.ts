import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonTypeService } from '../../shared/services/person-type.service';
import { PersonTypeApiActions, PersonTypePageActions } from './person-type.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PersonTypeEffects {
  constructor(
    private actions$: Actions,
    private service: PersonTypeService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      PersonTypePageActions.loadAll,
      PersonTypePageActions.paginationChange,
      PersonTypePageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return PersonTypeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(PersonTypeApiActions.loadFailed({ error })).pipe(
            tap((err) => {
              console.error('**** [PersonType loadAllFailed}', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des types de personne.`);
            }),
          ),
        ),
      )
    )
  ));
}
