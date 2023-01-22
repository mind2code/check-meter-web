import {Deserializable} from "../../../shared/models/deserializable.model";
import { Personne } from './personne.model';

export class Locataire implements Deserializable{
  id: string;
  identifiant: string;
  nomComplet: string;
  envoiSms: boolean;
  envoiEmail: string;
  solde: number;
  typePersonne: string;
  personne?: Personne;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.personne = new Personne().deserialize(input.personne);
    return this;
  }
}
