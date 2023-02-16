import { Housing } from './housing.model';
import { Person } from './person.model';

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
  solde: number;
  envoiSms: boolean;
  envoiEmail: boolean;
  personne?: Person;
  habitation?: Housing;
}
