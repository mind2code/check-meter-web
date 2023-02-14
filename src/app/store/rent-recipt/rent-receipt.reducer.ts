import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { RentReceipt } from '../../shared/models/rent-receipt.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { RentReceiptApiActions, RentReceiptPageActions } from './rent-receipt.actions';

export const featureName = 'rentReceipts';

export interface State extends EntityState<RentReceipt> {
  selectedId: string | null,
  currentPage: number,
  totalRecords: number,
}

export const adapter: EntityAdapter<RentReceipt> = createEntityAdapter<RentReceipt>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  currentPage: 0,
  totalRecords: 0,
});

export const rentReceiptsFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(RentReceiptPageActions.selectOne, (state, { id }) => ({ ...state, selectedId: id })),
    on(RentReceiptApiActions.loadAllSuccess, (state, { items, page, total }) => {
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
    on(RentReceiptPageActions.clear, (state) => ({
      ...state,
      currentPage: 0,
      totalRecords: 0,
      selectedId: null,
      entities: {},
      ids: [],
    })),
  ),
});

// get the selectors
export const getEntitySelectors = adapter.getSelectors;

