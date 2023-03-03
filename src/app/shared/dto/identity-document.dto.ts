import { IdentityDocument } from '../models/identity-document.model';

export interface CreateIdentityDocumentDto extends Omit<IdentityDocument, ('id'|'estActif'|'typePieceIdentite')> {
  typePieceIdentite: null | {
    id: number | null;
  };
}

export interface CreateIdentityDocumentFormType extends Omit<CreateIdentityDocumentDto, ('typePieceIdentite')> {
  typePieceIdentiteId: number;
}
