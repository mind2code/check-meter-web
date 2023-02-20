import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { IdentityDocumentType } from '../../shared/models/identity-document.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { IdentityDocumentTypeApiActions, IdentityDocumentTypePageActions } from './identity-document-type.actions';

export const featureName = 'identityDocumentTypes';

export interface State extends EntityState<IdentityDocumentType> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean,
}

export const adapter: EntityAdapter<IdentityDocumentType> = createEntityAdapter<IdentityDocumentType>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const identityDocumentTypesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(IdentityDocumentTypePageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      IdentityDocumentTypePageActions.loadAll,
      (state) => ({ ...state, loading: true }),
    ),
    on(IdentityDocumentTypeApiActions.loadAllSuccess, (state, { items, page, total }) => {
      return adapter.setAll(
        items ?? [],
        {
          ...state,
          selectedId: null,
          currentPage: page ?? 0,
          totalRecords: ((Number.isSafeInteger(total)) ? total : state.totalRecords),
        }
      );
    }),
    on(
      IdentityDocumentTypeApiActions.loadAllSuccess,
      IdentityDocumentTypeApiActions.loadFailed,
      (state) => ({ ...state, loading: false }),
    ),

    on(IdentityDocumentTypePageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

