import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IdentityDocumentTypeService } from '../../shared/services/identity-document-type.service';
import { IdentityDocumentTypeApiActions, IdentityDocumentTypePageActions } from './identity-document-type.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class IdentityDocumentTypeEffects {
  constructor(
    private actions$: Actions,
    private service: IdentityDocumentTypeService,
    private toastr: ToastrService,
  ) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(
      IdentityDocumentTypePageActions.loadAll,
      IdentityDocumentTypePageActions.paginationChange,
      IdentityDocumentTypePageActions.queryChange
    ),
    mergeMap(({ params }) => this.service.getAll(params)
      .pipe(
        map(({ data, currentPage, recordsTotal }) => {
          return IdentityDocumentTypeApiActions.loadAllSuccess({ items: data, page: currentPage, total: recordsTotal })
        }),
        catchError((error) =>
          of(error).pipe(
            tap((err) => {
              console.error('**** loadAllFailed', err);
              this.toastr.error(`Une erreur est suvernue lors du chargement des types de pièce d'identité.`);
            }),
          ),
        ),
      )
    )
  ));
}
