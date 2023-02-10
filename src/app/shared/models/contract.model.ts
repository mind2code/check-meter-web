import { Housing } from './housing.model';
import { Tenant } from './tenant.model';

export interface Contract {
  id: string;
  identifiant: string;
  numeroExterneBail: string;
  dateSignatureContrat: Date;
  dateDebutContrat: Date;
  dateFinContrat: Date;
  montantPasDePorte: number;
  montantCaution: number;
  montantAvance: number;
  observation: string;
  locataire?: Tenant;
  habitation?: Housing;
}
