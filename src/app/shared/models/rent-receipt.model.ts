import { ExpiryNotice } from './expiry-notice.model';

/**
 * fr => Type de règlement
 */
export interface SettlementType {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
}


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
  typeReglement?: SettlementType;
}
