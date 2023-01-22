import {Deserializable} from "../../../shared/models/deserializable.model";
import { Habitation } from '../../habitations/models/habitation.model';
import { Locataire } from '../../locataires/models/locataire.model';

export class Contrat implements Deserializable{
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
  locataire?: Locataire;
  habitation?: Habitation;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.locataire = new Locataire().deserialize(input.locataire);
    this.habitation = new Habitation().deserialize(input.habitation);
    return this;
  }
}
