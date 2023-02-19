import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { RentReceipt } from '../../shared/models/rent-receipt.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { RentReceiptApiActions, RentReceiptPageActions } from './rent-receipt.actions';

export const featureName = 'rentReceipts';

export interface State extends EntityState<RentReceipt> {
  selectedId: string | null;
  currentPage: number;
  totalRecords: number;
  creating: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<RentReceipt> = createEntityAdapter<RentReceipt>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
  creating: false,
  loading: false,
});

export const rentReceiptsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(RentReceiptPageActions.loadAll, (state) => ({ ...state, loading: true })),
    on(RentReceiptApiActions.loadAllSuccess, (state, { items, page, total }) => {
      return adapter.setAll(
        items ?? [],
        {
          ...state,
          currentPage: page ?? 0,
          totalRecords: ((Number.isSafeInteger(total)) ? total : state.totalRecords),
        }
      );
    }),
    on(
      RentReceiptApiActions.loadAllSuccess,
      RentReceiptApiActions.loadFailed,
      (state) => ({ ...state, loading: false , selectedId: null })
    ),

    on(RentReceiptPageActions.create, (state) => ({ ...state, creating: true })),
    on(
      RentReceiptApiActions.createSuccess,
      RentReceiptApiActions.createFailed,
      (state) => ({ ...state, creating: false })
    ),

    on(RentReceiptPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),

    on(RentReceiptPageActions.clear, () => initialState),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

