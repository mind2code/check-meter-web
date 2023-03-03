import { RentReceipt } from '../models/rent-receipt.model';

export interface CreateRentReceiptDto extends Pick<RentReceipt, 'montantRegle'|'observation'> {
  avisEcheance: {
    id: string
  }
  typeReglement: {
    id: number
  }
}


