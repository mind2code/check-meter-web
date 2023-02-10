import { RentReceipt } from '../models/rent-receipt.model';

export type CreateRentReceiptDto = Pick<RentReceipt, 'montantRegle' | 'observation'> & {
  avisEcheance: {
    id: string
  }
}


