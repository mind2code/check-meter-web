import {Deserializable} from "../../../shared/models/deserializable.model";

export class Locataire implements Deserializable{
  id: string;
  identifiant: string;
  nomComplet: string;
  envoiSms: boolean;
  envoiEmail: string;
  solde: number;
  typePersonne: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
