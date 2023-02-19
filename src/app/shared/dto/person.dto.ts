import { Person } from '../models/person.model';
import { CreateAddressBookDto } from './address-book.dto';
import { CreateIdentityDocumentDto, CreateIdentityDocumentFormType } from './identity-document.dto';

export interface CreatePersonDto extends Pick<Person, (
  'identifiant'|'nomComplet'|'nom'|'prenoms'|'nomJeuneFille'
  |'dateNaissance'|'lieuNaissance'|'description'|'estActif'
)> {
  civilite: {
    id: number;
  };
  genre: {
    id: number;
  };
  nationalite: {
    id: number
  };
  situationMatrimoniale: {
    id: number;
  };
  typePersonne: {
    id: number
  };
  carnetAdresse: CreateAddressBookDto[];
  pieceIdentite: CreateIdentityDocumentDto[];
}

export interface CreatePersonFormType extends Omit<CreatePersonDto, (
  'nomComplet'|'civilite'|'genre'|'nationalite'
  |'situationMatrimoniale'|'typePersonne'|'pieceIdentite'
)> {
  civiliteId: number;
  genreId: number;
  nationaliteId: number;
  situationMatrimonialeId: number;
  typePersonneId: number;
  pieceIdentite: CreateIdentityDocumentFormType[];
}
