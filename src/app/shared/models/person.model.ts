import { AddressBook } from './address-book.model';

export interface PersonType {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
  estActif: boolean;
}

export interface Civility {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
  estActif: boolean;
}

export interface Gender {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
  estActif: boolean;
}

export interface MaritalSituation {
  id: number;
  identifiant: string;
  libelle: string;
  description: string;
}

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
  situationMatrimoniale?: MaritalSituation;
  typePersonne?: PersonType;
  carnetAdresse?: AddressBook[]
}
