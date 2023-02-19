import { IdentityDocument } from '../models/identity-document.model';

export interface CreateIdentityDocumentDto extends Omit<IdentityDocument, ('id'|'typePieceIdentite')> {
  typePieceIdentite: {
    id: number;
  };
}

export interface CreateIdentityDocumentFormType extends Omit<CreateIdentityDocumentDto, ('typePieceIdentite')> {
  typePieceIdentiteId: number;
}
