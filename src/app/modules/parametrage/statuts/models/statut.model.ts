import {Deserializable} from "../../../../shared/models/deserializable.model";

export class Statut implements Deserializable{
  id: string;
  identifiant: string;
  libelle: string;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
