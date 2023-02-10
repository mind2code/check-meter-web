import { ExpiryNotice } from './expiry-notice.model';

/**
 * fr => Quittance loyer
 */
export interface RentReceipt {
  id: string;
  identifiant: string;
  referenceQuittance: string;
  estAnnule: boolean;
  dateReglement: Date;
  montantRegle: number;
  observation: string;
  avisEcheance?: ExpiryNotice;
}
