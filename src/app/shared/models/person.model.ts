import { AddressBook } from './address-book.model';
import { Country } from './country.model';
import { IdentityDocument } from './identity-document.model';

/**
 * fr => Type de personne
 */
export interface PersonType {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
  estActif: boolean;
}

/**
 * fr => Civilité
 */
export interface Civility {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
  estActif: boolean;
}

/**
 * fr => Genre
 */
export interface Gender {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
  estActif: boolean;
}

/**
 * fr => Situation matrimoniale
 */
export interface MaritalSituation {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
}

/**
 * fr => Personne
 */
export interface Person {
  id: string;
  identifiant: string;
  nomComplet: string;
  nom: string;
  prenoms: string;
  nomJeuneFille: string;
  dateNaissance: Date;
  lieuNaissance: string;
  description: string;
  estActif: boolean;
  civilite?: Civility;
  genre?: Gender;
  nationalite?: Country;
  situationMatrimoniale?: MaritalSituation;
  typePersonne?: PersonType;
  carnetAdresse?: AddressBook[];
  pieceIdentite?: IdentityDocument[];
}
