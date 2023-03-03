import { Status } from './commons.model';
import { Contract } from './contract.model';
import { RentReceipt } from './rent-receipt.model';

/**
 * fr => Avis écheance
 */
export interface ExpiryNotice {
  id: string;
  identifiant: string;
  dateEmission: Date;
  loyer: number;
  loyerRestant: number;
  chargeMensuelleContractuelles: number;
  periodeConcernee: string;
  sommeDue: number;
  dateExigibilite: Date;
  observation: string;
  statut?: Status;
  contrat?: Contract;
  quittanceLoyers?: RentReceipt[];
}
