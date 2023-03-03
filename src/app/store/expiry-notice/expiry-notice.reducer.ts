import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { ExpiryNotice } from '../../shared/models/expiry-notice.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ExpiryNoticeApiActions, ExpiryNoticePageActions } from './expiry-notice.actions';

export const featureName = 'expiryNotices';

export interface State extends EntityState<ExpiryNotice> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  loading: boolean;
}

export const adapter: EntityAdapter<ExpiryNotice> = createEntityAdapter<ExpiryNotice>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  loading: false,
});

export const expiryNoticesFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(ExpiryNoticePageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(
      ExpiryNoticePageActions.loadAll,
      (state) => ({ ...state, loading: true })
    ),
    on(ExpiryNoticeApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
      ExpiryNoticeApiActions.loadAllSuccess,
      ExpiryNoticeApiActions.loadFailed,
      (state) => ({ ...state, loading: false })
    ),

    on(ExpiryNoticePageActions.clear, (state) => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

