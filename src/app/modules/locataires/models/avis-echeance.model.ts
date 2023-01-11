import {Deserializable} from "../../../shared/models/deserializable.model";
import { Locataire } from './locataire.model';
import { Statut } from '../../parametrage/statuts/models/statut.model';

export class AvisEcheance implements Deserializable{
  id: string;
  identifiant: string;
  dateEmission: Date;
  loyer: number;
  loyerRestant: number;
  chargeMensuelleContractuelles: number;
  periodeConcernee: string;
  sommeDue: number;
  dateExigibilite: Date;
  observation: string;
  statut: Statut;
  locataire: Locataire;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.statut = new Statut().deserialize(input.statut);
    this.locataire = new Locataire().deserialize(input.locataire);
    return this;
  }
}
