import { createActionGroup, props } from '@ngrx/store';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { CreateRentReceiptDto } from 'src/app/shared/dto/rent-receipt.dto';
import { RentReceipt } from 'src/app/shared/models/rent-receipt.model';

export const RentReceiptPageActions = createActionGroup({
  source: 'RentReceipts Page',
  events: {
    'Create': props<{ dto: CreateRentReceiptDto }>(),
    'Load All': props<{ params?: PaginationQuery }>(),
    'Pagination Change': props<{ params?: PaginationQuery }>(),
    'Query Change': props<{ params?: PaginationQuery }>(),
    'Select One': props<{ id: string | null }>(),
  }
});

export const RentReceiptApiActions = createActionGroup({
  source: 'RentReceipts API',
  events: {
    'Load All Success': props<{ items: RentReceipt[], total: number, page: number }>(),
    'Create Success': props<{ item: RentReceipt }>(),
    'Create Failed': props<{ error: any }>(),
  }
});
