import { Person } from '../models/person.model';
import { CreateAddressBookDto } from './address-book.dto';
import { CreateIdentityDocumentDto, CreateIdentityDocumentFormType } from './identity-document.dto';

export interface CreatePersonDto extends Partial<Pick<Person, (
  'nom'|'prenoms'|'nomJeuneFille'|'dateNaissance'|'lieuNaissance'
)>> {
  civilite: null | {
    id: number | null;
  };
  genre: null | {
    id: number | null;
  };
  nationalite: null | {
    id: number | null;
  };
  situationMatrimoniale: null | {
    id: number | null;
  };
  typePersonne: {
    id: number
  };
  carnetAdresse: CreateAddressBookDto[];
  pieceIdentite: CreateIdentityDocumentDto[];
}

export interface CreatePersonFormType extends Omit<CreatePersonDto, (
  'civilite'|'genre'|'nationalite'
  |'situationMatrimoniale'|'typePersonne'|'pieceIdentite'
)> {
  civiliteId: number;
  genreId: number;
  nationaliteId: number;
  situationMatrimonialeId: number;
  typePersonneId: number;
  pieceIdentite: CreateIdentityDocumentFormType[];
}
