import { Contract } from '../models/contract.model';

export interface CreateContractDto extends Partial<Pick<Contract, (
  'numeroExterneBail'|'dateSignatureContrat'|'dateDebutContrat'
  |'montantPasDePorte'|'montantCaution'|'montantAvance'|'observation'|'envoiSms'|'envoiEmail'
)>> {
  personne: null | {
    id: string | null;
  };

  habitation: null | {
    id: number | null;
  };
}

export interface CreateContractFormType extends Omit<CreateContractDto, (
  'habitation'|'personne'
)> {
  // J'ai déjà numéro de bail
  haveLeaseNumber: boolean;
  personneId: string;
  habitationId: number;
}
