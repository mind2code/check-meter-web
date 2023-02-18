import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { PersonService } from '../../shared/services/person.service';
import { PersonApiActions, PersonPageActions } from './person.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { selectRouteNestedParam } from '../router.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private service: PersonService,
    private store: Store,
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

  loadOneFromRouter$ = createEffect(() => this.actions$.pipe(
    ofType(
      PersonPageActions.loadOneFromRouter,
    ),
    concatLatestFrom(({ paramName }) => this.store.select(selectRouteNestedParam(paramName))),
    exhaustMap(([, paramValue]) => this.service.getOneById(String(paramValue))
      .pipe(
        map((tenant) => {
          return PersonApiActions.loadOneSuccess({ item: tenant });
        }),
        catchError((error) =>
          of(PersonApiActions.loadOneFailed({ error })).pipe(
            tap((err: any) => {
              console.error('*** [Person loadOneFailed]', err);
              this.toastr.error(`Une erreur est suvernue.`);
            }),
          ),
        ),
      )
    ),
  ));
}
