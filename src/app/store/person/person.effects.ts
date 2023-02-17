import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonService } from '../../shared/services/person.service';
import { PersonApiActions, PersonPageActions } from './person.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private service: PersonService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      PersonPageActions.loadAll,
      PersonPageActions.paginationChange,
      PersonPageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return PersonApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(error).pipe(
            tap((err) => {
              console.error('*** [Person loadAllFailed]', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des personnes.`);
            }),
          ),
        ),
      )
    )
  ));
}
