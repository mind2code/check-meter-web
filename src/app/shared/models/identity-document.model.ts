import { Person } from './person.model';

/**
 * fr => Type de pièce d'identité
 */
export interface IdentityDocumentType {
  id: string;
  identifiant: string;
  libelle: string;
  description: string;
  enabled: boolean;
}

/**
 * fr => Pièce d'identité
 */
export interface IdentityDocument {
  id: string;
  numeroIdentite: string;
  numeroNNI: string;
  delivrePar: string;
  dateDelivrance: Date;
  dateExpiration: Date;
  estActif: boolean;
  person?: Person;
  typePieceIdentite?: IdentityDocumentType;
}
